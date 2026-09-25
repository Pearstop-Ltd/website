import type { Metadata } from "next";
import Script from "next/script";
import { AssetManagementPage, type AssetManagementCopy } from "@/components/site/pages/AssetManagement";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = { ...enMessages.AssetManagement, common: enMessages.Common } as unknown as AssetManagementCopy;

export const metadata: Metadata = {
  title: "Asset Data Management for Asset Owners and FM Operators",
  description:
    "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them.",
  alternates: {
    canonical: `${siteConfig.url}/asset-data-management`,
    languages: alternateLanguages("/asset-data-management")
  },
  openGraph: {
    title: "Asset Data Management for Asset Owners and FM Operators | Pearstop",
    description:
      "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them.",
    url: `${siteConfig.url}/asset-data-management`,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Asset Data Management for Asset Owners and FM Operators | Pearstop",
    description:
      "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them."
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

export default function AssetDataManagementRoute() {
  return (
    <>
      <Script id="assetmanagement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AssetManagementPage copy={copy} />
    </>
  );
}
