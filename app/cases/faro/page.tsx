import type { Metadata } from "next";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "FARO Case Study",
  description:
    "Pearstop classified thousands of product lines for FARO, linked them to sales data, and made margin visible before the purchase was committed.",
  alternates: {
    canonical: `${siteConfig.url}/cases/faro`
  }
};

export default function FaroCaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Study"
        title="Accurate margin estimates on every container purchase, automatically"
        lead="For every purchasing decision, FARO needed to categorise around 30,000 product lines per five containers to estimate margin, sale price, and stock time. Manual categorisation made this slow and inconsistent. Pearstop automated the classification using their own category system and linked it directly to their sales database."
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="cases-eyebrow">Retail · South Africa</div>
              <h2>The challenge</h2>
              <p className="light-copy">
                For each container purchase, FARO needed a reliable cost picture before committing capital. That meant classifying thousands of product lines, linking them to sales outcomes, and keeping the process fast enough to support the buying decision itself.
              </p>
              <p className="light-copy">
                Without automation, the work was repetitive, slow, and hard to scale. With Pearstop, the team got a structured process that could support margin estimation before the purchase was made.
              </p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <StatsGrid
                className="stats-aside"
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

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="What Pearstop delivered" />
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
              <GeoBlock
                title="What changed for FARO?"
                copy="The team moved from manual categorisation to an automated flow that could keep up with buying decisions. That made margin visible earlier, reduced the operational drag on the procurement team, and gave the business a more reliable basis for planning and analysis."
              />
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
