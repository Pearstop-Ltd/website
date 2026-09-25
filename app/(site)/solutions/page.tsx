import type { Metadata } from "next";
import Script from "next/script";
import { SolutionsIndexPage, type SolutionsIndexCopy } from "@/components/site/pages/SolutionsIndex";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const PAGE_URL = `${siteConfig.url}/solutions`;
const copy = enMessages.Solutions as unknown as SolutionsIndexCopy;

export const metadata: Metadata = {
  title: "Spend Data Solutions for FM, Construction & Infrastructure",
  description:
    "Invoice extraction, UNSPSC classification, spend visibility, price benchmarking and data readiness for FM, construction, infrastructure and manufacturing.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/solutions") },
  openGraph: {
    title: "Spend Data Solutions for FM, Construction & Infrastructure | Pearstop",
    description:
      "Invoice extraction, UNSPSC classification, spend visibility, price benchmarking and data readiness for FM, construction, infrastructure and manufacturing.",
    url: PAGE_URL,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Spend Data Solutions for FM, Construction & Infrastructure | Pearstop",
    description:
      "Invoice extraction, UNSPSC classification, spend visibility, price benchmarking and data readiness for FM, construction, infrastructure and manufacturing."
  }
};

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
      url: `${siteConfig.url}${item.href}`,
      description: item.body
    }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Solutions", item: PAGE_URL }
  ]
};

export default function SolutionsRoute() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SolutionsIndexPage copy={copy} />
    </>
  );
}
