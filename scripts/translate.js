#!/usr/bin/env node
/**
 * Auto-translation script for Pearstop website.
 *
 * Usage:
 *   GEMINI_API_KEY=your-key node scripts/translate.js
 *
 * Uses Google Gemini 2.5 Flash (free tier), with thinking disabled.
 * Translates in batches of up to 50 strings per API call for efficiency.
 *
 * What it does:
 * 1. Reads messages/en.json (source of truth)
 * 2. For each target locale (nl, fr, de):
 *    - Reads the existing locale JSON
 *    - Finds all string values present in EN but missing in the locale
 *    - Calls Gemini to translate them in batches
 *    - Writes the updated locale JSON back to disk
 * 3. If content/blog/en/ exists, translates MDX files to content/blog/nl/, fr/, de/
 *    (only translates prose paragraphs, leaves frontmatter/headings/JSX untouched)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const MESSAGES_DIR = path.join(ROOT, "messages");
const BLOG_EN_DIR = path.join(ROOT, "content", "blog", "en");
const BLOG_POSTS_SOURCE = path.join(ROOT, "lib", "blog-posts.ts");
const BLOG_FAQ_DIR = path.join(ROOT, "content", "blog-faq");
const BLOG_TOC_DIR = path.join(ROOT, "content", "blog-toc");
// nl already has a hand-maintained `tocItemsNl` field directly on each post in
// lib/blog-posts.ts (written by whoever authors the post) — this pipeline
// only fills the locales nobody hand-translates.
const TOC_TARGET_LOCALES = ["fr", "de"];
const TARGET_LOCALES = ["nl", "fr", "de"];

const LOCALE_NAMES = { nl: "Dutch", fr: "French", de: "German" };
// Gemini's free tier is limited by requests-per-minute far more than by
// tokens, the opposite of Groq's 8000 TPM cap — so batch aggressively and
// make fewer, larger calls rather than many small spaced-out ones.
const BATCH_SIZE = 25;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌  GEMINI_API_KEY environment variable is required.");
  console.error("   Get a free key at https://aistudio.google.com/apikey");
  process.exit(1);
}
const GEMINI_MODEL = "gemini-2.5-flash";

// ---------------------------------------------------------------------------
// Gemini API
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geminiRequestOnce(prompt) {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    GEMINI_MODEL + ':generateContent';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        // 2.5-flash reasons by default; without this, thinking tokens eat the
        // output budget and the response comes back empty (same failure mode
        // gpt-oss had without reasoning_effort: 'low').
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json.error?.message || res.status;
    throw Object.assign(new Error('Gemini API error: ' + msg), {
      retryable: res.status === 429 || res.status === 503,
    });
  }
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty Gemini response');
  return text.trim();
}

async function geminiRequest(prompt, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await geminiRequestOnce(prompt);
    } catch (err) {
      if (err.retryable && attempt < retries) {
        const delay = attempt * 10000;
        const msg = '\n   Rate limited, retrying in ' + (delay / 1000) + 's...';
        process.stdout.write(msg);
        await sleep(delay);
      } else {
        throw err;
      }
    }
  }
}
/**
 * Translate an array of strings to targetLang in one Gemini call.
 * Uses a numbered list format so we can reliably parse the output.
 */
async function geminiTranslateBatch(texts, targetLang) {
  const langName = LOCALE_NAMES[targetLang];
  const numbered = texts.map((t, i) => `${i + 1}. ${t}`).join("\n");

  const prompt = `You are a professional B2B translator for a procurement and asset management software company.

Translate the following numbered strings from English to ${langName}.

CRITICAL RULE — DO NOT TRANSLATE THESE TERMS, keep them exactly as written in English:
procurement, category management, spend management, spend analysis, asset management, asset register, facility management, facilities management, hard services, soft services, single source of truth, data quality, data enrichment, tender, UNSPSC, CMMS, ERP, AI, HVAC, lifecycle management, lifecycle analysis, supplier management, contract management, purchase order, invoice, benchmark, dashboard, KPI, spend, buyer, stakeholder, compliance

These are standard industry loanwords used as-is in ${langName} B2B contexts. Never translate them.

Other rules:
- Keep the same numbered format in your response (1. 2. 3. etc.)
- Preserve any {placeholders}, <tags>, or markdown formatting exactly
- Do not add explanations, only output the translated numbered list
- Match the tone: professional, direct, no marketing fluff

Strings to translate:
${numbered}`;

  const response = await geminiRequest(prompt);

  // Parse numbered response back into array
  const lines = response.split("\n").filter((l) => l.trim());
  const results = new Array(texts.length).fill("");

  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s+([\s\S]+)/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      if (idx >= 0 && idx < texts.length) {
        results[idx] = match[2].trim();
      }
    }
  }

  // Fallback: if any result is empty, use original text
  return results.map((r, i) => r || texts[i]);
}

async function translateBatched(texts, targetLang) {
  const results = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const translated = await geminiTranslateBatch(batch, targetLang);
    results.push(...translated);
    process.stdout.write(`   ${Math.min(i + BATCH_SIZE, texts.length)}/${texts.length} translated\r`);
    // 6s between batches — stays under 20 req/min on free tier
    // ~1500 tokens reserved per call (prompt + max_tokens); at 20s spacing
    // that's ~4500 tokens/min reserved, comfortably under the 8000 TPM cap.
    if (i + BATCH_SIZE < texts.length) await sleep(5000);
  }
  return results;
}

// ---------------------------------------------------------------------------
// JSON helpers — flatten / unflatten nested objects
// ---------------------------------------------------------------------------

function flattenObject(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (Array.isArray(value)) {
      // Dot notation, not `[i]`: en.json stores some of these collections as
      // objects with numeric keys ("0", "1") while nl.json stores real arrays.
      // Bracket notation made the two flatten to different key strings, so
      // those entries looked permanently "missing" and were re-translated on
      // every run — rewriting valid Dutch with a slightly different wording
      // and committing the churn back to main each time.
      value.forEach((item, i) => {
        if (typeof item === "string") {
          result[`${fullKey}.${i}`] = item;
        } else if (typeof item === "object" && item !== null) {
          Object.assign(result, flattenObject(item, `${fullKey}.${i}`));
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    }
  }
  return result;
}

function setNestedValue(obj, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const nextIsIndex = /^\d+$/.test(nextPart);
    if (cur[part] === undefined || cur[part] === null) {
      cur[part] = nextIsIndex ? [] : {};
    }
    cur = cur[part];
  }
  cur[parts[parts.length - 1]] = value;
}

function getNestedValue(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur === undefined || cur === null) return undefined;
    cur = cur[part];
  }
  return cur;
}

// ---------------------------------------------------------------------------
// Messages translation
// ---------------------------------------------------------------------------

async function translateMessages() {
  const enPath = path.join(MESSAGES_DIR, "en.json");
  if (!fs.existsSync(enPath)) {
    console.log("⚠  messages/en.json not found, skipping message translation.");
    return;
  }

  const enData = JSON.parse(fs.readFileSync(enPath, "utf-8"));
  const enFlat = flattenObject(enData);

  for (const locale of TARGET_LOCALES) {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const localeData = fs.existsSync(localePath)
      ? JSON.parse(fs.readFileSync(localePath, "utf-8"))
      : {};

    const localeFlat = flattenObject(localeData);

    const missing = Object.entries(enFlat).filter(([key, value]) => {
      return value && typeof value === "string" && !localeFlat[key];
    });

    if (missing.length === 0) {
      console.log(`✓  ${locale}.json is already up to date (${Object.keys(enFlat).length} keys)`);
      continue;
    }

    console.log(`\n🌍  Translating ${missing.length} missing keys to ${LOCALE_NAMES[locale]}...`);

    const texts = missing.map(([, v]) => v);
    const translatedTexts = await translateBatched(texts, locale);

    const merged = JSON.parse(JSON.stringify(localeData));
    missing.forEach(([key], index) => {
      setNestedValue(merged, key, translatedTexts[index]);
    });

    fs.writeFileSync(localePath, JSON.stringify(merged, null, 2), "utf-8");
    console.log(`✓  Wrote ${locale}.json (${missing.length} new translations)`);
  }
}

// ---------------------------------------------------------------------------
// MDX blog post translation
// ---------------------------------------------------------------------------

async function translateBlogPosts() {
  if (!fs.existsSync(BLOG_EN_DIR)) {
    console.log("\n📝  No content/blog/en/ directory found, skipping blog translation.");
    return;
  }

  const enFiles = fs.readdirSync(BLOG_EN_DIR).filter((f) => f.endsWith(".mdx"));
  if (enFiles.length === 0) {
    console.log("\n📝  No MDX files found in content/blog/en/");
    return;
  }

  for (const locale of TARGET_LOCALES) {
    const localeBlogDir = path.join(ROOT, "content", "blog", locale);
    fs.mkdirSync(localeBlogDir, { recursive: true });

    for (const filename of enFiles) {
      const enFilePath = path.join(BLOG_EN_DIR, filename);
      const localeFilePath = path.join(localeBlogDir, filename);

      if (fs.existsSync(localeFilePath)) {
        const enMtime = fs.statSync(enFilePath).mtimeMs;
        const localeMtime = fs.statSync(localeFilePath).mtimeMs;
        if (localeMtime >= enMtime) {
          console.log(`  ✓  ${locale}/${filename} up to date`);
          continue;
        }
      }

      console.log(`  🌍  Translating ${filename} → ${locale}...`);
      const enContent = fs.readFileSync(enFilePath, "utf-8");
      const translatedContent = await translateMdxContent(enContent, locale);
      fs.writeFileSync(localeFilePath, translatedContent, "utf-8");
      console.log(`  ✓  Wrote ${locale}/${filename}`);
      await sleep(5000); // pause between files — Gemini's free tier is RPM-bound, not TPM-bound
    }
  }
}

/**
 * Translate MDX content: translates prose paragraphs and frontmatter title/description.
 * Preserves: frontmatter structure, headings, JSX tags, code blocks, import/export.
 */
async function translateMdxContent(content, targetLang) {
  const lines = content.split("\n");
  const result = [...lines];

  let inFrontmatter = false;
  let frontmatterDone = false;
  let inCodeBlock = false;
  let frontmatterCount = 0;
  // Tracks a multi-line JSX/JS block opened by a line starting with "<"
  // (e.g. a <script>{{__html: JSON.stringify({...})}} /> block) so every
  // line inside it — including bare JSON body lines like `"key": "value",`
  // that don't themselves start with "<" or "{" — is skipped, not sent to
  // the translator. Translating JSON body lines individually breaks commas
  // and quoted enum values (e.g. "Organization" -> "Organisatie"), which
  // produces invalid JS/JSON and fails the MDX build.
  let inJsxBlock = false;
  let jsxBalance = 0;

  const segments = []; // { index, text }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!frontmatterDone && line.trim() === "---") {
      frontmatterCount++;
      if (frontmatterCount === 1) { inFrontmatter = true; continue; }
      if (frontmatterCount === 2) { inFrontmatter = false; frontmatterDone = true; continue; }
    }

    if (inFrontmatter) {
      // Translate title and description frontmatter values
      const fm = line.match(/^(title|description):\s*"?(.+?)"?\s*$/);
      if (fm) {
        segments.push({ index: i, text: fm[2], prefix: `${fm[1]}: "`, suffix: '"' });
        result[i] = null;
      }
      continue;
    }

    if (line.trim().startsWith("```")) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    if (/^(import|export)\s/.test(line.trim())) continue;

    if (inJsxBlock) {
      jsxBalance += (line.match(/[{(]/g) || []).length - (line.match(/[})]/g) || []).length;
      if (jsxBalance <= 0) inJsxBlock = false;
      continue;
    }

    if (/^\s*</.test(line)) {
      const net = (line.match(/[{(]/g) || []).length - (line.match(/[})]/g) || []).length;
      if (net > 0) {
        inJsxBlock = true;
        jsxBalance = net;
      }
      continue;
    }
    if (/^\s*\{/.test(line)) continue;
    if (!line.trim() || /^#{1,6}\s/.test(line)) continue;

    // Prose paragraph — translate
    segments.push({ index: i, text: line, prefix: "", suffix: "" });
    result[i] = null;
  }

  if (segments.length === 0) return content;

  const texts = segments.map((s) => s.text);
  const translated = await translateBatched(texts, targetLang);

  segments.forEach((seg, i) => {
    result[seg.index] = seg.prefix + translated[i] + seg.suffix;
  });

  return result.join("\n");
}

// ---------------------------------------------------------------------------
// Blog post FAQ translation
// ---------------------------------------------------------------------------
//
// `faqItems` in lib/blog-posts.ts (English) is the single source of truth —
// see the comment on the `Faq` component in components/blog.tsx. This never
// writes to that file. It only extracts the EN q/a pairs from it (read-only)
// and translates whatever is missing from content/blog-faq/{locale}.json,
// which lib/blog-faq-i18n.ts reads at render time to localize blog FAQs.

function extractBlogFaqItems() {
  if (!fs.existsSync(BLOG_POSTS_SOURCE)) return {};
  const src = fs.readFileSync(BLOG_POSTS_SOURCE, "utf-8");
  const result = {};
  // Top-level post objects are formatted as `  {\n    slug: "...", ...\n  },`
  // (2-space brace, 4-space fields) — a stable split point because Prettier
  // formats this array consistently and no nested field closes at that
  // exact indentation.
  const blocks = src.split(/\n(?=  \{\n {4}slug:)/);
  for (const block of blocks) {
    const slugMatch = block.match(/^\s*\{\n\s*slug:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    const faqMatch = block.match(/\n {4}faqItems:\s*\[\n([\s\S]*?)\n {4}\],\n/);
    if (!faqMatch) continue;
    // q/a entries may be written single-line or spread across lines, so pull
    // every `q:`/`a:` string token in document order and pair them up rather
    // than matching a whole `{ q: ..., a: ... }` object in one shot.
    const tokenRe = /\b(q|a):\s*"((?:[^"\\]|\\.)*)"/g;
    const tokens = [];
    let m;
    while ((m = tokenRe.exec(faqMatch[1]))) tokens.push({ key: m[1], val: JSON.parse(`"${m[2]}"`) });
    const items = [];
    for (let i = 0; i < tokens.length; i += 2) {
      if (tokens[i]?.key === "q" && tokens[i + 1]?.key === "a") {
        items.push({ q: tokens[i].val, a: tokens[i + 1].val });
      } else {
        console.warn(`⚠  Could not parse faqItems for "${slugMatch[1]}" — skipping (check formatting).`);
        items.length = 0;
        break;
      }
    }
    if (items.length > 0) result[slugMatch[1]] = items;
  }
  return result;
}

async function translateBlogFaqItems() {
  const enFaq = extractBlogFaqItems();
  const slugs = Object.keys(enFaq);
  if (slugs.length === 0) {
    console.log("\n❓  No blog post faqItems found in lib/blog-posts.ts, skipping.");
    return;
  }

  fs.mkdirSync(BLOG_FAQ_DIR, { recursive: true });

  for (const locale of TARGET_LOCALES) {
    const localePath = path.join(BLOG_FAQ_DIR, `${locale}.json`);
    const localeData = fs.existsSync(localePath) ? JSON.parse(fs.readFileSync(localePath, "utf-8")) : {};

    // Flatten to "<slug>.<index>.q" / "<slug>.<index>.a" so the existing
    // batched-translate + missing-key diff logic (used for messages/*.json)
    // works unchanged, and stale slugs/entries removed from blog-posts.ts
    // are naturally dropped by only ever rebuilding from enFaq.
    const enFlat = flattenObject(enFaq);
    const localeFlat = flattenObject(localeData);
    const missing = Object.entries(enFlat).filter(([key, value]) => value && typeof value === "string" && !localeFlat[key]);

    if (missing.length === 0) {
      console.log(`✓  blog-faq/${locale}.json is already up to date (${slugs.length} posts)`);
      continue;
    }

    console.log(`\n🌍  Translating ${missing.length} blog FAQ strings to ${LOCALE_NAMES[locale]}...`);
    const texts = missing.map(([, v]) => v);
    const translatedTexts = await translateBatched(texts, locale);

    const merged = {};
    // Rebuild from enFaq so removed/renamed slugs don't linger, keeping
    // already-translated strings and filling in the newly translated ones.
    for (const slug of slugs) {
      merged[slug] = enFaq[slug].map((item, i) => ({
        q: getNestedValue(localeData, `${slug}.${i}.q`) || item.q,
        a: getNestedValue(localeData, `${slug}.${i}.a`) || item.a,
      }));
    }
    missing.forEach(([key], index) => setNestedValue(merged, key, translatedTexts[index]));

    fs.writeFileSync(localePath, JSON.stringify(merged, null, 2), "utf-8");
    console.log(`✓  Wrote blog-faq/${locale}.json (${missing.length} new translations)`);
  }
}

// ---------------------------------------------------------------------------
// Blog post TOC label translation
// ---------------------------------------------------------------------------
//
// `tocItems` in lib/blog-posts.ts (English) is read-only here, same as
// faqItems above. `id` values are anchor targets (`href="#id"` +
// `document.getElementById(id)` in components/blog-toc.tsx) and are never
// translated — only `label` is. nl already has a hand-maintained
// `tocItemsNl` field per post, written by whoever authors it, so this only
// covers fr/de via content/blog-toc/{fr,de}.json, read by lib/blog-toc-i18n.ts.

function extractBlogTocItems() {
  if (!fs.existsSync(BLOG_POSTS_SOURCE)) return {};
  const src = fs.readFileSync(BLOG_POSTS_SOURCE, "utf-8");
  const result = {};
  const blocks = src.split(/\n(?=  \{\n {4}slug:)/);
  for (const block of blocks) {
    const slugMatch = block.match(/^\s*\{\n\s*slug:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    const tocMatch = block.match(/\n {4}tocItems:\s*\[\n([\s\S]*?)\n {4}\],\n/);
    if (!tocMatch) continue;
    const tokenRe = /\b(id|label):\s*"((?:[^"\\]|\\.)*)"/g;
    const tokens = [];
    let m;
    while ((m = tokenRe.exec(tocMatch[1]))) tokens.push({ key: m[1], val: JSON.parse(`"${m[2]}"`) });
    const items = [];
    for (let i = 0; i < tokens.length; i += 2) {
      if (tokens[i]?.key === "id" && tokens[i + 1]?.key === "label") {
        items.push({ id: tokens[i].val, label: tokens[i + 1].val });
      } else {
        console.warn(`⚠  Could not parse tocItems for "${slugMatch[1]}" — skipping (check formatting).`);
        items.length = 0;
        break;
      }
    }
    if (items.length > 0) result[slugMatch[1]] = items;
  }
  return result;
}

async function translateBlogTocLabels() {
  const enToc = extractBlogTocItems();
  const slugs = Object.keys(enToc);
  if (slugs.length === 0) {
    console.log("\n🧭  No blog post tocItems found in lib/blog-posts.ts, skipping.");
    return;
  }

  fs.mkdirSync(BLOG_TOC_DIR, { recursive: true });

  for (const locale of TOC_TARGET_LOCALES) {
    const localePath = path.join(BLOG_TOC_DIR, `${locale}.json`);
    const localeData = fs.existsSync(localePath) ? JSON.parse(fs.readFileSync(localePath, "utf-8")) : {};

    const enLabelFlat = {};
    for (const slug of slugs) enToc[slug].forEach((item, i) => { enLabelFlat[`${slug}.${i}`] = item.label; });
    const localeLabelFlat = {};
    for (const [slug, items] of Object.entries(localeData)) {
      (items || []).forEach((item, i) => { if (item?.label) localeLabelFlat[`${slug}.${i}`] = item.label; });
    }

    const missing = Object.entries(enLabelFlat).filter(([key, value]) => value && !localeLabelFlat[key]);

    if (missing.length === 0) {
      console.log(`✓  blog-toc/${locale}.json is already up to date (${slugs.length} posts)`);
      continue;
    }

    console.log(`\n🌍  Translating ${missing.length} blog TOC labels to ${LOCALE_NAMES[locale]}...`);
    const texts = missing.map(([, v]) => v);
    const translatedTexts = await translateBatched(texts, locale);
    const translatedByKey = {};
    missing.forEach(([key], index) => { translatedByKey[key] = translatedTexts[index]; });

    const merged = {};
    for (const slug of slugs) {
      merged[slug] = enToc[slug].map((item, i) => {
        const key = `${slug}.${i}`;
        const label = translatedByKey[key] ?? localeLabelFlat[key] ?? item.label;
        return { id: item.id, label };
      });
    }

    fs.writeFileSync(localePath, JSON.stringify(merged, null, 2), "utf-8");
    console.log(`✓  Wrote blog-toc/${locale}.json (${missing.length} new translations)`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌐  Pearstop auto-translation\n");
  console.log(`   Engine: Gemini 2.5 Flash`);
  console.log(`   Target locales: ${TARGET_LOCALES.join(", ")}\n`);

  try {
    await translateMessages();
    console.log("");
    await translateBlogPosts();
    console.log("");
    await translateBlogFaqItems();
    console.log("");
    await translateBlogTocLabels();
    console.log("\n✅  Translation complete.");
  } catch (err) {
    console.error("\n❌  Translation failed:", err.message);
    process.exit(1);
  }
}

main();
