import type { Metadata } from "next";
import {
  CaseBreadcrumb, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseQuoteCard, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lemtech Case Study",
  description:
    "Pearstop turns Lemtech's messy site-visit reports into clean, ready proposal documents automatically.",
  alternates: {
    canonical: `${siteConfig.url}/cases/lemtech`,
    languages: alternateLanguages("/cases/lemtech")
  }
};

export default function LemtechCaseStudyPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current="Lemtech" />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)", gap: 72, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <CaseTypeBadge type="client" />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Manufacturing · Documents</span>
              </div>
              <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
                Turning messy site-visit notes into clean proposals for Lemtech
              </h1>
              <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
                Site visit reports arrived in every format imaginable &mdash; handwritten notes, spelling mistakes, varying layouts. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.
              </p>
            </div>
            <CaseFactSheet
              rows={[
                { label: "Client", value: "Lemtech" },
                { label: "Data", value: "Handwritten and free-form site-visit reports" },
                { label: "Output", value: "Ready-to-send proposal documents" },
                { label: "Approach", value: "AI extraction + specification matching" }
              ]}
            />
          </div>
        </div>
      </section>

      <CaseResultsBand
        stats={[
          { value: "Hours", label: "saved per proposal" },
          { value: "~0", label: "manual re-entry" },
          { value: "Accurate", label: "specification capture" }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>The problem</CaseSectionLabel>
          <CaseH2>Why was the commercial team retyping every site-visit note by hand?</CaseH2>
          <CaseBodyP>Site visit reports came back from the field in whatever format a technician had to hand &mdash; handwritten notes, spelling mistakes, inconsistent layouts. Every one of them had to be retyped into a proposal document before it could go to a client, a slow, repetitive job that ate into the commercial team&rsquo;s time.</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>How it worked</CaseSectionLabel>
            <CaseH2>From a handwritten note to a ready proposal</CaseH2>
            <CaseBodyP>Pearstop interpreted the incoming notes, pulled the right products and specifications, and returned a cleaner proposal workflow with much less manual re-entry.</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={["Handwritten notes", "Site photos", "Free-form reports"]}
            steps={["Read the report", "Match products and specs", "Draft the proposal"]}
            outputs={[
              { text: "Clean, accurate proposal document", bg: "var(--blue-soft)" },
              { text: "Correct specifications captured", bg: "#F1F8E9" }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteCard
            quote="Pearstop built a system that automatically pulls the right items from our visiting reports into a clean proposal document. It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items."
            initials="VO"
            name="Vince Out"
            role="Commercial Manager, Lemtech"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>The result</CaseSectionLabel>
          <CaseH2>The same problem, outside procurement</CaseH2>
          <CaseBodyP>This is a manufacturing example of the same core problem Pearstop solves in procurement data: operational information that is messy, inconsistent, and expensive to handle by hand. The same underlying engine reads, interprets, and structures it &mdash; whether the source is an invoice, a purchase order, or a handwritten site-visit note.</CaseBodyP>
        </div>
      </section>

      <CaseMoreLinks
        prefix=""
        items={[
          { href: "/cases/faro", label: "Client case · Retail", title: "Margin visible before the purchase is committed, for FARO" },
          { href: "/cases/spie", label: "Client case · Hard Services FM", title: "9,175 supplier spellings brought back to 1,493 for SPIE" },
          { href: "/cases/mro-confidential", label: "Pattern · Manufacturing & MRO", title: "The real manufacturer part number behind every reseller code" }
        ]}
      />

      <CaseClosingCTA
        title="Same problem with your own documents?"
        lead="Send us a sample of what comes in - messy notes, PDFs, or free text - and we'll show you what comes back structured."
        ctaLabel="Book a 7-minute discovery"
        ctaHref={siteConfig.calendly}
        external
      />
    </>
  );
}
