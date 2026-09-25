import type { Metadata } from "next";
import Script from "next/script";
import { AiReadinessPage, type AiReadinessCopy } from "@/components/site/pages/AiReadiness";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.AiReadiness, common: enMessages.Common } as unknown as AiReadinessCopy;

export const metadata: Metadata = {
  title: "AI Readiness for Hard Services and Infrastructure",
  description:
    "AI tools only work when the data behind them is clean. Pearstop prepares procurement data, asset registers, and operational records for AI and Copilot so initiatives deliver results rather than confusion.",
  alternates: {
    canonical: `${siteConfig.url}/ai-readiness`,
    languages: alternateLanguages("/ai-readiness")
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

export default function AiReadinessRoute() {
  return (
    <>
      <Script id="aireadiness-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AiReadinessPage copy={copy} />
    </>
  );
}
