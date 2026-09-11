import type { MetadataRoute } from "next";
import { caseStudies, solutionLinks, siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

// Derived from routing.locales (not a second hardcoded list) so the sitemap
// can't drift out of sync with the locales the site actually serves.
const LOCALES = routing.locales.map((locale) =>
  locale === routing.defaultLocale ? "" : `/${locale}`
);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/solutions",
    ...solutionLinks.map((link) => link.href),
    "/faq",
    "/unspsc",
    "/unspsc-code-lookup",
    "/unspsc-classification-demo",
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
  ];

  const dynamicPaths = [
    ...caseStudies.map((item) => `/cases/${item.slug}`),
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

  return entries;
}
