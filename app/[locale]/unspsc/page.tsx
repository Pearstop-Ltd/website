import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UNSPSC (United Nations Standard Products and Services Code) is a hierarchical classification system used worldwide to categorise procurement spend. It has four levels: Segment, Family, Class, and Commodity. Organisations use UNSPSC to enable consistent spend analysis, supplier benchmarking, and category management across contracts, sites, and ERP systems."
      }
    },
    {
      "@type": "Question",
      name: "How accurate is automated UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop's four-layer classification engine — combining rules, machine learning, an LLM layer, and human review — achieves 90–95% automatic classification on typical procurement datasets. The remaining 5–10% is flagged for human review. Each reviewed decision feeds back into the engine, shrinking the review queue over time until it reaches near zero."
      }
    },
    {
      "@type": "Question",
      name: "How long does UNSPSC classification take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients have a clean, classified dataset ready within four to six weeks of starting. The first engagement begins with a Data Stability Baseline so you can assess the output quality before committing to ongoing classification."
      }
    },
    {
      "@type": "Question",
      name: "Does Pearstop integrate with SAP for UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pearstop receives data via CSV export or direct API connection from SAP, Oracle, and other ERP and P2P platforms. In practice, many clients find that CSV export is the simplest way to start. Classified data is returned in the same format, ready to load back into SAP or feed into BI tools."
      }
    },
    {
      "@type": "Question",
      name: "What if we do not have existing classification data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop's approach combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge — meaning it performs strongly even without existing priors or historical classification data."
      }
    },
    {
      "@type": "Question",
      name: "Which industries does Pearstop serve for UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop specialises in UNSPSC classification for hard services FM, infrastructure, construction, and manufacturing companies. These industries manage high volumes of procurement spend across decentralised sites, where manual classification is impractical and automated classification has the highest impact."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated UNSPSC Classification",
  description: "Pearstop auto-classifies up to 95% of procurement spend lines to UNSPSC standard without manual effort. Built for hard services FM, infrastructure, construction, and manufacturing companies.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-dark.webp`
  },
  serviceType: "Procurement Data Classification",
  areaServed: "Europe"
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Unspsc" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/unspsc`
    }
  };
}

export default async function UnspscPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Unspsc");

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
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("standard.eyebrow"), href: "#what-is-unspsc", variant: "secondary" }
        ]}
      />

      <section id="what-is-unspsc">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">{t("standard.eyebrow")}</div>
              <h2>{t("standard.title")}</h2>
              <p className="light-copy">
                {t("standard.p1")}
              </p>
              <p className="light-copy">
                {t("standard.p2")}
              </p>
              <div className="quote-card">
                <div className="story-label">{t("standard.exampleLabel")}</div>
                <p>Segment: 72 - Construction and Maintenance</p>
                <p>Family: 7210 - Building and Facility Maintenance</p>
                <p>Class: 721010 - Electrical Maintenance</p>
                <p>Commodity: 72101505 - Lighting maintenance</p>
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
            eyebrow={t("howItWorks.title")}
            title={t("howItWorks.title")}
            lead={t("howItWorks.lead")}
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>{t("howItWorks.step1.title")}</h3>
              <p>{t("howItWorks.step1.copy")}</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>{t("howItWorks.step2.title")}</h3>
              <p>{t("howItWorks.step2.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>{t("howItWorks.step3.title")}</h3>
              <p>{t("howItWorks.step3.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>{t("howItWorks.step4.title")}</h3>
              <p>{t("howItWorks.step4.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>35k</div>
              <h3>{t("stats.s1.title")}</h3>
              <p>{t("stats.s1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>90–95%</div>
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

      <section>
        <div className="container">
          <SectionTitle title={t("whatMakesPossible.title")} />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>{t("whatMakesPossible.b1.title")}</h3>
              <p>{t("whatMakesPossible.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>{t("whatMakesPossible.b2.title")}</h3>
              <p>{t("whatMakesPossible.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>{t("whatMakesPossible.b3.title")}</h3>
              <p>{t("whatMakesPossible.b3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote={t("quote.text")}
                author={t("quote.author")}
                role={t("quote.role")}
                image={siteConfig.assets.team.vince}
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
                title={t("geoBlock.title")}
                copy={t("geoBlock.copy")}
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
                <div className="story-label">{t("noDataFaq.label")}</div>
                <p>
                  {t("noDataFaq.copy")}
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
              <div className="story-label" style={{ marginBottom: "1rem" }}>{t("related.label")}</div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={`${prefix}/unspsc-classification-facilities-management`} className="btn btn-secondary">
                  {t("related.fm")}
                </a>
                <a href={`${prefix}/unspsc-classification-netherlands`} className="btn btn-secondary">
                  {t("related.nl")}
                </a>
                <a href={`${prefix}/unspsc-classification-germany`} className="btn btn-secondary">
                  {t("related.de")}
                </a>
                <a href={`${prefix}/faq`} className="btn btn-secondary">
                  {t("related.faq")}
                </a>
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
