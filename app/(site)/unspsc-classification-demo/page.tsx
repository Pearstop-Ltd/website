import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { UnspscTree } from "@/components/unspsc-tree";
import { CalendlyButton } from "@/components/calendly-button";
import { GeoBlock } from "@/components/content";
import { demoData, unspscDataSource, treeStats } from "@/lib/unspsc-demo-data";
import { siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/unspsc-classification-demo`;

export const metadata: Metadata = {
  title: "UNSPSC Classification Tree — Interactive Demo | Pearstop",
  description: "Explore the official UNSPSC taxonomy interactively. Click through real segment, family, class and commodity codes with FM and procurement examples.",
  keywords: [
    "UNSPSC classification tree",
    "UNSPSC taxonomy explorer",
    "UNSPSC codes list",
    "UNSPSC segment family class commodity",
    "UNSPSC hierarchy demo",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "UNSPSC Classification Tree — Interactive Demo",
    description: "Explore the official UNSPSC taxonomy interactively, from segment down to 8-digit commodity code.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    images: ["/opengraph-image"],
  },
};

const FAQ_ITEMS = [
  {
    q: "What is UNSPSC classification?",
    a: "UNSPSC classification is the process of assigning a code from the UNSPSC (United Nations Standard Products and Services Code) standard to a product or service, based on a four-level hierarchy — Segment, Family, Class and Commodity — so that procurement, finance and category teams can categorise, compare and analyse spend consistently across suppliers, sites and systems.",
  },
  {
    q: "How do you use UNSPSC classification?",
    a: "In practice, organisations assign an 8-digit UNSPSC commodity code to every purchase order or invoice line — usually as part of ERP or P2P data entry — and then use those codes to build spend cubes, benchmark prices across suppliers, identify tail spend, and support category management. Classification can be done manually at point of purchase, retrofitted onto historic data, or automated using rules, machine learning and AI.",
  },
  {
    q: "Are the codes in this UNSPSC tree official?",
    a: `Yes. Every segment, family, class and commodity code and title shown here is taken directly from the official UNSPSC standard, last verified against the codeset on ${unspscDataSource.verifiedDate} via ${unspscDataSource.sourceName}. All ${treeStats.segments} official segments, ${treeStats.families} families, ${treeStats.classes} classes and ${treeStats.commodities.toLocaleString()} commodity-level codes are represented in full, grouped into the ${treeStats.groups} category groups UNGM itself uses for browsing (that grouping is a browsing convenience, not one of the standard's 4 official levels). ${treeStats.curated} commodities — those most relevant to facilities management, procurement and professional services — additionally carry a written description and example items; every other commodity still shows its real official code and title.`,
  },
  {
    q: "What is the UNSPSC classification tree?",
    a: "The UNSPSC classification tree is the standard's four-level hierarchy laid out so you can browse it, from a broad segment down to a single 8-digit commodity code. This demo shows the full official tree: every segment, family, class and commodity in the current release, structured the same way whether you are checking one procurement code or classifying a full spend file against it.",
  },
  {
    q: "What are the four levels of the UNSPSC hierarchy?",
    a: "UNSPSC has four levels, encoded in a single 8-digit code: Segment (the first 2 digits, the broadest category), Family (4 digits), Class (6 digits), and Commodity (all 8 digits, the most specific level). For example, code 72101506 breaks down as segment 72 (Building and Facility Construction and Maintenance Services), family 7210 (Building and facility maintenance and repair services), class 721015 (Building maintenance and repair services), and commodity 72101506 (Elevator maintenance services).",
  },
  {
    q: "Why does commodity-level classification matter for procurement?",
    a: "Segment and family level codes are too broad to drive real sourcing decisions or price benchmarking — they group very different spend together. Commodity level (8-digit) classification is what allows procurement teams to compare like-for-like spend across suppliers and sites, benchmark unit prices, and feed clean data into AI-driven spend analysis.",
  },
  {
    q: "How is UNSPSC different from eCl@ss or CPV?",
    a: "UNSPSC, eCl@ss and CPV are all procurement classification standards, but they serve different purposes. UNSPSC is the most widely used for spend analysis and category management, especially in North America and increasingly in Europe. eCl@ss adds detailed technical attributes per product, common in German manufacturing. CPV is used specifically for EU public procurement tenders. Most organisations only need one, chosen based on their ERP system and reporting requirements.",
  },
  {
    q: "How can I use AI for UNSPSC classification?",
    a: "You can try it yourself with general-purpose AI tools like Copilot, ChatGPT, or Claude — paste a product or service description and ask for the matching UNSPSC code (our free lookup tool above does exactly this). When you have a lot of data, or when accuracy really matters, it's worth going with a specialized party like Pearstop instead. The advantage of working with a specialist is that they use AI but also have dedicated pipelines and dedicated security to keep your data safe and to reach the highest quality levels fast.",
  },
  {
    q: "How does Pearstop use UNSPSC classification?",
    a: "Pearstop's classification engine automatically assigns UNSPSC commodity codes to procurement spend lines, asset records and invoice data — combining rules, machine learning and an LLM layer to reach 90–95% automatic classification, with the remainder flagged for human review. Try the free UNSPSC code lookup tool, or book a call to see it run against your own data.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "UNSPSC Classification Tree Demo", item: PAGE_URL },
  ],
};

const allSegments = demoData.flatMap((group) => group.segments);

const segmentListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "All 58 UNSPSC segments featured in this demo",
  itemListElement: allSegments.map((segment, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${segment.code} — ${segment.title}`,
  })),
};

const levels = [
  { digits: "XX", level: "Segment", example: "72 — Building & Facility Construction", color: "#2563eb" },
  { digits: "XXXX", level: "Family", example: "7210 — Building maintenance", color: "#7c3aed" },
  { digits: "XXXXXX", level: "Class", example: "721015 — Building maintenance & repair", color: "#0891b2" },
  { digits: "XXXXXXXX", level: "Commodity", example: "72101506 — Elevator maintenance", color: "#16a34a" },
];

const whyLevels = [
  { title: "Segment", use: "Executive dashboards, board reporting", limit: "Too broad to drive savings", icon: "◈" },
  { title: "Family", use: "Budget allocation, category ownership", limit: "Still too coarse for sourcing", icon: "◉" },
  { title: "Class", use: "Sourcing events, supplier selection", limit: "Misses unit-price benchmarking", icon: "◎" },
  { title: "Commodity", use: "Price benchmarking, AI automation", limit: "Requires consistent coding", icon: "●" },
];

export default function UnspscDemoPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="segment-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(segmentListSchema) }} />

      {/* Hero */}
      <section style={{
        background: "linear-gradient(160deg, #0a1540 0%, #0f2060 55%, #162880 100%)",
        padding: "5.5rem 0 4.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(57,211,83,0.08) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(57,211,83,0.12)", color: "#39d353",
            fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase",
            letterSpacing: "0.12em", padding: "5px 14px", borderRadius: 20,
            marginBottom: 22, border: "1px solid rgba(57,211,83,0.25)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39d353", display: "inline-block" }} />
            Interactive Demo
          </span>
          <h1 style={{
            color: "#fff", fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.18, marginBottom: "1.1rem",
            letterSpacing: "-0.02em",
          }}>
            Explore the UNSPSC<br />Classification Tree
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.62)", fontSize: "1.05rem",
            lineHeight: 1.7, maxWidth: 580, margin: "0 auto 2.25rem",
          }}>
            Four levels, one taxonomy. Click through real FM and procurement spend categories — from broad segment all the way to 8-digit commodity code.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/unspsc-code-lookup" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "#39d353", color: "#0a1f0a", fontWeight: 700,
              fontSize: "0.92rem", padding: "0.75rem 1.8rem", borderRadius: 10,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(57,211,83,0.35)",
            }}>
              Try the free lookup →
            </Link>
            <Link href="/unspsc" style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)",
              fontWeight: 500, fontSize: "0.92rem", padding: "0.75rem 1.8rem",
              borderRadius: 10, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}>
              What is UNSPSC?
            </Link>
          </div>
        </div>
      </section>

      {/* What are UNSPSC codes? */}
      <section style={{ padding: "3rem 0 2.5rem", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.4rem", color: "#111827", marginBottom: "0.9rem", letterSpacing: "-0.01em" }}>
            What are UNSPSC codes?
          </h2>
          <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: "0.9rem" }}>
            UNSPSC (the United Nations Standard Products and Services Code) is a global classification standard used to categorise every product and service an organisation buys. It's built as a four-level hierarchy — Segment, Family, Class, and Commodity — encoded in a single 8-digit code, so any purchase can be filed consistently whether it's raw materials, IT services, or building maintenance.
          </p>
          <p style={{ color: "#475569", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: "1.6rem" }}>
            Procurement and finance teams rely on UNSPSC to compare spend across suppliers and sites, benchmark prices for like-for-like purchases, and feed clean, structured data into reporting and AI-driven spend analysis. Without it, spend data is just free-text line items that can't be aggregated or compared.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/unspsc" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", textDecoration: "none", padding: "0.55rem 1rem", borderRadius: 8, background: "#eff4ff", border: "1px solid #dbe6fe" }}>
              What is UNSPSC classification? →
            </Link>
            <Link href="/unspsc-code-lookup" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", textDecoration: "none", padding: "0.55rem 1rem", borderRadius: 8, background: "#eff4ff", border: "1px solid #dbe6fe" }}>
              Free UNSPSC code lookup tool →
            </Link>
            <Link href="/unspsc-classification-facilities-management" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", textDecoration: "none", padding: "0.55rem 1rem", borderRadius: 8, background: "#eff4ff", border: "1px solid #dbe6fe" }}>
              UNSPSC for facilities management →
            </Link>
            <a href={unspscDataSource.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569", textDecoration: "none", padding: "0.55rem 1rem", borderRadius: 8, background: "#f3f5f8", border: "1px solid #e5e9f0" }}>
              Official UNSPSC codes (UN Global Marketplace) ↗
            </a>
          </div>
        </div>
      </section>

      {/* Level strip */}
      <section style={{ background: "#fff", borderBottom: "1px solid #f0f2f5", padding: "0" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "stretch" }}>
            {levels.map(({ digits, level, example, color }, i) => (
              <div key={level} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.4rem 0.75rem",
                borderRight: i < 3 ? "1px solid #f0f2f5" : "none",
                position: "relative",
              }}>
                {i < 3 && (
                  <div style={{
                    position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)",
                    width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 2l5 4-5 4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div style={{ fontFamily: "monospace", fontSize: "0.95rem", fontWeight: 800, color, marginBottom: 3, letterSpacing: "0.04em" }}>{digits}</div>
                <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#111827" }}>{level}</div>
                <div style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: 2, textAlign: "center" }}>{example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tree section */}
      <section style={{ padding: "3rem 0 2.5rem", background: "#f8fafc" }}>
        <div className="container" style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: 4, letterSpacing: "-0.01em" }}>
              Browse the hierarchy
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              All {treeStats.segments} official segments · {treeStats.groups} category groups · {treeStats.families} families · {treeStats.classes} classes · {treeStats.commodities.toLocaleString()} commodities — the complete free UNSPSC codeset, with {treeStats.curated} commodities (FM, procurement and professional services) carrying a written description.
            </p>
            <p style={{ color: "#c0c8d8", fontSize: "0.76rem", marginTop: 2 }}>
              The outer "category group" column is UNGM's own browsing grouping, not one of the standard's 4 official levels (Segment, Family, Class, Commodity).
            </p>
            <p style={{ color: "#c0c8d8", fontSize: "0.76rem", marginTop: 4 }}>
              Codes last verified against the official UNSPSC standard on {unspscDataSource.verifiedDate}, via{" "}
              <a href={unspscDataSource.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#9aa4b8", textDecoration: "underline" }}>
                {unspscDataSource.sourceName}
              </a>.
            </p>
          </div>
          <div style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #eaeff5",
            padding: "34px 32px",
            boxShadow: "0 2px 32px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <UnspscTree />
          </div>
        </div>
      </section>

      {/* Why levels */}
      <section style={{ padding: "3rem 0", background: "#fff", borderTop: "1px solid #f0f2f5" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
            Why does the level of detail matter?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {whyLevels.map(({ title, use, limit, icon }) => (
              <div key={title} style={{
                borderRadius: 12,
                padding: "18px 18px",
                border: "1px solid #eaeff5",
                background: "#fafbfc",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1rem", color: "#2563eb" }}>{icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827" }}>{title} level</span>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#16a34a", marginBottom: 2 }}>Good for</div>
                  <div style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5 }}>{use}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#dc2626", marginBottom: 2 }}>Limitation</div>
                  <div style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5 }}>{limit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO / answer-engine block */}
      <section style={{ padding: "3rem 0", background: "#f8fafc", borderTop: "1px solid #f0f2f5" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <GeoBlock
            title="What does good UNSPSC usage look like?"
            copy={`Good UNSPSC usage means classifying spend at commodity level (the full 8-digit code), not stopping at segment or family — a code like "72" (Building and Facility Construction and Maintenance Services) is too broad to act on, but "72101506" (Elevator maintenance services) is precise enough to benchmark prices and compare suppliers. It also means applying codes consistently across every site, supplier and system, so a spend cube actually adds up instead of fragmenting into inconsistent free-text categories. Done well, UNSPSC data feeds directly into category management, supplier benchmarking, tail-spend analysis and AI-driven spend analytics, but only once classification is complete and trustworthy. Pearstop's classification engine applies that same commodity-level standard automatically to real spend data, at a scale manual coding can't match.`}
          />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "3.5rem 0", background: "#fff", borderTop: "1px solid #f0f2f5" }}>
        <div className="container" style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: "1.4rem", letterSpacing: "-0.01em" }}>
            Frequently asked questions
          </h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(160deg, #0a1540 0%, #0f2060 55%, #162880 100%)",
        padding: "4.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(57,211,83,0.07) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            color: "#fff", fontWeight: 700,
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
            marginBottom: "0.8rem",
            letterSpacing: "-0.02em",
          }}>
            Ready to classify your own spend data?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.97rem", lineHeight: 1.65, marginBottom: "2rem" }}>
            Pearstop helps procurement and FM teams reach commodity-level accuracy — automatically. Book a 7-minute call to see how.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/unspsc-code-lookup" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "#39d353", color: "#0a1f0a", fontWeight: 700,
              fontSize: "0.95rem", padding: "0.8rem 2rem", borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(57,211,83,0.3)",
            }}>
              Try the free lookup →
            </Link>
            <CalendlyButton
              label="Book a 7-min call"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 500,
                fontSize: "0.95rem",
                padding: "0.8rem 2rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
