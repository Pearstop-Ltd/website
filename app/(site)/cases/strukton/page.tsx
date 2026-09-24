import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Strukton Case Study",
  description:
    "Pearstop built an AI classification system with Strukton's procurement team: 35,000 to 50,000 lines of spend classified into UNSPSC every month, starting from zero classification history.",
  alternates: {
    canonical: `${siteConfig.url}/cases/strukton`,
    languages: alternateLanguages("/cases/strukton")
  }
};

export default function StruktonCaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Study"
        title="Classifying 35,000 to 50,000 procurement lines a month into UNSPSC, from zero classification history"
        lead="How Pearstop and Strukton built an AI classification system from zero UNSPSC history."
        leadAccent
        titleSize="sm"
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                Strukton is a major Dutch infrastructure contractor. Pearstop built this system together with their
                procurement department. It classifies every line of spend into UNSPSC, automatically, every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="cases-eyebrow">Infrastructure · Netherlands</div>
          <h2 className="case-wayfinder">The problem</h2>
          <h3 className="case-question">Why can&rsquo;t you find procurement savings without granular spend data?</h3>
          <p className="light-copy">
            Strukton had identified a real cost-saving opportunity in procurement. To act on it, they needed higher
            granularity in their spend data. Their spend was already well organized. What they didn&rsquo;t have was
            UNSPSC classification. This project started from zero classification history.
          </p>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <h2 className="case-wayfinder">How it works</h2>
          <h3 className="case-question">How does an AI classification system avoid guessing on your data?</h3>
          <p className="light-copy">
            Pearstop and Strukton&rsquo;s procurement team built a system with three layers. AI classifies each line
            automatically. A machine learning pipeline learns from the team&rsquo;s own input and context, not just
            from a general-purpose model on its own. A human-in-the-loop review step catches anything the system
            isn&rsquo;t confident about.
          </p>
          <p className="light-copy">
            A common mistake in AI projects: reinventing the wheel. Teams start from scratch and don&rsquo;t give the
            model enough context. Without that context, the model goes on a tangent. Strukton&rsquo;s system avoids
            that by learning continuously from real decisions made by real buyers, not a generic prompt.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h3 className="case-question">Why do all four UNSPSC levels matter, not just the top one?</h3>
          <p className="light-copy">
            Every month, a new batch of spend comes in. Pearstop processes all of it. Each line gets four levels of
            UNSPSC classification: segment, family, class, and commodity.
          </p>
          <div className="case-callout" style={{ margin: "1rem 0" }}>
            <span className="case-callout-label">Four levels, broadest to most specific</span>
            <strong>Segment → Family → Class → Commodity</strong>
          </div>
          <p className="light-copy">
            A segment is the broadest category. A commodity is the most specific. Classifying to all four levels, not
            just the top one, is what makes the data usable for real decisions - benchmarking one specific product
            across suppliers, not just a broad category average.{" "}
            <Link href="/blog/what-is-unspsc">Read more about how UNSPSC&rsquo;s four levels work</Link>.
          </p>
          <StatsGrid
            stats={[
              { value: "35k–50k", label: "spend lines a month" },
              { value: "4", label: "UNSPSC levels per line" },
              { value: "Weekly", label: "buyer feedback cadence" }
            ]}
          />
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <h3 className="case-question">How does a classification system get more accurate over time?</h3>
          <p className="light-copy">
            Strukton&rsquo;s buyers review what the AI classified. They flag what&rsquo;s right and what isn&rsquo;t.
            Every correction feeds back into the system. Pearstop and Strukton&rsquo;s team meet weekly. The team
            gives feedback on what&rsquo;s working and what isn&rsquo;t. The system gets more accurate every month,
            not just more used.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="Built and proven with a major Dutch infrastructure contractor, starting from zero classification history."
                author="Strukton"
                role="Infrastructure, Netherlands"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="case-wayfinder">The result</h2>
              <h3 className="case-question">What changes once spend is fully classified?</h3>
              <p className="light-copy">
                Before this project, Strukton had no UNSPSC classification at all. Now, 35,000 to 50,000 lines of
                spend are classified automatically every month, to all four UNSPSC levels. The cost-saving
                opportunity they identified at the start now has the granularity to actually act on it.
              </p>
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
