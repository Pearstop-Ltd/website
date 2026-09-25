import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/erp-migration-data-cleansing`;

type FaqItem = { question: string; answer: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ErpMigration" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: PAGE_URL, languages: alternateLanguages("/erp-migration-data-cleansing") }
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
    { "@type": "ListItem", position: 3, name: "ERP Migration Data Cleansing", item: PAGE_URL }
  ]
};

export default async function ErpMigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("ErpMigration");
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
      <Script id="erpmigration-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="erpmigration-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">{t("problem.eyebrow")}</div>
              <h2>{t("problem.title")}</h2>
              <p className="light-copy">{t("problem.copy1")}</p>
              <p className="light-copy">{t("problem.copy2")}</p>
              <ul className="ind-pains">
                <li><span className="ind-ok">×</span><div>{t("problem.bullets.0")}</div></li>
                <li><span className="ind-ok">×</span><div>{t("problem.bullets.1")}</div></li>
                <li><span className="ind-ok">×</span><div>{t("problem.bullets.2")}</div></li>
                <li><span className="ind-ok">×</span><div>{t("problem.bullets.3")}</div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow={t("howItWorks.eyebrow")} title={t("howItWorks.title")} />
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

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">{t("sap.eyebrow")}</div>
              <h2>{t("sap.title")}</h2>
              <p className="light-copy">{t("sap.copy")}</p>
              <div className="row" style={{ gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <Link className="ind-card-link" href={`${prefix}/blog/manufacturing-procurement-sap-data-quality`}>
                  {t("sap.linkLabel1")} →
                </Link>
                <Link className="ind-card-link" href={`${prefix}/blog/sap-migration-readiness-construction`}>
                  {t("sap.linkLabel2")} →
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
              <h2>{t("otherErps.title")}</h2>
              <p className="light-copy">{t("otherErps.copy")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock title={t("geoBlock.title")} copy={t("geoBlock.copy")} />
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

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[{ label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
