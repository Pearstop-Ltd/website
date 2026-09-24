import type { Metadata } from "next";
import {
  CaseBreadcrumb, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseTwoPanel,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Going Direct to the Manufacturer (Anonymized Use Case)",
  description:
    "How Pearstop replaces slow, error-prone offshore MRO part research with a fast, checked one. An anonymized, illustrative use case for manufacturing and MRO.",
  alternates: {
    canonical: `${siteConfig.url}/cases/mro-confidential`,
    languages: alternateLanguages("/cases/mro-confidential")
  }
};

export default function MroCaseStudyPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="Manufacturing & MRO" />
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 780 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="pattern" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Manufacturing & MRO · Illustrative data</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              Going direct to the manufacturer
            </h1>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
              How Pearstop replaces slow, error-prone offshore MRO part research with a fast, checked one.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--purple-soft)", padding: "18px 0", fontSize: 14, color: "var(--navy)" }}>
        <div className="container">
          <strong style={{ fontWeight: 600 }}>Illustrative use case.</strong> Not a named client story &mdash; it reflects a pattern Pearstop sees repeatedly in MRO and component sourcing, built to show clearly what the product actually does.
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>The problem</CaseSectionLabel>
          <CaseH2>Why is buying MRO parts direct from the manufacturer so slow?</CaseH2>
          <CaseBodyP>It usually starts with research: finding the real manufacturer part number behind whatever code a reseller or an old purchase order used. That research is typically outsourced to offshore research bureaus, commonly in India, working by hand &mdash; it works, but it is slow.</CaseBodyP>
          <CaseBodyP>AI can do this research faster. It can also get it wrong in a specific way: general-purpose AI models hallucinate part numbers and don&rsquo;t check their own work. That is exactly where a specialized provider matters &mdash; one with real experience running AI projects that verify what they produce rather than guessing.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>How it works</CaseSectionLabel>
            <CaseH2>Checked matches, not guesses</CaseH2>
            <CaseBodyP>Pearstop matches part records against manufacturer reference data, flags anything it can&rsquo;t confirm with confidence for human review, and replaces a slow offshore research cycle with a fast, checked one.</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={["Reseller part codes", "Old purchase orders", "Supplier catalogs"]}
            steps={["Match against manufacturer data", "Flag anything unconfirmed", "Route to a person to verify"]}
            outputs={[
              { text: "Real manufacturer part number", bg: "#F1F8E9" },
              { text: "Confidence score per match", bg: "var(--purple-soft)" }
            ]}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 13, padding: "8px 10px", borderRadius: 6, background: "#fff", color: "var(--muted)", textDecoration: "line-through" }}>RS-448120</span>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true"><path d="M0 6 H16" stroke="var(--navy)" strokeWidth="1.6" /><path d="M15 1 L21 6 L15 11 Z" fill="var(--navy)" /></svg>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 13, padding: "8px 10px", borderRadius: 6, background: "#F1F8E9", border: "1px solid var(--success)", color: "var(--navy)" }}>MFR 6205-2RS</span>
            <span style={{ fontSize: 12, color: "#4E7D22", fontWeight: 500 }}>Checked against manufacturer data</span>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: "Why it's hard",
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: "Offshore research works, but it's slow",
                copy: "The traditional path outsources part-number research to offshore bureaus working by hand - accurate enough, but slow enough to hold up a purchasing decision."
              },
              {
                label: "Why it's possible now",
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: "AI, checked rather than trusted blindly",
                copy: "General AI models hallucinate part numbers if you let them guess. Matching against real manufacturer reference data, with anything uncertain routed to a person, gets the speed of AI without the risk."
              }
            ]}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/lemtech", label: "Client case · Manufacturing", title: "Turning messy site-visit notes into clean proposals for Lemtech" },
          { href: "/cases/construction-spend-benchmarking", label: "Pattern · Construction", title: "A 45% price spread on one aluminium windowsill, bought on ten projects" },
          { href: "/cases/cleaning-consumables-consolidation", label: "Pattern · Cleaning", title: "30 toilet paper suppliers in twelve months, and nobody chose them" }
        ]}
      />

      <CaseClosingCTA
        title="Same problem with your MRO data?"
        lead="Send us a sample of your part records and we'll show you what a checked match against manufacturer data looks like on your own numbers."
        ctaLabel="Talk to sales"
        ctaHref={siteConfig.calendly}
        external
      />
    </>
  );
}
