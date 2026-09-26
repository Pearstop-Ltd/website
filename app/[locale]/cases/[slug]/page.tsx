import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CTABand, PageHero, QuoteBox, StatsGrid } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

const SLUG_NAMESPACES: Record<string, string> = {
  fmo: "CaseFmo"
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const namespace = SLUG_NAMESPACES[slug];
  if (!namespace) {
    return {
      title: titleFromSlug(slug),
      description: "Pearstop client case study."
    };
  }
  const t = await getTranslations({ locale, namespace });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases/${slug}`,
      languages: alternateLanguages(`/cases/${slug}`)
    }
  };
}

export default async function CaseDetailPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const namespace = SLUG_NAMESPACES[slug];

  if (!namespace) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace });
  const prefix = locale === "en" ? "" : `/${locale}`;
  const wins = t.raw("wins") as { value: string; label: string }[];
  const ctaHref = `${prefix}/cases`;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} leadAccent />

      <section className="section-soft">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">{t("challengeLabel")}</div>
              <h2 className="case-wayfinder">{t("problemLabel")}</h2>
              <h3 className="case-question">{t("challenge")}</h3>
              <p className="light-copy">{t("solution")}</p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <StatsGrid stats={wins} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox quote={t("quote")} author={t("author")} role={t("role")} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="case-wayfinder">{t("resultLabel")}</h2>
              <h3 className="case-question">{t("resultQuestion")}</h3>
              <p className="light-copy">{t("geo")}</p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("ctaTitle")}
        lead={t("ctaLead")}
        actions={[
          { label: t("ctaLabel"), href: ctaHref, variant: "primary", external: ctaHref.startsWith("http") },
          { label: t("backToCases"), href: `${prefix}/cases`, variant: "secondary" }
        ]}
      />
    </>
  );
}
