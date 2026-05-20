import type { Metadata } from "next";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CaseStudies" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/case-studies`
    },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${siteConfig.url}/case-studies`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      images: ["/opengraph-image"]
    }
  };
}

export default async function CaseStudiesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CaseStudies" });

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.getPdf"), href: "#get-the-download", variant: "primary" },
          { label: t("hero.followLinkedIn"), href: siteConfig.socials.linkedin, variant: "secondary", external: true }
        ]}
      />

      <section id="get-the-download">
        <div className="container">
          <div className="case-studies-layout">
            <div className="case-studies-preview dark">
              <span className="pill">{t("download.pill")}</span>
              <h2>{t("download.title")}</h2>
              <p>{t("download.lead")}</p>
              <ul className="ind-pains case-studies-list">
                {(["0", "1", "2", "3"] as const).map((i) => (
                  <li key={i}>
                    <span className="ind-ok">✓</span>
                    <div>
                      <strong>{t(`highlights.${i}.title`)}</strong>
                      <p>{t(`highlights.${i}.copy`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="quote-card case-studies-form-card" style={{ margin: 0 }}>
              <div className="story-label">{t("download.formLabel")}</div>
              <p className="light-copy" style={{ marginTop: "1rem" }}>
                {t("download.formLead")}
              </p>
              <form className="contact-form" action="/api/download/case-studies" method="POST">
                <input type="text" name="name" placeholder={t("download.namePlaceholder")} autoComplete="name" required aria-label={t("download.namePlaceholder")} />
                <input type="email" name="email" placeholder={t("download.emailPlaceholder")} autoComplete="email" required aria-label={t("download.emailPlaceholder")} />
                <input type="text" name="company" placeholder={t("download.companyPlaceholder")} autoComplete="organization" aria-label={t("download.companyPlaceholder")} />
                <button type="submit" className="btn btn-primary">
                  {t("download.submitButton")}
                </button>
              </form>
              <p className="case-studies-note">
                {t("download.talkNote")}{" "}
                <CalendlyButton label={t("download.talkLinkText")} className="calendly-inline-link" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title={t("whyDownload.title")}
            lead={t("whyDownload.lead")}
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">{t("whyDownload.b1.icon")}</div>
              <h3>{t("whyDownload.b1.title")}</h3>
              <p>{t("whyDownload.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">{t("whyDownload.b2.icon")}</div>
              <h3>{t("whyDownload.b2.title")}</h3>
              <p>{t("whyDownload.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">{t("whyDownload.b3.icon")}</div>
              <h3>{t("whyDownload.b3.title")}</h3>
              <p>{t("whyDownload.b3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.followLinkedIn"), href: siteConfig.socials.linkedin, variant: "secondary", external: true },
          { label: t("cta.bookDiscovery"), href: siteConfig.calendly, variant: "primary", external: true }
        ]}
      />
    </>
  );
}
