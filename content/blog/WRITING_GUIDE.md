# Blog writing guide

How Pearstop blog posts are written, and how new posts should be written going forward. This is guidance for **new posts only** — the 57 posts already live are not being retrofitted to this structure (see the 2026-09-22 decision below).

## Current state (as of 2026-09-22)

An audit of every live post found the structural baseline is already good:

- Every post has exactly one H1 and clean H2/H3 nesting (no skipped heading levels).
- FAQ infrastructure exists and is used (`faqItems` in `lib/blog-posts.ts` → `FaqSchema`), with localized FAQ content pulled from `content/blog-faq/{nl,fr,de}.json`.
- A table of contents exists per post (`tocItems`).
- Posts are already written in a relatively plain, easy-to-follow style.

**Decision (2026-09-22):** rather than rewrite the existing catalog to a new structure, the going-forward structure below applies to new posts from this date on. If a specific old post needs a refresh later (new stat, updated numbers), that's a one-off editorial call, not a systematic rewrite.

## Why this matters: AEO, not just SEO

Search engine optimization was about ranking in a list of blue links. Answer-engine optimization (AEO) is about being the source an LLM pulls from to *answer* a question directly — Copilot, ChatGPT, Perplexity, Claude/Brave, Google AI Overviews. This is now the primary way Pearstop wants to show up when someone is searching for help with data cleaning, procurement questions, spend analysis, or procurement dashboards.

Source: a 2026-09-21 call between Stephanie Wiechers and Tj Kim (AEO consultant).

## Structure for new posts

1. **1-paragraph summary at the very top.** State what the whole post is about before any setup or story. An agent (or a skimming human) should get the answer from the first few sentences, not the conclusion.
2. **Bullets over prose wherever it fits.** Break up paragraphs into short, scannable blocks. Structural clarity reads better to both agents and humans than long paragraphs.
3. **Q&A framing where natural.** Headings phrased as the actual question a reader has, answered directly underneath — not just a bolted-on FAQ section at the end (though that helps too, see below).
4. **Tables and comparisons where relevant.** LLMs parse tables well. Use the existing `ComparisonCards` MDX component, or a plain table, for "X vs Y" or before/after content — the homepage's before/after table is a good model.
5. **FAQ block at the end.** Keep using `faqItems` + `FaqSchema` — already the house pattern, don't skip it for new posts.
6. **Strict heading hierarchy.** One H1 (the title), H2 for major sections, H3 for subsections, no skipped levels. This is already clean site-wide — keep it that way.
7. **Mark freshness when a post is genuinely updated.** Set `updatedAt` on the post's entry in `lib/blog-posts.ts` (added 2026-09-22) whenever a post gets a real content refresh — new stat, new section, corrected numbers. This feeds `dateModified` in the post's structured data. Pages that go 3+ months without any refresh tend to drop out of AI-search answers — this was cited as a first-hand data point from the AEO call (1,100+ of ~1,200 pages on one company's site had gone stale past that window).

## What different engines actually look at

- **Claude / Perplexity** lean on Brave's index — ranking well in Brave correlates strongly with showing up in these answers. Reinforces: clean schema, strict heading structure, tight copy.
- **ChatGPT** pulls via Bing, and increasingly via TikTok/Instagram UGC. Reddit citations dipped recently but are recovering.
- **Google AI Overviews** lean on general Google SEO plus YouTube presence — a lever the blog itself can't pull, but worth knowing about.
- **GA4 undercounts LLM referrals.** Most AI-influenced traffic arrives in analytics as "direct" (someone opens a browser tab after getting an answer in a chat). Don't read a low "AI referral" number in GA4 as "AI search isn't sending us traffic" — ask inbound leads how they found Pearstop instead.

## Doing this in the current codebase

- New MDX post → `content/blog/en/<slug>.mdx` + a matching entry in `lib/blog-posts.ts` (see `CLAUDE.md` for the full two-source-of-truth mechanics).
- FAQ content → `faqItems` on the `lib/blog-posts.ts` entry (English source of truth; nl/fr/de are machine-translated by the pipeline, don't hand-edit).
- TOC → `tocItems` (English source of truth; `tocItemsNl` is hand-maintained for Dutch, fr/de are machine-translated).
- Comparison tables → the `ComparisonCards` MDX component (`components/blog.tsx`), or a plain Markdown table inside the MDX body.
- Freshness → `updatedAt` on the `lib/blog-posts.ts` entry.
