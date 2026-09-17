import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/terms-and-conditions`,
      languages: alternateLanguages("/terms-and-conditions")
    }
  };
}

type Section = { title: string; paragraphs?: string[]; list?: string[]; paragraphsAfter?: string[] };

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "0.85rem", marginBottom: "2.5rem" }}>{t("lastUpdated")}</p>
              {sections.map((section) => (
                <div key={section.title} style={{ marginBottom: "2.25rem" }}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                  {section.list ? (
                    <ul className="light-copy">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.paragraphsAfter?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
