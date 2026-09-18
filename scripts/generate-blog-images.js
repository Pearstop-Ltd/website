#!/usr/bin/env node
/**
 * Auto-generates a hero image for any blog post in lib/blog-posts.ts that
 * doesn't have one yet.
 *
 * Usage:
 *   GROQ_API_KEY=your-key node scripts/generate-blog-images.js
 *
 * What it does, per post missing public/images/blog/<slug>.jpg:
 * 1. Reads the post's title/description/category from lib/blog-posts.ts
 *    and its EN MDX frontmatter.
 * 2. Asks Groq (llama/gpt-oss, same key as scripts/translate.js) to pick the
 *    sector this article is really about and write one concrete, literal
 *    photographic scene grounded in the article's key takeaway — no
 *    dashboards, graphs, or abstract data-viz cliches.
 * 3. Deterministically decides (hashed from the slug, not random) whether
 *    the scene includes people — this lands at ~30% across the blog as a
 *    whole, and is stable across reruns.
 * 4. Appends a fixed brand style suffix so every image shares one look.
 * 5. Renders the image via OpenAI's gpt-image-1 (requires OPENAI_API_KEY;
 *    ~$0.04-0.06/image at medium quality), saves it to
 *    public/images/blog/<slug>.jpg, and adds `image: "..."` to that post's
 *    entry in lib/blog-posts.ts.
 * 6. Records the exact prompt used in content/blog/image-prompts.json so
 *    the choice is auditable and an image can be regenerated with the same
 *    brief later.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BLOG_POSTS_PATH = path.join(ROOT, "lib", "blog-posts.ts");
const BLOG_EN_DIR = path.join(ROOT, "content", "blog", "en");
const IMAGES_DIR = path.join(ROOT, "public", "images", "blog");
const PROMPTS_MANIFEST_PATH = path.join(ROOT, "content", "blog", "image-prompts.json");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error("❌  GROQ_API_KEY environment variable is required.");
  process.exit(1);
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("❌  OPENAI_API_KEY environment variable is required.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Brand style — the fixed suffix every generated image shares (camera/
// quality/format only). Lighting and colour mood are deliberately NOT in
// here — they used to be a fixed clause ("warm natural daylight...") baked
// into every prompt, which is exactly why every image came out the same
// palette. LIGHTING_MOODS below supplies that per-post instead.
// ---------------------------------------------------------------------------

const STYLE_SUFFIX =
  "photorealistic photograph, true-to-life colour rendering for whatever light " +
  "is described, NOT desaturated, NOT a flat monochrome grade, shallow depth " +
  "of field, documentary photography style, no text, no logos, no watermark, " +
  "16:9 landscape, shot on a full-frame DSLR with a 35mm lens, sharp focus, " +
  "high detail";

// Distinct lighting/colour moods, each a reliable, well-rendered photographic
// condition (lighting is one of the things image models render most
// consistently well — unlike e.g. precise hand/tool interactions). One is
// picked deterministically per post (hashed from the slug, like includePeople
// below) so the same post always regenerates the same way, but different
// posts land on visibly different palettes instead of one house style.
const LIGHTING_MOODS = [
  "warm late-afternoon sunlight raking low through windows or open doors, long soft shadows, golden warm tones",
  "bright overcast daylight, soft even shadows, clean neutral-to-cool colour",
  "cool early-morning blue-hour light outside with warm interior lamps glowing through windows, mixed colour temperature",
  "crisp midday sun, high-key exposure, vivid saturated colour, hard-edged shadows",
  "moody low-key interior lighting with warm sodium work-lights, deep shadows, dramatic contrast",
  "soft diffused daylight through skylights or overcast glazing, gentle even colour, low contrast",
  "golden-hour exterior light with long shadows and a warm-to-cool gradient across the scene",
  "overcast winter daylight, muted cool tones, flat soft shadows, quiet documentary feel",
];

// Per-sector example settings, fed into the Groq prompt as concrete anchors
// so its freeform scene-writing has specific real-world places to draw on
// rather than defaulting to generic offices/skylines. Each is a pool, not a
// single fixed shot, so repeat visits to the same sector still vary.
const SECTOR_SUBJECTS = {
  "hard-fm": [
    "an M&E plant room with pipework, valves and gauges",
    "a rooftop chiller or AHU installation",
    "an electrical switchgear or BMS control panel room",
    "a lift/elevator machine room",
    "a building façade maintenance cradle or window-cleaning rig",
    "a boiler room or plant room walkway",
  ],
  "soft-fm-cleaning": [
    "an office reception or foyer being cleaned before opening hours",
    "an industrial floor-scrubber machine working a warehouse or retail aisle",
    "a cleaning cart being restocked in a washroom or restroom corridor",
    "a commercial kitchen or breakroom being cleaned",
    "window cleaning viewed from inside a commercial building",
    "a waste and recycling room being managed in a commercial building",
    "a cleaning supplies and equipment storage room",
  ],
  construction: [
    "structural steel erection on an active building site",
    "a concrete pour with rebar visible",
    "a site engineer reviewing plans on-site in PPE",
    "groundworks or excavation on a construction site",
    "scaffolding on a building exterior mid-construction",
    "a site materials and logistics yard",
  ],
  "hvac-filtration": [
    "a close-up of rooftop AHU ductwork and filter housings",
    "a technician's-eye view of filter replacement in a mechanical room",
    "a rooftop HVAC unit being serviced",
    "ductwork inspection in a ceiling void",
  ],
  "integrated-fm": [
    "a modern office building foyer or lobby with a reception desk",
    "the street-level exterior of a mixed-use commercial building",
    "a multi-service site combining a loading dock and a building entrance",
    "a business park entrance plaza",
  ],
  "buildings-cities": [
    "a city skyline with a mix of commercial buildings",
    "a business park exterior",
    "the exterior of a modern office building",
    "an architectural detail of a commercial building's facade",
  ],
};

const SECTORS = Object.keys(SECTOR_SUBJECTS);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stable string hash (djb2) so the people/no-people decision is deterministic
// per slug rather than random — reruns of this script produce the same brief.
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return h >>> 0;
}

// ---------------------------------------------------------------------------
// Groq — scene selection
// ---------------------------------------------------------------------------

async function groqRequestOnce(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + GROQ_API_KEY },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
      reasoning_effort: "low",
      include_reasoning: false,
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json.error?.message || res.status;
    throw Object.assign(new Error("Groq API error: " + msg), { retryable: res.status === 429 });
  }
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty Groq response");
  return text.trim();
}

async function groqRequest(prompt, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await groqRequestOnce(prompt);
    } catch (err) {
      if (err.retryable && attempt < retries) {
        const delay = attempt * 10000;
        process.stdout.write(`\n   Rate limited, retrying in ${delay / 1000}s...`);
        await sleep(delay);
      } else {
        throw err;
      }
    }
  }
}

async function pickScene({ title, description, category, includePeople }) {
  const sectorList = SECTORS.map(
    (s) => `- ${s}: e.g. ${SECTOR_SUBJECTS[s].join("; ")}`
  ).join("\n");

  const prompt = `You are art-directing hero photography for a B2B website's blog. The company (Pearstop) sells procurement and asset data quality software to companies across hard facilities management, soft FM (cleaning/soft services), construction, HVAC/air filtration, and integrated FM (a mix of hard + soft services in one contract) — buildings and city skylines are also on-brand.

Article title: "${title}"
Article description: "${description}"
Article category: "${category}"

Pick the ONE sector below that this article's key takeaway is most concretely about (not the abstract data/software topic — the real-world industry scene behind it). Each sector lists example settings only as inspiration — feel free to pick a different but equally concrete setting in that sector:
${sectorList}

Do not default to hard-fm or buildings-cities just because they feel like a safe generic choice — actively consider soft-fm-cleaning and integrated-fm whenever the article's spend/data/service scope plausibly touches cleaning or multi-service contracts (which is often, since Pearstop's customers frequently run integrated contracts). Across many articles, these sectors should come up roughly as often as the others, not rarely.

Then write ONE single sentence describing a concrete, literal, real-world photographic scene in that sector that a photographer could actually shoot. ${
    includePeople
      ? "Include one or two people performing a relevant, specific task (name their role and action)."
      : "Do not include any people — focus on equipment, architecture, or environment."
  }
Rules: no dashboards, screens, graphs, spreadsheets, or other abstract data-visualisation imagery. No text, signage, or logos in the scene. No metaphors — describe something a camera could literally capture.

Respond with ONLY strict JSON, no markdown fences, no commentary, in this exact shape:
{"sector": "<one of the sector keys above>", "scene": "<the one-sentence scene description>"}`;

  const response = await groqRequest(prompt);
  const match = response.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`Could not parse Groq scene response: ${response}`);
  const parsed = JSON.parse(match[0]);
  if (!parsed.scene || !SECTORS.includes(parsed.sector)) {
    throw new Error(`Malformed scene response: ${response}`);
  }
  return parsed;
}

// ---------------------------------------------------------------------------
// OpenAI gpt-image-1 — image rendering
// ---------------------------------------------------------------------------

async function renderImage(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1536x1024", // landscape; site renders it with object-fit: cover so exact ratio isn't critical
          quality: "medium",
          output_format: "jpeg",
          output_compression: 80,
          n: 1,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.error?.message || res.status;
        throw new Error(`OpenAI image error: ${msg}`);
      }
      const b64 = json.data?.[0]?.b64_json;
      if (!b64) throw new Error("OpenAI response had no image data");
      return Buffer.from(b64, "base64");
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = attempt * 10000;
      process.stdout.write(`\n    OpenAI image request failed (${err.message}), retrying in ${delay / 1000}s...`);
      await sleep(delay);
    }
  }
}

// ---------------------------------------------------------------------------
// lib/blog-posts.ts helpers
// ---------------------------------------------------------------------------

function parseMdxFrontmatter(slug) {
  const filePath = path.join(BLOG_EN_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    fm[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
  }
  return fm;
}

// Finds every post block in the source text and returns
// { slug, category, hasImage, blockStart, slugLineEnd } for each.
function findPostBlocks(source) {
  const blocks = [];
  const re = /\{\s*\n\s*slug:\s*"([^"]+)",/g;
  let m;
  while ((m = re.exec(source))) {
    const slugLineEnd = m.index + m[0].length;
    const nextBraceClose = source.indexOf("\n  },", slugLineEnd);
    const block = source.slice(m.index, nextBraceClose === -1 ? undefined : nextBraceClose);
    const categoryMatch = block.match(/category:\s*"([^"]+)"/);
    blocks.push({
      slug: m[1],
      category: categoryMatch ? categoryMatch[1] : "",
      hasImage: /\n\s*image:\s*"/.test(block),
      hidden: /\n\s*hidden:\s*true/.test(block),
      slugLineEnd,
    });
  }
  return blocks;
}

function insertImageField(source, slugLineEnd, imagePath) {
  const before = source.slice(0, slugLineEnd);
  const after = source.slice(slugLineEnd);
  const indentMatch = after.match(/\n(\s*)\S/);
  const indent = indentMatch ? indentMatch[1] : "    ";
  return `${before}\n${indent}image: "${imagePath}",${after}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🖼️   Pearstop auto blog-image generation\n");

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  let source = fs.readFileSync(BLOG_POSTS_PATH, "utf-8");
  const blocks = findPostBlocks(source);

  const manifest = fs.existsSync(PROMPTS_MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(PROMPTS_MANIFEST_PATH, "utf-8"))
    : {};

  const pending = blocks.filter((b) => {
    if (b.hidden) return false;
    // The file on disk is the source of truth, not the `image:` field —
    // an `image:` entry can exist while the actual file never made it into
    // a commit (e.g. a run whose push lost a race with another workflow),
    // which would otherwise make this check skip it forever.
    const imagePath = path.join(IMAGES_DIR, `${b.slug}.jpg`);
    return !fs.existsSync(imagePath);
  });

  if (pending.length === 0) {
    console.log("✓  Every post already has a hero image. Nothing to do.");
    return;
  }

  console.log(`Found ${pending.length} post(s) without a hero image: ${pending.map((p) => p.slug).join(", ")}\n`);

  // Process oldest-in-file-first, but re-locate slugLineEnd after each edit
  // since inserting text shifts every later offset.
  for (const post of pending) {
    const fm = parseMdxFrontmatter(post.slug);
    const title = fm.title || post.slug;
    const description = fm.description || "";
    const category = post.category || "";

    const seed = hash(post.slug);
    const includePeople = seed % 10 < 3; // ~30%, deterministic per slug
    // Separate hash (distinct salt) so lighting choice doesn't correlate
    // with the people/no-people decision above.
    const lightingMood = LIGHTING_MOODS[hash(`${post.slug}|lighting`) % LIGHTING_MOODS.length];

    console.log(`🎨  ${post.slug}`);
    console.log(`    sector selection + scene (people: ${includePeople})...`);

    const { sector, scene } = await pickScene({ title, description, category, includePeople });
    const fullPrompt = `${scene}, ${lightingMood}, ${STYLE_SUFFIX}`;

    console.log(`    sector: ${sector}`);
    console.log(`    lighting: ${lightingMood}`);
    console.log(`    prompt: ${fullPrompt}`);

    const imageBuffer = await renderImage(fullPrompt);
    const imagePath = path.join(IMAGES_DIR, `${post.slug}.jpg`);
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`    ✓  wrote public/images/blog/${post.slug}.jpg (${(imageBuffer.length / 1024).toFixed(0)}KB)`);

    // Re-find this post's current slugLineEnd against the latest source,
    // since earlier insertions in this loop shift offsets. Only add the
    // `image:` field if it isn't already there — it can pre-exist if a past
    // run generated the field but lost the race to commit the file itself.
    if (!post.hasImage) {
      const freshBlocks = findPostBlocks(source);
      const freshPost = freshBlocks.find((b) => b.slug === post.slug);
      source = insertImageField(source, freshPost.slugLineEnd, `/images/blog/${post.slug}.jpg`);
    }

    manifest[post.slug] = { sector, includePeople, lightingMood, scene, prompt: fullPrompt, seed };

    fs.writeFileSync(BLOG_POSTS_PATH, source, "utf-8");
    fs.writeFileSync(PROMPTS_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  }

  console.log("\n✅  Blog image generation complete.");
}

main().catch((err) => {
  console.error("\n❌  Blog image generation failed:", err.message);
  process.exit(1);
});
