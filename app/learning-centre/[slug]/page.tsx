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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = legacyLearningCentre[slug];
  const title = entry?.title ?? titleFromSlug(slug);

  return {
    title,
    description: entry?.summary ?? "Archived Pearstop learning centre article.",
    alternates: {
      canonical: `${siteConfig.url}/learning-centre/${slug}`
    }
  };
}

export default async function LearningCentreArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry =
    legacyLearningCentre[slug] ?? {
      slug,
      title: titleFromSlug(slug),
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

