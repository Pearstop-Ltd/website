import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { siteConfig } from "@/lib/site";

type FaqItem = { question: string; answer: string };

const PAGE_URL = `${siteConfig.url}/unspsc-ai-classification-guide`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "UnspscAiGuide" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "AI UNSPSC classification",
      "classify Excel catalog UNSPSC",
      "AI procurement classification guide",
      "automated UNSPSC coding",
      "UNSPSC classification software",
    ],
    alternates: {
      canonical: PAGE_URL
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: PAGE_URL,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    }
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "AI UNSPSC Classification Guide", item: PAGE_URL }
  ]
};

export default async function UnspscAiGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("UnspscAiGuide");
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
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.ctaPrimary"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("hero.ctaSecondary"), href: "#process", variant: "secondary" }
        ]}
      />

      <section id="starting-points">
        <div className="container">
          <SectionTitle
            eyebrow={t("paths.eyebrow")}
            title={t("paths.title")}
            lead={t("paths.lead")}
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6" style={{ flex: "1 1 320px" }}>
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">{t("paths.eyebrow")} 1</div>
                <h3 style={{ marginTop: "0.5rem" }}>{t("paths.path1.title")}</h3>
                <p className="light-copy">{t("paths.path1.copy")}</p>
              </div>
            </div>
            <div className="col-md-6" style={{ flex: "1 1 320px" }}>
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">{t("paths.eyebrow")} 2</div>
                <h3 style={{ marginTop: "0.5rem" }}>{t("paths.path2.title")}</h3>
                <p className="light-copy">{t("paths.path2.copy")}</p>
              </div>
            </div>
          </div>
          <p className="light-copy" style={{ marginTop: "2rem", maxWidth: 760 }}>
            {t("paths.note")}
          </p>
        </div>
      </section>

      <section id="process" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            lead={t("process.lead")}
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>{t("process.step1.title")}</h3>
              <p>{t("process.step1.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">2</div>
              <h3>{t("process.step2.title")}</h3>
              <p>{t("process.step2.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>{t("process.step3.title")}</h3>
              <p>{t("process.step3.copy")}</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">4</div>
              <h3>{t("process.step4.title")}</h3>
              <p>{t("process.step4.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">5</div>
              <h3>{t("process.step5.title")}</h3>
              <p>{t("process.step5.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">6</div>
              <h3>{t("process.step6.title")}</h3>
              <p>{t("process.step6.copy")}</p>
            </article>
          </div>
          <div className="quote-card" style={{ marginTop: "2rem" }}>
            <div className="story-label">Advantage</div>
            <p className="light-copy" style={{ marginBottom: 0 }}>{t("process.hierarchyNote")}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-7">
              <div className="benefit-eyebrow">{t("whyNotLlm.eyebrow")}</div>
              <h2>{t("whyNotLlm.title")}</h2>
              <p className="light-copy">{t("whyNotLlm.p1")}</p>
              <p className="light-copy">{t("whyNotLlm.p2")}</p>
              <p className="light-copy">{t("whyNotLlm.p3")}</p>
            </div>
            <div className="col-md-4" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">What is left</div>
                <p className="light-copy" style={{ marginBottom: 0 }}>{t("whyNotLlm.p4")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("pilotMetrics.eyebrow")}
            title={t("pilotMetrics.title")}
            lead={t("pilotMetrics.lead")}
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>%</div>
              <h3>{t("pilotMetrics.m1.title")}</h3>
              <p>{t("pilotMetrics.m1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>÷</div>
              <h3>{t("pilotMetrics.m2.title")}</h3>
              <p>{t("pilotMetrics.m2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>8</div>
              <h3>{t("pilotMetrics.m3.title")}</h3>
              <p>{t("pilotMetrics.m3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="benefit-eyebrow">{t("economics.eyebrow")}</div>
              <h2>{t("economics.title")}</h2>
              <p className="light-copy">{t("economics.p1")}</p>
              <p className="light-copy">{t("economics.p2")}</p>
            </div>
          </div>
        </div>
      </section>

      <UnspscLookupCta prefix={prefix} />

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>{t("forYouIf.title")}</h2>
              <div className="quote-card" style={{ marginBottom: "1.25rem" }}>
                <p style={{ marginBottom: 0 }}>{t("forYouIf.case1")}</p>
              </div>
              <div className="quote-card">
                <p style={{ marginBottom: 0 }}>{t("forYouIf.case2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="How does AI UNSPSC classification actually work?"
                copy="AI UNSPSC classification takes a procurement description, whether from a structured spend file or extracted from a PDF invoice, and assigns it the correct 8-digit UNSPSC commodity code. Done well, it does not mean asking a language model for a code and trusting the answer. Pearstop's engine proposes a code with an LLM layer, then validates that code against the real UNSPSC dataset before accepting it, combines that with deterministic keyword rules and a supplier-specific database, and stores every human correction as supplier-specific memory so the same pattern does not need reasoning through twice. A free pilot of roughly 500 rows lets a customer check accuracy, the auto-classified versus flagged-for-review split, and how deep the result reaches into the four-level hierarchy, before the same process runs across a full dataset."
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
                <a href={`${prefix}/unspsc`} className="btn btn-secondary">
                  {t("related.main")}
                </a>
                <a href={`${prefix}/unspsc-code-lookup`} className="btn btn-secondary">
                  {t("related.lookup")}
                </a>
                <a href={`${prefix}/unspsc-classification-demo`} className="btn btn-secondary">
                  {t("related.tree")}
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
        actions={[
          { label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("cta.secondaryButton"), href: `${prefix}/unspsc-code-lookup`, variant: "secondary" }
        ]}
      />
    </>
  );
}
