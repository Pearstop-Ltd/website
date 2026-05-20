import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";
import { UnspscLookupTool } from "@/components/unspsc-lookup-tool";
import { UnspscTree } from "@/components/unspsc-tree";

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free UNSPSC Code Lookup Tool",
  description: "Free AI-powered tool that finds the correct UNSPSC commodity code for any product or service description. Paste a description and get an 8-digit UNSPSC code instantly.",
  url: `${siteConfig.url}/unspsc-code-lookup`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR"
  },
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UNSPSC code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A UNSPSC (United Nations Standard Products and Services Code) is an 8-digit code that classifies any product or service into a global standard hierarchy. The first 2 digits are the Segment, digits 3-4 are the Family, digits 5-6 are the Class, and digits 7-8 are the Commodity. Organisations use UNSPSC codes to categorise procurement spend, enable supplier benchmarking, and build spend analytics."
      }
    },
    {
      "@type": "Question",
      name: "How do I find the right UNSPSC code for a product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste a clear description of the product or service into the lookup tool above. The AI engine searches the UNSPSC taxonomy and returns the best matching 8-digit commodity code, along with the full hierarchy path (Segment, Family, Class, Commodity) and a confidence level. For ambiguous descriptions, the tool also suggests which nearby codes might apply."
      }
    },
    {
      "@type": "Question",
      name: "Is this UNSPSC lookup tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Pearstop UNSPSC lookup tool is completely free for individual queries. For bulk classification — processing thousands of invoice lines automatically — Pearstop offers an automated classification service that handles up to 35,000 lines per month."
      }
    },
    {
      "@type": "Question",
      name: "How accurate is the UNSPSC code suggestion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool returns a confidence level with each result: high, medium, or low. High-confidence results are typically correct at commodity level. For low-confidence results, use the suggested code as a starting point and verify against the official UNSPSC taxonomy. For bulk classification at production accuracy (90-95%), Pearstop's full classification service uses additional signals beyond the description text — supplier identity, GL account, and purchase history — which the free tool does not have access to."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between UNSPSC segments, families, classes, and commodities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UNSPSC has four levels. Segment (2 digits) is the broadest — for example, 72 covers Construction and Maintenance Services. Family (4 digits) narrows it down — 7210 covers Building and Facility Maintenance. Class (6 digits) is more specific — 721015 covers Electrical Systems Maintenance. Commodity (8 digits) is the most precise — 72101505 covers Lighting Maintenance Services specifically. For procurement analytics, you always want to classify at commodity level."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "Free UNSPSC Code Lookup", item: `${siteConfig.url}/unspsc-code-lookup` }
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "UnspscLookup" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: `${siteConfig.url}/unspsc-code-lookup` },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${siteConfig.url}/unspsc-code-lookup`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    }
  };
}

export default async function UnspscLookupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "UnspscLookup" });

  return (
    <>
      <Script id="tool-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <UnspscLookupTool
                placeholder={t("tool.placeholder")}
                buttonLabel={t("tool.button")}
                loadingLabel={t("tool.loading")}
                resultLabels={{
                  code: t("tool.result.code"),
                  segment: t("tool.result.segment"),
                  family: t("tool.result.family"),
                  classLabel: t("tool.result.class"),
                  commodity: t("tool.result.commodity"),
                  confidence: t("tool.result.confidence"),
                  notes: t("tool.result.notes"),
                  high: t("tool.result.high"),
                  medium: t("tool.result.medium"),
                  low: t("tool.result.low"),
                }}
              />

              <div className="quote-card" style={{ marginTop: "2.5rem" }}>
                <div className="story-label">{t("bulk.label")}</div>
                <p>{t("bulk.copy")}</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <CalendlyButton label={t("bulk.cta")} className="btn btn-primary" />
                  <Link href={`${prefix}/unspsc`} className="btn btn-secondary">
                    {t("bulk.learnMore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taxonomy tree demo */}
      <section style={{ padding: "3rem 0 1rem", background: "#f8fafc", borderTop: "1px solid #eef1f6" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: 4 }}>
                Explore the UNSPSC hierarchy
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
                Click through Segment → Family → Class → Commodity to understand where any code sits.
              </p>
            </div>
            <Link href="/unspsc-classification-demo" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.85rem", fontWeight: 600, color: "#2563eb",
              textDecoration: "none", whiteSpace: "nowrap",
              padding: "6px 14px", borderRadius: 8,
              border: "1px solid #dbeafe", background: "#eff6ff",
            }}>
              Open full demo →
            </Link>
          </div>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #eaeff5",
            padding: "22px 18px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
            marginBottom: "2rem",
          }}>
            <UnspscTree />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>{t("faq.title")}</h2>
              <div className="faq-list">
                {(t.raw("faq.items") as { q: string; a: string }[]).map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.q}</summary>
                    <p className="faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
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
