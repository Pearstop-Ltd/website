import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality Solutions for Hard Services and Infrastructure",
  description:
    "Six data quality solutions for technical industries - from UNSPSC procurement classification to asset data management and Microsoft Fabric readiness.",
  alternates: {
    canonical: `${siteConfig.url}/solutions`
  }
};

export default function SolutionsPage() {
  const solutionCards = [
    {
      eyebrow: "01",
      title: "Data Quality",
      copy: "Automatically clean and standardise your data at scale. Eliminate inconsistencies, fill gaps, and build a single source of truth your team can trust.",
      href: "/data-quality"
    },
    {
      eyebrow: "02",
      title: "Procurement",
      copy: "Create a credible spend baseline from messy invoice and supplier databases. Automated categorisation eliminates incomplete data with 95% less manual effort.",
      href: "/procurement-data-quality"
    },
    {
      eyebrow: "03",
      title: "UNSPSC",
      copy: "Auto-assign up to 95% of spend data using the United Nations Standard Products and Services Code. Industry-standard classification with zero manual tagging.",
      href: "/unspsc"
    },
    {
      eyebrow: "04",
      title: "Asset Management",
      copy: "Transform fragmented asset registers into trusted, analysable datasets. Reduce ad-hoc maintenance and enable data-driven risk management.",
      href: "/asset-data-management"
    },
    {
      eyebrow: "05",
      title: "Fabric Ready",
      copy: "Prepare your operational data for Microsoft Fabric migration. Clean, structured data that lands cleanly from day one. No rework after migration.",
      href: "/fabric"
    },
    {
      eyebrow: "06",
      title: "AI Readiness",
      copy: "Build the data foundation your AI initiatives need. Organisations with governed, structured data are twice as likely to achieve measurable AI ROI within 12 months.",
      href: "/ai-readiness"
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Turn messy data into decisions"
        lead="Pearstop delivers six data integrity solutions for technical industries. Each one targets a specific data problem and every one is built to protect your margins."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title="Six Solutions. One Goal."
            lead="Pearstop delivers six data quality solutions for technical industries. Each one targets a specific operational data problem, built for hard services, construction, and manufacturing."
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
        lead="Book a 7-minute discovery call. We will identify exactly which data problem is costing you the most - and show you how to fix it."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "View Industries", href: "/industries", variant: "secondary" }
        ]}
      />
    </>
  );
}
