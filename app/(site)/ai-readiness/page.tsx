import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Readiness for Hard Services and Infrastructure",
  description:
    "AI tools only work when the data behind them is clean. Pearstop prepares procurement data, asset registers, and operational records for AI and Copilot so initiatives deliver results rather than confusion.",
  alternates: {
    canonical: `${siteConfig.url}/ai-readiness`,
    languages: alternateLanguages("/ai-readiness")
  }
};

const FAQ_ITEMS = [
  {
    q: "We already tried an AI pilot and it did not go well. Does that mean AI will not work for us?",
    a: "Not necessarily. A pilot that looks fine at small scale and breaks down at real volume is usually telling you something true about the data underneath it, not about AI in general. Fix that foundation first and the same tools tend to behave very differently."
  },
  {
    q: "Do we need to have picked a specific AI tool before this makes sense?",
    a: "No. The data preparation work is the same regardless of which AI tool, or combination of tools, you eventually choose. Clean, structured data is what lets you switch between them later without starting over."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
};

export default function AiReadinessPage() {
  return (
    <>
      <Script id="aireadiness-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="AI Ready"
        title="AI is only underdelivering because your data is not ready."
        lead="Every AI tool, from Copilot to custom models, assumes clean, structured, governed data underneath. Pearstop builds that foundation."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "How it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Real Problem</div>
              <h2>The real reason your AI initiatives are not delivering</h2>
              <p className="light-copy">
                AI does not fail because the technology is wrong. It fails because the data feeding it is inconsistent, fragmented, and unstructured. The pattern shows up the same way almost every time: a small pilot runs against a slice of real data, the output looks reasonable, and confidence builds. Scale the same approach to the volume a real operation produces, and it starts making mistakes the pilot never surfaced. That is not a tooling problem. It is what happens when clean data was never the foundation to begin with.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>A pilot looks fine at small scale, then the same approach breaks down at real operational volume</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Copilot and AI agents surface errors and inconsistencies rather than insights</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Executives lose confidence in AI investments that promised transformation but delivered confusion</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">The common thread</div>
                <p className="light-copy">
                  Whether the starting point is Fabric, Copilot, or a custom model, the same foundation problem appears underneath. Three separate technical services leaders, in three separate and unprompted conversations, reached the same conclusion: fix the data before the AI strategy, not after.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="The Real Problem" title="Three steps to an AI-ready data foundation" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>AI Readiness Assessment</h3>
              <p>We evaluate your operational data against the requirements of your AI use case, procurement classification, asset intelligence, predictive maintenance, or reporting, identifying exactly what needs to be fixed and in what order.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Automated Data Preparation</h3>
              <p>We clean, classify, and structure your data automatically, removing the errors, inconsistencies, and gaps that cause AI models to underdeliver.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>AI-Ready Data Foundation</h3>
              <p>Your data is structured, governed, and continuously maintained, ready for Copilot, custom AI models, or any tool that requires reliable inputs.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Key benefits" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Reliable AI Outputs</h3>
              <p>Models trained on clean data produce results people trust and act on.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Faster Time to Value</h3>
              <p>Skip the 12-18 months of data preparation that delays most AI projects.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Free to Switch Tools</h3>
              <p>Clean, structured data is not locked to one platform, so you can move between Copilot, Azure AI, or a custom model without starting the data work over.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="What changes with Pearstop" />
          <StatsGrid
            stats={[
              {
                value: "2x",
                label: "More likely to achieve measurable AI ROI within 12 months",
                copy: "With unified, governed data."
              },
              {
                value: "95%",
                label: "Automated data preparation",
                copy: "Without manual rework."
              },
              {
                value: "12-18 months",
                label: "Saved",
                copy: "Typical data preparation timeline eliminated."
              }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                dark
                quote="I tried putting it through Copilot and it was worse. You've made it worse, in fact added loads of tabs that no one will ever use. I reckon we probably wasted twenty five grand there on stuff that will just sit, because we think we need it."
                author="Head of Commercial"
                role="Cleaning services contractor"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What does AI readiness mean?"
                copy="AI readiness means having operational data that is clean, structured, and consistently governed so that AI tools, Copilot, and machine learning models can produce reliable outputs. For hard services, construction, and manufacturing companies, the most common AI readiness blockers are poor procurement data quality, inconsistent asset registers, and fragmented operational records. Pearstop automates the data preparation work that makes AI initiatives succeed, from UNSPSC procurement classification to asset data structuring, giving organisations a foundation that AI tools can actually learn from. If you are moving from Fabric into broader AI adoption, the same clean-data foundation carries forward."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.q}</summary>
                    <p className="faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Is your data ready for AI?"
        lead="Talk to sales and we will tell you exactly what needs to happen before your AI initiatives can deliver results."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See Fabric readiness too", href: "/fabric", variant: "secondary" }
        ]}
      />
    </>
  );
}
