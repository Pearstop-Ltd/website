import type { Metadata } from "next";
import { LegacyArticlePage } from "@/components/legacy-page";
import { legacyWork, siteConfig } from "@/lib/site";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = legacyWork[slug];
  return {
    title: entry?.title ?? titleFromSlug(slug),
    description: entry?.summary ?? "Archived Pearstop work page.",
    alternates: {
      canonical: `${siteConfig.url}/work/${slug}`
    }
  };
}

export default async function WorkArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry =
    legacyWork[slug] ?? {
      slug,
      title: titleFromSlug(slug),
      category: "Legacy Work",
      summary: "Archived work page preserved for legacy URL continuity.",
      bullets: [
        "This page remains available so the old URL does not break.",
        "The updated site now routes current AI messaging through the main AI readiness page.",
        "The legacy URL still has SEO and referral value."
      ],
      ctaLabel: "Go to AI readiness",
      ctaHref: "/ai-readiness"
    };

  return <LegacyArticlePage entry={entry} backHref="/work" backLabel="Legacy Work" />;
}

