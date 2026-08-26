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
// Brand style — the fixed suffix every generated image shares, for a
// consistent look across the whole blog.
// ---------------------------------------------------------------------------

const STYLE_SUFFIX =
  "photorealistic photograph, natural daylight, cool blue-grey colour grading, " +
  "shallow depth of field, documentary photography style, no text, no logos, " +
  "no watermark, 16:9 landscape, shot on a full-frame DSLR with a 35mm lens, " +
  "sharp focus, high detail";

const SECTORS = [
  "hard-fm",         // building maintenance: M&E plant rooms, lifts, electrical panels, façade work
  "soft-fm-cleaning", // commercial cleaning, sanitation, soft services in offices/facilities
  "construction",     // active building sites, structural steel, site engineers
  "hvac-filtration",  // rooftop AHUs, ductwork, filter/HVAC servicing
  "buildings-cities",  // skylines, business parks, architecture, generic built-environment
];

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
  const prompt = `You are art-directing hero photography for a B2B website's blog. The company (Pearstop) sells procurement and asset data quality software to companies in hard facilities management (building M&E maintenance), soft FM (cleaning/soft services), construction, and HVAC/air filtration — buildings and city skylines are also on-brand.

Article title: "${title}"
Article description: "${description}"
Article category: "${category}"

Pick the ONE sector below that this article's key takeaway is most concretely about (not the abstract data/software topic — the real-world industry scene behind it):
${SECTORS.map((s) => `- ${s}`).join("\n")}

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
    const imagePath = path.join(IMAGES_DIR, `${b.slug}.jpg`);
    return !b.hasImage && !fs.existsSync(imagePath);
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

    console.log(`🎨  ${post.slug}`);
    console.log(`    sector selection + scene (people: ${includePeople})...`);

    const { sector, scene } = await pickScene({ title, description, category, includePeople });
    const fullPrompt = `${scene}, ${STYLE_SUFFIX}`;

    console.log(`    sector: ${sector}`);
    console.log(`    prompt: ${fullPrompt}`);

    const imageBuffer = await renderImage(fullPrompt);
    const imagePath = path.join(IMAGES_DIR, `${post.slug}.jpg`);
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`    ✓  wrote public/images/blog/${post.slug}.jpg (${(imageBuffer.length / 1024).toFixed(0)}KB)`);

    // Re-find this post's current slugLineEnd against the latest source,
    // since earlier insertions in this loop shift offsets.
    const freshBlocks = findPostBlocks(source);
    const freshPost = freshBlocks.find((b) => b.slug === post.slug);
    source = insertImageField(source, freshPost.slugLineEnd, `/images/blog/${post.slug}.jpg`);

    manifest[post.slug] = { sector, includePeople, scene, prompt: fullPrompt, seed };

    fs.writeFileSync(BLOG_POSTS_PATH, source, "utf-8");
    fs.writeFileSync(PROMPTS_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  }

  console.log("\n✅  Blog image generation complete.");
}

main().catch((err) => {
  console.error("\n❌  Blog image generation failed:", err.message);
  process.exit(1);
});
