import type { MetadataRoute } from "next";
import { caseStudies, solutionLinks, siteConfig } from "@/lib/site";

const LOCALES = ["", "/nl", "/fr", "/de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/solutions",
    ...solutionLinks.map((link) => link.href),
    "/faq",
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
