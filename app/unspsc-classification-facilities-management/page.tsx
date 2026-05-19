import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UNSPSC Classification for Facilities Management | Pearstop",
  description:
    "Automated UNSPSC classification for hard services and FM companies. Classify maintenance, MRO, and subcontractor spend across multi-site operations without manual effort.",
  alternates: {
    canonical: `${siteConfig.url}/unspsc-classification-facilities-management`
  },
  openGraph: {
    title: "UNSPSC Classification for Facilities Management | Pearstop",
    description:
      "Automated UNSPSC classification for hard services and FM companies. Classify maintenance, MRO, and subcontractor spend across multi-site operations without manual effort.",
    url: `${siteConfig.url}/unspsc-classification-facilities-management`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What UNSPSC segments apply to facilities management?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common UNSPSC segments for facilities management are Segment 72 (Construction and Maintenance Services), Segment 76 (Industrial Cleaning Services), Segment 80 (Management and Business Professionals and Administrative Services), and Segment 73 (Industrial Production and Manufacturing Services). Hard services FM companies typically see the highest spend volume in Segment 72, covering electrical, HVAC, plumbing, and fabric maintenance."
      }
    },
    {
      "@type": "Question",
      name: "Why is UNSPSC classification difficult for FM companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FM companies buy from hundreds or thousands of suppliers across decentralised sites. Invoice lines are often free-text descriptions written by field engineers, not procurement teams. Spellings vary, supplier codes differ between contracts, and the same physical work can be described a dozen ways. Manual classification at this scale requires one or two dedicated staff working continuously just to keep pace with invoice volume."
      }
    },
    {
      "@type": "Question",
      name: "How long does UNSPSC classification take for an FM company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With Pearstop's automated engine, an initial classification of a full spend dataset typically completes within four to six weeks, including a Data Stability Baseline to validate accuracy. Ongoing monthly classification runs automatically against new invoice data with no additional manual effort."
      }
    },
    {
      "@type": "Question",
      name: "Does Pearstop integrate with FM-specific systems like Maximo or ServiceNow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop receives data via CSV export or direct API connection and returns classified data in the same format, making it compatible with any ERP, CAFM, or CMMS system including IBM Maximo, ServiceNow, Planon, and SAP PM. No native connector is required."
      }
    },
    {
      "@type": "Question",
      name: "What accuracy rate can FM companies expect from automated UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop's four-layer engine — rules, machine learning, LLM, and human review — achieves 90–95% automatic classification on typical FM spend datasets. The remaining 5–10% is flagged for human review, and each reviewed decision feeds back into the engine, shrinking the review queue over time."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UNSPSC Classification for Facilities Management",
  description:
    "Automated UNSPSC classification for hard services and facilities management companies. Pearstop classifies procurement spend lines at scale, covering maintenance, MRO, and subcontractor spend across multi-site FM operations.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url
  },
  serviceType: "Procurement Data Classification",
  areaServed: "Europe",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Facilities Management, Hard Services, Infrastructure"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    {
      "@type": "ListItem",
      position: 3,
      name: "UNSPSC for Facilities Management",
      item: `${siteConfig.url}/unspsc-classification-facilities-management`
    }
  ]
};

export default function UnspscFMPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="UNSPSC for Facilities Management"
        title="FM procurement data is the hardest to classify. Here is how to fix it."
        lead="Hard services and FM companies manage thousands of invoice lines across hundreds of suppliers and sites. Pearstop classifies all of it automatically — 90–95% without human input — so your team can focus on category management, not data entry."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "How it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <SectionTitle
            eyebrow="The problem"
            title="Why FM spend is uniquely difficult to classify"
            lead="FM companies face three procurement data problems that most tools are not built for."
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>Descriptions written by engineers, not buyers</h3>
              <p>Invoice lines like 'elektra werkzaamheden Q3' or 'pump seal replacement unit 4B' are meaningful on-site but impossible to classify consistently at scale. The same physical work appears under dozens of different strings across sites.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>Thousands of suppliers, zero consistency</h3>
              <p>A large FM operation may buy from 500–3,000 suppliers. Each invoices differently. Without a consistent classification layer, spend data cannot be aggregated or compared — making category management guesswork.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>Manual classification cannot keep pace</h3>
              <p>At 5,000–35,000 invoice lines per month, manual UNSPSC classification requires one or two dedicated staff working continuously just to stay current.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="How Pearstop works"
            title="Four layers of classification. One clean spend dataset."
            lead="Pearstop's engine handles 90–95% of FM spend lines automatically — and gets better the longer you use it."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Rules Engine</h3>
              <p>Supplier-specific and GL-specific rules handle high-volume, high-confidence classifications immediately.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Machine Learning</h3>
              <p>An ML layer trained on your spend history replicates the classification logic your best category managers apply.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>LLM Layer</h3>
              <p>Ambiguous descriptions, foreign-language lines, and edge cases are resolved by a large language model with deep product and industry knowledge.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>Human Review</h3>
              <p>Items below the confidence threshold are flagged for your team. Every decision feeds back into the engine.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What clients see in practice" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>95%</div>
              <h3>Automatic classification rate</h3>
              <p>90–95% of invoice lines classified without human input after the initial learning period.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>35k</div>
              <h3>Lines per month — Strukton</h3>
              <p>Processing 35,000 procurement lines monthly for a major Dutch infrastructure contractor.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>70–90%</div>
              <h3>Reduction in manual effort</h3>
              <p>FM teams typically reduce manual data work by 70–90%, freeing buyers for category strategy.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="Our asset lists worked for mechanics on-site, but did not allow us to plan smart maintenance or manage bid risk in a data-driven way."
                author="Asset Manager"
                role="Facilities Management, Europe"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle title="Common questions" />
              <div className="faq-list">
                {[
                  {
                    q: "What UNSPSC segments apply to facilities management?",
                    a: "The most common segments for FM are Segment 72 (Construction and Maintenance Services), Segment 76 (Industrial Cleaning Services), Segment 80 (Management and Administrative Services), and Segment 73 (Industrial Production). Hard services FM companies typically see the highest spend volume in Segment 72, covering electrical, HVAC, plumbing, and fabric maintenance."
                  },
                  {
                    q: "Why is UNSPSC classification difficult for FM companies?",
                    a: "FM companies buy from hundreds of suppliers across decentralised sites. Invoice lines are often free-text descriptions written by field engineers, not procurement teams. Manual classification at this scale requires one or two dedicated staff working continuously just to keep pace."
                  },
                  {
                    q: "How long does UNSPSC classification take for an FM company?",
                    a: "An initial classification of a full spend dataset typically completes within four to six weeks, including a Data Stability Baseline to validate accuracy. Ongoing monthly classification runs automatically."
                  },
                  {
                    q: "Does Pearstop integrate with FM-specific systems like Maximo or ServiceNow?",
                    a: "Pearstop receives data via CSV export or direct API connection and returns classified data in the same format, compatible with any CAFM or CMMS system including IBM Maximo, ServiceNow, Planon, and SAP PM."
                  },
                  {
                    q: "What accuracy rate can FM companies expect?",
                    a: "Pearstop's four-layer engine achieves 90–95% automatic classification on typical FM spend datasets. The remaining 5–10% is flagged for human review, and each reviewed decision feeds back into the engine."
                  }
                ].map((item, i) => (
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
              <div className="quote-card">
                <div className="story-label">Related</div>
                <p>Explore the full UNSPSC classification service, real FM case studies, and the broader procurement data quality offering.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/unspsc" className="btn btn-secondary">UNSPSC Classification</Link>
                  <Link href="/cases" className="btn btn-secondary">Case Studies</Link>
                  <Link href="/procurement-data-quality" className="btn btn-secondary">Procurement Data Quality</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to automate FM procurement classification?"
        lead="Book a 7-minute discovery. We will show you exactly how the engine works with your spend data."
        actions={[{ label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
