import { CalendlyButton } from "@/components/calendly-button";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { getTranslations , setRequestLocale } from "next-intl/server";
import { GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { homeBenefits, siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pearstop",
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/logo-dark.webp`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: "Europe",
  sameAs: [
    siteConfig.socials.linkedin,
    siteConfig.socials.youtube,
    siteConfig.socials.instagram
  ],
  knowsAbout: [
    "UNSPSC Classification",
    "Procurement Data Quality",
    "Asset Data Management",
    "Spend Analysis",
    "Facilities Management Procurement"
  ]
};
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: siteConfig.url },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
  };
}

const clientLogos = [
  { href: "/cases#strukton", src: siteConfig.assets.clients.strukton, alt: "Strukton" },
  { href: "/cases#fmo", src: siteConfig.assets.clients.fmo, alt: "FMO" },
  { href: "/cases#faro", src: siteConfig.assets.clients.faro, alt: "FARO" },
  { href: "/cases", src: siteConfig.assets.clients.kelpBlue, alt: "Kelp" },
  { href: "/cases/spie", src: siteConfig.assets.clients.spie, alt: "SPIE" },
  { href: "https://www.lemtech.nl/", src: siteConfig.assets.clients.lemtech, alt: "LemTech", external: true },
];

const solutionHrefs = ["/unspsc", "/asset-data-management", "/procurement-data-quality", "/ai-readiness"];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Home");

  const blogCards = blogPosts.slice(0, 3).map((post) => ({
    tag: post.category,
    title: post.title,
    summary: post.description,
    href: `${prefix}/blog/${post.slug}`,
  }));

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <PageHero
        className="hero-tall"
        eyebrow={t("hero.eyebrow")}
        title={
          <>
            {t("hero.title")}
          </>
        }
        videoUrl={siteConfig.assets.heroVideo}
        videoPoster={siteConfig.assets.heroVideoPoster}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.bookDiscovery"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("hero.seeHowItWorks"), href: "#how-it-works", variant: "secondary" },
        ]}
      />

      <section className="lm-band" aria-label="Case studies download">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-img-wrap">
              <img src={siteConfig.assets.leadMagnet} alt="Pearstop case studies" />
            </div>
            <div className="lm-text">
              <h2>{t("caseStudiesBand.title")}</h2>
              <p>{t("caseStudiesBand.description")}</p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                <Link href={`${prefix}/case-studies`} className="btn btn-primary">
                  {t("caseStudiesBand.getCaseStudies")}
                </Link>
                <a href={siteConfig.downloads.caseStudiesView} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  {t("caseStudiesBand.viewInBrowser")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-strip" aria-label="Trusted by">
        <div className="container">
          <p className="clients-label">{t("clients.label")}</p>
          <div className="clients-logos">
            {clientLogos.map((logo) => (
              logo.external ? (
                <a key={logo.alt} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.alt} website`}>
                  <img src={logo.src} alt={logo.alt} />
                </a>
              ) : (
                <Link key={logo.alt} href={`${prefix}${logo.href}`} aria-label={`${logo.alt} case study`}>
                  <img src={logo.src} alt={logo.alt} />
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      <section aria-label="How Pearstop helps">
        <div className="container">
          {homeBenefits.map((benefit, index) => (
            <div className={`benefit-block ${index % 2 === 1 ? "reverse" : ""}`} key={benefit.href}>
              <div className="benefit-block-text">
                <div className="benefit-eyebrow">{t(`benefits.eyebrows.${index}`)}</div>
                <h2>{t(`benefits.titles.${index}`)}</h2>
                <p className="benefit-lead">
                  {t(`benefits.copy.${index}`)}
                </p>
                <p>
                  <Link href={`${prefix}${benefit.href}`}>{t(`benefits.links.${index}`)}</Link>
                </p>
                <QuoteBox
                  quote={t(`benefits.quotes.${index}`)}
                  author={t(`benefits.quoteAuthors.${index}`)}
                  role={t(`benefits.quoteRoles.${index}`)}
                />
              </div>
              <div className="benefit-block-image">
                <img
                  src={
                    index === 0
                      ? siteConfig.assets.home.spendControl
                      : index === 1
                        ? siteConfig.assets.home.assetManagement
                        : siteConfig.assets.home.scaleConfidence
                  }
                  alt={benefit.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section-soft" aria-labelledby="hiw-heading">
        <div className="container">
          <SectionTitle
            eyebrow={t("howItWorks.eyebrow")}
            title={t("howItWorks.title")}
            lead={t("howItWorks.lead")}
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <div className="hiw-stage-label">{t("howItWorks.stage1.label")}</div>
              <h3>{t("howItWorks.stage1.title")}</h3>
              <p>{t("howItWorks.stage1.copy")}</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <div className="hiw-stage-label">{t("howItWorks.stage2.label")}</div>
              <h3>{t("howItWorks.stage2.title")}</h3>
              <p>{t("howItWorks.stage2.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <div className="hiw-stage-label">{t("howItWorks.stage3.label")}</div>
              <h3>{t("howItWorks.stage3.title")}</h3>
              <p>{t("howItWorks.stage3.copy")}</p>
            </article>
          </div>
          <div className="text-center" style={{ marginTop: "2.2rem" }}>
            <Link href={`${prefix}/contact`} className="btn btn-primary">
              {t("howItWorks.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="lm-band" aria-label="Book a demo">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-text">
              <h2>{t("demoBand.title")}</h2>
              <p>{t("demoBand.description")}</p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1.25rem" }}>
            <CalendlyButton label={t("demoBand.bookDemo")} className="btn btn-primary" />
                <Link href={`${prefix}/contact`} className="btn btn-secondary">
                  {t("demoBand.emailUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="solutions-heading">
        <div className="container">
          <SectionTitle
            eyebrow={t("solutions.eyebrow")}
            title={t("solutions.title")}
            lead={t("solutions.lead")}
          />
          <div className="bene-cards">
            {solutionHrefs.map((href, index) => (
              <article className="bene-card" key={href}>
                <h3>{t(`solutions.cards.${index}.title`)}</h3>
                <p>{t(`solutions.cards.${index}.copy`)}</p>
                <Link className="bene-link" href={`${prefix}${href}`}>
                  {t(`solutions.cards.${index}.linkText`)}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="home-geo-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock title={t("geoBlock.title")} copy={t("geoBlock.copy")} />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
