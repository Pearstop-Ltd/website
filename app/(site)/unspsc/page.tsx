import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UNSPSC Classification and Manufacturer Part Verification",
  description:
    "Pearstop automates procurement classification, auto-coding up to 95% of spend to UNSPSC and resolving a supplier's own part code back to the real manufacturer code, without manual tracing.",
  keywords: [
    "UNSPSC classification",
    "procurement classification",
    "UNSPSC lookup",
    "United Nations Standard Products and Services Code",
    "automated procurement classification",
  ],
  alternates: {
    canonical: `${siteConfig.url}/unspsc`,
    languages: alternateLanguages("/unspsc")
  }
};

const FAQ_ITEMS = [
  {
    q: "What is UNSPSC classification?",
    a: "UNSPSC (United Nations Standard Products and Services Code) is a hierarchical classification system used worldwide to categorise procurement spend. It has four levels: Segment, Family, Class, and Commodity. Organisations use UNSPSC to enable consistent spend analysis, supplier benchmarking, and category management across contracts, sites, and ERP systems."
  },
  {
    q: "How accurate is automated UNSPSC classification?",
    a: "Pearstop's classification engine, combining rules, machine learning, an LLM layer, and human review, achieves 90 to 95% automatic classification on typical procurement datasets. The remaining 5 to 10% is flagged for human review. Each reviewed decision feeds back into the engine, shrinking the review queue over time until it reaches near zero."
  },
  {
    q: "Can UNSPSC classification identify the manufacturer's part number behind a supplier's own code?",
    a: "Yes. Where a manufacturer's original part number exists in the data or a connected reference source, the engine resolves it and returns it as a separate end manufacturer MPN field, rather than leaving the supplier's own code as the only reference on the line."
  },
  {
    q: "Does Pearstop integrate with SAP for UNSPSC classification?",
    a: "Yes. Pearstop receives data via CSV export or direct API connection from SAP, Oracle, and other ERP and P2P platforms. In practice, many clients find that CSV export is the simplest way to start. Classified data is returned in the same format, ready to load back into SAP or feed into BI tools."
  },
  {
    q: "How long does UNSPSC classification take?",
    a: "Most clients have a clean, classified dataset ready within four to six weeks of starting. The first engagement begins with a Data Stability Baseline so you can assess the output quality before committing to ongoing classification."
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated UNSPSC Classification",
  description: "Pearstop auto-classifies up to 95% of procurement spend lines to UNSPSC standard without manual effort, and resolves a supplier's own part code back to the real manufacturer code. Built for hard services FM, infrastructure, construction, and manufacturing companies.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-dark.webp`
  },
  serviceType: "Procurement Data Classification",
  areaServed: "Europe"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` }
  ]
};

export default function UnspscPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        className="hero-left"
        eyebrow="UNSPSC Classification"
        title="Your procurement data contains the answers. You just cannot read it yet."
        lead="Most FM and construction companies have years of purchase order data in SAP or Oracle. Without UNSPSC classification, it is a pile of free-text line items. With it, you can see exactly what you spend by category, benchmark suppliers, and build tenders from actual cost data. Pearstop classifies invoices at any scale, from a pilot of a few hundred lines to full production volume - it scales with you."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "What is UNSPSC?", href: "#what-is-unspsc", variant: "secondary" }
        ]}
      />

      <section id="what-is-unspsc">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">What is UNSPSC?</div>
              <h2>The four-level code that makes procurement data comparable.</h2>
              <p className="light-copy">
                UNSPSC (United Nations Standard Products and Services Code) is a global four-level hierarchy used to categorise every product and service a company buys. Segment and Family give you broad spend visibility. Class and Commodity give you the precision to negotiate, benchmark, and manage categories effectively.
              </p>
              <p className="light-copy">
                Without it, the same physical work appears under dozens of different strings. At SPIE, invoice lines like &lsquo;HVAC unt&rsquo; were enriched to &lsquo;HVAC Unit, Air Handler, Climate Control, Carrier&rsquo; with a consistent UNSPSC commodity code. That is the difference between data you can act on and data you cannot.
              </p>
              <div className="quote-card">
                <div className="story-label"><strong>Example UNSPSC hierarchy</strong></div>
                <p><strong>Segment:</strong> 72 - Construction and Maintenance</p>
                <p><strong>Family:</strong> 7210 - Building and Facility Maintenance</p>
                <p><strong>Class:</strong> 721010 - Electrical Maintenance</p>
                <p><strong>Commodity:</strong> 72101505 - Lighting maintenance</p>
              </div>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.spendControl}
                alt="UNSPSC classification for procurement spend data"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>


      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="Most lines classify themselves. The rest get a second look."
            lead="Rules and machine learning classify high-confidence lines immediately. The layer that used to need a dedicated team now runs in the background."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Rules and machine learning</h3>
              <p>Supplier and GL-based rules combined with a machine learning layer trained on your own spend classify the high-confidence majority of lines immediately.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>LLM layer for the edge cases</h3>
              <p>Field engineer shorthand, part numbers, and multilingual descriptions are resolved by a large language model with deep product and industry knowledge, the layer that handles what rules and ML cannot.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Human review, then it remembers</h3>
              <p>The five to ten percent the engine is uncertain about is flagged for your team. Each decision feeds back into the model, and the review queue drops over successive months.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">Manufacturer Verification</div>
              <h2>What if the part only has the supplier&rsquo;s own code on it?</h2>
              <p className="light-copy">
                Hard services and MRO buyers run into this constantly. A maintenance component&rsquo;s only code on file belongs to the supplier who delivered it, not the manufacturer who made it. Without the manufacturer&rsquo;s own code, there is no way to check the price against anyone else, or confirm that two teams describing the same component are actually talking about the same thing. Tracing it back by hand usually means going through whoever ordered the part originally and asking for a clearer description, then waiting.
              </p>
              <p className="light-copy">
                This is not a hypothetical. In one hard services engagement, engineers were ordering components against the supplier&rsquo;s own part code because that was the only code on the paperwork. The manufacturer&rsquo;s real code, the one that would let the business buy from anyone else, existed, but getting to it meant tracing the part back through the original order, often after several rounds of asking for a clearer description.
              </p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">What comes back</div>
                <p className="light-copy">
                  An end manufacturer MPN field: the original part number, separate from the supplier&rsquo;s own code, flagged as enriched rather than certain wherever the data does not confirm a match outright. Higher-value components are held to a tighter review threshold, because a wrong match costs more the more the part costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>100-100k</div>
              <h3>Invoices a month, scales with you</h3>
              <p>Our human-in-the-loop review process was built with input from Strukton&rsquo;s buyer team. Pearstop scales from a pilot to full production volume - a hundred lines a month or a hundred thousand.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>90-95%</div>
              <h3>Auto-classification rate</h3>
              <p>90-95% of lines are classified automatically at commodity level, without your team touching them.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>70-90%</div>
              <h3>Reduction in manual effort</h3>
              <p>Clients typically reduce manual procurement data work by 70-90%, freeing buyers for category strategy and contract negotiation.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What a classified spend baseline makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Category Management</h3>
              <p>See what you actually spend by commodity across every supplier and site. At FARO, this replaced 2 FTE and cut processing time from weeks to under a day per container.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Supplier Benchmarking</h3>
              <p>Compare prices for the same UNSPSC commodity across suppliers. The benchmark only works when both sides of the comparison carry the same code.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>ERP and BI Integration</h3>
              <p>UNSPSC-coded data feeds directly into SAP, Oracle, Power BI, and Microsoft Fabric. No custom mapping. No format conversion. No reconciliation work.</p>
            </article>
          </div>
        </div>
      </section>

      <UnspscLookupCta />

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week. That would have taken our team six months and still would not have been this accurate."
                author="David Torr"
                role="CEO, FARO"
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
                title="How does UNSPSC classification work for hard services and FM companies?"
                copy="Hard services FM companies typically buy from 500 to 3,000 suppliers across multiple sites. Invoice descriptions are written by field engineers, not buyers, which means the same work appears under hundreds of different strings. Manual UNSPSC classification at 5,000 to 35,000 lines per month requires one or two dedicated staff working continuously just to stay current. Pearstop's automated engine classifies 90-95% of those lines without human input, with the remainder flagged for review. The review queue shrinks each month as the engine learns from your team's decisions."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">What if we have never classified before?</div>
                <p>
                  Most clients start with years of unclassified SAP data and no historical UNSPSC codes. The rules layer applies supplier and GL-based patterns immediately. The ML layer is pre-trained on procurement data across industries. The LLM layer covers the gaps. First-run auto-classification typically reaches 84-88%, improving to 90-95% within 12 weeks as your team reviews flagged items.
                </p>
              </div>
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

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="story-label" style={{ marginBottom: "1rem" }}>More UNSPSC resources</div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/unspsc-code-lookup" className="btn btn-secondary">
                  Free UNSPSC Code Lookup
                </Link>
                <Link href="/unspsc-classification-demo" className="btn btn-secondary">
                  Explore the UNSPSC Tree
                </Link>
                <Link href="/unspsc-ai-classification-guide" className="btn btn-secondary">
                  How AI Classification Actually Works
                </Link>
                <Link href="/unspsc-classification-facilities-management" className="btn btn-secondary">
                  UNSPSC for FM and Hard Services
                </Link>
                <Link href="/unspsc-classification-netherlands" className="btn btn-secondary">
                  UNSPSC in the Netherlands
                </Link>
                <Link href="/unspsc-classification-germany" className="btn btn-secondary">
                  UNSPSC in Germany
                </Link>
                <Link href="/faq" className="btn btn-secondary">
                  Full FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <CTABand
        title="Ready to automate your procurement classification?"
        lead="Talk to sales. We will show you exactly how the classification engine would work with your data."
        actions={[{ label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
