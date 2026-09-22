import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Spend Visibility: A Real Cost Baseline for Procurement Teams",
  description:
    "See what you actually spend, by category, supplier, and site, so you can negotiate, tender, and catch contract deviation with real numbers instead of estimates.",
  alternates: {
    canonical: `${siteConfig.url}/spend-visibility`,
    languages: alternateLanguages("/spend-visibility")
  }
};

const FAQ_ITEMS = [
  {
    q: "What is a procurement cost baseline?",
    a: "A cost baseline is a category-level, up-to-date picture of what you actually spend across every site, entity, and supplier, built from classified spend data rather than a percentage estimate. It's what you negotiate a supplier against, price a tender with, or check a framework agreement's compliance against."
  },
  {
    q: "We have spend data in three different systems and none of them agree. Can you still build a baseline?",
    a: "Yes. Each system's data is ingested in whatever format it already arrives, then classified and reconciled into one consistent view. You don't need to unify your systems first."
  },
  {
    q: "How current does the baseline stay?",
    a: "New spend is classified the same way as it arrives, so the baseline updates continuously rather than being a one-off exercise that goes stale the moment it's finished."
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

export default function SpendVisibilityPage() {
  return (
    <>
      <Script id="spendvisibility-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Spend Visibility"
        title="Negotiate and tender with a real cost baseline, not a guess"
        lead="Most procurement and finance teams can't answer a simple question: what do we actually spend on this category, across every site and supplier? Pearstop classifies your spend data so the answer is a query, not a quarter-long exercise."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>Nobody can put a number on it until someone builds it by hand</h2>
              <p className="light-copy">
                Spend is spread across sites, entities, and source systems, with the same supplier appearing under a dozen different names. Every time someone needs a real answer, the same manual exercise starts again: export, reconcile, hope nothing was missed. By the time it&rsquo;s done, the number is already out of date.
              </p>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>
                  &ldquo;We say, well how much is this going to be? And we go, it feels like it should be 3% of the contract value. But in real terms that could be six or that could be two. We don&rsquo;t know.&rdquo;
                </p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Head of Commercial, multi-site FM contractor
                </p>
              </blockquote>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Spend is spread across entities and suppliers with no single, consolidated, coded view of who&rsquo;s buying what</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Framework agreements exist on paper, but nobody can tell if actual buying still matches them</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>A category manager can see the handful of agreements in their own patch; the other fifty-plus categories have no visibility at all</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Every tender or negotiation starts from an estimate, because the real baseline doesn&rsquo;t exist yet</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="The Problem" title="From scattered spend to a live cost baseline" lead="The same classification pipeline that cleans your spend data turns it into a baseline you can actually negotiate against." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Classify every line</h3>
              <p>Every invoice line and PO is matched to a consistent category (UNSPSC or your own taxonomy) and a canonical supplier, regardless of how it originally arrived.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Build the baseline</h3>
              <p>Classified spend rolls up into a real baseline by category, supplier, site, and time period, benchmarked against your own historical data.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Catch deviation as it happens</h3>
              <p>New spend is classified the same way as it arrives, so drift from an agreed framework or contract shows up immediately instead of at the next audit.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What a real baseline makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Negotiate from data, not a feeling</h3>
              <p>Walk into a supplier negotiation or a tender knowing exactly what you spend today, by category, instead of a percentage that feels about right.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Catch contract deviation early</h3>
              <p>See where actual buying has drifted from an agreed framework or rate card, before it costs a full budget cycle.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>One number everyone trusts</h3>
              <p>Procurement, finance, and commercial teams work from the same classified baseline, instead of three different spreadsheets with three different answers.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is a procurement cost baseline, and why don't most teams have one?"
                copy="A cost baseline is a reliable, category-level view of what an organisation actually spends, built from classified spend data rather than an estimate. Most procurement and finance teams don't have one because spend is spread across sites, entities, and source systems, with the same supplier recorded under different names in each. Building a baseline by hand means exporting, reconciling, and correcting that data every time someone needs an answer, which is why the exercise gets redone from scratch instead of maintained. Pearstop classifies spend data continuously, so the baseline stays current as new invoices and purchase orders arrive, and negotiation, tendering, and framework-compliance checks can run against real numbers instead of an estimate."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="No one's ever really looked at it before and gone, how good is this and could we be improving on it."
                author="Commercial lead"
                role="Real estate & integrated FM"
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
        title="Ready to see your own spend baseline?"
        lead="Book a 7-minute discovery call and see what a real cost baseline looks like for your own spend data."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
