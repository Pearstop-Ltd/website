import type { Metadata } from "next";
import Script from "next/script";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { InvoiceDataExtractionPage, type InvoiceDataExtractionCopy } from "@/components/site/pages/InvoiceDataExtraction";
import { alternateLanguages, siteConfig } from "@/lib/site";
import { getRequestCurrency } from "@/lib/currency";

const PAGE_PATH = "/invoice-data-extraction";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "InvoiceExtraction" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: `${siteConfig.url}${prefix}${PAGE_PATH}`, languages: alternateLanguages("/invoice-data-extraction") },
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Invoice and Document Data Extraction",
  description: "Automated OCR and AI extraction that turns PDF invoices, scans, and paper delivery notes into structured, classifiable spend data.",
  provider: { "@type": "Organization", name: "Pearstop", url: siteConfig.url },
  serviceType: "Data Extraction",
  areaServed: "Europe"
};

export default async function InvoiceDataExtractionRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const messages = await getMessages({ locale });
  const copy = { ...messages.InvoiceExtraction, common: messages.Common } as unknown as InvoiceDataExtractionCopy;
  const breadcrumbCopy = messages.InvoiceExtraction.breadcrumb as { home: string; current: string };
  const solutionsLabel = (messages.Header as { solutions?: string } | undefined)?.solutions ?? "Solutions";
  const currency = await getRequestCurrency();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: breadcrumbCopy.home, item: `${siteConfig.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: solutionsLabel, item: `${siteConfig.url}${prefix}/solutions` },
      { "@type": "ListItem", position: 3, name: breadcrumbCopy.current, item: `${siteConfig.url}${prefix}${PAGE_PATH}` }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <InvoiceDataExtractionPage copy={copy} currency={currency} />
    </>
  );
}
