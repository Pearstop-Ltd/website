import type { Metadata } from "next";
import Script from "next/script";
import { ProcurementPage, type ProcurementCopy } from "@/components/site/pages/Procurement";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.Procurement, common: enMessages.Common } as unknown as ProcurementCopy;

export const metadata: Metadata = {
  title: "Procurement Data Quality for Infrastructure, Construction, and FM",
  description:
    "Pearstop builds a real spend baseline across sites and entities: bundled contracts broken into service lines, framework agreements checked against live buying, and group-wide spend visible in one place.",
  alternates: {
    canonical: `${siteConfig.url}/procurement-data-quality`,
    languages: alternateLanguages("/procurement-data-quality")
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

export default function ProcurementRoute() {
  return (
    <>
      <Script id="procurement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ProcurementPage copy={copy} />
    </>
  );
}
