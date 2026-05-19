import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "UnspscFM" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/unspsc-classification-facilities-management`
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${siteConfig.url}/unspsc-classification-facilities-management`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    }
  };
}

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
  description: "Automated UNSPSC classification for hard services and facilities management companies. Pearstop classifies procurement spend lines at scale, covering maintenance, MRO, and subcontractor spend across multi-site FM operations.",
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
    { "@type": "ListItem", position: 3, name: "UNSPSC for Facilities Management", item: `${siteConfig.url}/unspsc-classification-facilities-management` }
  ]
};

export default async function UnspscFMPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "UnspscFM" });

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
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.cta"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("hero.secondary"), href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <SectionTitle
            eyebrow={t("challenge.eyebrow")}
            title={t("challenge.title")}
            lead={t("challenge.lead")}
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>{t("challenge.p1.title")}</h3>
              <p>{t("challenge.p1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>{t("challenge.p2.title")}</h3>
              <p>{t("challenge.p2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚠</div>
              <h3>{t("challenge.p3.title")}</h3>
              <p>{t("challenge.p3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("solution.eyebrow")}
            title={t("solution.title")}
            lead={t("solution.lead")}
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>{t("solution.step1.title")}</h3>
              <p>{t("solution.step1.copy")}</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>{t("solution.step2.title")}</h3>
              <p>{t("solution.step2.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>{t("solution.step3.title")}</h3>
              <p>{t("solution.step3.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>{t("solution.step4.title")}</h3>
              <p>{t("solution.step4.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title={t("stats.title")} />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>95%</div>
              <h3>{t("stats.s1.title")}</h3>
              <p>{t("stats.s1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>35k</div>
              <h3>{t("stats.s2.title")}</h3>
              <p>{t("stats.s2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>70–90%</div>
              <h3>{t("stats.s3.title")}</h3>
              <p>{t("stats.s3.copy")}</p>
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
              <SectionTitle title={t("faq.title")} />
              <div className="faq-list">
                {(["0", "1", "2", "3", "4"] as const).map((i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{t(`faq.items.${i}.q`)}</summary>
                    <p className="faq-a">{t(`faq.items.${i}.a`)}</p>
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
                <div className="story-label">{t("related.label")}</div>
                <p>{t("related.copy")}</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href={`${prefix}/unspsc`} className="btn btn-secondary">{t("related.link1")}</Link>
                  <Link href={`${prefix}/cases`} className="btn btn-secondary">{t("related.link2")}</Link>
                  <Link href={`${prefix}/procurement-data-quality`} className="btn btn-secondary">{t("related.link3")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[{ label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
