import type { Metadata } from "next";
import Script from "next/script";
import { UnspscPage, type UnspscCopy } from "@/components/site/pages/Unspsc";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.Unspsc, common: enMessages.Common } as unknown as UnspscCopy;

export const metadata: Metadata = {
  title: "UNSPSC Classification and Manufacturer Part Verification",
  description:
    "Pearstop automates procurement classification, auto-coding up to 95% of spend to UNSPSC and resolving a supplier's own part code back to the real manufacturer code, without manual tracing.",
  keywords: [
    "UNSPSC classification",
    "procurement classification",
    "UNSPSC lookup",
    "United Nations Standard Products and Services Code",
    "automated procurement classification",
  ],
  alternates: {
    canonical: `${siteConfig.url}/unspsc`,
    languages: alternateLanguages("/unspsc")
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated UNSPSC Classification",
  description: "Pearstop auto-classifies up to 95% of procurement spend lines to UNSPSC standard without manual effort, and resolves a supplier's own part code back to the real manufacturer code. Built for hard services FM, infrastructure, construction, and manufacturing companies.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-dark.webp`
  },
  serviceType: "Procurement Data Classification",
  areaServed: "Europe"
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` }
  ]
};

export default function UnspscRoute() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <UnspscPage copy={copy} />
    </>
  );
}
