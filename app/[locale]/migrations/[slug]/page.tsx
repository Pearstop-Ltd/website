import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MigrationPage } from "@/components/site/templates/MigrationPage";
import { migrationEntries } from "@/content/migrations";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PATH_PREFIX = "/migrations";

function findEntry(slug: string) {
  return migrationEntries.find((entry) => entry.kind === "migration" && entry.slug === slug);
}

export function generateStaticParams() {
  return migrationEntries.filter((entry) => entry.kind === "migration").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: entry.title,
    description: entry.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}${prefix}${PATH_PREFIX}/${slug}`,
      languages: alternateLanguages(`${PATH_PREFIX}/${slug}`),
    },
    robots: entry.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

export default async function MigrationSlugPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const entry = findEntry(slug);
  if (!entry) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Migrations", item: `${siteConfig.url}${PATH_PREFIX}` },
      { "@type": "ListItem", position: 3, name: entry.h1, item: `${siteConfig.url}${PATH_PREFIX}/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MigrationPage entry={entry} />
    </>
  );
}

export const dynamicParams = false;
