import type { Metadata } from "next";
import { CTABand, PageHero, QuoteBox, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "SPIE Case Study",
  description:
    "Pearstop consolidated 9,175 supplier name variants into 1,493 canonical suppliers across 204,029 asset records for SPIE Building Solutions — the same classification pipeline behind Pearstop's procurement data cleaning.",
  alternates: {
    canonical: `${siteConfig.url}/cases/spie`,
    languages: alternateLanguages("/cases/spie")
  }
};

export default function SpieCaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Study"
        title="From fragmented asset data to a reliable baseline: cleaning 200,000+ records for SPIE Building Solutions"
        lead="SPIE Building Solutions manages a large portfolio of building assets across many sites. Its asset register had been fed by different maintenance systems, contractors, and manual entry over many years. The same manufacturer could appear under a dozen different spellings, and equipment types were often missing or recorded incorrectly."
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                Pearstop’s core product classifies procurement data. The same underlying problem shows up just as
                often in a physical asset register: messy supplier and manufacturer names that need matching,
                deduplicating, and standardising. Every asset carries a manufacturer and a type, the same way every
                purchase order line does. Applying Pearstop’s existing classification pipeline to SPIE’s asset data
                turned out to be a natural adjacent use case.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="cases-eyebrow">Hard Services FM · Europe</div>
          <h2>The approach</h2>
          <p className="light-copy">
            Pearstop’s pipeline worked from SPIE’s own approved supplier list after we noticed the standard AI
            models would guess or invent names. Each row was matched deterministically wherever possible, using the
            exact, prefix, edit-distance and typo-correction matching, then independently cross-checked with a
            large language model. Then conflicting matches were surfaced for human review to further improve
            results.
          </p>
          <StatsGrid
            stats={[
              { value: "204,029", label: "Asset records processed" },
              { value: "9,175 → 1,493", label: "Supplier variants consolidated" },
              { value: "73.1%", label: "Confirmed match rate" },
              { value: "107,081", label: "Lines enhanced" }
            ]}
          />
          <p className="light-copy">
            Every row was also scored for supplier confidence, type confidence, and review priority. That gave
            SPIE’s team a ranked list of exactly where to focus manual review first, instead of a wall of
            unstructured data.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>A concrete example</h2>
          <p className="light-copy">
            One equipment family alone, circulation pumps from a single manufacturer, appeared in the raw data as
            five different spellings of the supplier name, including a straightforward typo. All five were
            consolidated into one canonical supplier record.
          </p>
          <p className="light-copy">
            The type field was messier still. The same product line showed up as a bare product family name in one
            row and a full model code in another. Pearstop’s pipeline split this into a product family and a
            specific model or variant wherever possible, so those two rows now resolve to the same family with
            different variants. A supplier team can see “this exact pump family, in these exact configurations”
            instead of “pumps, all sorts.”
          </p>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <QuoteBox
              quote="The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows."
              author="Bart van Peij"
              role="Head of Master Data Management, SPIE Building Solutions"
            />
            <QuoteBox
              quote="Pearstop’s manufacturer matching gave us the right starting point to load data back into the ERP. This project taught us a lot about data cleaning with AI."
              author="Martijn van Balkom"
              role="Project Manager, SPIE Building Solutions"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>What we learned</h2>
          <p className="light-copy">
            The single biggest lesson from the project: don’t ask a model to invent a supplier match when the
            client already has an approved list. Matching exclusively against SPIE’s own validated list improved
            both accuracy and client trust in the output significantly. It’s now standard practice for Pearstop on
            any engagement with a defined supplier base.
          </p>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <h2>From commodity servicing to advisory</h2>
          <p className="light-copy">
            A structured, confidence-scored register changes what SPIE can see. Instead of judging each asset on
            its own, SPIE’s team can look at the type level and spot patterns and repeat failure modes across an
            entire equipment family. A technician can say to a client: “this pump family fails at this rate across
            your portfolio, here’s what we’d recommend,” backed by data rather than instinct. That’s what separates
            a commodity servicer from a trusted advisor.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2>Have similar issues with your own asset or equipment data?</h2>
              <p className="light-copy">
                Large, long-lived portfolios of physical assets tend to carry the same shape of problem:
                inconsistent supplier names, missing or freeform equipment types, and no reliable way to tell which
                records can be trusted. Pearstop’s pipeline matches and standardises supplier and manufacturer
                names against your own reference list, classifies equipment types consistently, and scores every
                record for confidence. Get in touch and we’ll show you what your own data looks like after a first
                pass.
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
