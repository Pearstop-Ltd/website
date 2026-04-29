import type { MetadataRoute } from "next";
import { caseStudies, legacyLearningCentre, legacyUseCases, legacyWork, solutionLinks, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/solutions",
    ...solutionLinks.map((link) => link.href),
    "/about-us",
    "/industries",
    "/blog",
    "/cases",
    "/contact",
    "/privacy",
    "/terms",
    "/whitepaper",
    "/learning-centre",
    "/use-cases",
    "/work"
  ];

  const dynamicPaths = [
    ...caseStudies.map((item) => `/cases/${item.slug}`),
    ...Object.keys(legacyLearningCentre).map((slug) => `/learning-centre/${slug}`),
    ...Object.keys(legacyUseCases).map((slug) => `/use-cases/${slug}`),
    ...Object.keys(legacyWork).map((slug) => `/work/${slug}`)
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7
  }));
}

