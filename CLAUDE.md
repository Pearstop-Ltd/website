# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js)
npm run build    # production build (runs prebuild translate script first)
npm run start    # run production build
npm run lint     # eslint .
npm run translate # node scripts/translate.js — requires GEMINI_API_KEY
```

There is no test suite configured in this repo.

## Architecture

This is a Next.js (App Router) marketing site for Pearstop, a procurement/asset data quality company. Content is served in four locales: English, Dutch, French, and German.

### Two parallel route trees

The `app/` directory has **two route groups that mirror the same page structure**:

- `app/[locale]/**` — the real, live site. Locale-aware via `next-intl`, uses translated strings from `messages/{locale}.json` and the shared `[locale]/layout.tsx` (full `<html>`/metadata/JSON-LD/`NextIntlClientProvider` setup).
- `app/(site)/**` — an English-only static mirror of the same pages/paths, with its own `layout.tsx` that hardcodes `en` messages and does not vary by locale.

When adding or editing a page, check whether the equivalent file exists in both trees and keep them in sync (or confirm with the user which tree is canonical) — `git log` shows both are actively maintained in parallel rather than one being legacy.

### i18n routing

- `i18n/routing.ts` defines locales (`en`, `nl`, `fr`, `de`), default locale `en`, and `localePrefix: "as-needed"` (English has no locale prefix; Dutch, French, and German are served under `/nl`, `/fr`, `/de`).
- `proxy.ts` is the Next.js middleware entry (`createMiddleware(routing)` from `next-intl`), matching all paths except `api`, `_next`, `_vercel`, and files with extensions.
- `i18n/request.ts` loads `messages/{locale}.json` and **deep-merges each non-English locale over English** so any key missing a translation silently falls back to the English string (`onError` swallows `MISSING_MESSAGE`).
- UI strings live in `messages/en.json` / `messages/nl.json` / `messages/fr.json` / `messages/de.json`. Never hand-translate the non-English files — they're machine-generated (see Auto-translation below).

### Blog content — two sources of truth

Blog metadata is split across two places that must stay consistent for a post to render/link correctly:

1. `content/blog/{en,nl,fr,de}/<slug>.mdx` — the actual MDX content + frontmatter (`title`, `description`, `date`, `category`, `slug`, `author`).
2. `lib/blog-posts.ts` — a hand-maintained array (`_allBlogPosts`) with additional metadata used by the site (tags, `readingTime`, `tocItems`/`tocItemsNl` for the table of contents, `softCta` variant, optional `faqItems`, `image`, `hidden`). This is not derived from the MDX files — adding an MDX post also requires adding an entry here. Both `faqItems` and `tocItems` are English-only fields and stay the single source of truth for that content — don't hand-edit their translations:
   - `faqItems` — localized versions live in `content/blog-faq/{nl,fr,de}.json` (machine-generated, see Auto-translation below), read via `lib/blog-faq-i18n.ts`.
   - `tocItems` labels — nl has a hand-maintained override (`tocItemsNl`, written by whoever authors the post, id values copied verbatim from `tocItems`); fr/de labels are machine-generated into `content/blog-toc/{fr,de}.json`, read via `lib/blog-toc-i18n.ts`. `id` values are anchor targets (`href="#id"` in `components/blog-toc.tsx`) and are never translated in any locale — only `label` is.

**Author is sourced from MDX frontmatter only** (`author: "<key>"`, e.g. `"stephanie"`), read via `getMdxFrontmatter`/`getMdxAuthor` in the `[slug]/page.tsx` files — `lib/blog-posts.ts` intentionally has no `author` field, to avoid the two sources drifting. The canonical author registry (display name, role, bio, LinkedIn, avatar) lives in `components/blog.tsx` as `AUTHORS`/`AuthorKey`/`isAuthorKey`, imported wherever an author needs to be resolved or validated. `BlogLayout` automatically renders the matching `AuthorBlock` under every article body — never hand-write an author bio card inside MDX content.

### Auto-translation pipeline

`scripts/translate.js` (invoked via `npm run prebuild` and in CI) reads `messages/en.json` as the source of truth and translates any keys missing from `messages/{nl,fr,de}.json` using the Gemini API (`GEMINI_API_KEY`, Gemini 2.5 Flash). It also translates new/changed MDX files from `content/blog/en/` into `content/blog/{nl,fr,de}/`, leaving frontmatter keys, headings, and JSX untouched; translates blog post `faqItems` (read from `lib/blog-posts.ts`, read-only) into `content/blog-faq/{nl,fr,de}.json`; and translates `tocItems` labels (same read-only source) into `content/blog-toc/{fr,de}.json` — nl is skipped there since it's hand-maintained via `tocItemsNl`.

`.github/workflows/auto-translate.yml` runs this script on pushes to `main` that touch `messages/en.json`, `content/blog/en/**`, or `lib/blog-posts.ts`, and commits the resulting `messages/{nl,fr,de}.json` / `content/blog/{nl,fr,de}/**` / `content/blog-faq/{nl,fr,de}.json` / `content/blog-toc/{fr,de}.json` changes back to `main` directly.

Implication: don't hand-edit `messages/{nl,fr,de}.json`, `content/blog/{nl,fr,de}/*.mdx`, `content/blog-faq/{nl,fr,de}.json`, or `content/blog-toc/{fr,de}.json` for content that has an English source — edits will be overwritten by the next translation run. Edit the English source (or `tocItemsNl` by hand, for Dutch TOC labels) instead.

### Shared config and content

- `lib/site.ts` — central config object (`siteConfig`) plus nav links, case studies, industry cards, and FAQ content used across both route trees.
- `lib/unspsc-demo-data.ts` — data backing the UNSPSC taxonomy demo pages.
- `app/api/unspsc-lookup/route.ts` — LLM-backed UNSPSC code classification endpoint (system prompt embedded in the route).
- `app/api/newsletter/route.ts` and `app/api/download/case-studies/route.ts` — form submission endpoints that forward to external webhooks (`NEWSLETTER_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_URL`) rather than a database.

### Site migration rules

Migrating a page means re-skinning its existing content into the `components/site/` templates (see `DESIGN.md`). Keep the route, meta title, meta description, JSON-LD, H1 wording and body copy unless the prompt supplies new copy.

- Never write or rewrite marketing copy. New copy comes from the prompt or a design ref.
- Tables are real HTML table elements with `thead` and `th`, never div grids.
- Work only in the files the prompt names. Do not explore the rest of the repo.
- Do not run screenshot or browser loops to check visuals. Run lint and build, then stop. The user reviews visually.
- Each migrated page's markup and copy-shaped sections live once, in a shared component under `components/site/pages/` (e.g. `InvoiceDataExtraction.tsx`), taking a single `copy` prop typed to match the page's `messages/en.json` namespace. Both `app/[locale]/<page>/page.tsx` and `app/(site)/<page>/page.tsx` become thin wrappers: each keeps its own metadata, canonical, hreflang and JSON-LD exactly as before, and just supplies `copy` — the `[locale]` route via `getMessages()`/`getTranslations()`, the `(site)` route via a direct `messages/en.json` import — then renders the shared component. If the page's `SolutionPage`/`CasePage` sections include a `faq` section, pass `emitFaqSchema={false}` and keep emitting the route's own pre-existing `FAQPage` JSON-LD script, to avoid double-emitting schema.
- A brand mark on a dark/blue background is always the real `/brand/logo-light.webp` white wordmark (via the shared `PearstopLogo` internal component), never a redrawn pear icon or plain text.
- CTA routing convention: a "send us / send your ..." sample-shaped CTA opens `SampleRequestModal` (pass it into `primaryAction`/`secondaryAction` on `SolutionPageHero`/`ClosingCTAProps` — these render-prop slots exist so a CTA can be a modal trigger instead of a link, styled with the button's own className). A "talk to sales" CTA links to `siteConfig.calendly`. A "request a demo" CTA links to `/book-a-demo`, not directly to `siteConfig.demoCalendly`.

### Redirects

Legacy `.html` URLs and old paths are permanently redirected in `next.config.mjs` (`redirects()`). Add new legacy-URL redirects there rather than in middleware.
