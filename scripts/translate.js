#!/usr/bin/env node
/**
 * Auto-translation script for Pearstop website.
 *
 * Usage:
 *   node scripts/translate.js
 *
 * Uses MyMemory free translation API (no API key required).
 * Rate limit: ~5 req/s on the free tier. Script adds small delays between
 * batches to stay within limits.
 *
 * What it does:
 * 1. Reads messages/en.json (source of truth)
 * 2. For each target locale (nl, fr, de):
 *    - Reads the existing locale JSON
 *    - Finds all string values present in EN but missing in the locale
 *    - Calls MyMemory API to translate them (one string per request)
 *    - Writes the updated locale JSON back to disk
 * 3. If content/blog/en/ exists, translates MDX files to content/blog/nl/, fr/, de/
 *    (only translates prose paragraphs, leaves JSX/MDX syntax untouched)
 *
 * Run this before every deploy or call manually after updating en.json or adding blog posts.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const MESSAGES_DIR = path.join(ROOT, "messages");
const BLOG_EN_DIR = path.join(ROOT, "content", "blog", "en");

const TARGET_LOCALES = ["nl", "fr", "de"];
const MYMEMORY_LANG_CODES = { nl: "nl", fr: "fr", de: "de" };

// ---------------------------------------------------------------------------
// MyMemory API call (one text at a time — free tier has no batch endpoint)
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function myMemoryTranslate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(text);
    const langpair = `en|${targetLang}`;
    const options = {
      hostname: "api.mymemory.translated.net",
      path: `/get?q=${encoded}&langpair=${langpair}`,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.responseStatus !== 200) {
            reject(new Error(`MyMemory API error ${json.responseStatus}: ${json.responseDetails}`));
            return;
          }
          resolve(json.responseData.translatedText);
        } catch (e) {
          reject(new Error(`Failed to parse MyMemory response: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

async function myMemoryTranslateBatch(texts, targetLang) {
  const results = [];
  for (let i = 0; i < texts.length; i++) {
    const translated = await myMemoryTranslate(texts[i], targetLang);
    results.push(translated);
    // Stay within ~3 req/s to avoid rate limiting
    if (i < texts.length - 1) await sleep(350);
    if ((i + 1) % 10 === 0) {
      process.stdout.write(`   ${i + 1}/${texts.length} translated\r`);
    }
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
      value.forEach((item, i) => {
        if (typeof item === "string") {
          result[`${fullKey}[${i}]`] = item;
        } else if (typeof item === "object" && item !== null) {
          Object.assign(result, flattenObject(item, `${fullKey}[${i}]`));
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    }
  }
  return result;
}

function getNestedValue(obj, pathStr) {
  // Parse path like "Home.hero.title" or "Home.benefits.quotes[0]"
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur === undefined || cur === null) return undefined;
    cur = cur[part];
  }
  return cur;
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
  const lastPart = parts[parts.length - 1];
  cur[lastPart] = value;
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

    // Find keys in EN that are missing or empty in locale
    const missing = Object.entries(enFlat).filter(([key, value]) => {
      return value && typeof value === "string" && !localeFlat[key];
    });

    if (missing.length === 0) {
      console.log(`✓  ${locale}.json is already up to date (${Object.keys(enFlat).length} keys)`);
      continue;
    }

    console.log(`\n🌍  Translating ${missing.length} missing keys to ${locale.toUpperCase()}...`);

    const targetLang = MYMEMORY_LANG_CODES[locale];
    const texts = missing.map(([, v]) => v);
    const translatedTexts = await myMemoryTranslateBatch(texts, targetLang);

    // Merge translations into existing locale data
    const merged = JSON.parse(JSON.stringify(localeData)); // deep clone
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

      // Skip if locale file already exists and is newer than EN file
      if (fs.existsSync(localeFilePath)) {
        const enMtime = fs.statSync(enFilePath).mtimeMs;
        const localeMtime = fs.statSync(localeFilePath).mtimeMs;
        if (localeMtime >= enMtime) {
          console.log(`  ✓  ${locale}/blog/${filename} is up to date`);
          continue;
        }
      }

      console.log(`  🌍  Translating blog/${filename} → ${locale}...`);
      const enContent = fs.readFileSync(enFilePath, "utf-8");
      const translatedContent = await translateMdxContent(enContent, MYMEMORY_LANG_CODES[locale]);
      fs.writeFileSync(localeFilePath, translatedContent, "utf-8");
      console.log(`  ✓  Wrote ${locale}/blog/${filename}`);
    }
  }
}

/**
 * Translates prose paragraphs in MDX content while preserving:
 * - Frontmatter (--- ... ---)
 * - JSX component tags and their attributes
 * - Code blocks (``` ... ```)
 * - Import/export statements
 * - MDX component props (strings inside JSX attributes ARE translated)
 */
async function translateMdxContent(content, targetLang) {
  const lines = content.split("\n");
  const result = [];

  let inFrontmatter = false;
  let frontmatterDone = false;
  let inCodeBlock = false;
  let frontmatterCount = 0;

  // Collect translatable segments: { lineIndex, text }
  const segments = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle frontmatter
    if (!frontmatterDone && line.trim() === "---") {
      frontmatterCount++;
      if (frontmatterCount === 1) { inFrontmatter = true; result.push(line); continue; }
      if (frontmatterCount === 2) { inFrontmatter = false; frontmatterDone = true; result.push(line); continue; }
    }
    if (inFrontmatter) { result.push(line); continue; }

    // Handle code blocks
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) { result.push(line); continue; }

    // Skip import/export lines
    if (/^(import|export)\s/.test(line.trim())) { result.push(line); continue; }

    // Skip pure JSX component lines (start with < or {)
    if (/^\s*[<{]/.test(line)) { result.push(line); continue; }

    // Skip empty lines and headings
    if (!line.trim() || /^#{1,6}\s/.test(line)) { result.push(line); continue; }

    // This is a prose paragraph — translate it
    segments.push({ index: i, text: line });
    result.push(null); // placeholder
  }

  if (segments.length === 0) return content;

  // Batch translate all prose
  const texts = segments.map((s) => s.text);
  const translated = await myMemoryTranslateBatch(texts, targetLang);

  segments.forEach((seg, i) => {
    result[seg.index] = translated[i];
  });

  return result.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌐  Pearstop auto-translation script\n");
  console.log(`   API: MyMemory (free, no key required)`);
  console.log(`   Target locales: ${TARGET_LOCALES.join(", ")}\n`);

  try {
    await translateMessages();
    await translateBlogPosts();
    console.log("\n✅  Translation complete.");
  } catch (err) {
    console.error("\n❌  Translation failed:", err.message);
    process.exit(1);
  }
}

main();
