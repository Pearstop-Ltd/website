# Homepage — working notes

## Product screenshot section (removed 2026-09-17)

The "Product screenshot" section (a placeholder image with the caption
"Classified line-level spend data, with the human review step visible")
was removed from the homepage for now, per Stephanie's request, to be
revisited later.

To bring it back: add a real screenshot of the Pearstop dashboard showing
classified line-level data with the human-review step visible (per the
original structure doc — use staging, not Spend Trends, until the
benchmark logic is fixed), then re-add a section between "How it works"
and "Who it's for" in both `app/(site)/page.tsx` and `app/[locale]/page.tsx`
(and remove `Home.screenshot.*` from `messages/en.json` if it's still
there, or reuse it).
