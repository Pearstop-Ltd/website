import type { Metadata } from "next";
import { LegacyArticlePage } from "@/components/legacy-page";
import { legacyUseCases, siteConfig } from "@/lib/site";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = legacyUseCases[params.slug];
  return {
    title: entry?.title ?? titleFromSlug(params.slug),
    description: entry?.summary ?? "Archived Pearstop use-case page.",
    alternates: {
      canonical: `${siteConfig.url}/use-cases/${params.slug}`
    }
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const entry =
    legacyUseCases[params.slug] ?? {
      slug: params.slug,
      title: titleFromSlug(params.slug),
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

