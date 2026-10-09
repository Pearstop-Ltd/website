import slugs from "./compliance-pages.json";
import { routing } from "@/i18n/routing";

/**
 * The "Compliance questions" landing pages. Every page lives at one
 * English-named route (`/<en slug>`), and the nl/fr/de URLs are localised
 * slugs that next.config.mjs rewrites to that route (and redirects back
 * from the English-named path). This file is the single source for those
 * slugs: config, sitemap, hreflang and the language switcher all read it.
 */
export type ComplianceKey = keyof typeof slugs;
type Locale = (typeof routing.locales)[number];

const SITE_URL = "https://www.pearstop.com";

export const COMPLIANCE_KEYS = Object.keys(slugs) as ComplianceKey[];

const prefixFor = (locale: string) => (locale === routing.defaultLocale ? "" : `/${locale}`);

export function complianceSlug(key: ComplianceKey, locale: string): string {
  return (slugs[key] as Record<string, string>)[locale] ?? slugs[key].en;
}

/** Site-relative path including the locale prefix, e.g. `/nl/zzp-inkoop`. */
export function compliancePath(key: ComplianceKey, locale: string): string {
  return `${prefixFor(locale)}/${complianceSlug(key, locale)}`;
}

export function complianceUrl(key: ComplianceKey, locale: string): string {
  return `${SITE_URL}${compliancePath(key, locale)}`;
}

/** hreflang map for `alternates.languages`: all four locales plus x-default (EN). */
export function complianceAlternates(key: ComplianceKey): Record<string, string> {
  const entries = routing.locales.map((locale: Locale) => [locale, complianceUrl(key, locale)]);
  return { ...Object.fromEntries(entries), "x-default": complianceUrl(key, routing.defaultLocale) };
}

/** Finds the page a pathname belongs to (any locale prefix, any locale's slug). */
export function complianceKeyForPath(pathname: string): ComplianceKey | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (routing.locales as readonly string[]).includes(parts[0])) parts.shift();
  if (parts.length !== 1) return null;
  const slug = parts[0];
  return COMPLIANCE_KEYS.find((key) => Object.values(slugs[key]).includes(slug)) ?? null;
}

/** Path to use when the visitor switches language on a compliance page, else null. */
export function complianceSwitchPath(pathname: string, nextLocale: string): string | null {
  const key = complianceKeyForPath(pathname);
  return key ? compliancePath(key, nextLocale) : null;
}

/** Turns a nav href written with the English slug into the locale's own path. */
export function complianceHrefForEnglishPath(href: string, locale: string): string | null {
  const key = COMPLIANCE_KEYS.find((k) => href === `/${slugs[k].en}`);
  return key ? compliancePath(key, locale) : null;
}
