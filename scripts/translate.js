#!/usr/bin/env node
/**
 * Auto-translation script for Pearstop website.
 *
 * Usage:
 *   GEMINI_API_KEY=your-key node scripts/translate.js
 *
 * Uses Google Gemini 1.5 Flash (free tier: 1,500 req/day, 1M tokens/day).
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
const TARGET_LOCALES = ["nl"];

const LOCALE_NAMES = { nl: "Dutch", fr: "French", de: "German" };
// Free-tier TPM for openai/gpt-oss-120b is 8000, and max_tokens counts
// against that budget as a reservation — keep batches and the reservation
// small enough that prompt + max_tokens stays comfortably under the limit.
const BATCH_SIZE = 12;

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error("❌  GROQ_API_KEY environment variable is required.");
  console.error("   Get a free key at https://aistudio.google.com/apikey");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Groq API
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function groqRequestOnce(prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_API_KEY },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 3000,
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json.error?.message || res.status;
    throw Object.assign(new Error('Groq API error: ' + msg), { retryable: res.status === 429 });
  }
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty Groq response');
  return text.trim();
}

async function geminiRequest(prompt, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await groqRequestOnce(prompt);
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
    if (i + BATCH_SIZE < texts.length) await sleep(6000);
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
      await sleep(20000); // pause between files — 20s keeps well under 20 req/min free tier
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
    if (/^\s*[<{]/.test(line)) continue;
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
    console.log("\n✅  Translation complete.");
  } catch (err) {
    console.error("\n❌  Translation failed:", err.message);
    process.exit(1);
  }
}

main();
