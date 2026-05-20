import type { Metadata } from "next";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality Automation for Technical Industries",
  description:
    "Pearstop automatically cleans, standardises, and enriches operational data for hard services, construction, and manufacturing companies.",
  alternates: {
    canonical: `${siteConfig.url}/data-quality`
  }
};

export default function DataQualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Data Quality"
        title="Clean data is the foundation of every good decision."
        lead="Pearstop automatically cleans, standardises, and enriches your operational data so your teams, systems, and partners all work from the same reliable source rather than their own version of the truth."
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
              <h2>Your data is technically there. But it is not usable.</h2>
              <p className="light-copy">
                Most technical businesses have plenty of data. The problem is that it is inconsistent, fragmented, and incomplete. The same supplier is recorded six different ways. Asset names vary between sites. Categories are applied differently by different teams. And the result is that no one trusts the data, so no one acts on it.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Inconsistent naming makes it impossible to aggregate data across sites, teams, or periods</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Missing values in critical fields block automated processing and reporting</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Duplicate records inflate counts, distort analysis, and erode trust in reports</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Manual data cleaning is expensive, slow, and creates new errors at the same time as fixing old ones</div>
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
          <SectionTitle eyebrow="How It Works" title="Automated quality control at scale" lead="The system automatically checks, cleans, and improves your data - and gets better over time as your team uses it." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest</h3>
              <p>Connect your data sources via API or CSV. Any format, any system - from SAP and Oracle to Excel exports and legacy databases.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Auto-clean</h3>
              <p>The engine automatically resolves 95% of errors - spelling mistakes, wrong field placement, duplicate records, missing values - without human intervention.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Flag and Review</h3>
              <p>Items outside confident thresholds are flagged for your team. Your decisions feed directly back into the engine - so the queue shrinks over time.</p>
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
              <p>When your data is clean and consistent, the insights that come from it are trustworthy enough to act on - and explain to a CFO.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Reporting that actually runs</h3>
              <p>Company-wide financial and operational reporting without the manual reconciliation that currently happens every month before the numbers go out.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>AI and Fabric initiatives that work</h3>
              <p>AI tools, Copilot, and Microsoft Fabric all require clean, structured data. Fixing data quality is not a nice-to-have for these initiatives - it is the prerequisite.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is data quality automation and how does it work in practice?"
                copy="Data quality automation uses rules, machine learning, and large language models to identify and resolve errors in operational datasets without manual intervention. For hard services, construction, and manufacturing companies, the most common data quality problems are inconsistent naming conventions, missing values in critical fields, duplicate records across systems, and spend data that has never been categorised to a standard like UNSPSC. Pearstop's four-layer engine handles 95% of these issues automatically, flagging only the items where human review adds real value - and learning from every decision your team makes to reduce that review queue over time."
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
                quote="Our asset data worked for the mechanics on-site. It did not work for anyone trying to plan maintenance or run analysis on it. Pearstop fixed that."
                author="Asset Manager"
                role="Facilities Management"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to fix your data quality problem?"
        lead="Book a 7-minute discovery call. We will show you exactly where your data is costing you time and margin."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
