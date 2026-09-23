import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/invoice-extraction-fm`;

export const metadata: Metadata = {
  title: "Invoice Data Extraction for Facilities Management",
  description:
    "Turn invoices from every service line of an integrated FM contract into one structured, comparable dataset automatically - cleaning, hard services, security, and catering.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/invoice-extraction-fm") }
};

const FAQ_ITEMS = [
  { q: "Can this handle invoices from every service line, even if each one uses a different system?", a: "Yes. Each service line's data is ingested from wherever it already lives - API, CSV, PDF, or scan - in whatever format it already arrives. Standardisation happens after ingestion, not as a precondition for starting." },
  { q: "Can we see cost broken out by service line, not just the blended contract total?", a: "Yes. Once every service line's invoices are extracted and classified on a consistent basis, contract-level cost can be broken out service line by service line, not just reported as one blended figure." },
  { q: "Does this fix reference data that was wrong from the start of the contract?", a: "Yes. Manufacturer and equipment reference data is corrected and standardised as part of extraction and classification, not just passed through as-supplied." }
];

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
    { "@type": "ListItem", position: 3, name: "Invoice Data Extraction for Facilities Management", item: PAGE_URL }
  ]
};

export default function InvoiceExtractionFMPage() {
  return (
    <>
      <Script id="invoicefm-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="invoicefm-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Invoice Extraction · Facilities Management"
        title="One contract, five service lines, five invoice formats."
        lead="Integrated FM contracts bundle cleaning, hard services, security, and catering under one price. The invoices behind each service line rarely arrive in the same format, or even the same system. Pearstop reads all of it automatically, so contract-level cost is visible service line by service line."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>One blended price. No way to break out what each line actually costs.</h2>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>&ldquo;Not historic appreciation for data.&rdquo;</p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Group CIO, integrated FM operator
                </p>
              </blockquote>
              <p className="light-copy">
                A single FM contract can bundle cleaning, hard services, security, and catering under one blended price, each service line reporting through its own system in its own format. Reconciling that into one contract-level cost picture means someone manually pulling every service line's invoices apart and putting them back together by hand.
              </p>
              <p className="light-copy">
                Ask a contract manager to break out what one service line actually costs, separate from the blended price, and the honest answer is often a guess dressed up as a number.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Each service line - cleaning, hard services, security, catering - reports through its own system, in its own format</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>One blended contract price, with no reliable way to break out what each service line actually costs</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Manufacturer and equipment reference data supplied at contract start is sometimes simply wrong</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>A first data pass often delivers less than expected, because the underlying reference data was flawed before it reached any system</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="How It Works" title="From five service-line silos to one structured dataset" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, by service line</h3>
              <p>Connect each service line's invoices via API, CSV, PDF, or scan, in whatever format they already arrive from cleaning, hard services, security, or catering.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>OCR and AI extraction</h3>
              <p>Line items, costs, and references are read and structured automatically, so the same equipment or supplier looks the same across every service line.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>One contract-level view</h3>
              <p>Structured output lands in the format your ERP or reporting tool expects, so contract-level cost is visible without manual reconciliation.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What becomes possible once every service line reads the same way" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>One contract-level report, not five silos</h3>
              <p>Cost visible across every service line on one dataset, without the manual reconciliation that currently happens before the numbers go out.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Reference data corrected, not just collected</h3>
              <p>Manufacturer and equipment reference data standardised across every service line and site, not taken on faith from contract start.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Fewer hours lost reconciling by hand</h3>
              <p>The manual step of pulling five service lines apart and back together is removed, not just made faster.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="What changes with Pearstop" />
          <StatsGrid
            stats={[
              { value: "~70% → 99%", label: "first-pass extraction accuracy", copy: "On one FM client's live invoice stream, as the pipeline learned their supplier base" },
              { value: "5 → 1", label: "service-line silos to one dataset", copy: "Cleaning, hard services, security, and catering reconciled automatically" },
              { value: "Days", label: "typical time to first structured output", copy: "Not a lengthy integration project" }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is invoice data extraction for facilities management, and why does it matter?"
                copy="Invoice data extraction is the process of automatically reading PDF invoices, scanned paper records, and delivery notes from every service line of an FM contract, then converting them into one structured, comparable dataset. For integrated FM providers, this matters because a single contract typically bundles cleaning, hard services, security, and catering under one blended price, with each service line reporting through its own system in its own format. Without extraction, breaking out what any one service line actually costs means manual reconciliation, redone every reporting cycle. Pearstop combines OCR with an AI extraction layer and a human review step for low-confidence lines, so contract-level cost is visible service line by service line, not reconstructed by hand."
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
        title="Still reconciling five service lines by hand?"
        lead="Book a 7-minute discovery call and see what one contract-level view of your own data looks like."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
