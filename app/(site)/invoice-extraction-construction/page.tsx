import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/invoice-extraction-construction`;

export const metadata: Metadata = {
  title: "Invoice & Delivery Note Extraction for Construction",
  description:
    "Turn subcontractor invoices, delivery notes, and PO paperwork from every project and cost code into structured, classified spend data automatically.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/invoice-extraction-construction") }
};

const FAQ_ITEMS = [
  { q: "Can this handle invoices and delivery notes from many small subcontractors, not just a few large suppliers?", a: "Yes. There is no fixed template per supplier or subcontractor, and no requirement that anyone changes how they send paperwork. Handwritten delivery notes, photographed site paperwork, and PDF invoices are all handled the same way." },
  { q: "Do cost codes need to be standardised across projects before this works?", a: "No. Extraction and classification map cost codes to a consistent structure automatically, even when the same code is used differently project to project. Standardising happens as part of the output, not as a precondition for starting." },
  { q: "Does this replace our ERP or project cost reporting?", a: "No, it feeds it. Structured output is delivered in the format your ERP or reporting tool already expects, ready for classification, tender pricing, or project-level cost tracking." }
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
    { "@type": "ListItem", position: 3, name: "Invoice & Delivery Note Extraction for Construction", item: PAGE_URL }
  ]
};

export default function InvoiceExtractionConstructionPage() {
  return (
    <>
      <Script id="invoiceconstruction-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="invoiceconstruction-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Invoice Extraction · Construction"
        title="Every project has its own paperwork. None of it reads itself."
        lead="Construction procurement runs on subcontractor invoices, delivery notes, and purchase orders spread across every project and cost code. Pearstop reads all of it automatically, so spend is structured before anyone has to chase a project manager for a clearer description."
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
              <h2>Estimating from memory because the actuals were never readable</h2>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>&ldquo;Everything was captured in Rands and the total spend over three years, every single month for 36 different contractors. I have to translate that spend into a quantity, then split it up by road section, then by contractor.&rdquo;</p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Commercial decision-maker, civil/structural engineering consultancy
                </p>
              </blockquote>
              <p className="light-copy">
                Every project runs its own budget codes, and subcontractor invoices rarely follow the same format twice. A delivery note might be handwritten, a PO might reference a cost code that means nothing outside that one project, and by the time someone has typed it all in, the numbers going into cost reporting are already a cycle behind the actual spend.
              </p>
              <p className="light-copy">
                At the volume a multi-project contractor runs, that gap doesn't close on its own. It compounds project to project.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Subcontractor invoices and delivery notes arrive in whatever format each supplier uses, project to project</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>The same cost code means something different depending on which project generated it</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Estimating teams price new bids from memory or unreliable ERP exports, not clean historical actuals</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Actual project costs lag real spend by a full reporting cycle, because someone still has to type it in first</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="How It Works" title="From unread paperwork to structured, comparable cost" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, project by project</h3>
              <p>PDF invoices, delivery notes, POs, and site paperwork - digital or scanned - regardless of which project or subcontractor they came from.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>OCR and AI extraction</h3>
              <p>Line items, quantities, cost codes, and subcontractor references are read and structured automatically, mapped consistently even when the same cost code means different things project to project.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Delivered into what you already run</h3>
              <p>Structured output lands in the format your ERP or reporting tool expects, ready for classification and project-level cost tracking.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What becomes possible once the paperwork is read" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Actuals ready for the next bid</h3>
              <p>Estimating teams price the next tender from real historical costs, not memory or a rough ERP export.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Cost codes that mean the same thing everywhere</h3>
              <p>A cost code from one project maps consistently, so costs are comparable across projects, not just within one.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Fewer hours lost chasing paperwork</h3>
              <p>The manual admin time spent typing in and chasing unclear delivery notes goes away, not just gets faster.</p>
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
              { value: "Any format", label: "PDF, scan, photo, or EDI", copy: "No fixed template required per subcontractor" },
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
                title="What is invoice and delivery note extraction for construction, and why does it matter?"
                copy="Invoice and delivery note extraction is the process of automatically reading PDF invoices, scanned paper records, and delivery notes from every project and subcontractor, then converting them into structured, comparable line-item data. In construction, this matters because spend is inherently fragmented: every project has its own budget codes, and the same cost code can mean different things depending on which project generated it. Without extraction, that fragmentation is invisible - estimating teams price the next bid from memory rather than clean historical actuals, and cost reporting always lags real spend by however long manual entry takes. Pearstop combines OCR with an AI extraction layer and a human review step for low-confidence lines, so project cost data is structured and comparable as it arrives, not reconstructed after the fact."
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
        title="Still chasing paperwork project to project?"
        lead="Book a 7-minute discovery call and see what your own project spend looks like once it is actually read."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
