import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { caseStudies, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cases" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases`
    }
  };
}

export default async function CasesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Cases" });

  const featured = caseStudies[0];
  const others = caseStudies.slice(1);

  return (
    <>
      <PageHero
        className="hero-tall"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        videoUrl={siteConfig.assets.heroVideo}
        videoPoster={siteConfig.assets.heroVideoPoster}
      />

      <section>
        <div className="container">
          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-md-12">
              <span className="cf-pill">{t("featured.pill")}</span>
            </div>
          </div>
          <div className="row" style={{ alignItems: "flex-start", gap: "2.5rem", flexWrap: "wrap" }}>
            <div className="col-md-6" id={featured.slug}>
              <div className="cf-industry">{featured.category}</div>
              <h2>{featured.title}</h2>
              <p className="cf-body">{t("featured.p1")}</p>
              <p className="cf-body">{t("featured.p2")}</p>
              <div className="cf-quote-block">
                <p className="cf-quote">{t("featured.quote")}</p>
                <div className="cf-attr">
                  <div className="cf-avatar" />
                  <div>
                    <strong>{t("featured.quoteAuthor")}</strong>
                    <span className="cf-role">{t("featured.quoteRole")}</span>
                  </div>
                </div>
              </div>
              <p className="light-copy">
                {t("featured.comingSoon")}{" "}
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  {t("featured.followLinkedIn")}
                </a>
              </p>
            </div>
            <div className="col-md-5">
              <div className="cf-stats-box">
                <div className="cf-stats-header">{t("featured.statsHeader")}</div>
                {(["0", "1", "2", "3"] as const).map((i) => (
                  <div key={i} className="cf-stat-row">
                    <div className="cf-stat-num">{t(`featured.stats.${i}.num`)}</div>
                    <div className="cf-stat-lbl">{t(`featured.stats.${i}.label`)}</div>
                  </div>
                ))}
                <div className="cf-tags">
                  <span className="cf-tag">Infrastructure</span>
                  <span className="cf-tag">UNSPSC</span>
                  <span className="cf-tag">Procurement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title={t("testimonials.title")} lead={t("testimonials.lead")} />
          <div className="testimonials-grid">
            <article className="cq-card">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">{t("testimonials.t1.text")}</p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">{t("testimonials.t1.name")}</span>
                  <span className="cq-role">{t("testimonials.t1.role")}</span>
                </div>
              </div>
            </article>
            <article className="cq-card featured-dark">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">{t("testimonials.t2.text")}</p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">{t("testimonials.t2.name")}</span>
                  <span className="cq-role">{t("testimonials.t2.role")}</span>
                </div>
              </div>
            </article>
            <article className="cq-card">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">{t("testimonials.t3.text")}</p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">{t("testimonials.t3.name")}</span>
                  <span className="cq-role">{t("testimonials.t3.role")}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title={t("moreStories.title")} lead={t("moreStories.lead")} />
          <div className="article-grid">
            {others.map((story) => (
              <article key={story.slug} className="cg-card" id={story.slug}>
                <div className={`cg-img ${story.tone}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: "2rem", background: story.tone === "from-blue" ? "linear-gradient(135deg,#1F2A68,#353FFF)" : story.tone === "from-slate" ? "linear-gradient(135deg,#0f172a,#1e3a5f)" : story.tone === "from-green" ? "linear-gradient(135deg,#1a4731,#2d7a4f)" : story.tone === "from-amber" ? "linear-gradient(135deg,#7c2d12,#c2410c)" : story.tone === "from-indigo" ? "linear-gradient(135deg,#312e81,#5847a0)" : "linear-gradient(135deg,#1e3a5f,#2563eb)" }}>
                  ✦
                </div>
                <div className="cg-body">
                  <div className="cg-ind">{story.category}</div>
                  <h3>{story.title}</h3>
                  <p className="cg-excerpt">{story.excerpt}</p>
                  <div className="cg-results">
                    <div>
                      <span className="cg-result-num">{story.statPrimary}</span>
                      <span className="cg-result-lbl">{story.statPrimaryLabel}</span>
                    </div>
                    <div>
                      <span className="cg-result-num">{story.statSecondary}</span>
                      <span className="cg-result-lbl">{story.statSecondaryLabel}</span>
                    </div>
                  </div>
                  <div className="cg-tags">
                    {story.tags.map((tag) => (
                      <span key={tag} className="cg-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link className="cg-link" href={`${prefix}/cases/${story.slug}`}>
                    {story.slug === "strukton" ? t("moreStories.readComingSoon") : t("moreStories.readCase")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.bookDemo"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("cta.exploreSolutions"), href: `${prefix}/solutions`, variant: "secondary" }
        ]}
      />
    </>
  );
}
