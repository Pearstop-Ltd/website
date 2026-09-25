import type { Metadata } from "next";
import Script from "next/script";
import { FabricPage, type FabricCopy } from "@/components/site/pages/Fabric";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.Fabric, common: enMessages.Common } as unknown as FabricCopy;

export const metadata: Metadata = {
  title: "Microsoft Fabric Data Readiness for Asset-Intensive Industries",
  description:
    "Migrating to Microsoft Fabric? Pearstop cleans and structures your operational data before migration so your reports work from day one and the project stays on track.",
  alternates: {
    canonical: `${siteConfig.url}/fabric`,
    languages: alternateLanguages("/fabric")
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

export default function FabricRoute() {
  return (
    <>
      <Script id="fabric-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FabricPage copy={copy} />
    </>
  );
}
