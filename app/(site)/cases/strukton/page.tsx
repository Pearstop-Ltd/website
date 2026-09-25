import type { Metadata } from "next";
import Link from "next/link";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseQuoteCard, CaseTwoPanel, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strukton Case Study",
  description:
    "Pearstop built an AI classification system with Strukton's procurement team: 35,000 to 50,000 lines of spend classified into UNSPSC every month, starting from zero classification history.",
  alternates: {
    canonical: `${siteConfig.url}/cases/strukton`,
    languages: alternateLanguages("/cases/strukton")
  }
};

export default function StruktonCaseStudyPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="Strukton" />
          <CaseHero
            aside={
              <CaseFactSheet
                rows={[
                  { label: "Client", value: "Strukton" },
                  { label: "Data", value: "Procurement spend, via SAP & procurement system" },
                  { label: "Scope", value: "35,000 to 50,000 lines a month" },
                  { label: "Approach", value: "AI + ML pipeline + human-in-the-loop" }
                ]}
              />
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="client" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Infrastructure · Netherlands</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2rem, 3.6vw, 2.9rem)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              35,000 to 50,000 procurement lines a month classified to UNSPSC, from zero, for Strukton
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
              Strukton is a major Dutch infrastructure contractor. Pearstop built this system together with their procurement department. It classified every line of spend into UNSPSC, automatically, every month.
            </p>
          </CaseHero>
        </div>
      </section>

      <CaseResultsBand
        stats={[
          { value: "35k–50k", label: "spend lines a month" },
          { value: "0", label: "classification history at the start" },
          { value: "4", label: "UNSPSC levels per line" },
          { value: "Weekly", label: "buyer feedback cadence" },
          { value: "+20%", label: "classification accuracy gained by adding human review, compared with AI alone and without context" }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>The problem</CaseSectionLabel>
          <CaseH2>Why can&rsquo;t you find procurement savings without granular spend data?</CaseH2>
          <CaseBodyP>Strukton had identified a real cost-saving opportunity in procurement. To act on it, they needed higher granularity in their spend data. Their spend was already well organized. What they didn&rsquo;t have was UNSPSC classification. This project started from zero classification history.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>How it worked</CaseSectionLabel>
            <CaseH2>How does an AI classification system avoid guessing on your data?</CaseH2>
            <CaseBodyP>Pearstop and Strukton&rsquo;s procurement team built a system with three layers, avoiding the most common mistake in AI projects: reinventing the wheel without giving the model enough context to work from.</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={["SAP purchase orders", "Supplier invoices", "Prior buyer decisions"]}
            steps={["AI classified each line", "ML pipeline learned from context", "Human-in-the-loop for the rest"]}
            outputs={[
              { text: "Segment → Family → Class → Commodity", bg: "var(--blue-soft)" },
              { text: "Confidence score per line", bg: "var(--purple-soft)" },
              { text: "Weekly buyer feedback loop", bg: "#F1F8E9" }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>Why granularity matters</CaseSectionLabel>
          <CaseH2>Why do all four UNSPSC levels matter, not just the top one?</CaseH2>
          <CaseBodyP>Every month, a new batch of spend came in. Pearstop processed all of it. Each line got four levels of UNSPSC classification: segment, family, class, and commodity.</CaseBodyP>
          <div style={{ background: "var(--bg-soft)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>Four levels, broadest to most specific</span>
            <strong style={{ fontSize: 18, color: "var(--navy)" }}>Segment → Family → Class → Commodity</strong>
          </div>
          <CaseBodyP>
            A segment is the broadest category. A commodity is the most specific. Classifying to all four levels, not just the top one, is what makes the data usable for real decisions &mdash; benchmarking one specific product across suppliers, not just a broad category average.{" "}
            <Link href="/blog/what-is-unspsc">Read more about how UNSPSC&rsquo;s four levels work</Link>.
          </CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteCard
            quote="Built and proven with a major Dutch infrastructure contractor, starting from zero classification history."
            personId="strukton"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: "How it improves",
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: "More accurate every month, not just more used",
                copy: "Strukton's buyers reviewed what the AI classified, flagged what was right and what wasn't, and every correction fed back into the system. Pearstop and Strukton's team met weekly to go over what was working and what wasn't."
              },
              {
                label: "The result",
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: "From zero classification to full granularity",
                copy: "Before this project, Strukton had no UNSPSC classification at all. By the end of the engagement, 35,000 to 50,000 lines of spend were classified automatically every month, to all four UNSPSC levels. That is the granularity the original cost-saving opportunity needed to actually be acted on."
              }
            ]}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/spie", label: "Client case · Hard Services FM", title: "9,175 supplier spellings brought back to 1,493 for SPIE" },
          { href: "/cases/faro", label: "Client case · Retail", title: "Margin visible before the purchase is committed, for FARO" },
          { href: "/cases/construction-spend-benchmarking", label: "Pattern · Construction", title: "A 45% price spread on one aluminium windowsill, bought on ten projects" }
        ]}
      />

      <CaseClosingCTA
        title="Want a case study built around your data?"
        lead="We can show you what the same approach would look like for your procurement or asset data."
        ctaLabel="Send us a sample"
        sample
      />
    </>
  );
}
