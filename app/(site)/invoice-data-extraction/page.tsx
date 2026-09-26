import type { Metadata } from "next";
import Script from "next/script";
import { InvoiceDataExtractionPage, type InvoiceDataExtractionCopy } from "@/components/site/pages/InvoiceDataExtraction";
import { alternateLanguages, siteConfig } from "@/lib/site";
import { getRequestCurrency } from "@/lib/currency";
import enMessages from "../../../messages/en.json";

const PAGE_URL = `${siteConfig.url}/invoice-data-extraction`;
const copy = { ...enMessages.InvoiceExtraction, common: enMessages.Common } as unknown as InvoiceDataExtractionCopy;

export const metadata: Metadata = {
  title: "Invoice and Document Data Extraction (OCR) for FM and Construction",
  description:
    "Turn unread PDF invoices, scanned delivery notes, and paper records into structured, usable data. Automated OCR and AI extraction for facilities management, construction, and manufacturing procurement teams.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/invoice-data-extraction") },
  openGraph: {
    title: "Invoice and Document Data Extraction (OCR) for FM and Construction | Pearstop",
    description:
      "Turn unread PDF invoices and paper records into structured, usable data. Automated OCR and AI extraction built for hard services, cleaning, and construction procurement.",
    url: PAGE_URL,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice and Document Data Extraction (OCR) for FM and Construction | Pearstop",
    description: "Turn unread PDF invoices and paper records into structured, usable data."
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Invoice and Document Data Extraction",
  description: "Automated OCR and AI extraction that turns PDF invoices, scans, and paper delivery notes into structured, classifiable spend data.",
  provider: { "@type": "Organization", name: "Pearstop", url: siteConfig.url },
  serviceType: "Data Extraction",
  areaServed: "Europe"
};

const FAQ_ITEMS = copy.faq.map((item) => ({ q: item.question, a: item.answer }));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
    { "@type": "ListItem", position: 3, name: "Invoice and Document Data Extraction", item: PAGE_URL }
  ]
};

export default async function InvoiceDataExtractionRoute() {
  const currency = await getRequestCurrency();
  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <InvoiceDataExtractionPage copy={copy} currency={currency} />
    </>
  );
}
