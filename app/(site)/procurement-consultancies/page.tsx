import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Spend Classification for Procurement Consultancies",
  description:
    "Deliver spend cube, category management, and sourcing-savings engagements without burning analyst hours on manual classification. White-labelled, your taxonomy, predictable pricing.",
  alternates: {
    canonical: `${siteConfig.url}/procurement-consultancies`,
    languages: alternateLanguages("/procurement-consultancies")
  }
};

const FAQ_ITEMS = [
  {
    q: "Can the output use our own taxonomy instead of UNSPSC?",
    a: "Yes. Pearstop classifies against whatever taxonomy you specify, including a proprietary framework you sell as part of your own IP. UNSPSC is available if you'd rather use a standard one."
  },
  {
    q: "Is this white-labelled?",
    a: "Yes. The deliverable is built to sit inside your own engagement output, not branded as a third-party tool."
  },
  {
    q: "How does pricing work across multiple client engagements?",
    a: "Pricing is structured around volume and engagement cadence rather than a single flat fee, so it can be built into how you price your own client work upfront."
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

export default function ProcurementConsultanciesPage() {
  return (
    <>
      <Script id="procurementconsultancies-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="For Procurement Consultancies"
        title="Deliver the spend classification, keep the engagement margin"
        lead="Category management, sourcing-savings, and spend-cube engagements all start with the same manual bottleneck: classifying a client's messy spend data. Pearstop does that layer, white-labelled under your own taxonomy, so your team spends its hours on the analysis and recommendations clients actually pay for."
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
              <h2>Analyst hours are going to data cleanup, not client value</h2>
              <p className="light-copy">
                Every new engagement starts the same way: a client hands over years of messy spend data, and someone on your team spends the first weeks just getting it into a usable shape before any real analysis can start. That time comes straight out of engagement margin, and it&rsquo;s the least differentiated part of the work you&rsquo;re being paid for.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Junior analyst or offshore hours spent on manual classification eat directly into engagement margin</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Client deadlines don&rsquo;t move just because the underlying data is a mess</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Every engagement re-solves the same classification problem from scratch, with nothing reusable carried forward</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>A general AI tool guesses at supplier matches and invents things that aren&rsquo;t there, creating rework instead of saving time</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="The Problem" title="Your taxonomy, our pipeline" lead="Pearstop plugs into your delivery model as the classification layer underneath it, not a replacement for your team's analysis." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Bring your own taxonomy</h3>
              <p>Most consultancies sell their own category framework as part of their IP. Pearstop classifies against your taxonomy, or UNSPSC if you prefer, not the other way around.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Classify with guardrails</h3>
              <p>Deterministic matching first, cross-checked with an LLM, with every uncertain match flagged for review rather than guessed at, so the output can go straight into a client deliverable.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Deliver under your name</h3>
              <p>Output is white-labelled. Your client sees your firm's deliverable, not a third-party tool.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What this changes for a consultancy" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Protect engagement margin</h3>
              <p>Classification happens in days, not the weeks of analyst time it currently absorbs, so more of the fee lands as margin instead of labour cost.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Take on more engagements without more headcount</h3>
              <p>Delivery capacity stops being bottlenecked by how many analysts you can put on manual classification at once.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>A predictable cost line</h3>
              <p>Classification cost per engagement is known upfront, instead of an open-ended analyst-hours estimate that can run over.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="How does an AI classification pipeline change a procurement consultancy's delivery model?"
                copy="Spend classification is the slowest, least differentiated part of most category-management, sourcing-savings, and spend-cube engagements, and it's typically done by junior analysts or an offshore team working through a client's spend data line by line. An AI classification pipeline takes over that layer: matching and standardising supplier names, classifying line items against a taxonomy, whether that's UNSPSC or the consultancy's own proprietary framework, and flagging anything uncertain for human review rather than guessing. The output is white-labelled, so it slots into an existing delivery model as the data layer underneath it, freeing analyst time for the sourcing strategy and recommendations clients are actually paying the consultancy for."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Further Reading"
            title="More on spend cube delivery for consultancies"
            lead="A closer look at what changes when the classification layer is automated."
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">Spend cube delivery for procurement consultancies</div>
                <p className="light-copy">
                  How consultancies can replace manual spend cube builds with an AI pipeline, guardrails against hallucination, and a fixed-fee pricing model.
                </p>
                <Link className="bene-link" href="/blog/spend-cube-ai-for-procurement-consultancies">
                  Read the article →
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">How to build a spend cube with AI</div>
                <p className="light-copy">
                  The five steps to building a spend cube, what data you need, and when a consultant is still the better choice than an AI classification pipeline.
                </p>
                <Link className="bene-link" href="/blog/how-to-build-a-spend-cube-with-ai">
                  Read the article →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
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
        title="Want to see it on a real client dataset?"
        lead="Book a 7-minute discovery call and we'll show you what your next engagement's spend data looks like after a first pass."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
