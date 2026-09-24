import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CTABand, PageHero, QuoteBox } from "@/components/content";
import { CaseSpreadChart } from "@/components/case-spread-chart";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Construction Spend Benchmarking (Anonymized Use Case)",
  description:
    "One aluminium windowsill, bought on ten projects, described ten different ways. Classified, the price spread is visible in days. An anonymized, illustrative use case for construction and infrastructure procurement.",
  alternates: {
    canonical: `${siteConfig.url}/cases/construction-spend-benchmarking`,
    languages: alternateLanguages("/cases/construction-spend-benchmarking")
  }
};

const windowsillRows = [
  { item: "WS-ALU-2000", supplier: "AluBuild Ltd", price: "£42.10" },
  { item: "Vensterbank alu", supplier: "Vensterbank BV", price: "£38.50" },
  { item: "Sill, window, aluminium", supplier: "Sill Supplies UK", price: "£51.20" },
  { item: "Windowsill alu 200cm", supplier: "NorthFrame Aluminium", price: "£44.00" },
  { item: "ALU SILL 2M", supplier: "BuildRight Merchants", price: "£36.75" },
  { item: "Aluminium sill 2000mm", supplier: "Fenster & Co", price: "£47.90" }
];

const tableStyle: CSSProperties = { width: "100%", borderCollapse: "collapse", marginTop: "1.5rem" };
const thStyle: CSSProperties = { textAlign: "left", padding: "0.6rem 0.75rem", borderBottom: "2px solid var(--border)", fontSize: "0.82rem", color: "var(--muted)" };
const tdStyle: CSSProperties = { padding: "0.6rem 0.75rem", borderBottom: "1px solid var(--border)", fontSize: "0.94rem" };

export default function ConstructionSpendBenchmarkingPage() {
  return (
    <>
      <PageHero
        eyebrow="Anonymized Use Case · Construction & Infrastructure"
        title="Construction Spend Benchmarking"
        lead="Your estimating problem is not an estimating problem."
        leadAccent
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                An estimate is a prediction of your own cost base. Most contractors and manufacturers have limited
                visibility on their contracts and spend. Illustrative data, based on a real pattern in construction
                procurement - not a named client engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="case-wayfinder">The problem</h2>
          <h3 className="case-question">Why does the same item cost different amounts on different projects?</h3>
          <p className="light-copy">
            One aluminium windowsill, bought on ten different projects, described ten different ways. Classified,
            the pattern is visible in days: here is what each project actually paid, and why two of them differ.
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Item (6 of 10 shown)</th>
                <th style={thStyle}>Supplier</th>
                <th style={thStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {windowsillRows.map((row) => (
                <tr key={row.item}>
                  <td style={tdStyle}>{row.item}</td>
                  <td style={tdStyle}>{row.supplier}</td>
                  <td style={tdStyle}>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="case-callout" style={{ marginTop: "1.25rem" }}>
            <span className="case-callout-label">Classified as</span>
            <strong>Aluminium windowsill, 200mm</strong>
            <span className="light-copy" style={{ display: "block", marginTop: "0.2rem" }}>
              UNSPSC 30161801 · 10 suppliers, 10 purchases
            </span>
          </div>

          <div className="case-grid-2" style={{ marginTop: "1.75rem" }}>
            <CaseSpreadChart
              title="Price spread across the ten"
              points={[42.1, 38.5, 51.2, 44.0, 36.75, 47.9]}
              minLabel="£36.75"
              maxLabel="£53.40"
              percent="45%"
              percentLabel="Spread, one item. Two sit above the median: one fast-track site with no lead time to shop around, one specified a heavier gauge for a coastal project. Both explainable, both invisible until classified."
            />
            <CaseSpreadChart
              title="Same scope, different price"
              points={[1, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.4]}
              minLabel="Site access"
              maxLabel="Fast timeline"
              percent="34%"
              percentLabel="Spread, explainable. Two quotes sit outside the band, each with a reason attached once classified. The other six show what the scope should really cost."
            />
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <h2 className="case-wayfinder">The blocker</h2>
          <h3 className="case-question">Why can&rsquo;t you benchmark spend behind a ledger code?</h3>
          <p className="light-copy">
            A ledger item field like &ldquo;6100-42-K&rdquo; is a nominal accounting code standing in for the item
            itself. Common in ERPs built for finance, not procurement. Nobody can benchmark spend they can&rsquo;t
            see behind a code like that.
          </p>
          <div className="case-callout" style={{ marginTop: "1rem" }}>
            <span className="case-callout-label">Ledger field 6100-42-K resolves to</span>
            <strong>Structural steel fixings, M12</strong>
          </div>
          <p className="light-copy" style={{ marginTop: "1.25rem" }}>
            Pearstop works from invoices, ERP exports, purchase orders, and Excel - whatever format the data already
            arrives in - for cost-code benchmarking, outlier detection, and supplier consolidation.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="case-wayfinder">The result</h2>
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>Your data doesn&rsquo;t need to be clean</h3>
              <p>Free-text descriptions and accounting codes are the starting point, not a blocker.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>AI-first, human reviewed</h3>
              <p>Every label checked. Classification holds up as new invoices and projects arrive.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Usage-based pricing</h3>
              <p>You pay for the lines processed. No heavy annual subscription.</p>
            </article>
          </div>

          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="Built and proven with a major Dutch infrastructure contractor, starting from zero classification history."
                author="Strukton"
                role="Infrastructure, Netherlands"
              />
              <div className="case-result-banner" style={{ marginTop: "1.5rem" }}>
                Typical result in specialised construction: <strong>8-15% savings on addressable spend.</strong> The
                findings above are where it comes from.
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Want to see this on your own spend?"
        lead="Send a sample of your own procurement data and we'll show you the same kind of pattern in your own numbers."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Explore cases", href: "/cases", variant: "secondary" }
        ]}
      />
    </>
  );
}
