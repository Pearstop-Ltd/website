import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Microsoft Fabric Data Readiness for Asset-Intensive Industries",
  description:
    "Migrating to Microsoft Fabric? Pearstop cleans and structures your operational data before migration so your reports work from day one and the project stays on track.",
  alternates: {
    canonical: `${siteConfig.url}/fabric`
  }
};

export default function FabricPage() {
  return (
    <>
      <PageHero
        eyebrow="Fabric Ready"
        title="Your Microsoft Fabric migration will only deliver if your data is ready first."
        lead="Microsoft Fabric promises company-wide insight. Pearstop makes sure the data feeding it is clean, structured, and reliable so your migration delivers what leadership is expecting."
        actions={[
          { label: "Book a 7-minute discovery", href: "/contact", variant: "primary" },
          { label: "How it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Hidden Blocker</div>
              <h2>The hidden blocker in every Fabric migration</h2>
              <p className="light-copy">
                Microsoft Fabric promises a unified data platform - one source of truth across finance, operations, procurement, and assets. But Fabric assumes structured, consistent data that most organisations simply do not have yet. Migrating dirty data into Fabric does not fix the problem; it just moves it, at great cost and risk.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Inconsistent naming conventions mean cross-site and cross-system comparisons fail</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Field errors and duplicates surface immediately in reporting - damaging trust in the new platform</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>AI and Copilot features built on Fabric underdeliver when the underlying data is unreliable</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>During a data lake transition there is a natural inflection point to clean the data before it gets more expensive</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">Why this matters to leadership</div>
                <p className="light-copy">
                  CFOs and senior operations leaders care about trust, reporting, and delivery. They do not care about the platform for its own sake - they care about whether the migration produces company-wide visibility and a return on the spend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="How It Works" title="Fabric readiness in three stages" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Data Readiness Assessment</h3>
              <p>We audit your existing operational data against Fabric's structural requirements - identifying gaps, inconsistencies, and priorities before migration begins.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Automated Cleaning and Structuring</h3>
              <p>We clean, standardise, and structure your data to meet Fabric's requirements automatically, at scale - no manual rework.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Migration-Ready Data</h3>
              <p>You receive verified, structured data with automated quality control built in - ready for Fabric onboarding and AI model training from day one.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What Fabric readiness delivers" />
          <StatsGrid
            stats={[
              {
                value: "379%",
                label: "ROI",
                copy: "Forrester-modelled three-year ROI for enterprises that migrate to Microsoft Fabric on a clean data foundation."
              },
              {
                value: "95%",
                label: "Automated data structuring",
                copy: "Without manual rework."
              },
              {
                value: "<6 months",
                label: "Payback period",
                copy: "Per Forrester composite enterprise model."
              }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We were planning a Fabric migration but kept hitting the wall of inconsistent, unstructured data underneath. Pearstop cleaned and structured it first - what would have been a 12-month data preparation project became manageable."
                author="Head of Data"
                role="Infrastructure Company"
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
                title="What does Microsoft Fabric data readiness mean?"
                copy="Microsoft Fabric data readiness is the process of cleaning, structuring, and governing operational data before migrating to Microsoft Fabric. For asset-intensive industries - construction, facilities management, manufacturing - procurement data, asset registers, and operational records are often too inconsistent for Fabric to process reliably. Pearstop automates the data preparation work that makes Fabric migrations succeed, ensuring organisations can use Copilot, AI agents, and real-time analytics from day one rather than spending 12-18 months fixing data quality after migration."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Planning a Fabric migration?"
        lead="Talk to us before the migration starts. A 30-minute call now can save months of rework later."
        actions={[
          { label: "Book a 7-minute discovery", href: "/contact", variant: "primary" },
          { label: "See AI readiness too", href: "/ai-readiness", variant: "secondary" }
        ]}
      />
    </>
  );
}

