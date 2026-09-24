import type { Metadata } from "next";
import {
  CaseBreadcrumb, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseQuoteCard,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
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
  ["WS-ALU-2000", "AluBuild Ltd", "£42.10"],
  ["Vensterbank alu", "Vensterbank BV", "£38.50"],
  ["Sill, window, aluminium", "Sill Supplies UK", "£51.20"],
  ["Windowsill alu 200cm", "NorthFrame Aluminium", "£44.00"],
  ["ALU SILL 2M", "BuildRight Merchants", "£36.75"],
  ["Aluminium sill 2000mm", "Fenster & Co", "£47.90"]
];

export default function ConstructionSpendBenchmarkingPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 88px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="Construction & Infrastructure" />
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 780 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="pattern" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Construction & Infrastructure · Illustrative data</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              Construction Spend Benchmarking
            </h1>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, fontWeight: 300, color: "var(--text)" }}>
              Your estimating problem is not an estimating problem. An estimate is a prediction of your own cost base.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--purple-soft)", padding: "18px 0", fontSize: 14, color: "var(--navy)" }}>
        <div className="container">
          <strong style={{ fontWeight: 600 }}>Illustrative data.</strong> Based on a real pattern in construction procurement &mdash; not a named client engagement.
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>The problem</CaseSectionLabel>
            <CaseH2>Why does the same item cost different amounts on different projects?</CaseH2>
            <CaseBodyP>One aluminium windowsill, bought on ten different projects, described ten different ways. Classified, the pattern is visible in days: here is what each project actually paid, and why two of them differ.</CaseBodyP>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--bg-soft)", padding: "14px 28px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>Item (6 of 10 shown)</span><span>Supplier</span><span>Price</span>
            </div>
            {windowsillRows.map((row) => (
              <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 28px", borderTop: "1px solid var(--border)", fontSize: 15, alignItems: "center" }}>
                <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 14 }}>{row[0]}</span>
                <span>{row[1]}</span>
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>{row[2]}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#F1F8E9", border: "1.5px solid var(--success)", borderRadius: 16, padding: "22px 24px" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E7D22", display: "block", marginBottom: 6 }}>Classified as</span>
            <strong style={{ fontSize: 18, color: "var(--navy)" }}>Aluminium windowsill, 200mm</strong>
            <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginTop: 4 }}>UNSPSC 30161801 · 10 suppliers, 10 purchases · 45% price spread (£36.75&ndash;£53.40)</span>
          </div>
          <CaseBodyP>Two purchases sit above the median: one fast-track site with no lead time to shop around, one specified a heavier gauge for a coastal project. Both explainable, both invisible until classified.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>Same scope, different price</CaseSectionLabel>
          <CaseH2>Why do two quotes for the same scope come in so differently?</CaseH2>
          <CaseBodyP>A groundworks package, compared across 8 comparable projects, shows a 34% spread. Site access and a fast timeline explain most of it. Two quotes sit outside the band, each with a reason attached once classified. The other six show what the scope should really cost.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>The blocker</CaseSectionLabel>
            <CaseH2>Why can&rsquo;t you benchmark spend behind a ledger code?</CaseH2>
            <CaseBodyP>A ledger item field like &ldquo;6100-42-K&rdquo; is a nominal accounting code standing in for the item itself. Common in ERPs built for finance, not procurement. Nobody can benchmark spend they can&rsquo;t see behind a code like that.</CaseBodyP>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 15, padding: "10px 14px", borderRadius: 8, background: "var(--bg-soft)", color: "var(--text)" }}>6100-42-K</span>
            <svg width="30" height="14" viewBox="0 0 30 14" fill="none" aria-hidden="true"><path d="M0 7 H24" stroke="var(--navy)" strokeWidth="1.6" /><path d="M22 2 L29 7 L22 12 Z" fill="var(--navy)" /></svg>
            <span style={{ fontSize: 16, fontWeight: 600, padding: "10px 14px", borderRadius: 8, background: "#F1F8E9", border: "1px solid var(--success)", color: "var(--navy)" }}>Structural steel fixings, M12</span>
          </div>
          <CaseBodyP>Pearstop works from invoices, ERP exports, purchase orders, and Excel &mdash; whatever format the data already arrives in &mdash; for cost-code benchmarking, outlier detection, and supplier consolidation.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseH2>From invoices in any format to a table you can act on</CaseH2>
          <CaseProcessDiagram
            inputs={["Invoices", "ERP", "POs", "Excel"]}
            steps={["Clean", "Classify", "Enrich"]}
            outputs={[
              { text: "Cost-code benchmarking", bg: "var(--blue-soft)" },
              { text: "Outlier detection", bg: "var(--purple-soft)" },
              { text: "Supplier consolidation", bg: "#F1F8E9" }
            ]}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
            {[
              { t: "Your data doesn't need to be clean", c: "Free-text descriptions and accounting codes are the starting point, not a blocker." },
              { t: "AI-first, human reviewed", c: "Every label checked. Classification holds up as new invoices and projects arrive." },
              { t: "Usage-based pricing", c: "You pay for the lines processed. No heavy annual subscription." }
            ].map((f) => (
              <div key={f.t} style={{ background: "#fff", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--primary-dark)" }}>{f.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{f.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "96px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
          <div style={{ background: "#F1F8E9", borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E7D22" }}>Typical result in specialised construction</span>
            <span style={{ fontSize: 64, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--navy)" }}>8&ndash;15%</span>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: "var(--navy)" }}>savings on addressable spend. The findings above are where it comes from.</p>
          </div>
          <CaseQuoteCard
            quote="Built and proven with a major Dutch infrastructure contractor, starting from zero classification history."
            initials="ST"
            name="Strukton"
            role="Infrastructure, Netherlands"
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/strukton", label: "Client case · Infrastructure", title: "35,000 to 50,000 spend lines a month to UNSPSC for Strukton" },
          { href: "/cases/cleaning-consumables-consolidation", label: "Pattern · Cleaning", title: "30 toilet paper suppliers in twelve months, and nobody chose them" },
          { href: "/cases/mro-confidential", label: "Pattern · Manufacturing & MRO", title: "The real manufacturer part number behind every reseller code" }
        ]}
      />

      <CaseClosingCTA
        title="Want to see this on your own spend?"
        lead="Send a sample of your own procurement data and we'll show you the same kind of pattern in your own numbers."
        ctaLabel="Talk to sales"
        ctaHref={siteConfig.calendly}
        external
      />
    </>
  );
}
