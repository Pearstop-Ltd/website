import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pearstop vs AICA — UNSPSC Classification Comparison",
  description: "Comparing Pearstop and AICA for automated UNSPSC classification of procurement spend data. Key differences for FM, infrastructure, and construction companies.",
  alternates: { canonical: `${siteConfig.url}/unspsc-classification-vs-aica` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between Pearstop and AICA for UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AICA is an AI-driven spend classification platform covering multiple taxonomies and sectors. Pearstop is purpose-built for UNSPSC classification in hard services FM, infrastructure, construction, and manufacturing. Pearstop sector focus delivers higher accuracy on the specific spend types these industries generate."
      }
    },
    {
      "@type": "Question",
      name: "How does Pearstop compare to AICA for handling messy procurement data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop engine was designed for FM and infrastructure spend, where invoice descriptions are free-text and inconsistently formatted. The four-layer engine (rules, ML, LLM, human review) handles abbreviations, typos, multi-language input, and supplier-specific codes without requiring data normalisation beforehand."
      }
    },
    {
      "@type": "Question",
      name: "Which UNSPSC classification tool offers a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop offers a free UNSPSC code lookup tool at pearstop.com/unspsc-code-lookup where you can classify any product or service description instantly. For full dataset classification, Pearstop first engagement includes a Data Stability Baseline that lets you assess accuracy on your own data before committing."
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
    { "@type": "ListItem", position: 3, name: "Pearstop vs AICA", item: `${siteConfig.url}/unspsc-classification-vs-aica` }
  ]
};

const rows = [
  { feature: "Primary focus", a: "UNSPSC classification for FM, infrastructure, construction, manufacturing", b: "AI spend classification across multiple taxonomies and sectors" },
  { feature: "Classification standard", a: "UNSPSC (primary)", b: "UNSPSC, eClass, custom taxonomies" },
  { feature: "Engine layers", a: "Rules + ML + LLM + Human review", b: "AI/ML-driven classification" },
  { feature: "Auto-classification rate", a: "90-95%", b: "Varies by dataset and taxonomy" },
  { feature: "Sector-specific training", a: "Yes — FM and infrastructure vocabulary", b: "General-purpose training" },
  { feature: "Human review queue", a: "Yes — shrinks over time via feedback loop", b: "Manual review available" },
  { feature: "Data Stability Baseline", a: "Yes — standard first-engagement deliverable", b: "Trial/pilot available" },
  { feature: "Free lookup tool", a: "Yes — pearstop.com/unspsc-code-lookup", b: "Not publicly available" },
  { feature: "SAP / Oracle integration", a: "CSV or API; classified data returned in same format", b: "API-based integration" },
  { feature: "Time to first results", a: "4-6 weeks to classified dataset", b: "Varies by implementation" },
];

export default function VsAICAPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Comparison"
        title="Pearstop vs AICA"
        lead="AICA offers AI-driven spend classification across multiple taxonomies. Pearstop focuses specifically on UNSPSC classification for infrastructure and FM, where sector-specific training drives accuracy above general-purpose engines."
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
            lead="Both platforms use AI to classify procurement spend data. The distinction is scope and sector depth: AICA covers more taxonomies; Pearstop goes deeper on UNSPSC for asset-intensive industries."
          />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "30%" }}>Feature</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#1a1a1a", width: "35%" }}>Pearstop</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "35%" }}>AICA</th>
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
          <SectionTitle eyebrow="When to choose Pearstop" title="Deep specialisation beats broad coverage for infrastructure spend" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">🎯</div>
              <h3>UNSPSC is your primary classification standard</h3>
              <p>Pearstop full focus on UNSPSC means more training data, more rules, and more domain knowledge than a multi-taxonomy platform can allocate to any single standard.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔧</div>
              <h3>Your data comes from field operations</h3>
              <p>General AI classification engines are trained on clean catalogue data. Pearstop is trained on real FM and infrastructure invoice lines — abbreviated, misspelled, and inconsistently formatted.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">📉</div>
              <h3>You want the review queue to disappear</h3>
              <p>Pearstop human review decisions feed back into the ML layer. Over 12 weeks, the flagged-for-review queue shrinks to near zero.</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">When AICA may be the better fit</div>
                <p>If your organisation uses multiple classification standards (UNSPSC, eClass, NAICS) or operates across diverse sectors beyond FM and infrastructure, a multi-taxonomy platform like AICA may offer broader coverage. Pearstop is the better choice when UNSPSC accuracy on infrastructure and FM data is the primary requirement.</p>
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
        title="Run your data through Pearstop before deciding"
        lead="Book a 30-minute session. Bring a sample spend file and we will classify it live so you can compare output quality against any other platform you are evaluating."
        actions={[{ label: "Book a demo", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
