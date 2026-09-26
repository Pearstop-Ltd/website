import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TermsShort" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/terms-and-conditions`,
      languages: alternateLanguages("/terms-and-conditions")
    }
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TermsShort" });

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <section>
        <div className="container">
          <SectionTitle title={t("sectionTitle")} />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy">{t("p1")}</p>
              <p className="light-copy">{t("p2", { email: siteConfig.email })}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
