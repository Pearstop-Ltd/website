import type { Metadata } from "next";
import Script from "next/script";
import {
  CaseBreadcrumb, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseStepCards, CaseQuoteBig, CaseTwoPanel, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "FARO Case Study",
  description:
    "Pearstop classified thousands of product lines for FARO, linked them to sales data, and made margin visible before the purchase was committed.",
  alternates: {
    canonical: `${siteConfig.url}/cases/faro`,
    languages: alternateLanguages("/cases/faro")
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does linking classification to sales data make margin visible before a purchase?",
      acceptedAnswer: { "@type": "Answer", text: "Once every product line is classified consistently, it can be joined against historical sales performance for that same category. That gives a margin estimate at the point of the buying decision, instead of after the container has landed and been sold through." }
    }
  ]
};

export default function FaroCaseStudyPage() {
  return (
    <>
      <Script id="faro-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="FARO" />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)", gap: 72, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <CaseTypeBadge type="client" />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Retail · South Africa</span>
              </div>
              <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
                30,000 product lines classified per buying decision, in a week, for FARO
              </h1>
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
                For every container purchase, FARO needed to categorise around 30,000 product lines to estimate margin, sale price, and stock time before committing capital. Pearstop automated the classification and linked it directly to FARO&rsquo;s sales database.
              </p>
            </div>
            <CaseFactSheet
              rows={[
                { label: "Client", value: "FARO" },
                { label: "Data", value: "Incoming product lines, per container" },
                { label: "Scope", value: "~30,000 lines per buying decision" },
                { label: "Approach", value: "Machine learning, pre-LLM (own built technology)" }
              ]}
            />
          </div>
        </div>
      </section>

      <CaseResultsBand
        stats={[
          { value: "30k", label: "lines classified per buying decision" },
          { value: "95%", label: "classified automatically" },
          { value: "1 week", label: "classification time, was six months by hand" },
          { value: "Sales", label: "database linked for margin visibility" }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>The situation</CaseSectionLabel>
          <CaseH2>Why margin was invisible until after the purchase</CaseH2>
          <CaseBodyP>For each container purchase, FARO needed a reliable cost picture before committing capital. That meant classifying thousands of product lines, linking them to sales outcomes, and keeping the process fast enough to support the buying decision itself.</CaseBodyP>
          <CaseBodyP>Before Pearstop, this was two people&rsquo;s job: flagging every incoming product line by hand, and mapping each one to a category by hand. Without automation, the work was repetitive, slow, and hard to scale.</CaseBodyP>
          <CaseBodyP>This project predates general-purpose LLMs becoming viable for this kind of work. Pearstop built the classification system for FARO using machine learning and its own purpose-built technology, not a large language model &mdash; proof the underlying approach holds up without leaning on the newest tooling.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>How it worked</CaseSectionLabel>
            <CaseH2>How Pearstop estimates margin before the purchase</CaseH2>
          </div>
          <CaseStepCards
            steps={[
              { title: "Automatic classification", copy: "Pearstop classified 95% of the items in under a week, using the company's own category logic." },
              { title: "Sales-linked margin view", copy: "The dataset was linked to sales information so buyers could see margin before the purchase happened." },
              { title: "Decision speed", copy: "The team stopped spending days on manual categorisation and got a clean basis for the buying decision itself." }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteBig
            quote="We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week. That would have taken our team six months and still would not have been this accurate."
            initials="DT"
            name="David Torr"
            role="CEO, FARO"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: "What changed",
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: "From manual flagging to an automated flow",
                copy: "The team moved from manual categorisation to an automated flow that could keep up with buying decisions. That made margin visible earlier and reduced the operational drag on the procurement team."
              },
              {
                label: "What it changes",
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: "A more reliable basis for planning",
                copy: "With classification no longer the bottleneck, FARO has a more reliable basis for planning and analysis across every buying decision, not just the ones there was time to review by hand."
              }
            ]}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/spie", label: "Client case · Hard Services FM", title: "9,175 supplier spellings brought back to 1,493 for SPIE" },
          { href: "/cases/strukton", label: "Client case · Infrastructure", title: "35,000 to 50,000 spend lines a month to UNSPSC for Strukton" },
          { href: "/cases/mro-confidential", label: "Pattern · Manufacturing & MRO", title: "The real manufacturer part number behind every reseller code" }
        ]}
      />

      <CaseClosingCTA
        title="Want a case study built around your data?"
        lead="We can show you what the same approach would look like for your procurement or asset data."
        ctaLabel="Book a 7-minute discovery"
        ctaHref={siteConfig.calendly}
        external
      />
    </>
  );
}
