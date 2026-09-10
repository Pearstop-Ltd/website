import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/invoice-data-extraction`;

export const metadata: Metadata = {
  title: "Invoice and Document Data Extraction (OCR) for FM and Construction",
  description:
    "Turn unread PDF invoices, scanned delivery notes, and paper records into structured, usable data. Automated OCR and AI extraction for facilities management, construction, and manufacturing procurement teams.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Invoice and Document Data Extraction (OCR) for FM and Construction | Pearstop",
    description:
      "Turn unread PDF invoices and paper records into structured, usable data. Automated OCR and AI extraction built for hard services, cleaning, and construction procurement.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice and Document Data Extraction (OCR) for FM and Construction | Pearstop",
    description: "Turn unread PDF invoices and paper records into structured, usable data.",
    images: ["/opengraph-image"]
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

const FAQ_ITEMS = [
  {
    q: "Can Pearstop extract data from scanned paper invoices, not just digital PDFs?",
    a: "Yes. The extraction layer handles digital PDFs, scanned paper documents, photographed delivery notes, and email attachments. It does not require a fixed template per supplier, which matters because most procurement teams receive the same information laid out differently by every supplier, and often differently by the same supplier month to month."
  },
  {
    q: "How accurate is automated invoice data extraction?",
    a: "First-pass accuracy depends on document quality and supplier variability, but improves over time. On one facilities management client's invoice stream, first-pass extraction accuracy rose from roughly 70% to 99% as the pipeline learned that supplier base's formats and edge cases. Anything below a set confidence threshold is flagged for human review rather than guessed at."
  },
  {
    q: "Does extraction replace our ERP, or feed it?",
    a: "It feeds it. Pearstop extracts and structures the data, then delivers it in the format your ERP, P2P platform, or BI tool already expects, so it plugs into what you run today (SAP, Oracle, Business Central, and others) rather than requiring a new system."
  }
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
    { "@type": "ListItem", position: 3, name: "Invoice and Document Data Extraction", item: PAGE_URL }
  ]
};

export default function InvoiceDataExtractionPage() {
  return (
    <>
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Data Extraction"
        title="If nobody reads the invoice, the data inside it does not exist."
        lead="Most procurement teams do not have a classification problem yet. They have an invoice problem: PDFs, scans, and delivery notes arriving faster than anyone can read them, let alone enter them into a system. Pearstop turns that paperwork into structured data automatically, so there is something to classify in the first place."
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
              <h2>Why does spend data stay unusable months after the invoice arrives?</h2>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>
                  &ldquo;Our internal systems are lacking. I&rsquo;d say we&rsquo;re at ground level. Somewhere underground.&rdquo;
                </p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Procurement lead, multi-site cleaning services contractor
                </p>
              </blockquote>
              <p className="light-copy">
                This is not a data literacy problem. It is a volume and format problem. Every supplier lays out an invoice differently, the same supplier often changes layout month to month, and a fair number still arrive as a scanned PDF or a photo of a paper delivery note. Someone has to read each one, work out what was actually bought, and type it into a system before any of it can be categorised, compared, or reported on.
              </p>
              <p className="light-copy">
                At volume, that step does not get skipped occasionally. It becomes the permanent bottleneck.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Invoices sit unread in an inbox because no one has time to open them, let alone key them in</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>The same supplier sends a different layout depending on which depot or system generated it</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Manual entry backlogs push classification and reporting a full cycle behind actual spend</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>By the time a line is typed in, checked, and corrected, the number it produces is already stale</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="From unread document to structured line item"
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, in any format</h3>
              <p>PDF invoices, scanned paper, email attachments, EDI feeds. No fixed template per supplier, and no requirement that a supplier changes how they send anything.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>OCR and AI extraction</h3>
              <p>Line items, quantities, unit costs, cost codes, and supplier references are read and structured automatically. Anything below a confidence threshold is flagged rather than guessed at, and each correction feeds back into the pipeline so the same supplier and format is read more accurately next time.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Delivered into what you already run</h3>
              <p>Structured output lands in the format your ERP, P2P platform, or BI tool expects, ready for classification, reporting, or direct reload.</p>
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
              <h3>Spend visible the same week, not the same quarter</h3>
              <p>Data is structured as invoices arrive, not weeks later when someone finally gets through the backlog.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>A category to actually classify</h3>
              <p>Extraction is the precondition for classification. Nothing can be categorised, benchmarked, or compared until it exists as structured data.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Fewer hours lost to keying and correcting</h3>
              <p>The manual entry step that absorbs procurement and finance admin time is removed, not just made faster.</p>
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
              { value: "Any format", label: "PDF, scan, photo, or EDI", copy: "No fixed template required per supplier" },
              { value: "Days", label: "typical time to first structured output", copy: "Not a lengthy integration project" }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="Doing that manually absolutely has its own risks. It might be borderline impossible at this stage while keeping operations going."
                author="Procurement lead"
                role="Multi-site cleaning services contractor"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is invoice data extraction and why does it matter for procurement data quality?"
                copy="Invoice and document data extraction is the process of automatically reading PDF invoices, scanned paper records, and delivery notes, then converting them into structured line-item data. For facilities management, construction, and manufacturing procurement teams, this is the step that has to happen before classification, spend analysis, or UNSPSC coding is even possible. Manual data entry cannot keep pace with invoice volume across multiple sites and suppliers, which is why unread invoices and stale spend data are one of the most common blockers to category management and AI-driven spend analysis. Pearstop combines OCR with an AI extraction layer and a human review step for low-confidence lines, so the output is structured data ready for classification, not another manual bottleneck."
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
