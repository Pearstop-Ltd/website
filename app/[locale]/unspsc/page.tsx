import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { alternateLanguages, siteConfig } from "@/lib/site";

type FaqItem = { question: string; answer: string };

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Unspsc" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
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
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` }
  ]
};

export default async function UnspscPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Unspsc");
  const faqItems = t.raw("faq") as FaqItem[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

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
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">{t("manufacturerCode.eyebrow")}</div>
              <h2>{t("manufacturerCode.title")}</h2>
              <p className="light-copy">{t("manufacturerCode.copy")}</p>
              <p className="light-copy">{t("manufacturerCode.example")}</p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">{t("manufacturerCode.resultLabel")}</div>
                <p className="light-copy">{t("manufacturerCode.resultCopy")}</p>
              </div>
            </div>
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
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>90-95%</div>
              <h3>{t("stats.s2.title")}</h3>
              <p>{t("stats.s2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>70-90%</div>
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

      <UnspscLookupCta prefix={prefix} />

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote={t("quote.text")}
                author={t("quote.author")}
                role={t("quote.role")}
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
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <div className="faq-list">
                {faqItems.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.question}</summary>
                    <p className="faq-a">{item.answer}</p>
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
              <div className="story-label" style={{ marginBottom: "1rem" }}>{t("related.label")}</div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={`${prefix}/unspsc-ai-classification-guide`} className="btn btn-secondary">
                  {t("related.guide")}
                </a>
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
