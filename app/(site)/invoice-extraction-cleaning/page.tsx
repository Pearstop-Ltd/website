import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/invoice-extraction-cleaning`;

export const metadata: Metadata = {
  title: "Invoice Data Extraction for Cleaning & Soft FM",
  description:
    "Turn high volumes of small consumables, subcontractor, and site invoices into structured, classified spend data automatically - built for cleaning and soft FM contractors.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/invoice-extraction-cleaning") }
};

const FAQ_ITEMS = [
  { q: "Can Pearstop handle invoices photographed on a phone from site, not just digital PDFs?", a: "Yes. The extraction layer handles digital PDFs, scanned paper documents, and photographed delivery notes or invoices, which matters in cleaning because a meaningful share of site-level purchases never arrive as a clean digital file." },
  { q: "Can this check spend against our agreed contract terms, not just classify it?", a: "Yes. Once a line is extracted and classified, it can be checked against agreed contract terms and pricing, so off-contract buying or price drift shows up as it happens rather than at the next audit." },
  { q: "Does extraction replace our ERP, or feed it?", a: "It feeds it. Pearstop extracts and structures the data, then delivers it in the format your ERP or reporting tool already expects, so it plugs into what you run today rather than requiring a new system." }
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
    { "@type": "ListItem", position: 3, name: "Invoice Data Extraction for Cleaning & Soft FM", item: PAGE_URL }
  ]
};

export default function InvoiceExtractionCleaningPage() {
  return (
    <>
      <Script id="invoicecleaning-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="invoicecleaning-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Invoice Extraction · Cleaning"
        title="Every supplier invoices differently. None of it should mean typing it in by hand."
        lead="Cleaning contracts run on high volumes of small invoices from consumables suppliers, subcontractors, and site teams, each in their own format. Pearstop reads all of it automatically, so spend is structured before anyone has to key a line in by hand."
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
              <h2>Ground level, and everyone already knows it</h2>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>&ldquo;Our data, our ERP master data is so poor. This is where all the sort of automatic flow stops.&rdquo;</p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Procurement lead, multi-site cleaning services contractor
                </p>
              </blockquote>
              <p className="light-copy">
                Cleaning contracts generate a high volume of small invoices: consumables, equipment, subcontracted specialist cleans, site-level purchases. Every supplier lays it out differently, and a fair number still arrive as a scanned PDF or a photo from a site manager's phone. Someone has to read each one before spend can be checked against the contract at all.
              </p>
              <p className="light-copy">
                Roughly four in five cleaning-contract invoices do not match the terms that were agreed. That gap stays invisible until someone actually reads every line and compares it, which does not happen at volume.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>High volumes of small-value invoices from consumables and subcontractor suppliers, every one laid out differently</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>A fair share of invoices arrive as a scanned PDF or a phone photo from site, not a clean digital format</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Spend cannot be checked against agreed contract terms until someone has actually read the invoice</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>ERP master data too poor for any automatic flow to even start from</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="How It Works" title="From unread invoice to spend checked against the contract" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, in any format</h3>
              <p>PDF invoices, scanned paper, phone photos from site, email attachments. No fixed template per supplier.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>OCR and AI extraction</h3>
              <p>Line items, quantities, unit costs, and supplier references are read and structured automatically, then checked against agreed contract terms.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Delivered into what you already run</h3>
              <p>Structured output lands in the format your ERP or reporting tool expects, ready for classification and contract compliance checks.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What becomes possible once the invoice is actually read" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Spend checked against the contract, not just filed</h3>
              <p>Off-contract buying and price drift show up as they happen, not at the next audit.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>A category to actually classify</h3>
              <p>Extraction is the precondition for classification. Nothing can be categorised or benchmarked until it exists as structured data.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Fewer hours lost to keying and correcting</h3>
              <p>The manual entry step that absorbs site and procurement admin time is removed, not just made faster.</p>
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
              { value: "~80%", label: "of cleaning-contract invoices don't match agreed terms", copy: "Invisible until every line is read and checked" },
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
                title="What is invoice data extraction for cleaning contractors, and why does it matter?"
                copy="Invoice data extraction is the process of automatically reading PDF invoices, scanned paper records, and site photos of delivery notes, then converting them into structured, checkable line-item data. For cleaning and soft FM contractors, this matters because spend is spread across a high volume of small invoices from consumables suppliers, subcontractors, and site-level purchases, each arriving in a different format. Manual data entry cannot keep pace, which is why off-contract buying and price drift against agreed terms stay invisible until an audit catches them, often too late to matter. Pearstop combines OCR with an AI extraction layer and a human review step for low-confidence lines, so spend is structured and checkable against the contract as it arrives."
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
        title="Still keying invoices in by hand?"
        lead="Book a 7-minute discovery call and see what your own invoice stream looks like once it is actually read."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
