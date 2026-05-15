import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/solutions`
    }
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Solutions");

  const solutionCards = [
    {
      eyebrow: "01",
      title: t("cards.items.0.title"),
      copy: t("cards.items.0.copy"),
      href: `${prefix}/data-quality`
    },
    {
      eyebrow: "02",
      title: t("cards.items.1.title"),
      copy: t("cards.items.1.copy"),
      href: `${prefix}/procurement-data-quality`
    },
    {
      eyebrow: "03",
      title: t("cards.items.2.title"),
      copy: t("cards.items.2.copy"),
      href: `${prefix}/unspsc`
    },
    {
      eyebrow: "04",
      title: t("cards.items.3.title"),
      copy: t("cards.items.3.copy"),
      href: `${prefix}/asset-data-management`
    },
    {
      eyebrow: "05",
      title: t("cards.items.4.title"),
      copy: t("cards.items.4.copy"),
      href: `${prefix}/fabric`
    },
    {
      eyebrow: "06",
      title: t("cards.items.5.title"),
      copy: t("cards.items.5.copy"),
      href: `${prefix}/ai-readiness`
    }
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title={t("cards.title")}
            lead={t("cards.lead")}
          />

          <div className="bene-cards">
            {solutionCards.map((solution) => (
              <article className={`bene-card ${solution.eyebrow === "02" ? "featured" : ""}`} key={solution.href}>
                <div className="sol-eyebrow">{solution.eyebrow}</div>
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>
                <Link className="bene-link" href={solution.href}>
                  {t("cards.exploreLink")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-5">
              <div className="story-label">{t("approach.label")}</div>
              <h2>{t("approach.title")}</h2>
              <p className="light-copy" style={{ marginBottom: "1.25rem" }}>
                {t("approach.copy")}
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">✓</span>
                  <div>{t("approach.bullets.0")}</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>{t("approach.bullets.1")}</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>{t("approach.bullets.2")}</div>
                </li>
                <li>
                  <span className="ind-ok">✓</span>
                  <div>{t("approach.bullets.3")}</div>
                </li>
              </ul>
            </div>
            <div className="col-md-6" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">{t("approach.worksWithLabel")}</div>
                <p className="light-copy">
                  {t("approach.worksCopy")}
                </p>
                <div style={{ textAlign: "center", color: "var(--purple)", fontSize: "1.4rem", margin: "1rem 0" }}>↓</div>
                <div className="quote-card" style={{ margin: 0, background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" }}>
                  <div className="story-label" style={{ color: "rgba(255,255,255,0.8)" }}>{t("approach.engineLabel")}</div>
                  <p style={{ color: "rgba(255,255,255,0.85)" }}>
                    {t("approach.engineCopy")}
                  </p>
                </div>
                <div style={{ textAlign: "center", color: "var(--purple)", fontSize: "1.4rem", margin: "1rem 0" }}>↓</div>
                <div className="quote-card" style={{ margin: 0 }}>
                  <div className="story-label">{t("approach.outputLabel")}</div>
                  <p className="light-copy">{t("approach.outputCopy")}</p>
                </div>
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
                title={t("geoBlock.title")}
                copy={t("geoBlock.copy")}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.bookDiscovery"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("cta.viewIndustries"), href: `${prefix}/industries`, variant: "secondary" }
        ]}
      />
    </>
  );
}
