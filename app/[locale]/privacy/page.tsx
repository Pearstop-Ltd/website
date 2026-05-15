import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/privacy`
    }
  };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />
      <section>
        <div className="container">
          <SectionTitle title={t("collect.title")} />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy">{t("collect.p1")}</p>
              <p className="light-copy">
                {t("collect.p2")}{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
