import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Procurement Data Quality for Hard Services Companies",
  description:
    "Pearstop automates procurement data classification for hard services and infrastructure companies. Clean spend baselines, UNSPSC coding, and 95% less manual effort.",
  alternates: {
    canonical: `${siteConfig.url}/procurement-data-quality`
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens if we do not have existing classification data to train from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge, so it performs strongly even without existing priors."
      }
    },
    {
      "@type": "Question",
      name: "Will our buyers still be in control?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Buyers review flagged items in a dedicated queue, and every decision they make trains the system further, reducing the review queue over time until manual input approaches zero."
      }
    }
  ]
};

export default function ProcurementPage() {
  return (
    <>
      <PageHero
        eyebrow="Procurement"
        title="You cannot do category management without clean procurement data."
        lead="Most procurement teams know what they want to achieve. The data underneath is what is stopping them. Pearstop fixes that - automatically, at scale."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>When your spend data is a mess, category management is a fiction.</h2>
              <p className="light-copy">
                Hard services companies manage purchasing across dozens of sites and suppliers. Invoice data arrives in different formats, supplier names are inconsistent, and spend categories are never applied the same way twice. The result: your procurement team cannot see what they are buying, from whom, or at what cost. Category management, the core job of any procurement function, becomes impossible.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>No granular, high-quality categorisation across supplier invoices</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Spelling errors, wrong information in wrong fields, duplicate supplier records</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Spend data too fragmented to benchmark costs or identify consolidation opportunities</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Manual or offshore classification is slow, inconsistent, and does not learn</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.spendControl}
                alt="Procurement data quality - spend visibility dashboard"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="A four-layer engine that handles 95% of classification automatically"
            lead="Each layer improves on the last. Human input at Layer 4 feeds directly back into the system - so over time, the amount of manual review needed goes to zero."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Rules Engine</h3>
              <p>User-defined rules and automatically loaded process patterns handle the straightforward classifications. Fast, consistent, zero ambiguity.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Machine Learning</h3>
              <p>A secure, proprietary ML layer that replicates your internal way of working. Like a junior analyst with company knowledge - filling gaps the way your team would.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>LLM Augmentation</h3>
              <p>A large language model layer that handles edge cases and ambiguous classifications - like a super-powered search with context awareness.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>Human Review</h3>
              <p>Items outside confident thresholds are auto-flagged for your team. Every decision feeds back into the engine - reducing the review queue over time until it reaches zero.</p>
            </article>
          </div>
          <div className="text-center" style={{ marginTop: "2rem" }}>
            <CalendlyButton label="See it in action - book a 7-minute call" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle eyebrow="The Outcome" title="With 95%+ data quality, your procurement team can actually do their job." />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Optimal Category Management</h3>
              <p>1-3% cost saving opportunity on total procurement spend - unlocked by being able to see and act on what you are actually buying.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Integrated Financial Reporting</h3>
              <p>Company-wide spend data in one consistent format - ready for ERP, BI, and financial reporting tools without manual reconciliation.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Cross-Project Spend Insight</h3>
              <p>Identify cost saving opportunities, avoid repeating the same procurement mistakes, and benchmark performance across projects and sites.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We used to have two full-time staff working on category assignment. Now the system does this for us - which has unlocked margin estimations further down the line too. It is more reliable at a fraction of the cost."
                author="Head of Procurement"
                role="Infrastructure Contractor, Netherlands"
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
                title="What is procurement data quality and why does it matter?"
                copy="Procurement data quality refers to the accuracy, consistency, and completeness of spend data across invoices, purchase orders, and supplier records. For hard services companies managing decentralised purchasing, poor data quality makes category management impossible - teams cannot see what they are buying, from whom, or at what cost. Pearstop automates the cleaning and classification of procurement data for companies like Strukton, processing over 35,000 lines a month and supporting 1-3% cost savings through better category management and supplier consolidation."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="faq-item">
                <div className="faq-question">
                  <h3 className="faq-q">What happens if we do not have existing classification data to train from?</h3>
                </div>
                <div className="faq-answer">
                  <p>
                    Most classification systems rely on historical data to learn from. Pearstop combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge - so it performs strongly even without existing priors.
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question">
                  <h3 className="faq-q">Will our buyers still be in control?</h3>
                </div>
                <div className="faq-answer">
                  <p>
                    Yes. Buyers review flagged items in a dedicated queue - typically one hour per week. Every decision they make trains the system further, reducing the review queue over time until manual input approaches zero.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script id="procurement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CTABand
        title="Ready to fix your procurement data?"
        lead="Book a 7-minute discovery call. We will show you exactly where your spend data is causing problems and how long it will take to fix."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
