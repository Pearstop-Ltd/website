import type { Metadata } from "next";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Automated UNSPSC Classification for Procurement Teams",
  description:
    "Pearstop auto-classifies up to 95% of your procurement spend lines to UNSPSC standard without manual effort.",
  alternates: {
    canonical: `${siteConfig.url}/unspsc`
  }
};

export default function UnspscPage() {
  return (
    <>
      <PageHero
        eyebrow="UNSPSC"
        title="Unclassified spend is the enemy of procurement performance."
        lead="Pearstop auto-classifies up to 95% of your procurement lines using UNSPSC, the global standard for procurement categorisation, so your team can stop doing it manually."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "What is UNSPSC?", href: "#what-is-unspsc", variant: "secondary" }
        ]}
      />

      <section id="what-is-unspsc">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Standard</div>
              <h2>UNSPSC: the global standard for classifying what you buy.</h2>
              <p className="light-copy">
                The United Nations Standard Products and Services Code is a hierarchical classification system used by organisations worldwide to categorise procurement spend. It enables consistent reporting, supplier benchmarking, spend analysis, and category management across contracts, sites, and systems.
              </p>
              <p className="light-copy">
                Without UNSPSC classification, procurement spend data is a collection of free-text line items that cannot be compared, aggregated, or analysed meaningfully. With it, every purchase sits in a consistent category - and category management becomes possible.
              </p>
              <div className="quote-card">
                <div className="story-label"><strong>Example UNSPSC hierarchy</strong></div>
                <p><strong>Segment:</strong> 72 - Construction and Maintenance</p>
                <p><strong>Family:</strong> 7210 - Building and Facility Maintenance</p>
                <p><strong>Class:</strong> 721010 - Electrical Maintenance</p>
                <p><strong>Commodity:</strong> 72101505 - Lighting maintenance</p>
              </div>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.spendControl}
                alt="UNSPSC classification for procurement spend data"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>


      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="Your team stays in control. The system does the work."
            lead="Pearstop's four-layer classification engine handles 95% of spend lines automatically - and learns from every decision your team makes on the remaining 5%."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Rules Engine</h3>
              <p>User-defined rules and automatically loaded patterns handle consistent, high-confidence classifications immediately.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Machine Learning</h3>
              <p>A proprietary ML layer replicates your internal classification approach - filling gaps the way your most experienced category manager would.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>LLM Layer</h3>
              <p>Ambiguous or unfamiliar line items are handled by an LLM augmentation layer that provides context-aware classification for edge cases.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>Human Review</h3>
              <p>Items below the confidence threshold are flagged for your team. Every decision feeds back into the engine - shrinking the review queue over time until it reaches zero.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What UNSPSC classification makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Category Management</h3>
              <p>See exactly what you are buying across every supplier and site - and identify consolidation and negotiation opportunities that were invisible before.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Supplier Benchmarking</h3>
              <p>Compare prices for the same UNSPSC categories across suppliers - and negotiate from a position of data rather than guesswork.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>ERP and BI Integration</h3>
              <p>UNSPSC-coded data feeds directly into SAP, Oracle, and all major BI tools - no manual mapping, no format conversion, no reconciliation.</p>
            </article>
          </div>
        </div>
      </section>

      <UnspscLookupCta />

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We used to have two full-time staff working on category assignment. Now the system does this for us - which has unlocked margin estimations further down the line too. It is more reliable at a fraction of the cost."
                author="Head of Procurement"
                role="Infrastructure Contractor, Netherlands"
                image={siteConfig.assets.team.vince}
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
                title="How does UNSPSC classification work for hard services and FM companies?"
                copy="UNSPSC classification for facilities management and hard services companies involves categorising every supplier invoice line item to the appropriate code in the UNSPSC hierarchy. This includes maintenance materials, subcontractor services, plant hire, and specialist equipment - across potentially thousands of suppliers and hundreds of sites. Manual UNSPSC classification at this scale typically requires one or two full-time staff members working continuously to keep up with invoice volume. Pearstop's automated engine handles up to 95% of classification without human intervention, with the remaining items flagged for review - and the review queue shrinks as the system learns from your team's decisions over time."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">What if we do not have existing classification data?</div>
                <p>
                  Pearstop's approach combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge - meaning it performs strongly even without existing priors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <CTABand
        title="Ready to automate your procurement classification?"
        lead="Book a 7-minute discovery. We will show you exactly how the classification engine would work with your data."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
