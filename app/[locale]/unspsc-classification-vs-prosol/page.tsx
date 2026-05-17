import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pearstop vs PROSOL — UNSPSC Classification Comparison",
  description: "Comparing Pearstop and PROSOL for UNSPSC procurement data classification. Which platform delivers better accuracy for FM, infrastructure, and construction companies?",
  alternates: { canonical: `${siteConfig.url}/unspsc-classification-vs-prosol` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between Pearstop and PROSOL for UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PROSOL focuses on procurement consulting and spend analysis with classification as part of a broader managed service. Pearstop is a technology-first platform that automates UNSPSC classification at scale, with 90-95% of lines classified without manual effort. Pearstop is designed for companies that need ongoing, high-volume classification rather than one-off consulting projects."
      }
    },
    {
      "@type": "Question",
      name: "How does Pearstop accuracy compare to PROSOL for infrastructure spend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop engine is specifically trained on infrastructure and FM spend vocabularies, where descriptions are often written in abbreviated field-engineer language. This sector focus produces higher accuracy on the data types these companies generate compared to general-purpose classification tools or consulting-led approaches."
      }
    },
    {
      "@type": "Question",
      name: "Is Pearstop or PROSOL better for ongoing monthly classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop is built for ongoing automated classification — invoice lines are processed monthly as they flow out of ERP systems. PROSOL model is more oriented towards project-based engagements. For companies that need continuous classification at volume, Pearstop automated engine is more suited."
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
    { "@type": "ListItem", position: 3, name: "Pearstop vs PROSOL", item: `${siteConfig.url}/unspsc-classification-vs-prosol` }
  ]
};

const rows = [
  { feature: "Service model", a: "Technology platform — automated classification engine", b: "Procurement consulting + managed service" },
  { feature: "Primary use case", a: "Ongoing monthly classification at volume", b: "Project-based spend analysis and sourcing" },
  { feature: "Auto-classification rate", a: "90-95% without manual input", b: "Consultant-led; automation level varies" },
  { feature: "Classification standard", a: "UNSPSC (primary)", b: "UNSPSC, custom taxonomies" },
  { feature: "Handles messy free-text input", a: "Yes — core design requirement", b: "Yes, with analyst review" },
  { feature: "Time to first results", a: "4-6 weeks to classified dataset", b: "Depends on project scope" },
  { feature: "Data Stability Baseline", a: "Yes — standard first-engagement deliverable", b: "Varies by engagement" },
  { feature: "Human review queue", a: "Yes — automated flagging, shrinks over time", b: "Manual analyst review" },
  { feature: "Industry specialisation", a: "FM, infrastructure, construction, manufacturing", b: "Multi-sector" },
  { feature: "SAP / Oracle integration", a: "CSV or API; classified data returned in same format", b: "Project-specific" },
  { feature: "Free lookup tool", a: "Yes — pearstop.com/unspsc-code-lookup", b: "Not available" },
];

export default function VsPROSOLPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Comparison"
        title="Pearstop vs PROSOL"
        lead="PROSOL offers procurement consulting with classification as part of a managed service. Pearstop is a technology platform that automates UNSPSC classification at scale. This page explains when each approach makes sense."
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
            lead="The core distinction is service model: PROSOL is consulting-led, Pearstop is technology-led. For ongoing automated classification at volume, Pearstop platform model is more suited."
          />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "30%" }}>Feature</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 700, color: "#1a1a1a", width: "35%" }}>Pearstop</th>
                  <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", width: "35%" }}>PROSOL</th>
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
          <SectionTitle eyebrow="When to choose Pearstop" title="Technology-led classification for ongoing volume" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">⚙️</div>
              <h3>You classify every month, not once a year</h3>
              <p>Pearstop processes new invoice lines each month automatically. No consultant hours consumed on routine classification.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">📈</div>
              <h3>Accuracy improves over time</h3>
              <p>Pearstop feedback loop means every decision in human review feeds back into the ML layer. Classification accuracy increases with each monthly run.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🏗</div>
              <h3>Your spend comes from infrastructure or FM</h3>
              <p>Pearstop engine is calibrated for Segment 72, 73, 76, and 80 — the UNSPSC segments that dominate FM, infrastructure, and construction spend.</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">When PROSOL may be the better fit</div>
                <p>If your primary need is procurement strategy, sourcing support, or category management consulting — and classification is one deliverable within a broader engagement — a consulting-led firm like PROSOL may be more appropriate. Pearstop focuses narrowly on classification accuracy and data quality at volume.</p>
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
        title="See Pearstop classify your data live"
        lead="Book a 30-minute session. Bring a sample spend file and we will run it through the engine live."
        actions={[{ label: "Book a demo", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
