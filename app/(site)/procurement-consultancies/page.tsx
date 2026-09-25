import type { Metadata } from "next";
import Script from "next/script";
import { ProcurementConsultanciesPage, type ProcurementConsultanciesCopy } from "@/components/site/pages/ProcurementConsultancies";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.ProcurementConsultancies, common: enMessages.Common } as unknown as ProcurementConsultanciesCopy;

export const metadata: Metadata = {
  title: "Spend Classification for Procurement Consultancies",
  description:
    "Deliver spend cube, category management, and sourcing-savings engagements without burning analyst hours on manual classification. White-labelled, your taxonomy, predictable pricing.",
  alternates: {
    canonical: `${siteConfig.url}/procurement-consultancies`,
    languages: alternateLanguages("/procurement-consultancies")
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

export default function ProcurementConsultanciesRoute() {
  return (
    <>
      <Script id="procurementconsultancies-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ProcurementConsultanciesPage copy={copy} />
    </>
  );
}
