import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality: The Precondition for ERP, Fabric, and AI Projects",
  description:
    "Pearstop cleans and structures operational data so an ERP migration, a Microsoft Fabric rollout, or an AI initiative delivers what it promised instead of moving the same mess into a new system.",
  alternates: {
    canonical: `${siteConfig.url}/data-quality`
  }
};

const FAQ_ITEMS = [
  {
    q: "How is this different from just building a dashboard on top of what we already have?",
    a: "A dashboard displays whatever is underneath it. If cleaning and hard services reference data do not actually describe the same thing, the dashboard just shows that mismatch faster. Pearstop fixes the data itself, so what the dashboard displays is real."
  },
  {
    q: "Do all our service lines need to be on the same system before this works?",
    a: "No. Each service line's data is ingested from wherever it already lives, in whatever format it already arrives. Standardisation happens after ingestion, not as a precondition for starting."
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

export default function DataQualityPage() {
  return (
    <>
      <Script id="dataquality-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Data Quality"
        title="An ERP migration, a Fabric rollout, or an AI project inherits every mistake already in your data."
        lead="None of these projects fix bad data on their own. They move it, or build on top of it. Pearstop cleans and structures the reference data first, whether the project is an ERP migration, a Microsoft Fabric rollout, an AI initiative, or unifying every service line on one multi-year FM contract."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>The reference data arrived wrong. Nobody caught it for years.</h2>
              <p className="light-copy">
                Reference data is not neutral. It carries the mistakes of whoever entered it, multiplied across every site and year since. A wrong manufacturer part number, a name spelled two different ways depending on which system someone used that day. None of it shows up until you try to build on top of it: migrate it into Microsoft Fabric, connect it to an AI model, or compare cleaning costs against hard services costs on the same integrated FM contract. All three fail for the same reason. The data underneath was never actually the same data twice.
              </p>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>
                  &ldquo;We are basically happy with what we have seen, but maybe we expected a little bit more from the beginning of what was possible with the data.&rdquo;
                </p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Project Manager, integrated facilities management provider
                </p>
              </blockquote>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Reference data is wrong before it reaches any new system, compounding across sites and years before anyone catches it</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Each service line, or each source system, reports in its own format, so no single structured dataset exists to migrate, model, or analyse</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>An ERP migration, a Fabric rollout, or an AI pilot delivers less than expected, because the underlying reference data was flawed before the project started</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Reconciling it by hand happens every reporting cycle or every project kickoff, and starts from zero again next time</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.scaleConfidence}
                alt="Data quality automation for technical industries"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="The Problem" title="From scattered source systems to one dataset" lead="The system checks, cleans, and standardises your data across every source feeding it, and gets better over time as your team uses it." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, by source</h3>
              <p>Connect each system&rsquo;s data via API or CSV, in whatever format it already arrives, whether that is an ERP module, an asset register, or a facilities contract&rsquo;s service lines (cleaning, hard services, security, catering).</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Standardise and reconcile</h3>
              <p>Naming, coding, and reference data are corrected and standardised across every source, so the same equipment or supplier looks the same everywhere.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Flag and review</h3>
              <p>Items outside confident thresholds are flagged for your team. Decisions feed back into the engine, so the queue shrinks over time.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What clean data makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Decisions you can defend</h3>
              <p>When your data is clean and consistent, the insights that come from it are trustworthy enough to act on, and explain to a CFO.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>One contract-level report, not five</h3>
              <p>Cost and performance visible across every service line on one dataset, without the manual reconciliation that currently happens every month before the numbers go out.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>ERP, Fabric, and AI initiatives that work</h3>
              <p>An ERP migration, Copilot, Microsoft Fabric, and AI tools all require clean, structured data underneath them. Fixing data quality is not a nice-to-have for these initiatives, it is the prerequisite.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Two Places This Shows Up"
            title="The same clean-data foundation is what makes Fabric and AI initiatives possible."
            lead="A Microsoft Fabric migration and an AI initiative both assume the same thing about your data: that it is already clean, structured, and consistent. It rarely is. The work below is the same work described above, applied to two projects most technical businesses are already planning."
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">Fabric Ready</div>
                <p className="light-copy">
                  A Fabric migration reproduces whatever is already in your source systems. If the reference data is inconsistent going in, the migration just moves the inconsistency into a new platform, at greater cost to fix afterward. Pearstop cleans and structures the data before it moves, so the reports built on Fabric work from day one.
                </p>
                <Link className="bene-link" href="/fabric">
                  See what Fabric readiness means →
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">AI Readiness</div>
                <p className="light-copy">
                  An AI tool or a Copilot deployment is only as good as the data it is trained on or connected to. Most teams find that out after the rollout, when the model&rsquo;s answers reflect the same inconsistencies the underlying data already had. Pearstop builds the clean, governed data foundation an AI initiative assumes is already there.
                </p>
                <Link className="bene-link" href="/ai-readiness">
                  See what AI readiness means →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is data quality automation and why does it matter before an ERP migration, a Fabric rollout, or an AI initiative?"
                copy="Data quality automation uses rules, machine learning, and large language models to identify and resolve errors in operational datasets without manual intervention. An ERP migration moves data as it is. A Fabric rollout or an AI initiative assumes the data underneath it is already structured. Neither one fixes what was wrong to begin with. For hard services and FM providers running multiple service lines, cleaning, hard services, security, and catering each arrive in a different format, with reference data that was often wrong from the start. Pearstop has corrected supplier and equipment reference data for FM providers including SPIE, standardising naming across service lines and sites so the same clean dataset can support a migration, an AI model, or a single contract-level report instead of five separate ones."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="You feel a bit siloed, don't you?"
                author="Head of Commercial"
                role="Multi-site cleaning services contractor"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
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
        title="Ready to fix the data underneath your next project?"
        lead="Book a 7-minute discovery call. We will show you exactly where your data would break an ERP migration, a Fabric rollout, or an AI initiative today."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
