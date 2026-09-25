import type { Metadata } from "next";
import Script from "next/script";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { IndustriesPage, type IndustriesCopy } from "@/components/site/pages/Industries";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/industries`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Industries" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: PAGE_URL,
      languages: alternateLanguages("/industries")
    }
  };
}

export default async function IndustriesRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const copy = messages.Industries as unknown as IndustriesCopy;

  const allFaqItems = [...copy.faq.items, ...copy.sections.flatMap((section) => section.faq)];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Industries", item: PAGE_URL }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <IndustriesPage copy={copy} />
    </>
  );
}
