import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Procurement" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/procurement-data-quality`
    }
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens if we do not have existing classification data to train from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop combines rule-based assignment, machine learning, and an LLM layer that draws on broad product and industry knowledge, so it performs strongly even without existing priors."
      }
    },
    {
      "@type": "Question",
      name: "Will our buyers still be in control?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Buyers review flagged items in a dedicated queue, and every decision they make trains the system further, reducing the review queue over time until manual input approaches zero."
      }
    }
  ]
};

export default async function ProcurementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Procurement");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("howItWorks.title"), href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">{t("problem.eyebrow")}</div>
              <h2>{t("problem.title")}</h2>
              <p className="light-copy">
                {t("problem.copy")}
              </p>
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
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.spendControl}
                alt="Procurement data quality - spend visibility dashboard"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("problem.eyebrow")}
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
          <div className="text-center" style={{ marginTop: "2rem" }}>
            <CalendlyButton label={t("howItWorks.cta")} className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle eyebrow={t("outcome.title")} title={t("outcome.title")} />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>{t("outcome.b1.title")}</h3>
              <p>{t("outcome.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>{t("outcome.b2.title")}</h3>
              <p>{t("outcome.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>{t("outcome.b3.title")}</h3>
              <p>{t("outcome.b3.copy")}</p>
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
              <div className="faq-item">
                <div className="faq-question">
                  <h3 className="faq-q">{t("faq.0.question")}</h3>
                </div>
                <div className="faq-answer">
                  <p>
                    {t("faq.0.answer")}
                  </p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question">
                  <h3 className="faq-q">{t("faq.1.question")}</h3>
                </div>
                <div className="faq-answer">
                  <p>
                    {t("faq.1.answer")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script id="procurement-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[{ label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
