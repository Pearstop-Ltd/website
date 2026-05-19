import type { Metadata } from "next";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Whitepaper" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/whitepaper`
    }
  };
}

export default async function WhitepaperPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Whitepaper" });

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <section>
        <div className="container">
          <SectionTitle title={t("whatYouGet.title")} lead={t("whatYouGet.lead")} />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">{t("whatYouGet.b1.icon")}</div>
              <h3>{t("whatYouGet.b1.title")}</h3>
              <p>{t("whatYouGet.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">{t("whatYouGet.b2.icon")}</div>
              <h3>{t("whatYouGet.b2.title")}</h3>
              <p>{t("whatYouGet.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">{t("whatYouGet.b3.icon")}</div>
              <h3>{t("whatYouGet.b3.title")}</h3>
              <p>{t("whatYouGet.b3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">{t("request.label")}</div>
                <p className="light-copy">{t("request.lead")}</p>
                <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                  <a className="btn btn-primary" href={`mailto:${siteConfig.email}?subject=Whitepaper%20request`}>
                    {t("request.emailButton")}
                  </a>
                  <a className="btn btn-outline" href={`${prefix}/contact`}>
                    {t("request.contactButton")}
                  </a>
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
          { label: t("cta.bookDiscovery"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("cta.backHome"), href: `${prefix}/`, variant: "secondary" }
        ]}
      />
    </>
  );
}
