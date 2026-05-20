import type { Metadata } from "next";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Asset Data Management for FM and Infrastructure",
  description:
    "Turn fragmented asset registers into a clean, reliable dataset. Pearstop structures asset data for facilities management, infrastructure, and hard services companies.",
  alternates: {
    canonical: `${siteConfig.url}/asset-data-management`
  },
  openGraph: {
    title: "Asset Data Management for FM and Infrastructure | Pearstop",
    description:
      "Turn fragmented asset registers into a clean, reliable dataset. Pearstop structures asset data for facilities management, infrastructure, and hard services companies.",
    url: `${siteConfig.url}/asset-data-management`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Asset Data Management for FM and Infrastructure | Pearstop",
    description:
      "Turn fragmented asset registers into a clean, reliable dataset. Pearstop structures asset data for facilities management, infrastructure, and hard services companies.",
    images: ["/opengraph-image"]
  }
};

export default function AssetDataManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Asset Management"
        title="Your asset list should work for you, not against you."
        lead="If your asset data needs human interpretation to be useful, it is not usable. Pearstop cleans, structures, and standardises asset registers so maintenance teams, procurement buyers, and management can all work from the same trusted source."
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
              <h2>Fragmented asset data makes everything harder and more expensive.</h2>
              <p className="light-copy">
                Asset registers in hard services and infrastructure typically grow organically across sites and systems. Equipment names vary by site. Manufacturer fields are used inconsistently. Records are split across spreadsheets, legacy CMMS systems, and paper surveys. The result is that the data cannot be compared across sites, used for lifecycle analysis, or fed into planning tools reliably.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Spelling variations and inconsistent naming mean you cannot compare assets across sites</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Equipment types crammed into single free-text fields make filtering and analysis impossible</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Maintenance planning becomes reactive because data cannot support predictive analysis</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Bid pricing for maintenance contracts is based on incomplete or unreliable asset information</div>
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
            eyebrow="How It Works"
            title="From fragmented registers to a trusted asset database"
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Data Consolidation</h3>
              <p>Asset data from any source - spreadsheets, ERP systems, legacy CMMS, site surveys - ingested in any format and mapped to a unified schema.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Standardisation and Enrichment</h3>
              <p>Naming conventions standardised, duplicates resolved, field mismatches corrected, and missing values filled from reference data so the same asset looks the same everywhere.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Linked and Analysis-Ready</h3>
              <p>The cleaned register is linked to maintenance records and cost data where available - creating an asset intelligence layer that supports planned maintenance, lifecycle analysis, and smarter bidding.</p>
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
              <h3>Cross-Site Benchmarking</h3>
              <p>Compare asset performance across sites, manufacturers, and contract types - previously impossible with fragmented data.</p>
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
                quote="Our asset data worked for the mechanics on-site. It did not work for anyone trying to plan maintenance or run analysis on it. Pearstop fixed that."
                author="Asset Manager"
                role="Facilities Management"
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
                title="How does poor asset data quality affect maintenance planning and FM contract performance?"
                copy="Asset data quality problems in facilities management and hard services typically start the same way: asset registers built for on-site engineers rather than analytical use. Spelling variations across manufacturers, equipment types crammed into single fields, and records spread across spreadsheets and legacy systems mean the data cannot be compared across sites, used for lifecycle analysis, or fed into planning tools reliably. For FM companies, this makes predictive maintenance planning nearly impossible and exposes contracts to margin risk from reactive, unplanned work. Pearstop standardises asset naming conventions, resolves field mismatches, and consolidates records from multiple source systems - giving FM operators and infrastructure companies a clean, comparable asset register that supports planned maintenance, lifecycle tracking, and data-backed advisory services."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to turn your asset data into a strategic asset?"
        lead="Book a 7-minute discovery call and see exactly how Pearstop fixes your specific data challenge."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
