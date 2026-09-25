import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/invoice-extraction-cleaning`;

type FaqItem = { question: string; answer: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "InvoiceExtractionCleaning" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: PAGE_URL, languages: alternateLanguages("/invoice-extraction-cleaning") }
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
    { "@type": "ListItem", position: 3, name: "Invoice Extraction for Cleaning", item: PAGE_URL }
  ]
};

export default async function InvoiceExtractionCleaningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("InvoiceExtractionCleaning");
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
      <Script id="invoicecleaning-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="invoicecleaning-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
              <blockquote className="quote-card" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>
                <p style={{ margin: 0 }}>&ldquo;{t("problem.quote.text")}&rdquo;</p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "var(--muted)" }}>
                  {t("problem.quote.attribution")}
                </p>
              </blockquote>
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
          <SectionTitle title={t("stats.title")} />
          <StatsGrid
            stats={[
              { value: t("stats.s1.value"), label: t("stats.s1.label"), copy: t("stats.s1.copy") },
              { value: t("stats.s2.value"), label: t("stats.s2.label"), copy: t("stats.s2.copy") },
              { value: t("stats.s3.value"), label: t("stats.s3.label"), copy: t("stats.s3.copy") }
            ]}
          />
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
