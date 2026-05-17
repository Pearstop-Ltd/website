import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pearstop vs Qvalia — UNSPSC Classification Comparison",
  description: "Comparing Pearstop and Qvalia for automated UNSPSC classification. See how each platform handles procurement spend data for infrastructure, FM, and manufacturing companies.",
  alternates: { canonical: `${siteConfig.url}/unspsc-classification-vs-qvalia` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between Pearstop and Qvalia for UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop specialises in UNSPSC classification for hard services FM, infrastructure, construction, and manufacturing, with a four-layer engine (rules, ML, LLM, human review) achieving 90-95% automatic classification. Qvalia is a broader spend analytics platform covering multiple classification standards. Pearstop’s focus on asset-intensive industries means the engine is trained on the specific spend vocabulary these sectors generate."
      }
    },
    {
      "@type": "Question",
      name: "Which is better for procurement data classification in infrastructure companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop is purpose-built for infrastructure and FM procurement data, where spend lines are written in field-engineer language. The engine handles abbreviations, typos, and multi-language descriptions without requiring clean input data. This sector-specific training produces higher accuracy."
      }
    },
    {
      "@type": "Question",
      name: "Does Pearstop offer a free UNSPSC lookup tool like Qvalia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pearstop provides a free UNSPSC code lookup tool at pearstop.com/unspsc-code-lookup. Enter any product or service description and receive an instant UNSPSC code with confidence rating and full four-level hierarchy."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "Pearstop vs Qvalia", item: `${siteConfig.url}/unspsc-classification-vs-qvalia` }
  ]
};

const rows = [
  { feature: "Primary focus", a: "Hard services FM, infrastructure, construction, manufacturing", b: "General procurement spend analytics" },
  { feature: "Classification standard", a: "UNSPSC (primary)", b: "UNSPSC, eClass, CPV, custom" },
  { feature: "Engine layers", a: "Rules + ML + LLM + Human review", b: "ML + rules" },
  { feature: "Auto-classification rate", a: "90-95%", b: "Varies by dataset" },
  { feature: "Handles messy field-engineer text", a: "Yes — core design requirement", b: "Partial" },
  { feature: "Free lookup tool", a: "Yes — pearstop.com/unspsc-code-lookup", b: "Yes" },
  { feature: "Data Stability Baseline", a: "Yes — included in first engagement", b: "Not standard" },
  { feature: "Human review queue", a: "Yes — shrinks over time", b: "Manual review available" },
  { feature: "SAP / Oracle integration", a: "CSV or API", b: "API and native connectors" },
  { feature: "Industry specialisation", a: "FM, infrastructure, construction, manufacturing", b: "All sectors" },
];

export default function VsQvaliaPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Comparison"
        title="Pearstop vs Qvalia"
        lead="Both platforms classify procurement spend data to UNSPSC. The difference is depth of specialisation. This page sets out where each platform is strongest so procurement and IT teams can make an informed decision."
        actions={[
          { label: "Book a demo", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Try the free UNSPSC tool", href: "/unspsc-code-lookup", variant: "secondary" }
        ]}
      />
      <section>
        <div className="container">
          <SectionTitle
            eyebrow="Side by side"
            title="Feature comparison"
            lead="Pearstop and Qvalia both automate UNSPSC classification. The key difference is industry focus: Pearstop is designed for hard services FM, infrastructure, and manufacturing."
          />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "30%" }}>Feature</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#1a1a1a", width: "35%" }}>Pearstop</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "35%" }}>Qvalia</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "0.85rem 1rem", color: "#555", fontWeight: 500 }}>{row.feature}</td>
                    <td style={{ padding: "0.85rem 1rem", color: "#1a1a1a", fontWeight: 500 }}>{row.a}</td>
                    <td style={{ padding: "0.85rem 1rem", color: "#555" }}>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="When to choose Pearstop" title="Built for asset-intensive industries" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">🏗</div>
              <h3>Your spend is written by field engineers</h3>
              <p>FM and infrastructure invoice lines are free-text. Pearstop handles abbreviations, typos, and inconsistent descriptions — no data cleaning required.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">📊</div>
              <h3>90-95% auto-classification</h3>
              <p>Pearstop is calibrated for Segments 72, 73, 76, 80 — the UNSPSC segments that dominate infrastructure and FM spend.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔄</div>
              <h3>A review queue that shrinks</h3>
              <p>Every human review decision feeds back into the engine. After 12 weeks the review queue typically falls to near zero.</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">When Qvalia may be the better fit</div>
                <p>Qvalia covers multiple classification standards (eClass, CPV, NAICS) and broader spend analytics. If your organisation uses several standards or operates outside FM and infrastructure, Qvalia is worth evaluating alongside Pearstop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-soft">
        <div className="container">
          <SectionTitle title="Frequently asked questions" />
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{item.name}</h3>
                <p style={{ color: "#555", lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand
        title="See how Pearstop handles your data"
        lead="Book a 30-minute session. Bring a sample spend file and we will run it through the engine live."
        actions={[{ label: "Book a demo", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
