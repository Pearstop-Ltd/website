import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, PageHero } from "@/components/content";
import { siteConfig } from "@/lib/site";
import { UnspscLookupTool } from "@/components/unspsc-lookup-tool";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is a UNSPSC code?", acceptedAnswer: { "@type": "Answer", text: "A UNSPSC (United Nations Standard Products and Services Code) is an 8-digit code that classifies any product or service into a global standard hierarchy." } },
    { "@type": "Question", name: "How do I find the right UNSPSC code?", acceptedAnswer: { "@type": "Answer", text: "Paste a clear description into the lookup tool. The AI engine returns the best matching 8-digit commodity code with a confidence level." } },
    { "@type": "Question", name: "Is this UNSPSC lookup tool free?", acceptedAnswer: { "@type": "Answer", text: "Yes. The tool is completely free for individual queries. For bulk classification, Pearstop offers an automated classification service." } },
  ]
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

export const metadata: Metadata = {
  title: "Free UNSPSC Code Lookup Tool — Find the Right Code Instantly",
  description: "Paste any product or service description and get the correct 8-digit UNSPSC commodity code instantly. Free AI-powered tool from Pearstop.",
  alternates: { canonical: `${siteConfig.url}/unspsc-code-lookup` },
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
                  <a href={siteConfig.calendly} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Book a 7-minute discovery
                  </a>
                  <Link href="/unspsc" className="btn btn-secondary">
                    Learn about bulk classification
                  </Link>
                </div>
              </div>
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
                {[
                  { q: "What is a UNSPSC code?", a: "A UNSPSC (United Nations Standard Products and Services Code) is an 8-digit code that classifies any product or service into a global standard hierarchy. The first 2 digits are the Segment, digits 3–4 are the Family, digits 5–6 are the Class, and digits 7–8 are the Commodity." },
                  { q: "How do I find the right UNSPSC code for a product?", a: "Paste a clear description of the product or service into the lookup tool above. The AI engine returns the best matching 8-digit commodity code, along with the full hierarchy path and a confidence level." },
                  { q: "Is this UNSPSC lookup tool free?", a: "Yes. The tool is completely free for individual queries. For bulk classification — processing thousands of invoice lines — Pearstop offers an automated classification service." },
                  { q: "How accurate is the UNSPSC code suggestion?", a: "The tool returns a confidence level with each result: high, medium, or low. High-confidence results are typically correct at commodity level. For bulk classification at production accuracy (90–95%), Pearstop's full service uses additional signals beyond the description text." },
                  { q: "What is the difference between segments, families, classes, and commodities?", a: "Segment (2 digits) is the broadest — e.g. 72 is Construction and Maintenance. Family (4 digits) narrows it — 7210 is Building and Facility Maintenance. Class (6 digits) is more specific — 721015 is Electrical Systems Maintenance. Commodity (8 digits) is the most precise — 72101505 is Lighting Maintenance Services." },
                ].map((item, i) => (
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
        lead="Book a 7-minute discovery. We'll show you how the classification engine works with your data."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
