import type { Metadata } from "next";
import Script from "next/script";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SolutionsIndexPage, type SolutionsIndexCopy } from "@/components/site/pages/SolutionsIndex";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_PATH = "/solutions";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Solutions" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: `${siteConfig.url}${prefix}${PAGE_PATH}`, languages: alternateLanguages("/solutions") },
    openGraph: {
      title: `${t("meta.title")} | Pearstop`,
      description: t("meta.description"),
      url: `${siteConfig.url}${prefix}${PAGE_PATH}`,
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("meta.title")} | Pearstop`,
      description: t("meta.description")
    }
  };
}

export default async function SolutionsRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const copy = messages.Solutions as unknown as SolutionsIndexCopy;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: copy.problems.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.title,
        url: `${siteConfig.url}${prefix}${item.href}`,
        description: item.body
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.breadcrumb.home, item: `${siteConfig.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: copy.breadcrumb.current, item: `${siteConfig.url}${prefix}${PAGE_PATH}` }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SolutionsIndexPage copy={copy} prefix={prefix} />
    </>
  );
}
