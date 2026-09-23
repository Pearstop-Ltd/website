import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CTABand, PageHero, QuoteBox } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning Business Supplier Consolidation (Anonymized Use Case)",
  description:
    "30 different suppliers invoiced one cleaning business for toilet paper in twelve months. Classified, the pattern was visible in days. An anonymized, illustrative use case for cleaning and soft FM procurement.",
  alternates: {
    canonical: `${siteConfig.url}/cases/cleaning-consumables-consolidation`,
    languages: alternateLanguages("/cases/cleaning-consumables-consolidation")
  }
};

const decisionRows = [
  { supplier: "Gompels", price: "£0.31", why: "Bulk price leader" },
  { supplier: "Bunzl CHS", price: "£0.33", why: "Contracted, Tork & Katrin" },
  { supplier: "Pattersons", price: "£0.38", why: "Regional next-day cover" },
  { supplier: "Amazon", price: "£0.41", why: "Spot buys, no terms" }
];

const priceRows = [
  { supplier: "Supplier A", price: "£0.31" },
  { supplier: "Supplier B", price: "£0.36" },
  { supplier: "Supplier C", price: "£0.41" },
  { supplier: "Supplier D", price: "£0.47" },
  { supplier: "Supplier E", price: "£0.52" }
];

const tableStyle: CSSProperties = { width: "100%", borderCollapse: "collapse", marginTop: "1.5rem" };
const thStyle: CSSProperties = { textAlign: "left", padding: "0.6rem 0.75rem", borderBottom: "2px solid var(--border)", fontSize: "0.82rem", color: "var(--muted)" };
const tdStyle: CSSProperties = { padding: "0.6rem 0.75rem", borderBottom: "1px solid var(--border)", fontSize: "0.94rem" };

export default function CleaningConsumablesConsolidationPage() {
  return (
    <>
      <PageHero
        eyebrow="Anonymized Use Case · Cleaning & Soft FM"
        title="Nobody chose 30 toilet paper suppliers. They just couldn't see them."
        lead="In one cleaning business, 30 different suppliers invoiced for toilet paper within twelve months. Illustrative data, based on a real pattern in soft FM procurement - not a named client engagement."
      />

      <section>
        <div className="container">
          <h2>The decision, once it's visible</h2>
          <p className="light-copy">
            Every line classified, the pattern was visible in days: here they are, cost, quality, and brand side by
            side, and the three worth keeping.
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Supplier</th>
                <th style={thStyle}>£/roll</th>
                <th style={thStyle}>Why</th>
              </tr>
            </thead>
            <tbody>
              {decisionRows.map((row) => (
                <tr key={row.supplier}>
                  <td style={tdStyle}>{row.supplier}</td>
                  <td style={tdStyle}>{row.price}</td>
                  <td style={tdStyle}>{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="light-copy" style={{ marginTop: "1rem" }}>
            30 suppliers found across twelve months. Three worth keeping, once the spend was classified and put side
            by side - yours to make, the table makes it obvious.
          </p>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <h2>Off-contract buying</h2>
          <p className="light-copy">
            Contracted price, through Bunzl: £19.20 for a case of 36 rolls. Actually paid, through Amazon: £26.80 for
            the same case - 40% more. A cost risk and a compliance risk: client contracts specify products and
            suppliers, and every off-contract line weakens your position at renegotiation.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Same roll, five prices</h2>
          <p className="light-copy">
            The same product, Tork Advanced T4, priced per roll across five suppliers:
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Supplier</th>
                <th style={thStyle}>Price paid per roll</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.supplier}>
                  <td style={tdStyle}>{row.supplier}</td>
                  <td style={tdStyle}>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="light-copy" style={{ marginTop: "1rem" }}>
            A 68% spread on the same product - invisible, line by line, until classified.
          </p>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>Your data doesn&rsquo;t need to be clean</h3>
              <p>Messy data is the starting point. Cleaning and classifying it is the product.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>AI-first, human reviewed</h3>
              <p>Every label checked. Classification holds up as new suppliers and invoices arrive.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Usage-based pricing</h3>
              <p>You pay for the lines processed. No heavy annual subscription.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="They classified thousands of product lines in under a week. That would have taken our team six months."
                author="David Torr"
                role="CEO, FARO"
              />
              <p className="light-copy" style={{ textAlign: "center", marginTop: "1.5rem" }}>
                Typical result in soft FM: 10-20% savings on addressable spend. The findings above are where it comes
                from.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Want to see this on your own spend?"
        lead="Send a sample of your own invoice data and we'll show you the same kind of pattern in your own numbers."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Explore cases", href: "/cases", variant: "secondary" }
        ]}
      />
    </>
  );
}
