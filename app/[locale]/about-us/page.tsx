import type { Metadata } from "next";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${siteConfig.url}/about-us` },
  };
}

const leaders = [
  {
    name: "Stephanie Wiechers",
    role: "CEO",
    image: siteConfig.assets.team.stephanie,
    copyKey: "stephanie",
  },
  {
    name: "Richard Wallace",
    role: "COO",
    image: siteConfig.assets.team.richard,
    copyKey: "richard",
  },
];

const team = [
  { name: "Robin", role: "Team Lead Development" },
  { name: "Sjoerd", role: "Development" },
  { name: "Dania", role: "Developer" },
  { name: "Dean", role: "Sales" },
  { name: "Nelia", role: "Operations" },
  { name: "Seb", role: "Technical Advisor" },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("About");

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
            <div className="col-md-4">
              <div className="story-label">{t("howItStarted.label")}</div>
              <h2>{t("howItStarted.label")}</h2>
            </div>
            <div className="col-md-7 col-md-offset-1">
              <p className="story-text">{t("howItStarted.p1")}</p>
              <p className="story-text">{t("howItStarted.p2")}</p>
              <p className="story-text story-highlight">{t("howItStarted.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center" style={{ marginBottom: "3rem" }}>
              <div className="story-label">{t("theName.label")}</div>
              <h2>{t("theName.title")}</h2>
              <p className="light-copy" style={{ maxWidth: "760px", margin: "0.75rem auto 0" }}>
                {t("theName.copy")}
              </p>
              <p style={{ fontWeight: 700, color: "var(--navy)" }}>{t("theName.tagline")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-leadership">
        <div className="container">
          <SectionTitle
            title={t("leadership.title")}
            lead={t("leadership.lead")}
          />
          <div className="testimonials-grid">
            {leaders.map((leader) => (
              <article key={leader.name} className="person-card">
                <div className="person-photo">
                  <img src={leader.image} alt={`${leader.name} portrait`} loading="lazy" />
                </div>
                <div className="person-body">
                  <h3>{leader.name}</h3>
                  <div className="person-role">{leader.role}</div>
                  <p className="light-copy">{t(`leaders.${leader.copyKey === "stephanie" ? 0 : 1}.copy`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title={t("fullTeam.title")} lead={t("fullTeam.lead")} />
          <div className="industry-grid">
            {team.map((person) => (
              <div key={person.name} className="team-member">
                <div className="member-photo" />
                <h3>{person.name}</h3>
                <div className="member-role">{person.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title={t("values.title")} lead={t("values.lead")} />
          <div className="bene-cards">
            <article className="values-card">
              <div className="values-icon">✓</div>
              <h3>{t("values.v1.title")}</h3>
              <p>{t("values.v1.copy")}</p>
            </article>
            <article className="values-card featured">
              <div className="values-icon">◉</div>
              <h3>{t("values.v2.title")}</h3>
              <p>{t("values.v2.copy")}</p>
            </article>
            <article className="values-card">
              <div className="values-icon">↗</div>
              <h3>{t("values.v3.title")}</h3>
              <p>{t("values.v3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock title={t("geoBlock.title")} copy={t("geoBlock.copy")} />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.getInTouch"), href: `${prefix}/contact`, variant: "primary" },
          { label: t("cta.bookDiscovery"), href: siteConfig.calendly, variant: "secondary", external: true },
        ]}
      />
    </>
  );
}
