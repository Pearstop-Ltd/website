import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AssetManagement" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/asset-data-management`
    },
    openGraph: {
      title: `${t("meta.title")} | Pearstop`,
      description: t("meta.description"),
      url: `${siteConfig.url}/asset-data-management`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("meta.title")} | Pearstop`,
      description: t("meta.description"),
      images: ["/opengraph-image"]
    }
  };
}

export default async function AssetDataManagementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("AssetManagement");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("howItWorks.title"), href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">{t("problem.eyebrow")}</div>
              <h2>{t("problem.title")}</h2>
              <p className="light-copy">
                {t("problem.copy")}
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.0")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.1")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.2")}</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>{t("problem.bullets.3")}</div>
                </li>
              </ul>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <img
                src={siteConfig.assets.home.assetManagement}
                alt="Asset data management for FM and infrastructure"
                style={{ borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("problem.eyebrow")}
            title={t("howItWorks.title")}
          />
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
          <SectionTitle title={t("stats.0.label")} />
          <StatsGrid
            stats={[
              { value: t("stats.0.value"), label: t("stats.0.label"), copy: t("stats.0.copy") },
              { value: t("stats.1.value"), label: t("stats.1.label"), copy: t("stats.1.copy") },
              { value: t("stats.2.value"), label: t("stats.2.label"), copy: t("stats.2.copy") }
            ]}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote={t("quote.text")}
                author={t("quote.author")}
                role={t("quote.role")}
              />
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
        actions={[{ label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
