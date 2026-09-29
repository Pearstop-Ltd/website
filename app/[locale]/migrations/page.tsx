import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MigrationsHub } from "@/components/site/pages/MigrationsHub";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: "ERP migration data cleaning | Pearstop",
    description: "Clean and classify your purchase and supplier data before your ERP migration, by system.",
    alternates: {
      canonical: `${siteConfig.url}${prefix}/migrations`,
      languages: alternateLanguages("/migrations"),
    },
  };
}

export default async function MigrationsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MigrationsHub />;
}
