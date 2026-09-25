import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/erp-migration-data-cleansing`;

export const metadata: Metadata = {
  title: "ERP Migration Data Cleansing: SAP and Beyond",
  description:
    "Clean and classify procurement and asset data before it moves into a new ERP, so the migration doesn't just carry the mess into a new system. Deepest experience with SAP; also supports Oracle, Microsoft Dynamics, and other major platforms.",
  alternates: { canonical: PAGE_URL, languages: alternateLanguages("/erp-migration-data-cleansing") }
};

const FAQ_ITEMS = [
  {
    q: "Does this work specifically with SAP, or other ERPs too?",
    a: "SAP is where Pearstop has the deepest, most evidenced experience - including auto-classifying 95% of spend on one manufacturing client's SAP environment without touching the underlying structure. Pearstop also supports Oracle, Microsoft Dynamics, NetSuite, and other major ERP platforms; get in touch about your specific setup."
  },
  {
    q: "Should we wait until the migration is scheduled to start cleaning our data?",
    a: "No. Data readiness started years before a migration deadline consistently performs better than a rushed cleanup in the weeks before go-live, because there's time to catch edge cases and get team feedback into the system rather than rushing a one-off pass."
  },
  {
    q: "Does this replace our migration partner or systems integrator?",
    a: "No. Pearstop cleans and classifies the reference data itself, then delivers it in the format your migration partner or systems integrator expects to load into the new system - it's the data-readiness layer underneath the migration project, not a replacement for it."
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
    { "@type": "ListItem", position: 3, name: "ERP Migration Data Cleansing", item: PAGE_URL }
  ]
};

export default function ErpMigrationPage() {
  return (
    <>
      <Script id="erpmigration-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="erpmigration-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="ERP Migration"
        title="An ERP migration moves your data exactly as it is. Mistakes included."
        lead="A migration project doesn't fix bad procurement or asset data - it gives it a new home. Pearstop cleans and classifies the data before it moves, so the new system starts with something usable instead of the same mess in a different place."
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
              <h2>The deadline arrives. The data was never actually ready.</h2>
              <p className="light-copy">
                Most ERP migration timelines are set by the go-live date, not by how long the underlying data actually needs. Reference data - supplier names, cost codes, item and asset descriptions - carries years of inconsistency into the new system, because cleaning it was never scoped as part of the project in the first place.
              </p>
              <p className="light-copy">
                By the time anyone notices, the new system is live, and the same manual reconciliation work is happening on a more expensive platform.
              </p>
              <ul className="ind-pains">
                <li><span className="ind-ok">×</span><div>Reference data carries years of inconsistency into the new system unless someone actually cleans it first</div></li>
                <li><span className="ind-ok">×</span><div>A go-live deadline drives the migration timeline, not how long the data actually needs to be ready</div></li>
                <li><span className="ind-ok">×</span><div>Construction and manufacturing procurement data breaks general-purpose AI tools before it ever reaches the new system</div></li>
                <li><span className="ind-ok">×</span><div>Classification work started years before a migration performs far better than a rushed pre-go-live scramble</div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="How It Works" title="Migration-ready data, not a cleanup project after go-live" />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Ingest from your current system</h3>
              <p>Connect to SAP, Oracle, Microsoft Dynamics, or whatever ERP you're migrating from, in whatever format the data already exists.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Classify and standardise before it moves</h3>
              <p>Supplier names, cost codes, and item or asset descriptions are matched, deduplicated, and classified - rules and machine learning first, an LLM for the edge cases, human review for anything still uncertain.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Deliver migration-ready data</h3>
              <p>Structured, classified output ready to load into the new system, so the migration starts clean instead of carrying the old mess forward.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What changes when the data is ready before go-live" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>A new system that starts clean</h3>
              <p>The migration reproduces a clean, classified dataset instead of moving the same inconsistency into a new platform, at greater cost to fix afterward.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>No repeat cleanup project in five years</h3>
              <p>Reference data cleaned once, structured for the new system, instead of a fresh manual project every time the underlying mess resurfaces.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>The migration timeline stops hiding behind bad data</h3>
              <p>Data readiness stops being the hidden risk that surfaces two months before go-live.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">Deepest Experience With SAP</div>
              <h2>Most of this work has been SAP</h2>
              <p className="light-copy">
                SAP is the most common system running procurement and asset data in hard services, construction, and manufacturing, and it&rsquo;s where Pearstop has the most direct migration and readiness experience. On one manufacturing client&rsquo;s SAP environment, Pearstop auto-classified 95% of spend without touching the underlying SAP structure. Separately, Pearstop&rsquo;s own view - covered in more detail below - is that construction firms get better results starting classification work years before a SAP migration deadline, not in the rushed weeks before go-live.
              </p>
              <div className="row" style={{ gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <Link className="ind-card-link" href="/blog/manufacturing-procurement-sap-data-quality">
                  Read: the SAP problem hard FM already solved →
                </Link>
                <Link className="ind-card-link" href="/blog/sap-migration-readiness-construction">
                  Read: why SAP readiness starts years before migration →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h2>Also supports Oracle, Microsoft Dynamics, and other major ERPs</h2>
              <p className="light-copy">
                The classification and cleansing approach is the same regardless of source or destination system. Pearstop also works with Oracle, Microsoft Dynamics, NetSuite, and other major ERP platforms - if you&rsquo;re migrating between two of these, or from a legacy system into one of them, get in touch about your specific setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is ERP migration data cleansing, and why does it matter?"
                copy="ERP migration data cleansing is the process of correcting, standardising, and classifying procurement and asset reference data before it moves into a new ERP system, rather than during or after the migration itself. It matters because a migration project moves data exactly as it is - it does not fix inconsistent supplier names, mismatched cost codes, or unclear item descriptions, it just gives them a new, more expensive home. Manual data cleanup scoped into a migration timeline usually loses to the go-live deadline, which is why data readiness is best started well before a migration is scheduled, not squeezed into the weeks before it. Pearstop classifies and standardises reference data continuously, so by the time a migration is scheduled, the data is already migration-ready."
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
        title="Migration on the calendar, data not ready yet?"
        lead="Book a 7-minute discovery call. We will show you exactly where your data would break the migration today - and how long readiness actually takes."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
