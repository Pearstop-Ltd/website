import type { Metadata } from "next";
import Script from "next/script";
import { IndustriesPage, type IndustriesCopy } from "@/components/site/pages/Industries";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const PAGE_URL = `${siteConfig.url}/industries`;
const copy = enMessages.Industries as unknown as IndustriesCopy;

export const metadata: Metadata = {
  title: enMessages.Industries.meta.title,
  description: enMessages.Industries.meta.description,
  alternates: {
    canonical: PAGE_URL,
    languages: alternateLanguages("/industries")
  }
};

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

export default function IndustriesRoute() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <IndustriesPage copy={copy} />
    </>
  );
}
