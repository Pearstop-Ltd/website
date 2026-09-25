import type { Metadata } from "next";
import Script from "next/script";
import { SpendCubePage, type SpendCubeCopy } from "@/components/site/pages/SpendCube";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.SpendCube, common: enMessages.Common } as unknown as SpendCubeCopy;

export const metadata: Metadata = {
  title: "AI-Built Spend Cubes & Procurement Dashboards",
  description:
    "A spend cube classified and structured by category, supplier, and time, ready to feed Power BI, Microsoft Fabric, or your own dashboard, built in days instead of a manual quarter-long project.",
  alternates: {
    canonical: `${siteConfig.url}/spend-cube`,
    languages: alternateLanguages("/spend-cube")
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

export default function SpendCubeRoute() {
  return (
    <>
      <Script id="spendcube-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SpendCubePage copy={copy} />
    </>
  );
}
