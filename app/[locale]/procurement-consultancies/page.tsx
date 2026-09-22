import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

type FaqItem = { question: string; answer: string };
type RelatedItem = { title: string; copy: string; linkLabel: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProcurementConsultancies" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/procurement-consultancies`,
      languages: alternateLanguages("/procurement-consultancies")
    }
  };
}

export default async function ProcurementConsultanciesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("ProcurementConsultancies");
  const faqItems = t.raw("faq") as FaqItem[];
  const relatedItems = t.raw("relatedCapabilities.items") as RelatedItem[];

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
      <Script id="procurementconsultancies-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("howItWorks.title"), href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">{t("problem.eyebrow")}</div>
              <h2>{t("problem.title")}</h2>
              <p className="light-copy">{t("problem.copy")}</p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.0")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.1")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.2")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.3")}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow={t("problem.eyebrow")} title={t("howItWorks.title")} lead={t("howItWorks.lead")} />
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
          <SectionTitle
            eyebrow={t("relatedCapabilities.eyebrow")}
            title={t("relatedCapabilities.title")}
            lead={t("relatedCapabilities.lead")}
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">{relatedItems[0].title}</div>
                <p className="light-copy">{relatedItems[0].copy}</p>
                <Link className="bene-link" href={`${prefix}/blog/spend-cube-ai-for-procurement-consultancies`}>
                  {relatedItems[0].linkLabel} →
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">{relatedItems[1].title}</div>
                <p className="light-copy">{relatedItems[1].copy}</p>
                <Link className="bene-link" href={`${prefix}/blog/how-to-build-a-spend-cube-with-ai`}>
                  {relatedItems[1].linkLabel} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
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
