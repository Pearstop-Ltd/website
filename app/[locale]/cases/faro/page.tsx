import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseStepCards, CaseQuoteBig, CaseTwoPanel, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/cases/faro`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CaseFaro" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: PAGE_URL,
      languages: alternateLanguages("/cases/faro")
    }
  };
}

export default async function FaroCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "CaseFaro" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faqQuestion"),
        acceptedAnswer: { "@type": "Answer", text: t("faqAnswer") }
      }
    ]
  };

  return (
    <>
      <Script id="faro-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumb")} />
          <CaseHero
            aside={
              <CaseFactSheet
                rows={[
                  { label: "Client", value: "FARO" },
                  { label: "Data", value: "Incoming product lines, per container" },
                  { label: "Scope", value: "~30,000 lines per buying decision" },
                  { label: "Approach", value: "Machine learning, pre-LLM (own built technology)" }
                ]}
              />
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="client" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("badge")}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              {t("h1")}
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
              {t("lead")}
            </p>
          </CaseHero>
        </div>
      </section>

      <CaseResultsBand
        stats={[
          { value: t("stats.s1.value"), label: t("stats.s1.label") },
          { value: t("stats.s2.value"), label: t("stats.s2.label") },
          { value: t("stats.s3.value"), label: t("stats.s3.label") },
          { value: t("stats.s4.value"), label: t("stats.s4.label") }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("situation.label")}</CaseSectionLabel>
          <CaseH2>{t("situation.title")}</CaseH2>
          <CaseBodyP>{t("situation.p1")}</CaseBodyP>
          <CaseBodyP>{t("situation.p2")}</CaseBodyP>
          <CaseBodyP>{t("situation.p3")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("howItWorked.label")}</CaseSectionLabel>
            <CaseH2>{t("howItWorked.title")}</CaseH2>
          </div>
          <CaseStepCards
            steps={[
              { title: t("howItWorked.steps.st1.title"), copy: t("howItWorked.steps.st1.copy") },
              { title: t("howItWorked.steps.st2.title"), copy: t("howItWorked.steps.st2.copy") },
              { title: t("howItWorked.steps.st3.title"), copy: t("howItWorked.steps.st3.copy") }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteBig
            quote={t("quoteBig")}
            personId="davidTorr"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: t("twoPanel.p1.label"),
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: t("twoPanel.p1.title"),
                copy: t("twoPanel.p1.copy")
              },
              {
                label: t("twoPanel.p2.label"),
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: t("twoPanel.p2.title"),
                copy: t("twoPanel.p2.copy")
              }
            ]}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix={prefix}
        items={[
          { href: "/cases/spie", label: t("moreLinks.l1.label"), title: t("moreLinks.l1.title") },
          { href: "/cases/strukton", label: t("moreLinks.l2.label"), title: t("moreLinks.l2.title") },
          { href: "/cases/mro-confidential", label: t("moreLinks.l3.label"), title: t("moreLinks.l3.title") }
        ]}
      />

      <CaseClosingCTA
        title={t("closingCta.title")}
        lead={t("closingCta.lead")}
        ctaLabel={t("closingCta.ctaLabel")}
        sample
      />
    </>
  );
}
