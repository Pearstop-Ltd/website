import type { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { CasesIndexPage, type CasesIndexCopy } from "@/components/site/pages/CasesIndex";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Cases" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases`,
      languages: alternateLanguages("/cases")
    }
  };
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const copy = messages.Cases as unknown as CasesIndexCopy;
  return <CasesIndexPage copy={copy} />;
}
