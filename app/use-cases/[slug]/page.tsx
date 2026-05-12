import type { Metadata } from "next";
import { LegacyArticlePage } from "@/components/legacy-page";
import { legacyUseCases, siteConfig } from "@/lib/site";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = legacyUseCases[slug];
  return {
    title: entry?.title ?? titleFromSlug(slug),
    description: entry?.summary ?? "Archived Pearstop use-case page.",
    alternates: {
      canonical: `${siteConfig.url}/use-cases/${slug}`
    }
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry =
    legacyUseCases[slug] ?? {
      slug,
      title: titleFromSlug(slug),
      category: "Legacy Use Case",
      summary: "Archived use-case page preserved for legacy URL continuity.",
      bullets: [
        "This page remains available so the old URL does not break.",
        "The updated site now groups current proof under the main cases page.",
        "The legacy URL still has SEO and referral value."
      ],
      ctaLabel: "Go to cases",
      ctaHref: "/cases"
    };

  return <LegacyArticlePage entry={entry} backHref="/use-cases" backLabel="Projects" />;
}

