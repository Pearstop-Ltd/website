# Pearstop site design system

Source of truth for every marketing page. Reference designs live in `design/refs/*.dc.html` (exported from the Claude design canvas). When a ref exists for a page, match it exactly: same sections, same order, same copy. Do not add, remove or reorder sections. Do not rewrite copy.

## Brand mapping

Every colour below is a Pearstop brand colour — this file does not introduce any colour outside the brand guide. `--navy` (`#2A3990`) and `--navy-deep` (`#1F2A68`) are both brand navies at different depths, not a "new" navy replacing an "old" one: `--navy` is the brand's dark navy, used for headings, table headers and stat bands; `--navy-deep` is the deepest navy, used for closing sections and dark backgrounds. The live site's `app/globals.css` already has a `--navy: #1f2a68` — that is this file's `--navy-deep`, not this file's `--navy`. Don't rename or edit the live token: see "Migration" at the end of this file for when and how the two get reconciled.

## Tokens

```css
--navy: #2A3990;        /* headings, table headers, stat bands, quote cards */
--navy-deep: #1F2A68;   /* closing section, strong text on tints */
--blue: #353FFF;        /* eyebrows, links, primary button, numbered dots. Never large headings */
--purple: #A383FF;      /* secondary accent, "pattern" markers, review states */
--purple-text: #7A5CD6; /* purple used as text on white (contrast) */
--green: #8BC34A;       /* results, "keep", confirmed. Fill or border only */
--green-text: #4E7D22;  /* green used as text */
--light-blue: #7A8BE6;
--bg-soft: #F8F9FA;     /* alternating section background, card fill */
--tint-blue: #DCE1F8;
--tint-purple: #E8E0FC;
--tint-green: #F1F8E9;
--border: #ECEEF3;
--text: #333333;
--muted: #666666;
```

Font: Inter only. Weights 300 (body), 400, 500, 600 (headings). No other fonts.

## Type scale (desktop / mobile)

| Role | Size | Weight | Line height | Colour |
|---|---|---|---|---|
| H1 | 54 / 36 | 600, tracking -0.025em | 1.08 | navy |
| H2 | 36-38 / 28 | 600, tracking -0.02em | 1.15 | navy |
| H3 (card title) | 19-21 / 18 | 600 | 1.3 | navy |
| Lead | 20 / 18 | 300 | 1.6 | text |
| Body | 17 / 16 | 300 | 1.7 | text |
| Card body | 15 | 300 | 1.6 | text |
| Eyebrow | 13 | 600, uppercase, tracking 0.1em | | blue |
| Caption | 13-14 | 400 | | muted |
| Stat number | 36-40 | 600 | | white on navy, or navy-deep |

Never use a heading tag for a paragraph. If text is longer than one line of a heading, it is body copy.

## Layout

- Page width 1440, content inset 160px each side (max content 1120). Mobile: 20px inset.
- Section vertical padding 96-104px. Sections alternate white and `--bg-soft`.
- Radius: cards 16-20px, large panels 24px, buttons 10-12px, chips 999px.
- Gaps: 20-24px between cards, 40-48px between a section header and its content.
- Cards: white on `--bg-soft` sections, or `--bg-soft` / `1px --border` on white sections. No shadows except the subtle one on visual mockups.
- Every page H1 (in a template hero) gets a `HeadlineAccent` directly under it: a 72x4px, 2px-radius dash, blue on light backgrounds and tint-blue on dark backgrounds, aria-hidden.

## Components (build once in `components/site/`, reuse everywhere)

- `SectionHeader` — eyebrow, H2, optional lead. Max width 760.
- `StatBand` — navy rounded panel, 3-4 equal columns, big white number + tint-blue caption, thin dividers.
- `Card` — title + body; variants: plain, tinted (blue / purple / green tint backgrounds, navy-deep text).
- `NumberedStep` — navy circle with number, H3, body.
- `SourceDiagram` — input boxes → right-brace SVG → arrow → blue "pearstop." box with pear icon → arrow → tinted output boxes. Never four separate arrows into the box.
- `QuoteCard` — navy panel, purple quote mark, 24-26px white quote, name + role. Inline variant: bordered row with avatar. Named quotes pass a `personId`, resolved against `lib/people.ts` (name, role, company, optional headshot) so the same person shows the same attribution and photo everywhere; anonymous quotes pass `role` only and never show a name or a photo.
- `DataTable` — navy header row (12px uppercase white), rows with 1px border, status chips (green tint = done, purple tint = to review).
- `ClosingCTA` — navy-deep full-width block, 44px white H2, tint-blue body, white button + purple text link, footer line.
- `CaseCard` — mini visual panel + eyebrow + title + 2 stats + link. Client cases eyebrow blue, patterns eyebrow purple-text. `CaseCard` and the `CasePage` hero both take an optional client `logo` from `/images/clients/`; anonymised pattern cases never get one.

## Rules

- Icons: inline stroke SVG (1.6px). No emoji, no ✓ × ⚡ ↗ characters as icons.
- One primary CTA on every page: "Send us 200 lines" (header) and a sample-shaped closing CTA. Discovery calls are "Book a 15-minute discovery", never "7-minute".
- Copy: no em dashes, no "it's not X, it's Y" constructions, never the word "quick".
- Illustrative data is always labelled as illustrative.

## Their world

Buyers build, run and maintain buildings, sites and networks. Copy uses their nouns: sites, buildings, places, workplaces, occupants, contracts, service lines, planned maintenance, statutory checks, tenders, on site.

Avoid generic corporate nouns in page copy: organisation(s), operational data, data estate, stakeholders, digital transformation, leverage, solution (as a generic noun).

"World lines" (lines that describe the reader's work) are concrete and plain, at most one per page section, and always tie back to the data in the same or next sentence. No slogans or rhyming pairs.

Compliance and safety are mentioned only where Pearstop has a concrete mechanism (asset lists, supplier matching, part numbers, contract terms).

## Migration

The tokens above currently live scoped to `components/site/` only (see `components/site/tokens.module.css`), so they have zero effect on any live page. Once every case-study and solution page has been migrated to the `CasePage`/`SolutionPage` templates, move the token values into `app/globals.css`'s `:root`, remapping every existing use of `--navy` (`#1f2a68`) to `--navy-deep` and introducing the brand's `--navy` (`#2A3990`) as a new token, so live pages do not visually shift when the merge happens. Do not do this until the migration is complete — merging early would silently change colours on pages nobody has re-approved against the new design.
