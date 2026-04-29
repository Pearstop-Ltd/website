import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyArticlePage } from "@/components/legacy-page";
import { legacyLearningCentre, siteConfig } from "@/lib/site";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = legacyLearningCentre[params.slug];
  const title = entry?.title ?? titleFromSlug(params.slug);

  return {
    title,
    description: entry?.summary ?? "Archived Pearstop learning centre article.",
    alternates: {
      canonical: `${siteConfig.url}/learning-centre/${params.slug}`
    }
  };
}

export default function LearningCentreArticlePage({ params }: { params: { slug: string } }) {
  const entry =
    legacyLearningCentre[params.slug] ?? {
      slug: params.slug,
      title: titleFromSlug(params.slug),
      category: "Legacy Learning Centre",
      summary: "Archived article preserved for legacy URL continuity.",
      bullets: [
        "This page remains available so the old URL does not break.",
        "The updated site now groups current insight content under the blog.",
        "The legacy URL still has SEO and referral value."
      ],
      ctaLabel: "Go to blog",
      ctaHref: "/blog"
    };

  if (!entry) {
    notFound();
  }

  return <LegacyArticlePage entry={entry} backHref="/learning-centre" backLabel="Learning Centre" />;
}

