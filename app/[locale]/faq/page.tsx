import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/faq`
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${siteConfig.url}/faq`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    }
  };
}

const SECTIONS = ["general", "unspsc", "process", "solutions", "technical", "industries"] as const;

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Faq" });

  const allQuestions = SECTIONS.flatMap((section) => {
    const keys = t.raw(`sections.${section}.items`) as { q: string; a: string }[];
    return keys.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }));
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.cta"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("hero.secondary"), href: "#faq-general", variant: "secondary" }
        ]}
      />

      <section className="section-soft" id="faq-general">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <nav aria-label="FAQ sections" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
                {SECTIONS.map((section) => (
                  <a
                    key={section}
                    href={`#faq-${section}`}
                    className="pill"
                    style={{ textDecoration: "none" }}
                  >
                    {t(`sections.${section}.title`)}
                  </a>
                ))}
              </nav>

              {SECTIONS.map((section) => {
                const items = t.raw(`sections.${section}.items`) as { q: string; a: string }[];
                return (
                  <div key={section} style={{ marginBottom: "3rem" }} id={`faq-${section}`}>
                    <h2 style={{ marginBottom: "1.5rem" }}>{t(`sections.${section}.title`)}</h2>
                    <div className="faq-list">
                      {items.map((item, i) => (
                        <details key={i} className="faq-item">
                          <summary className="faq-q">{item.q}</summary>
                          <p className="faq-a">{item.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="quote-card" style={{ marginTop: "3rem" }}>
                <div className="story-label">{t("stillHaveQuestions.label")}</div>
                <p>{t("stillHaveQuestions.copy")}</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href={siteConfig.calendly} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {t("stillHaveQuestions.cta")}
                  </a>
                  <Link href={`${prefix}/contact`} className="btn btn-secondary">
                    {t("stillHaveQuestions.email")}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }
        ]}
      />
    </>
  );
}
