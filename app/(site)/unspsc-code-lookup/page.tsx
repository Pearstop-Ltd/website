import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { alternateLanguages, siteConfig } from "@/lib/site";
import { UnspscLookupTool } from "@/components/unspsc-lookup-tool";
import { UnspscTree } from "@/components/unspsc-tree";

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free UNSPSC Code Lookup Tool",
  description: "Free AI-powered tool that finds the correct UNSPSC commodity code for any product or service description.",
  url: `${siteConfig.url}/unspsc-code-lookup`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: { "@type": "Organization", name: "Pearstop", url: siteConfig.url }
};

const FAQ_ITEMS = [
  { q: "What is a UNSPSC code?", a: "A UNSPSC (United Nations Standard Products and Services Code) is an 8-digit code that classifies any product or service into a global standard hierarchy. The first 2 digits are the Segment, digits 3–4 are the Family, digits 5–6 are the Class, and digits 7–8 are the Commodity." },
  { q: "How do I find the right UNSPSC code for a product?", a: "Paste a clear description of the product or service into the lookup tool above. The AI engine searches the UNSPSC taxonomy and returns the best matching 8-digit commodity code, along with the full hierarchy path and a confidence level." },
  { q: "How do I look up a procurement classification code?", a: "Write a plain description of what was bought, for example 'HVAC filter replacement' or 'subcontractor plumbing works', and paste it into a lookup tool built for the classification standard you use. Most organisations classify procurement spend against UNSPSC, so a UNSPSC code lookup like the one above returns the matching 8-digit commodity code in seconds. For a single line, that is enough to check a code by hand. For a full spend file, the same lookup logic needs to run automatically across every line, which is what Pearstop's classification engine does." },
  { q: "Is this UNSPSC lookup tool free?", a: "Yes. The tool is completely free for individual queries. For bulk classification — processing thousands of invoice lines — Pearstop offers an automated classification service." },
  { q: "How accurate is the UNSPSC code suggestion?", a: "The tool returns a confidence level with each result: high, medium, or low. High-confidence results are typically correct at commodity level. For bulk classification at production accuracy (90–95%), Pearstop's full service uses additional signals beyond the description text." },
  { q: "What is the difference between segments, families, classes, and commodities?", a: "Segment (2 digits) is the broadest — e.g. 72 is Construction and Maintenance. Family (4 digits) narrows it — 7210 is Building and Facility Maintenance. Class (6 digits) is more specific — 721015 is Electrical Systems Maintenance. Commodity (8 digits) is the most precise — 72101505 is Lighting Maintenance Services." },
  { q: "How is UNSPSC different from eCl@ss or CPV?", a: "UNSPSC, eCl@ss and CPV are all procurement classification standards, but they serve different purposes. UNSPSC is the most widely used for spend analysis and category management. eCl@ss adds detailed technical attributes per product, common in German manufacturing. CPV is used specifically for EU public procurement tenders. Most organisations only need one, chosen based on their ERP system and reporting requirements — Pearstop works with UNSPSC as the most common standard for spend analytics." },
  { q: "Can I classify an entire spend file or supplier catalog at once?", a: "The free tool above is built for one description at a time. For a full spend file, invoice history, or supplier catalog — hundreds to millions of lines — Pearstop's automated classification engine processes the whole dataset at once, reaching 90-95% automatic classification with the remainder flagged for human review. Book a 7-minute call to see it run on a sample of your own data." },
  { q: "Should I trust an AI-generated UNSPSC code without checking it?", a: "For a single, low-stakes lookup, a high-confidence AI result is usually reliable enough to use directly. For contract-critical, audit-relevant, or bulk classification, we recommend a verification layer — which is exactly why Pearstop's classification engine combines rules, machine learning and an LLM with a human review step for lower-confidence results, rather than trusting AI output blindly." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "Free UNSPSC Code Lookup", item: `${siteConfig.url}/unspsc-code-lookup` }
  ]
};

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "UNSPSC classification hierarchy",
  description: "The four levels of the United Nations Standard Products and Services Code (UNSPSC) taxonomy.",
  url: `${siteConfig.url}/unspsc-code-lookup`,
  hasDefinedTerm: [
    { "@type": "DefinedTerm", name: "Segment", description: "The broadest UNSPSC level, encoded in the first 2 digits of the code, for example 72 for Construction and Maintenance Services." },
    { "@type": "DefinedTerm", name: "Family", description: "The second UNSPSC level, encoded in digits 3–4, narrowing a segment down, for example 7210 for Building and Facility Maintenance." },
    { "@type": "DefinedTerm", name: "Class", description: "The third UNSPSC level, encoded in digits 5–6, for example 721015 for Electrical Systems Maintenance." },
    { "@type": "DefinedTerm", name: "Commodity", description: "The most specific UNSPSC level, the full 8-digit code, for example 72101505 for Lighting Maintenance Services." }
  ]
};

export const metadata: Metadata = {
  title: "Free UNSPSC Code Lookup Tool — Find the Right Code Instantly",
  description: "Paste any product or service description and get the correct 8-digit UNSPSC commodity code instantly. Free AI-powered tool from Pearstop.",
  keywords: [
    "UNSPSC lookup",
    "UNSPSC code lookup",
    "procurement code lookup",
    "UNSPSC taxonomy",
    "United Nations Standard Products and Services Code",
  ],
  alternates: { canonical: `${siteConfig.url}/unspsc-code-lookup`, languages: alternateLanguages("/unspsc-code-lookup") },
  openGraph: {
    title: "Free UNSPSC Code Lookup Tool",
    description: "Find the correct UNSPSC commodity code for any product or service description.",
    url: `${siteConfig.url}/unspsc-code-lookup`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  }
};

export default function UnspscLookupPage() {
  return (
    <>
      <Script id="tool-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="defined-term-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }} />

      <PageHero
        eyebrow="Free Tool"
        title="Find the right UNSPSC code — instantly."
        lead="Paste any product or service description and get the correct 8-digit UNSPSC commodity code, full hierarchy path, and confidence level."
      />

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <UnspscLookupTool
                placeholder="e.g. replace fire suppression system nozzles"
                buttonLabel="Find UNSPSC code"
                loadingLabel="Classifying…"
                resultLabels={{
                  code: "UNSPSC Code",
                  segment: "Segment",
                  family: "Family",
                  classLabel: "Class",
                  commodity: "Commodity",
                  confidence: "Confidence",
                  notes: "Notes",
                  high: "high",
                  medium: "medium",
                  low: "low",
                }}
              />

              <div className="quote-card" style={{ marginTop: "2.5rem" }}>
                <div className="story-label">Need bulk classification?</div>
                <p>This tool handles individual lookups. For bulk classification — processing thousands of invoice lines automatically — Pearstop's engine handles up to 35,000 lines per month at 90–95% accuracy.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <CalendlyButton label="Talk to sales" className="btn btn-primary" />
                  <Link href="/unspsc" className="btn btn-secondary">
                    Learn about bulk classification
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taxonomy tree demo */}
      <section style={{ padding: "3rem 0 1rem", background: "#f8fafc", borderTop: "1px solid #eef1f6" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: 4 }}>
                Explore the UNSPSC hierarchy
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
                Click through Segment → Family → Class → Commodity to understand where any code sits.
              </p>
            </div>
            <Link href="/unspsc-classification-demo" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.85rem", fontWeight: 600, color: "#2563eb",
              textDecoration: "none", whiteSpace: "nowrap",
              padding: "6px 14px", borderRadius: 8,
              border: "1px solid #dbeafe", background: "#eff6ff",
            }}>
              Open full demo →
            </Link>
          </div>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #eaeff5",
            padding: "22px 18px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
            marginBottom: "2rem",
          }}>
            <UnspscTree />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="How do you look up a UNSPSC or procurement classification code?"
                copy="To look up a UNSPSC code, write a plain description of the product or service, for example 'HVAC filter replacement' or 'subcontractor plumbing works', and paste it into a lookup tool. Pearstop's free tool matches that description against the full UNSPSC taxonomy and returns the 8-digit commodity code, its segment, family and class, and a confidence level, in seconds. For a single line, that is enough to check a code by hand. For a full spend file or invoice history, the same classification logic runs automatically across every line through Pearstop's engine, reaching 90 to 95% accuracy without a person doing the lookup one line at a time."
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.q}</summary>
                    <p className="faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Need to classify thousands of lines?"
        lead="Talk to sales. We'll show you how the classification engine works with your data."
        actions={[{ label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
