import type { MetadataRoute } from "next";
import { caseStudies, siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";
import { routing } from "@/i18n/routing";
import { migrationEntries, basePathFor } from "@/content/migrations";
import { COMPLIANCE_KEYS, complianceAlternates, complianceUrl } from "@/lib/compliance-pages";

// Derived from routing.locales (not a second hardcoded list) so the sitemap
// can't drift out of sync with the locales the site actually serves.
const LOCALES = routing.locales.map((locale) =>
  locale === routing.defaultLocale ? "" : `/${locale}`
);

export default function sitemap(): MetadataRoute.Sitemap {
  // Every real page's path is listed explicitly here, independent of any nav
  // array (lib/site.ts's solutionLinks/footerSolutionLinks are curated for
  // menus and change independently of which pages actually exist - deriving
  // the sitemap from a nav array previously caused /fabric and /ai-readiness
  // to silently disappear from the sitemap when they were demoted from the
  // main Solutions nav, even though the pages themselves were untouched).
  const staticPaths = [
    "",
    "/solutions",
    "/invoice-data-extraction",
    "/procurement-data-quality",
    "/data-quality",
    "/unspsc",
    "/unspsc-ai-classification-guide",
    "/asset-data-management",
    "/fabric",
    "/ai-readiness",
    "/faq",
    "/unspsc-code-lookup",
    "/unspsc-classification-facilities-management",
    "/unspsc-classification-netherlands",
    "/unspsc-classification-germany",
    "/about-us",
    "/industries",
    "/blog",
    "/cases",
    "/case-studies",
    "/contact",
    "/privacy",
    "/terms-and-conditions",
    "/terms",
    "/book-a-demo",
    "/procurement-consultancies",
    "/spend-cube",
    "/migrations",
  ];

  const dynamicPaths = [
    ...caseStudies.map((item) => `/cases/${item.slug}`),
    "/cases/fmo",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...migrationEntries
      .filter((entry) => entry.status === "published")
      .map((entry) => `${basePathFor(entry)}/${entry.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${siteConfig.url}${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : locale === "" ? 0.8 : 0.6,
      });
    }
  }

  // Compliance landing pages have a different slug per locale, so they are
  // listed per page with hreflang alternates rather than from one shared path.
  for (const key of COMPLIANCE_KEYS) {
    for (const locale of routing.locales) {
      entries.push({
        url: complianceUrl(key, locale),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: locale === routing.defaultLocale ? 0.8 : 0.6,
        alternates: { languages: complianceAlternates(key) },
      });
    }
  }

  return entries;
}
