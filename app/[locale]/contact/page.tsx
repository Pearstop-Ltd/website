import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { ContactMailtoForm } from "@/components/contact-mailto-form";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${siteConfig.url}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Contact");

  const leaders = [
    { name: "Stephanie Wiechers", role: "CEO", image: siteConfig.assets.team.stephanie },
    { name: "Richard Wallace", role: "CCO", image: siteConfig.assets.team.richard },
  ];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} lead={t("hero.lead")} />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ margin: 0 }}>
                <div className="story-label">{t("form.label")}</div>
                <p className="light-copy" style={{ marginTop: "1rem" }}>
                  {t("form.intro")}
                </p>
                <ContactMailtoForm />
              </div>
            </div>

            <div className="col-md-6">
              <SectionTitle title={t("locations.title")} lead={t("locations.lead")} />
              <div className="quote-card">
                <div className="story-label">{t("locations.officeLabel")}</div>
                <p className="light-copy">
                  Dogpatch labs, CHQ Building
                  <br />
                  Custom House Quay,
                  <br />
                  D01 Y6H7 Dublin, Ireland
                </p>
                <div className="story-label">{t("locations.contactLabel")}</div>
                <p>
                  <a className="location-email" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <div className="story-label">{t("locations.legalLabel")}</div>
                <p className="light-copy">
                  {t("locations.legalCopy")}
                  <br />
                  <Link href={`${prefix}/terms-and-conditions`}>{t("locations.termsLink")}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle
                eyebrow={t("calendly.eyebrow")}
                title={t("calendly.title")}
                lead={t("calendly.lead")}
              />
              <div className="calendly-card">
                <div
                  className="calendly-inline-widget"
                  data-url={siteConfig.calendly}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <section className="technical-team">
        <div className="container">
          <SectionTitle title={t("team.title")} lead={t("team.lead")} />
          <div className="testimonials-grid">
            {leaders.map((leader) => (
              <article key={leader.name} className="person-card">
                <div className="person-photo">
                  <img src={leader.image} alt={`${leader.name} portrait`} loading="lazy" />
                </div>
                <div className="person-body">
                  <h3>{leader.name}</h3>
                  <div className="person-role">{leader.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[
          { label: t("cta.bookDiscovery"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("cta.findOut"), href: `mailto:${siteConfig.email}`, variant: "secondary", external: true },
        ]}
      />
    </>
  );
}
