import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality Solutions for Hard Services and Infrastructure",
  description:
    "Five data quality solutions for technical industries - from invoice data extraction and UNSPSC procurement classification to asset data management and unified data quality.",
  alternates: {
    canonical: `${siteConfig.url}/solutions`,
    languages: alternateLanguages("/solutions")
  }
};

export default function SolutionsPage() {
  const solutionCards = [
    {
      eyebrow: "01",
      title: "Invoice & Document Extraction",
      copy: "Turn unread PDF invoices, scans, and delivery notes into structured data automatically. The precondition for classification, spend analysis, and everything after it.",
      href: "/invoice-data-extraction"
    },
    {
      eyebrow: "02",
      title: "UNSPSC Classification",
      copy: "Auto-classify years of free-text purchase order data using UNSPSC, including tracing hard services parts back to the real manufacturer code. Up to 95% of spend lines classified automatically.",
      href: "/unspsc"
    },
    {
      eyebrow: "03",
      title: "Spend Visibility",
      copy: "Build a real spend baseline from messy invoice and supplier data, broken out by service line and entity, so a negotiation, tender, or framework review starts from a number instead of a guess.",
      href: "/procurement-data-quality"
    },
    {
      eyebrow: "04",
      title: "Data Readiness",
      copy: "An ERP migration, a Microsoft Fabric rollout, and an AI initiative all assume the data underneath them is already clean and structured. When it is not, each one just carries the mess into a new system. Pearstop fixes the data first.",
      href: "/data-quality"
    },
    {
      eyebrow: "05",
      title: "Asset Data Management",
      copy: "Turn spend and maintenance data you receive but do not generate into an independent, classified record you can compare across providers, sites, and years.",
      href: "/asset-data-management"
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Turn messy data into decisions"
        lead="Pearstop delivers five data integrity solutions for technical industries. Each one targets a specific data problem and every one is built to protect your margins."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title="Five Solutions. One Goal."
            lead="Pearstop delivers five data quality solutions for technical industries. Each one targets a specific operational data problem, built for hard services, construction, and manufacturing."
          />

          <div className="bene-cards">
            {solutionCards.map((solution) => (
              <article className={`bene-card ${solution.eyebrow === "02" ? "featured" : ""}`} key={solution.href}>
                <div className="sol-eyebrow">{solution.eyebrow}</div>
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <Link className="bene-link" href={solution.href}>
                  Explore solution →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle
            title="More ways to work with Pearstop"
            lead="Two more places the same classification engine shows up, for specific teams and specific outcomes."
          />
          <div className="bene-cards">
            {[
              {
                title: "Spend Cube & Dashboards",
                copy: "Spend structured by category, supplier, and time, ready to feed Power BI, Microsoft Fabric, or your own dashboard.",
                href: "/spend-cube"
              },
              {
                title: "For Procurement Consultancies",
                copy: "White-labelled spend classification under your own taxonomy, so engagement margin goes to analysis, not manual cleanup.",
                href: "/procurement-consultancies"
              }
            ].map((solution) => (
              <article className="bene-card" key={solution.href}>
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <Link className="bene-link" href={solution.href}>
                  Explore solution →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-5">
              <div className="story-label">The Pearstop Approach</div>
              <h2>One engine. Every data problem.</h2>
              <p className="light-copy" style={{ marginBottom: "1.25rem" }}>
                Whether it is procurement spend, asset registers, or ledger data, Pearstop standardises, categorises, and enriches your data automatically. The output plugs straight into your existing tools.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Works with your existing BI tools, ERP, and dashboards</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>No lengthy implementation - results in days, not months</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Scales from one dataset to your entire data estate</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Built specifically for technical industries and FM</div>
                </li>
              </ul>
            </div>
            <div className="col-md-6" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">Works with your data</div>
                <p className="light-copy">
                  Invoices, asset registers, ledger exports, supplier lists - from any format, any system. SAP, Oracle, ERP exports, spreadsheets. If you can export it, we can work with it.
                </p>
                <div style={{ textAlign: "center", color: "var(--purple)", fontSize: "1.4rem", margin: "1rem 0" }}>↓</div>
                <div className="quote-card" style={{ margin: 0, background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" }}>
                  <div className="story-label" style={{ color: "rgba(255,255,255,0.8)" }}>Pearstop engine</div>
                  <p style={{ color: "rgba(255,255,255,0.85)" }}>
                    Automated cleaning, standardisation, and categorisation. Up to 95% accuracy, no manual effort.
                  </p>
                </div>
                <div style={{ textAlign: "center", color: "var(--purple)", fontSize: "1.4rem", margin: "1rem 0" }}>↓</div>
                <div className="quote-card" style={{ margin: 0 }}>
                  <div className="story-label">Clean, decision-ready data</div>
                  <p className="light-copy">Trusted data that plugs into your BI tools, informs your bids, and protects your margins.</p>
                </div>
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
                title="What data quality problems does Pearstop solve?"
                copy="Hard services, construction, infrastructure, and manufacturing companies share a common challenge: operational data that is decentralised, inconsistent, and difficult to use across teams and systems. Poor procurement data quality, unreliable asset registers, and unclassified spend are the most common blockers to category management, predictive maintenance, and digital transformation. Pearstop specialises in cleaning and structuring this operational data so technical businesses can act on it."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which solution you need?"
        lead="Talk to sales. We will identify exactly which data problem is costing you the most - and show you how to fix it."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "View Industries", href: "/industries", variant: "secondary" }
        ]}
      />
    </>
  );
}
