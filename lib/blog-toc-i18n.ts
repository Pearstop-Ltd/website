import fr from "@/content/blog-toc/fr.json";
import de from "@/content/blog-toc/de.json";

type TocItem = { id: string; label: string };
type TocBySlug = Record<string, TocItem[]>;

// Machine-translated overrides for the English `tocItems` in lib/blog-posts.ts
// (which stays the single source of truth). `id` is never translated — it's
// an anchor target, matched verbatim against the English/nl `tocItems` ids.
// nl is not here: it already has a hand-maintained `tocItemsNl` field per
// post, written directly in lib/blog-posts.ts by whoever authors it.
// Kept by scripts/translate.js — never hand-edit these files.
const OVERRIDES: Record<string, TocBySlug> = { fr, de };

export function getLocalizedTocItems(slug: string, locale: string, fallback: TocItem[]): TocItem[] {
  const localized = OVERRIDES[locale]?.[slug];
  return localized && localized.length > 0 ? localized : fallback;
}
