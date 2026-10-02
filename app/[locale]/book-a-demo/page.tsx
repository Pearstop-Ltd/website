import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalendlyInlineWidget } from "@/components/calendly-inline-widget";
import { CTABand, PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "BookDemo.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteConfig.url}${prefix}/book-a-demo`,
      languages: alternateLanguages("/book-a-demo")
    }
  };
}

export default async function BookDemoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "BookDemo" });

  const steps = (["0", "1", "2", "3"] as const).map((i) => ({
    title: t(`steps.${i}.title`),
    copy: t(`steps.${i}.copy`)
  }));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[{ label: t("hero.cta"), href: "#book", variant: "primary" }]}
      />

      <section>
        <div className="container">
          <div className="hiw-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {steps.map((step, i) => (
              <article className="hiw-card" key={step.title}>
                <div className="hiw-badge">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft" id="book">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="text-center" style={{ marginBottom: "1.5rem" }}>
                <h2>{t("book.title")}</h2>
                <p className="light-copy">{t("book.lead")}</p>
              </div>
              <CalendlyInlineWidget url={siteConfig.demoCalendly} />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[{ label: t("cta.action"), href: `${prefix}/`, variant: "secondary" }]}
      />
    </>
  );
}
