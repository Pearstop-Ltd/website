import type { MetadataRoute } from "next";
import { caseStudies, solutionLinks, siteConfig } from "@/lib/site";

const LOCALES = ["", "/nl", "/fr", "/de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/solutions",
    ...solutionLinks.map((link) => link.href),
    "/about-us",
    "/industries",
    "/blog",
    "/cases",
    "/case-studies",
    "/contact",
    "/privacy",
<<<<<<< HEAD
    "/terms-and-conditions",
    "/use-cases",
    "/work",
  ];

  const dynamicPaths = [
    ...caseStudies.map((item) => `/cases/${item.slug}`),
    ...Object.keys(legacyLearningCentre).map((slug) => `/learning-centre/${slug}`),
    ...Object.keys(legacyUseCases).map((slug) => `/use-cases/${slug}`),
    ...Object.keys(legacyWork).map((slug) => `/work/${slug}`),
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
