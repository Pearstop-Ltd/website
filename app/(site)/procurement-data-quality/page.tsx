import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, QuoteBox, SectionTitle } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { HeroBand } from "@/components/site/HeroBand";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Procurement Data Quality for Infrastructure, Construction, and FM",
  description:
    "Pearstop builds a real spend baseline across sites and entities: bundled contracts broken into service lines, framework agreements checked against live buying, and group-wide spend visible in one place.",
  alternates: {
    canonical: `${siteConfig.url}/procurement-data-quality`,
    languages: alternateLanguages("/procurement-data-quality")
  }
};

const FAQ_ITEMS = [
  {
    q: "What happens if we do not have existing classification data to train from?",
    a: "Most classification systems rely on historical data to learn from. Pearstop combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge, so it performs strongly even without existing priors."
  },
  {
    q: "Will our buyers still be in control?",
    a: "Yes. Buyers review flagged items in a dedicated queue, typically one hour per week. Every decision they make trains the system further, reducing the review queue over time until manual input approaches zero."
  },
  {
    q: "Can Pearstop check our buying against existing framework agreements?",
    a: "Yes. Once spend is classified consistently, current buying can be compared against the framework agreements already in place, category by category, so drift shows up as it happens rather than at the next audit."
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

export default function ProcurementPage() {
  return (
    <>
      <HeroBand
        eyebrow="Procurement"
        title="You cannot negotiate what you cannot see."
        lead="Most procurement teams can state their turnover to the euro. Few can state what they actually spent it on, category by category, across every site, entity, and bundled contract. Pearstop builds that baseline, so a negotiation, a tender, or a framework review starts from a real number instead of a guess."
        primaryLabel="Send us 200 lines"
        primaryAction={(className) => <SampleRequestModal label="Send us 200 lines" className={className} />}
        secondaryLabel="Talk to sales"
        secondaryHref="/book-a-demo"
        image={{ src: "/images/photos/office-worker-2.png", alt: "Procurement analyst reviewing spend data on screen", width: 1536, height: 1024 }}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>One number at the top. No detail underneath.</h2>
              <p className="light-copy">
                Ask a head of procurement what they spent last year and they can usually give you a number to the euro. Ask what it was actually spent on - category by category, site by site, supplier by supplier - and the answer gets vague fast. The same gap shows up a level higher. A construction group turning over hundreds of millions across a dozen entities can state its revenue to the euro and still not have real granularity on what it bought or from whom, because spend sits in different systems, coded differently, entity by entity.
              </p>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>
                  &ldquo;Most companies are flying blind, and only find out when someone asks a question they cannot answer.&rdquo;
                </p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Procurement Lead, Infrastructure
                </p>
              </blockquote>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Total spend known at a high level, but not broken down by category, site, or supplier with enough granularity to act on</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Framework agreements signed years ago, with no live comparison against what is actually being bought today</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Group-wide spend spread across entities and systems, so nobody can add it up precisely</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>High-level totals that look fine in a board pack but cannot answer a specific question about one category or one site</div>
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
            eyebrow="The Problem"
            title="Three layers handle classification. Your team handles judgment."
            lead="Most lines never need a human look at them. The ones that do feed back into the system, so the review queue gets shorter, not the same size, every month."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Rules and machine learning</h3>
              <p>Supplier-specific rules and a machine learning layer trained on your own spend handle the clear majority of lines immediately, the way your most experienced buyer would.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>LLM layer for the edge cases</h3>
              <p>Ambiguous descriptions, multilingual line items, and one-off suppliers are resolved by a large language model with broad product and industry knowledge, not guessed at.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Human review, then it remembers</h3>
              <p>Anything still below a confidence threshold is flagged for your team, typically an hour or so a week. Every decision feeds back into the engine.</p>
            </article>
          </div>
          <div className="text-center" style={{ marginTop: "2rem" }}>
            <CalendlyButton label="Talk to sales" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What a real spend baseline makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>A baseline to negotiate and tender from</h3>
              <p>Real spend, by category, across every site and entity. Not last year&rsquo;s estimate.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Bundled contracts broken out by service line</h3>
              <p>Defend a renewal or a client challenge with a cost and performance record for each service, not one blended number.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Framework compliance checked, not assumed</h3>
              <p>See where live buying has drifted from an agreement signed years ago, across the whole business, not just the categories someone happens to be watching.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="You cannot negotiate what you cannot see. Savings come third."
                author="CFO"
                role="Infrastructure and rail contractor"
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
                copy="Procurement data quality is whether spend data, across invoices, purchase orders, and supplier records, is accurate and consistent enough to add up. For infrastructure, construction, and FM organisations buying across many sites, entities, and bundled contracts, poor data quality means nobody can state a real baseline to negotiate or tender from. Pearstop automates the cleaning and classification of procurement data at any scale, from a few hundred lines a month to hundreds of thousands, so spend is visible by category, framework compliance is checked against live buying, and group-wide spend adds up to one number instead of several conflicting ones."
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

      <Script id="procurement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CTABand
        title="Ready to build a real spend baseline?"
        lead="Talk to sales. We will show you exactly where your spend data is hiding the number you need."
        actions={[{ label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
