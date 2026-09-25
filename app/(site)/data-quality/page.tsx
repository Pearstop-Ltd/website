import type { Metadata } from "next";
import Script from "next/script";
import { DataQualityPage, type DataQualityCopy } from "@/components/site/pages/DataQuality";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.DataQuality, common: enMessages.Common } as unknown as DataQualityCopy;

export const metadata: Metadata = {
  title: "Data Quality: The Precondition for ERP, Fabric, and AI Projects",
  description:
    "Pearstop cleans and structures operational data so an ERP migration, a Microsoft Fabric rollout, or an AI initiative delivers what it promised instead of moving the same mess into a new system.",
  alternates: {
    canonical: `${siteConfig.url}/data-quality`,
    languages: alternateLanguages("/data-quality")
  }
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

export default function DataQualityRoute() {
  return (
    <>
      <Script id="dataquality-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DataQualityPage copy={copy} />
    </>
  );
}
