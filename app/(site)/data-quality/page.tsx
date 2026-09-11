import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality for Multi-Service Facilities Management",
  description:
    "Pearstop unifies reference, cost, and asset data from every service line in an FM contract into one structured dataset, so contract-level cost and performance is visible instead of five separate reports.",
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
        title="One contract, five service lines, five data formats."
        lead="Cleaning, hard services, security, and catering all report differently under the same contract. Pearstop turns those service-line silos into one structured dataset, so contract-level cost and performance is something you can actually see, not five things you have to reconcile by hand."
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
                A service line&rsquo;s reference data is not neutral. It carries the mistakes of whoever entered it, multiplied across every site and year since. A wrong manufacturer part number, a name spelled two different ways depending on which system a technician used that day. None of it shows up until someone tries to compare cleaning costs against hard services costs on the same contract, and finds the two datasets do not actually describe the same thing.
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
                  <div>Reference data supplied at contract start already wrong, compounding across sites and years before anyone catches it</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Each service line reports in its own format, so no single view of contract-level cost or performance exists</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>A first data pass delivers less than expected, because the underlying reference data was flawed before it reached any system</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Reconciling service lines by hand happens every reporting cycle, and starts from zero again next time</div>
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
          <SectionTitle eyebrow="The Problem" title="From five service-line silos to one dataset" lead="The system checks, cleans, and standardises your data across service lines, and gets better over time as your team uses it." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest, by service line</h3>
              <p>Cleaning, hard services, security, catering: connect each service line&rsquo;s data via API or CSV, in whatever format it already arrives.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Standardise and reconcile</h3>
              <p>Naming, coding, and reference data are corrected and standardised across every service line, so the same equipment or supplier looks the same everywhere.</p>
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
              <h3>AI and Fabric initiatives that work</h3>
              <p>AI tools, Copilot, and Microsoft Fabric all require clean, structured data. Fixing data quality is not a nice-to-have for these initiatives, it is the prerequisite.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is data quality automation and how does it work for multi-service FM contracts?"
                copy="Data quality automation uses rules, machine learning, and large language models to identify and resolve errors in operational datasets without manual intervention. For integrated FM providers, the most common problem is not any single service line's data, it is that cleaning, hard services, security, and catering each arrive in a different format, with reference data that was often wrong from the start. Pearstop has corrected supplier and equipment reference data for FM providers including SPIE, standardising naming across service lines and sites so contract-level cost and performance is visible on one dataset instead of five."
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
        title="Ready to unify your FM data?"
        lead="Book a 7-minute discovery call. We will show you exactly where your service lines stop agreeing with each other."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
