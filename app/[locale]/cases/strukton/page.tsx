import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseQuoteCard, CaseTwoPanel, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/cases/strukton`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CaseStrukton" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: PAGE_URL,
      languages: alternateLanguages("/cases/strukton")
    }
  };
}

export default async function StruktonCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "CaseStrukton" });
  const common = await getTranslations({ locale, namespace: "Common" });

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumb")} />
          <CaseHero
            aside={
              <CaseFactSheet
                rows={[
                  { label: "Client", value: "Strukton" },
                  { label: "Data", value: "Procurement spend, via SAP & procurement system" },
                  { label: "Scope", value: "35,000 to 50,000 lines a month" },
                  { label: "Approach", value: "AI + ML pipeline + human-in-the-loop" }
                ]}
              />
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="client" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("badge")}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2rem, 3.6vw, 2.9rem)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
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
          { value: t("stats.s4.value"), label: t("stats.s4.label") },
          { value: t("stats.s5.value"), label: t("stats.s5.label") }
        ]}
      />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("problem.label")}</CaseSectionLabel>
          <CaseH2>{t("problem.title")}</CaseH2>
          <CaseBodyP>{t("problem.p1")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("howItWorked.label")}</CaseSectionLabel>
            <CaseH2>{t("howItWorked.title")}</CaseH2>
            <CaseBodyP>{t("howItWorked.intro")}</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={[t("howItWorked.diagramInputs.i1"), t("howItWorked.diagramInputs.i2"), t("howItWorked.diagramInputs.i3")]}
            steps={[t("howItWorked.diagramSteps.s1"), t("howItWorked.diagramSteps.s2"), t("howItWorked.diagramSteps.s3")]}
            outputs={[
              { text: t("howItWorked.diagramOutputs.o1"), bg: "var(--blue-soft)" },
              { text: t("howItWorked.diagramOutputs.o2"), bg: "var(--purple-soft)" },
              { text: t("howItWorked.diagramOutputs.o3"), bg: "#F1F8E9" }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("granularity.label")}</CaseSectionLabel>
          <CaseH2>{t("granularity.title")}</CaseH2>
          <CaseBodyP>{t("granularity.p1")}</CaseBodyP>
          <div style={{ background: "var(--bg-soft)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{t("granularity.boxLabel")}</span>
            <strong style={{ fontSize: 18, color: "var(--navy)" }}>{t("granularity.boxValue")}</strong>
          </div>
          <CaseBodyP>
            {t("granularity.p2")}{" "}
            <Link href="/blog/what-is-unspsc">{t("granularity.readMoreLink")}</Link>.
          </CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteCard
            quote={t("quoteCard")}
            personId="strukton"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
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
          { href: "/cases/faro", label: t("moreLinks.l2.label"), title: t("moreLinks.l2.title") },
          { href: "/cases/construction-spend-benchmarking", label: t("moreLinks.l3.label"), title: t("moreLinks.l3.title") }
        ]}
      />

      <CaseClosingCTA
        secondaryLabel={common("bookDiscovery")}
        title={t("closingCta.title")}
        lead={t("closingCta.lead")}
        ctaLabel={t("closingCta.ctaLabel")}
        sample
      />
    </>
  );
}
