import type { Metadata } from "next";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseStepCards, CaseDataTable, CaseStatBar, CaseQuoteBig, CaseQuoteCard, CaseTwoPanel,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";
import styles from "@/components/case-design.module.css";

export const metadata: Metadata = {
  title: "SPIE Case Study",
  description:
    "Pearstop consolidated 9,175 supplier name variants into 1,493 canonical suppliers across 204,029 asset records for SPIE Building Solutions — the same classification pipeline behind Pearstop's procurement data cleaning.",
  alternates: {
    canonical: `${siteConfig.url}/cases/spie`,
    languages: alternateLanguages("/cases/spie")
  }
};

const pumpRows = [
  ["NORDPUMP", "Series 3", "Nordpump", "Series 3", "Base"],
  ["Nordpump B.V.", "S3 32-120 F", "Nordpump", "Series 3", "32-120 F"],
  ["Nordpmp", "SERIES3 25-60", "Nordpump", "Series 3", "25-60"],
  ["NORDPUMP NL", "s3 32-120F", "Nordpump", "Series 3", "32-120 F"],
  ["Nordpump Pompen", "Series-3 40-80", "Nordpump", "Series 3", "40-80"]
];

export default function SpieCaseStudyPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="SPIE Building Solutions" />
          <CaseHero
            aside={
              <CaseFactSheet
                rows={[
                  { label: "Client", value: "SPIE Building Solutions BV" },
                  { label: "Data", value: "Asset register: manufacturer and equipment type" },
                  { label: "Scope", value: "204,029 asset records" },
                  { label: "Approach", value: "Rules + LLM cross-check + human review" }
                ]}
              />
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="client" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Hard Services FM · Asset data</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              9,175 supplier spellings brought back to 1,493 for SPIE Building Solutions
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
              SPIE&rsquo;s asset register had been fed by maintenance systems, contractors, and manual entry for years. Pearstop matched every manufacturer against SPIE&rsquo;s own approved list, scored each record for confidence, and gave the team a ranked list of where to review first.
            </p>
          </CaseHero>
        </div>
      </section>

      <CaseResultsBand
        stats={[
          { value: "9,175 → 1,493", label: "supplier name variants consolidated" },
          { value: "73.1%", label: "matches confirmed against the approved list" },
          { value: "107,081", label: "lines enhanced with family and variant" },
          { value: "100%", label: "of records scored for confidence and review priority" }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className={`container ${styles.twoCol}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <CaseSectionLabel>The situation</CaseSectionLabel>
            <CaseH2>One manufacturer, a dozen spellings</CaseH2>
            <CaseBodyP>
              SPIE Building Solutions manages a large portfolio of building assets across many sites. Over the years its register was filled from different maintenance systems, contractor uploads, and manual entry.
            </CaseBodyP>
            <CaseBodyP>
              The result: the same manufacturer under a dozen spellings, and equipment types missing or recorded wrongly. The lists worked for a mechanic on site. They did not work for planning maintenance or pricing bid risk across a portfolio.
            </CaseBodyP>
          </div>
          <div style={{ background: "var(--bg-soft)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Why this is our problem too</span>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, fontWeight: 400, color: "var(--navy)" }}>
              Every asset carries a manufacturer and a type, the same way every purchase order line carries a supplier and a description. The engine that cleans spend data works on an asset register without changes.
            </p>
            <div style={{ display: "flex", gap: 12, paddingTop: 8, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Purchase order line</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Supplier + description</span>
              </div>
              <div style={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Asset record</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Manufacturer + type</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>How it worked</CaseSectionLabel>
            <CaseH2>Matched against the list SPIE already trusts</CaseH2>
            <CaseBodyP>Early on we saw general AI models guess or invent supplier names. So every row was matched against SPIE&rsquo;s own approved supplier list, and nothing else.</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={["Maintenance systems", "Contractor uploads", "Manual entry"]}
            steps={["Match against the approved list", "Cross-check with a language model", "Route conflicts to a person"]}
            outputs={[
              { text: "Canonical supplier", bg: "#F1F8E9" },
              { text: "Product family + variant", bg: "var(--blue-soft)" },
              { text: "Confidence + review priority", bg: "var(--purple-soft)" }
            ]}
          />
          <CaseStepCards
            steps={[
              { title: "Deterministic matching first", copy: "Exact, prefix, edit-distance, and typo-correction matching against SPIE's approved suppliers, wherever a rule could decide." },
              { title: "An independent second opinion", copy: "A large language model checked each match on its own. Where the two agreed, confidence went up." },
              { title: "People decide the hard ones", copy: "Conflicting matches went to SPIE's master data team, and every decision fed the next iteration." }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>A concrete example</CaseSectionLabel>
            <CaseH2>Five spellings of one pump maker, resolved</CaseH2>
            <CaseBodyP>One family of circulation pumps showed up under five supplier spellings, one a plain typo. The type field was messier still: a bare family name in one row, a full model code in the next.</CaseBodyP>
          </div>
          <CaseDataTable
            columns={["Supplier, as it arrived", "Type, as it arrived", "Supplier", "Family", "Variant"]}
            rows={pumpRows}
            footnote="Names changed. The shape matches the real register. A supplier team now sees this exact pump family, in these exact configurations, instead of “pumps, all sorts”."
          />
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className={`container ${styles.twoColCenter}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <CaseSectionLabel>Where to look first</CaseSectionLabel>
            <CaseH2>A ranked review list instead of a wall of rows</CaseH2>
            <CaseBodyP>Every record got three scores: supplier confidence, type confidence, and review priority. SPIE&rsquo;s team started at the top of the list and worked down.</CaseBodyP>
            <CaseStatBar
              percent="73.1%"
              segments={[
                { width: "73.1%", bg: "var(--success)", label: "confirmed", color: "var(--navy)" },
                { width: "auto", bg: "var(--purple)", label: "For review", legendLabel: "Queued for review, highest priority first", color: "var(--navy)" }
              ]}
            />
          </div>
          <CaseQuoteBig
            quote="The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows."
            personId="bartVanPeij"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: "What we learned",
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: "When a client has an approved list, match against that list",
                copy: "Matching only against SPIE's validated suppliers raised both accuracy and the team's trust in the output. It is now standard on every Pearstop engagement with a defined supplier base."
              },
              {
                label: "What it changes",
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: "From servicing assets to advising on them",
                copy: "With a structured register, SPIE can look at a whole equipment family and spot repeat failures across a client's portfolio. A technician can say:",
                pullQuote: "This pump family fails at this rate across your sites. Here is what we recommend."
              }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container">
          <CaseQuoteCard
            quote="Pearstop's manufacturer matching gave us the right starting point to load data back into the ERP. This project taught us a lot about data cleaning with AI."
            personId="martijnVanBalkom"
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/strukton", label: "Client case · Infrastructure", title: "35,000 to 50,000 spend lines a month to UNSPSC for Strukton" },
          { href: "/cases/faro", label: "Client case · Retail", title: "Margin visible before the purchase is committed, for FARO" },
          { href: "/cases/cleaning-consumables-consolidation", label: "Pattern · Cleaning", title: "30 toilet paper suppliers in twelve months, and nobody chose them" }
        ]}
      />

      <CaseClosingCTA
        title="Same problem in your asset register?"
        lead="Send us a sample of your asset or equipment data. We match it against your own reference list and send it back scored, so you see a first pass on your own records."
        ctaLabel="Send a sample"
        sample
      />
    </>
  );
}
