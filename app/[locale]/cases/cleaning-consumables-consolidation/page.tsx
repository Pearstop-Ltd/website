import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseQuoteCard,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { CaseTileGrid, CasePriceBars, CaseSpendDonut } from "@/components/case-design-charts";
import { alternateLanguages, siteConfig } from "@/lib/site";
import styles from "@/components/case-design.module.css";

export const metadata: Metadata = {
  title: "Cleaning Consumables Consolidation (Anonymized Use Case)",
  description:
    "Nobody chose 30 toilet paper suppliers. Classified, the pattern was visible in days. An anonymized, illustrative use case for cleaning and soft FM procurement.",
  alternates: {
    canonical: `${siteConfig.url}/cases/cleaning-consumables-consolidation`,
    languages: alternateLanguages("/cases/cleaning-consumables-consolidation")
  }
};

const suppliers = [
  { name: "Gompels", price: "£0.31", terms: "Account, 30 days", delivery: "National, 2 to 3 days" },
  { name: "Bunzl CHS", price: "£0.33", terms: "Contracted, one invoice", delivery: "National, scheduled" },
  { name: "Pattersons", price: "£0.38", terms: "Account, 30 days", delivery: "Regional, next day" },
  { name: "Amazon Business", price: "£0.41", terms: "Spot, no terms", delivery: "Next day, per parcel" }
];

const bars = [0.31, 0.36, 0.41, 0.47, 0.52].map((p, i) => ({
  label: "Supplier " + "ABCDE"[i],
  price: "£" + p.toFixed(2),
  w: Math.round((p / 0.52) * 100) + "%",
  color: i === 4 ? "var(--purple)" : "var(--primary)"
}));

export default function CleaningCaseStudyPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 88px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="Cleaning & soft FM" />
          <CaseHero
            equal
            aside={
              <div style={{ background: "var(--bg-soft)", borderRadius: 24, padding: 40, display: "flex", flexDirection: "column", gap: 18 }}>
                <CaseTileGrid total={30} finalIndices={[4, 15, 25]} />

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)", flexWrap: "wrap", gap: 8 }}>
                  <span>Each tile is a supplier that invoiced for toilet paper</span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--success)" }} />the three worth keeping
                  </span>
                </div>
              </div>
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="pattern" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Cleaning & soft FM · Illustrative data</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              Nobody chose 30 toilet paper suppliers.
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 22, lineHeight: 1.5, fontWeight: 300, color: "var(--text)" }}>
              They just couldn&rsquo;t see them. One cleaning business, twelve months of invoices, and a simple question nobody could answer: what do we spend on toilet paper?
            </p>
          </CaseHero>
        </div>
      </section>

      <section style={{ background: "var(--purple-soft)", padding: "18px 0", fontSize: 14, color: "var(--navy)" }}>
        <div className="container">
          This case is built on a pattern we see again and again in soft FM procurement.
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>Before</CaseSectionLabel>
            <CaseH2>The spend is there. The picture isn&rsquo;t.</CaseH2>
            <CaseBodyP>What we hear from cleaning businesses, before any data changes hands.</CaseBodyP>
          </div>
          <div className={styles.grid4} style={{ "--cols": 4, gap: 20 } as CSSProperties}>
            {[
              { t: "Invoices arrive as PDFs", c: "Line detail sits inside documents nobody re-reads. The ERP holds supplier totals, not what was bought.", dot: "var(--primary)" },
              { t: "Every site orders its own way", c: "Site managers buy consumables locally. One product enters the books under twenty descriptions.", dot: "var(--primary)" },
              { t: "One person runs procurement", c: "There is time to keep sites supplied. There is no time to benchmark prices or question what comes in.", dot: "var(--primary)" },
              { t: "Client reports built by hand", c: "Each month, numbers pulled from an audit tool, a supplier portal, and email. Every client wants a different cut.", dot: "var(--purple)" }
            ].map((b) => (
              <div key={b.t} style={{ background: "var(--bg-soft)", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: b.dot }} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--primary-dark)" }}>{b.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{b.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className={`container ${styles.twoColWide}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <CaseSectionLabel>Once every line is classified</CaseSectionLabel>
            <CaseH2>One product. 30 suppliers. Now side by side.</CaseH2>
            <CaseBodyP>Classified, the pattern was visible in days: every supplier, what each charged per roll, and on what terms. Which three to keep is your call. The table makes it an easy one.</CaseBodyP>
            <div style={{ background: "#F1F8E9", border: "1.5px solid var(--success)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#4E7D22", textTransform: "uppercase", letterSpacing: "0.08em" }}>The decision</span>
              <span style={{ fontSize: 15, color: "var(--navy)" }}><strong style={{ fontWeight: 600 }}>Bunzl CHS</strong> · contracted core supply</span>
              <span style={{ fontSize: 15, color: "var(--navy)" }}><strong style={{ fontWeight: 600 }}>Gompels</strong> · bulk price leader</span>
              <span style={{ fontSize: 15, color: "var(--navy)" }}><strong style={{ fontWeight: 600 }}>Pattersons</strong> · regional next-day cover</span>
            </div>
          </div>
          <div className={styles.microTableScroll}>
            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.6fr 1.3fr", background: "var(--primary-dark)", padding: "16px 24px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff" }}>
                <span>Supplier</span><span>£ / roll</span><span>Terms</span><span>Delivery</span>
              </div>
              {suppliers.map((s) => (
                <div key={s.name} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.6fr 1.3fr", padding: "16px 24px", borderTop: "1px solid var(--border)", fontSize: 15, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>{s.name}</span>
                  <span style={{ color: "var(--navy)", fontWeight: 500 }}>{s.price}</span>
                  <span style={{ color: "var(--text)", fontWeight: 300 }}>{s.terms}</span>
                  <span style={{ color: "var(--text)", fontWeight: 300 }}>{s.delivery}</span>
                </div>
              ))}
              <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>4 of 30 shown · Standard 2-ply</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>And then</CaseSectionLabel>
            <CaseH2>What else shows up when every line is classified</CaseH2>
          </div>
          <div className={styles.grid3} style={{ "--cols": 3, gap: 24 } as CSSProperties}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>Off-contract buying</h3>
              <div style={{ border: "1px solid var(--blue-soft)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Contracted · Bunzl</span>
                <span style={{ fontSize: 26, fontWeight: 600, color: "var(--primary)" }}>£19.20 <span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)" }}>case of 36 rolls</span></span>
              </div>
              <div style={{ border: "1.5px solid var(--purple)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4, background: "#FAF8FF" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Actually paid · Amazon</span>
                <span style={{ fontSize: 26, fontWeight: 600, color: "var(--primary-dark)" }}>£26.80 <span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)" }}>same case, +40%</span></span>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>A cost risk and a compliance risk. Client contracts specify products and suppliers, and every off-contract line weakens your position at renegotiation.</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>Same roll, five prices</h3>
              <span style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>Tork Advanced T4, price paid per roll</span>
              <CasePriceBars bars={bars} />
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}><strong style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>68%</strong> spread on one product. Each price sits on a different invoice under a different description.</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>Spend you can&rsquo;t see</h3>
              <CaseSpendDonut filledLength={57.3} totalLength={238.8} />
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}><strong style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>24%</strong> of spend uncategorised. You can&rsquo;t benchmark it, negotiate it, or report on it until it has a label.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseH2>From invoices in any format to a table you can act on</CaseH2>
          <CaseProcessDiagram
            inputs={["PDF invoices", "ERP exports", "Ordering portals", "Excel sheets"]}
            steps={["Clean", "Classify", "Enrich"]}
            outputs={[
              { text: "What you spend, per product", bg: "var(--blue-soft)" },
              { text: "Off-contract and outlier lines", bg: "var(--purple-soft)" },
              { text: "Suppliers per category, side by side", bg: "#F1F8E9" }
            ]}
          />
          <div className={styles.grid3} style={{ "--cols": 3, gap: 20 } as CSSProperties}>
            {[
              { t: "Your data doesn't need to be clean", c: "Messy data is the starting point. Cleaning and classifying it is the product." },
              { t: "AI-first, human reviewed", c: "Every label checked. Classification holds up as new suppliers and invoices arrive." },
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
        <div className={`container ${styles.twoPanel}`}>
          <div style={{ background: "#F1F8E9", borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E7D22" }}>Typical result in soft FM</span>
            <span style={{ fontSize: 64, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--navy)" }}>10&ndash;20%</span>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: "var(--navy)" }}>savings on addressable spend. The findings above are where it comes from.</p>
          </div>
          <CaseQuoteCard
            quote="It would have taken five engineers and a full year to clean this up. So we decided to look for a better solution."
            role="Head of Operations, Cleaning services company"
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/spie", label: "Client case · Hard Services FM", title: "9,175 supplier spellings brought back to 1,493 for SPIE" },
          { href: "/cases/construction-spend-benchmarking", label: "Pattern · Construction", title: "A 45% price spread on one aluminium windowsill, bought on ten projects" },
          { href: "/cases/mro-confidential", label: "Pattern · Manufacturing & MRO", title: "The real manufacturer part number behind every reseller code" }
        ]}
      />

      <CaseClosingCTA
        title="See this on your own invoices"
        lead="Send up to 200 invoice lines or ten invoices. We send them back labelled, so you can see the same kind of pattern in your own numbers."
        ctaLabel="Send your sample"
        sample
      />
    </>
  );
}
