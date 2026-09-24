import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Asset Data Management for Asset Owners and FM Operators",
  description:
    "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them.",
  alternates: {
    canonical: `${siteConfig.url}/asset-data-management`,
    languages: alternateLanguages("/asset-data-management")
  },
  openGraph: {
    title: "Asset Data Management for Asset Owners and FM Operators | Pearstop",
    description:
      "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them.",
    url: `${siteConfig.url}/asset-data-management`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Asset Data Management for Asset Owners and FM Operators | Pearstop",
    description:
      "Turn the asset and cost data your FM provider hands you into an independent, classified record you can benchmark and defend, not just a file you received from them.",
    images: ["/opengraph-image"]
  }
};

const FAQ_ITEMS = [
  {
    q: "We do not manage the FM contract directly. Can Pearstop still help?",
    a: "Yes. Pearstop works from whatever cost and asset data you already receive from your provider, structuring it into an independent, classified record rather than requiring you to run the contract yourself."
  },
  {
    q: "Can we benchmark one provider or site against another?",
    a: "Yes. Once asset and cost data is standardised to the same format, comparing providers, sites, or portfolios on the same basis becomes possible, which it is not when each arrives in its own naming convention and structure."
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

export default function AssetDataManagementPage() {
  return (
    <>
      <Script id="assetmanagement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Asset Management"
        title="You do not touch the invoices. You still need to know what they say."
        lead="Asset owners who outsource facilities management do not generate their own spend and maintenance data. They receive it, filtered through whichever provider delivers the contract. Pearstop gives you an independent, classified version of that same data, structured well enough to compare providers, sites, and years on the same basis."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>You get the provider&rsquo;s report. You do not get an independent one.</h2>
              <p className="light-copy">
                Property investors, landlords, and public estate owners who outsource facilities management do not generate their own spend and maintenance data. They receive it, filtered through whichever provider delivers the contract. That arrangement holds up fine until someone asks the simple question underneath it: is this competitive, and how would we know if it was not.
              </p>
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>
                  &ldquo;We&rsquo;ve got all this information, but what are we using it for? No one&rsquo;s ever really looked at it before and gone, how good is this, and could we be improving on it.&rdquo;
                </p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  Commercial lead, real estate investment firm
                </p>
              </blockquote>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Cost and maintenance data arrives already filtered through the provider&rsquo;s own systems and naming conventions</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Equipment and manufacturer records vary site to site, so comparing one provider or site against another is not possible on the data as received</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>No independent way to check whether the numbers you are given are competitive</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Reviewing a provider&rsquo;s own reporting after the fact is not the same as holding a comparable record of your own</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.assetManagement}
                alt="Asset data management for FM and infrastructure"
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
            title="From fragmented registers to a trusted asset database"
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Data Consolidation</h3>
              <p>Asset data from any source, whichever provider supplies it, spreadsheets, ERP systems, legacy CMMS, site surveys, ingested in any format and mapped to a unified schema.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Standardisation and Enrichment</h3>
              <p>Naming conventions standardised, duplicates resolved, field mismatches corrected, and missing values filled from reference data so the same asset looks the same everywhere.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Linked and Analysis-Ready</h3>
              <p>The cleaned register is linked to maintenance records and cost data where available, creating an asset intelligence layer that supports planned maintenance, lifecycle analysis, and provider review.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What becomes possible with clean asset data" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Predictive Maintenance</h3>
              <p>Shift from reactive to planned maintenance when your data can support forward-looking analysis.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Cross-Site and Cross-Provider Benchmarking</h3>
              <p>Compare asset performance and cost across providers, sites, and portfolios on the same basis, previously impossible when each arrived in its own format.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Risk Management</h3>
              <p>Identify high-risk assets and maintenance liabilities before they become costly emergencies.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="What changes with Pearstop" />
          <StatsGrid
            stats={[
              { value: "100,000+", label: "assets cleaned and structured", copy: "Across client deployments to date" },
              { value: "95%", label: "automated error resolution", copy: "Without manual intervention" },
              { value: "70-90%", label: "reduction in manual data work", copy: "Freeing your team for analysis, not admin" }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We want to control the story, the narrative, from our side."
                author="Commercial lead"
                role="Real estate investment firm"
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
                title="How does poor asset data quality affect maintenance planning, FM contract performance, and asset owner assurance?"
                copy="Asset data quality problems in facilities management typically start the same way: registers and cost reports built for whoever runs day to day operations, not for the owner trying to check them. Spelling variations across manufacturers, equipment crammed into single fields, and reporting formats that differ by provider or site mean the data cannot be compared, benchmarked, or verified independently. Pearstop standardises naming conventions, resolves field mismatches, and consolidates records from multiple source systems and providers, giving asset owners and FM operators alike a clean, comparable dataset that supports planned maintenance, lifecycle tracking, and an independent basis for reviewing a provider's own numbers."
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
        title="Ready to hold an independent view of your own?"
        lead="Talk to sales and see exactly how Pearstop turns the data you already receive into something you can verify."
        actions={[{ label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
