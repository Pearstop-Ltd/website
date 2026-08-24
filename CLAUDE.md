# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js)
npm run build    # production build (runs prebuild translate script first)
npm run start    # run production build
npm run lint     # eslint .
npm run translate # node scripts/translate.js — requires GROQ_API_KEY
```

There is no test suite configured in this repo.

## Architecture

This is a Next.js (App Router) marketing site for Pearstop, a procurement/asset data quality company. Content is bilingual (English/Dutch).

### Two parallel route trees

The `app/` directory has **two route groups that mirror the same page structure**:

- `app/[locale]/**` — the real, live site. Locale-aware via `next-intl`, uses translated strings from `messages/{locale}.json` and the shared `[locale]/layout.tsx` (full `<html>`/metadata/JSON-LD/`NextIntlClientProvider` setup).
- `app/(site)/**` — an English-only static mirror of the same pages/paths, with its own `layout.tsx` that hardcodes `en` messages and does not vary by locale.

When adding or editing a page, check whether the equivalent file exists in both trees and keep them in sync (or confirm with the user which tree is canonical) — `git log` shows both are actively maintained in parallel rather than one being legacy.

### i18n routing

- `i18n/routing.ts` defines locales (`en`, `nl`), default locale `en`, and `localePrefix: "as-needed"` (English has no `/en` prefix, Dutch is served under `/nl`).
- `proxy.ts` is the Next.js middleware entry (`createMiddleware(routing)` from `next-intl`), matching all paths except `api`, `_next`, `_vercel`, and files with extensions.
- `i18n/request.ts` loads `messages/{locale}.json` and **deep-merges Dutch over English** so any key missing a Dutch translation silently falls back to the English string (`onError` swallows `MISSING_MESSAGE`).
- UI strings live in `messages/en.json` / `messages/nl.json`. Never hand-translate — `messages/nl.json` is machine-generated (see Auto-translation below).

### Blog content — two sources of truth

Blog metadata is split across two places that must stay consistent for a post to render/link correctly:

1. `content/blog/{en,nl}/<slug>.mdx` — the actual MDX content + frontmatter (`title`, `description`, `date`, `category`, `slug`, `author`).
2. `lib/blog-posts.ts` — a hand-maintained array (`_allBlogPosts`) with additional metadata used by the site (tags, `readingTime`, `tocItems`/`tocItemsNl` for the table of contents, `softCta` variant, optional `faqItems`, `image`, `hidden`). This is not derived from the MDX files — adding an MDX post also requires adding an entry here.

**Author is sourced from MDX frontmatter only** (`author: "<key>"`, e.g. `"stephanie"`), read via `getMdxFrontmatter`/`getMdxAuthor` in the `[slug]/page.tsx` files — `lib/blog-posts.ts` intentionally has no `author` field, to avoid the two sources drifting. The canonical author registry (display name, role, bio, LinkedIn, avatar) lives in `components/blog.tsx` as `AUTHORS`/`AuthorKey`/`isAuthorKey`, imported wherever an author needs to be resolved or validated. `BlogLayout` automatically renders the matching `AuthorBlock` under every article body — never hand-write an author bio card inside MDX content.

### Auto-translation pipeline

`scripts/translate.js` (invoked via `npm run prebuild` and in CI) reads `messages/en.json` as the source of truth and translates any keys missing from `messages/nl.json` using the Groq API (`GROQ_API_KEY`, despite some comments in the script referencing Gemini — it currently calls Groq's `llama-3.3-70b-versatile`). It also translates new/changed MDX files from `content/blog/en/` into `content/blog/nl/`, leaving frontmatter keys, headings, and JSX untouched.

`.github/workflows/auto-translate.yml` runs this script on pushes to `main` that touch `messages/en.json` or `content/blog/en/**`, and commits the resulting `messages/nl.json` / `content/blog/nl/**` changes back to `main` directly.

Implication: don't hand-edit `messages/nl.json` or `content/blog/nl/*.mdx` for content that has an English source — edits will be overwritten by the next translation run. Edit the English source instead.

### Shared config and content

- `lib/site.ts` — central config object (`siteConfig`) plus nav links, case studies, industry cards, and FAQ content used across both route trees.
- `lib/unspsc-demo-data.ts` — data backing the UNSPSC taxonomy demo pages.
- `app/api/unspsc-lookup/route.ts` — LLM-backed UNSPSC code classification endpoint (system prompt embedded in the route).
- `app/api/newsletter/route.ts` and `app/api/download/case-studies/route.ts` — form submission endpoints that forward to external webhooks (`NEWSLETTER_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_URL`) rather than a database.

### Redirects

Legacy `.html` URLs and old paths are permanently redirected in `next.config.mjs` (`redirects()`). Add new legacy-URL redirects there rather than in middleware.
