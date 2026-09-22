import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GeoBlock, PageHero } from "@/components/content";
import { Faq, FaqSchema } from "@/components/blog";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { alternateLanguages, siteConfig } from "@/lib/site";

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
    alternates: { canonical: siteConfig.url, languages: alternateLanguages("") },
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

const beforeAfterRows = [
  { description: "PMP FLTR 20X24 CS/6", supplier: "AAF INTL", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "FILTER,AIR,20X24,MERV8", supplier: "AAF FLANDERS", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "Air Flt 20x24x2 (6/box)", supplier: "AAF", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "GEN PURP CLNR 5L", supplier: "ISS FACILITY", unspsc: "47131805", category: "General purpose cleaners", unifiedSupplier: "ISS Facility Services", confidence: "High" },
  { description: "Multi-surface cleaner 5ltr", supplier: "ISS", unspsc: "47131805", category: "General purpose cleaners", unifiedSupplier: "ISS Facility Services", confidence: "High" },
  { description: "Additional hours", supplier: "M&P CONTRACTING", unspsc: "80111613", category: "Temporary manual labour", unifiedSupplier: "M&P Contracting Ltd", confidence: "Medium", inferred: true }
];

type ProblemQuote = { quote: string; source: string };
type WhoTile = { title: string; copy: string; href: string };
type ProofCard = { title: string; stat: string; detail: string; href: string; quote: string; quoteRole: string };
type FaqItem = { q: string; a: string };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("Home");

  const problemQuotes = t.raw("problemQuotes.items") as ProblemQuote[];
  const whoTiles = t.raw("who.tiles") as WhoTile[];
  const proofCards = t.raw("proof.cards") as ProofCard[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <FaqSchema items={faqItems} slug="home" />

      <PageHero
        className="hero-tall hero-left"
        title={<>{t("hero.title")}</>}
        videoUrl={siteConfig.assets.heroVideo}
        videoPoster={siteConfig.assets.heroVideoPoster}
        lead={
          <>
            {t("hero.leadLine1")}{" "}
            <span className="hero-objection">{t("hero.objection")}</span> {t("hero.objectionTrailer")}
          </>
        }
        leadingAction={<SampleRequestModal label={t("hero.sendSample")} className="btn btn-primary" />}
        actions={[
          { label: t("hero.bookDiscovery"), href: siteConfig.calendly, variant: "secondary", external: true },
        ]}
      />

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

      <section className="lm-band" aria-label="Free sample classification">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-img-wrap">
              <img src={siteConfig.assets.leadMagnet} alt="Pearstop sample classification" />
            </div>
            <div className="lm-text">
              <h2>{t("caseStudiesBand.title")}</h2>
              <p>{t("caseStudiesBand.description")}</p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                <SampleRequestModal label={t("hero.sendSample")} className="btn btn-primary" />
                <Link href={`${prefix}/case-studies`} className="btn btn-outline">
                  {t("caseStudiesBand.viewInBrowser")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-quotes" aria-label={t("problemQuotes.title")}>
        <div className="container">
          <div className="problem-quote-grid">
            {problemQuotes.map((item) => (
              <div key={item.quote}>
                <p className="problem-quote">&ldquo;{item.quote}&rdquo;</p>
                <span className="problem-quote-source">{item.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft" aria-labelledby="hiw-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="hiw-heading">{t("howItWorks.title")}</h2>
          </div>
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

          <div className="before-after-wrap">
            <table className="before-after-table">
              <thead>
                <tr>
                  <th colSpan={2}>As it arrives</th>
                  <th colSpan={4}>What Pearstop adds</th>
                </tr>
                <tr>
                  <th>Invoice description</th>
                  <th>Supplier</th>
                  <th>UNSPSC</th>
                  <th>Category</th>
                  <th>Unified supplier</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.description}</td>
                    <td>{row.supplier}</td>
                    <td>{row.unspsc}</td>
                    <td>{row.category}{row.inferred ? <sup>*</sup> : null}</td>
                    <td>{row.unifiedSupplier}</td>
                    <td className={row.confidence === "Medium" ? "confidence-medium" : "confidence-high"}>
                      <span className="confidence-pill">{row.confidence}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="before-after-caption">{t("howItWorks.beforeAfterCaption")}</p>
          <p className="before-after-footnote">
            * Category inferred from additional data (purchase history and contract context), not stated directly on
            the invoice &mdash; flagged at medium confidence rather than high.
          </p>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="demo-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="demo-heading">{t("productDemoVideo.title")}</h2>
          </div>
          <div className="screenshot-frame screenshot-frame--compact">
            <video autoPlay muted loop playsInline preload="none" poster={siteConfig.assets.productDemoVideoPoster}>
              <source src={siteConfig.assets.productDemoVideo} type="video/mp4" />
            </video>
          </div>
          <p className="screenshot-caption">{t("productDemoVideo.caption")}</p>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="who-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="who-heading">{t("who.title")}</h2>
          </div>
          <div className="who-grid">
            {whoTiles.map((tile) => (
              <article className="ind-card quote-card" key={tile.title}>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
                <Link className="ind-card-link" href={`${prefix}${tile.href}`}>
                  {t("who.linkText")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Common objections">
        <div className="container">
          <div className="objections-grid">
            <div className="objection-block">
              <h2>{t("objection.dataTitle")}</h2>
              <p>{t("objection.dataCopy")}</p>
            </div>
            <div className="objection-block">
              <h2>{t("objection.inHouseTitle")}</h2>
              <p>{t("objection.inHouseCopy")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="proof-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="proof-heading">{t("proof.title")}</h2>
          </div>
          <div className="bene-cards">
            {proofCards.map((card) => (
              <article className="bene-card" key={card.title}>
                <h3>{card.title}</h3>
                <p><strong>{card.stat}.</strong> {card.detail}</p>
                <p className="proof-quote">
                  &ldquo;{card.quote}&rdquo;
                  <span className="proof-quote-role">{card.quoteRole}</span>
                </p>
                <Link className="bene-link" href={`${prefix}${card.href}`}>
                  {t("proof.linkText")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark ccta-dark">
        <div className="container">
          <div className="text-center">
            <h2>{t("closingCta.title")}</h2>
            <div className="ccta-btns">
              <SampleRequestModal label={t("closingCta.action")} className="btn btn-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="home-faq-heading">
        <div className="container">
          <Faq items={faqItems} heading={t("faq.heading")} />
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
