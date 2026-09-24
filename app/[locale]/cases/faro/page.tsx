import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, PageHero, QuoteBox, StatsGrid } from "@/components/content";
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

const FAQ_ITEMS = [
  {
    q: "How does linking classification to sales data make margin visible before a purchase?",
    a: "Once every product line is classified consistently, it can be joined against historical sales performance for that same category. That gives a margin estimate at the point of the buying decision, instead of after the container has landed and been sold through."
  },
  {
    q: "Does this require replacing an existing ERP or sales system?",
    a: "No. Classification runs on top of whatever systems already hold the product and sales data, and the structured output is delivered in a format that plugs into the existing sales database rather than requiring a new platform."
  },
  {
    q: "What happens to product lines the system can't classify confidently?",
    a: "Anything below a confidence threshold is flagged for human review rather than guessed at, the same approach used across every Pearstop classification pipeline."
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

export default function FaroCaseStudyPage() {
  return (
    <>
      <Script id="faro-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Case Study"
        title="Accurate Margin, Automatically"
        lead="How Pearstop made margin visible before FARO committed to a container purchase."
        leadAccent
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                For every purchasing decision, FARO needed to categorise around 30,000 product lines per five
                containers to estimate margin, sale price, and stock time. Manual categorisation made this slow and
                inconsistent. Pearstop automated the classification using their own category system and linked it
                directly to their sales database.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="cases-eyebrow">Retail · South Africa</div>
              <h2 className="case-wayfinder">The problem</h2>
              <h3 className="case-question">Why is margin invisible until after the purchase?</h3>
              <p className="light-copy">
                For each container purchase, FARO needed a reliable cost picture before committing capital. That meant classifying thousands of product lines, linking them to sales outcomes, and keeping the process fast enough to support the buying decision itself.
              </p>
              <p className="light-copy">
                Before Pearstop, this was two people&rsquo;s job: flagging every incoming product line by hand, and mapping each one to a category by hand. Without automation, the work was repetitive, slow, and hard to scale. With Pearstop, the team got a structured process that could support margin estimation before the purchase was made.
              </p>
              <p className="light-copy">
                This project predates general-purpose LLMs becoming viable for this kind of work. Pearstop built the classification system for FARO using machine learning and its own purpose-built technology, not a large language model - proof the underlying approach holds up without leaning on the newest tooling.
              </p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <StatsGrid
                stats={[
                  { value: "30k", label: "lines classified per decision" },
                  { value: "1 wk", label: "classification time" },
                  { value: "Sales", label: "database linked" }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="screenshot-frame screenshot-frame--compact">
                <img
                  src="/images/cases/warehouse-sorting.svg"
                  alt="Illustration of workers sorting incoming product lines at a warehouse table"
                  style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "2.5rem" }}
                />
              </div>
              <p className="screenshot-caption">
                Before automation: every incoming product line flagged and mapped to a category by hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 className="case-wayfinder">The approach</h2>
            <h3 className="case-question">How does Pearstop estimate margin before the purchase?</h3>
          </div>
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>Automatic classification</h3>
              <p>Pearstop classified 95% of the items in under a week, using the company's own category logic.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Sales-linked margin view</h3>
              <p>The dataset was linked to sales information so buyers could see margin before the purchase happened.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Decision speed</h3>
              <p>The team stopped spending days on manual categorisation and got a clean basis for the buying decision itself.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <QuoteBox
            quote="We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week. That would have taken our team six months and still would not have been this accurate."
            author="David Torr"
            role="CEO, FARO"
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="case-wayfinder">The result</h2>
              <h3 className="case-question">What changes once buying decisions are automated?</h3>
              <p className="light-copy">
                The team moved from manual categorisation to an automated flow that could keep up with buying decisions. That made margin visible earlier, reduced the operational drag on the procurement team, and gave the business a more reliable basis for planning and analysis.
              </p>
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
        title="Want a case study built around your data?"
        lead="We can show you what the same approach would look like for your procurement or asset data."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Explore cases", href: "/cases", variant: "secondary" }
        ]}
      />
    </>
  );
}
