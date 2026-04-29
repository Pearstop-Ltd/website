import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { solutionLinks, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Quality Solutions for Hard Services and Infrastructure",
  description:
    "Six data quality solutions for technical industries - from UNSPSC procurement classification to asset data management and Microsoft Fabric readiness.",
  alternates: {
    canonical: `${siteConfig.url}/solutions`
  }
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Turn messy data into decisions"
        lead="Pearstop delivers six data integrity solutions for technical industries. Each one targets a specific data problem - and each one protects your margins."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title="Six solutions. One engine."
            lead="Clean data that gives you the confidence to make decisions, win bids, and protect margins."
          />

          <div className="bene-cards">
            {solutionLinks.map((solution, index) => (
              <article className={`bene-card ${index === 1 ? "featured" : ""}`} key={solution.href}>
                <div className="sol-eyebrow">{String(index + 1).padStart(2, "0")}</div>
                <h3>{solution.label}</h3>
                <p>{solution.description}</p>
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
                Whether it is procurement spend, asset registers, ledger data, or a data lake transition, Pearstop standardises, categorises, and enriches your data automatically. The output plugs straight into your existing tools.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Works with SAP, Oracle, your existing ERP, and BI tools</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Results in days, not months</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Scales from one dataset to your entire data estate</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>Built for hard services, construction, and manufacturing</div>
                </li>
              </ul>
            </div>
            <div className="col-md-6" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">Raw data in, decision-ready data out</div>
                <p className="light-copy">
                  Invoices, asset registers, SAP exports, supplier lists - from any format, any system. Pearstop helps teams get from raw operational data to something they can trust.
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
          { label: "Book a 7-minute discovery", href: "/contact", variant: "primary" },
          { label: "View Industries", href: "/industries", variant: "secondary" }
        ]}
      />
    </>
  );
}

