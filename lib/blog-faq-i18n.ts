import nl from "@/content/blog-faq/nl.json";
import fr from "@/content/blog-faq/fr.json";
import de from "@/content/blog-faq/de.json";

type FaqItem = { q: string; a: string };
type FaqBySlug = Record<string, FaqItem[]>;

// Machine-translated overrides for the English `faqItems` in lib/blog-posts.ts
// (which stays the single source of truth for question/answer text). Kept by
// scripts/translate.js the same way it keeps messages/{locale}.json — never
// hand-edit these files, edit lib/blog-posts.ts and let the pipeline re-run.
const OVERRIDES: Record<string, FaqBySlug> = { nl, fr, de };

export const FAQ_HEADINGS: Record<string, string> = {
  en: "Frequently asked questions",
  nl: "Veelgestelde vragen",
  fr: "Questions fréquentes",
  de: "Häufig gestellte Fragen",
};

export function getLocalizedFaqItems(slug: string, locale: string, fallback?: FaqItem[]): FaqItem[] | undefined {
  const localized = OVERRIDES[locale]?.[slug];
  return localized && localized.length > 0 ? localized : fallback;
}
