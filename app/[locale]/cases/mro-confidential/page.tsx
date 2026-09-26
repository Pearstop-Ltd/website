import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHeadlineAccent, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseTwoPanel,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseMroConfidential" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases/mro-confidential`,
      languages: alternateLanguages("/cases/mro-confidential")
    }
  };
}

type MoreLink = { label: string; title: string };
type Panel = { label: string; title: string; copy: string };

export default async function MroCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("CaseMroConfidential");
  const howInputs = t.raw("how.inputs") as string[];
  const howSteps = t.raw("how.steps") as string[];
  const howOutputs = t.raw("how.outputs") as { text: string }[];
  const panels = t.raw("panels") as Panel[];
  const moreLinksData = t.raw("moreLinks") as MoreLink[];
  const moreLinkHrefs = ["/cases/lemtech", "/cases/construction-spend-benchmarking", "/cases/cleaning-consumables-consolidation"];

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumbCurrent")} />
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 780 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="pattern" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("badge")}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              {t("h1")}
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>
              {t("lead")}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--purple-soft)", padding: "18px 0", fontSize: 14, color: "var(--navy)" }}>
        <div className="container">
          {t("patternNote")}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("problem.label")}</CaseSectionLabel>
          <CaseH2>{t("problem.h2")}</CaseH2>
          <CaseBodyP>{t("problem.body1")}</CaseBodyP>
          <CaseBodyP>{t("problem.body2")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("how.label")}</CaseSectionLabel>
            <CaseH2>{t("how.h2")}</CaseH2>
            <CaseBodyP>{t("how.body")}</CaseBodyP>
          </div>
          <CaseProcessDiagram
            inputs={howInputs}
            steps={howSteps}
            outputs={[
              { text: howOutputs[0].text, bg: "#F1F8E9" },
              { text: howOutputs[1].text, bg: "var(--purple-soft)" }
            ]}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 13, padding: "8px 10px", borderRadius: 6, background: "#fff", color: "var(--muted)", textDecoration: "line-through" }}>RS-448120</span>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true"><path d="M0 6 H16" stroke="var(--navy)" strokeWidth="1.6" /><path d="M15 1 L21 6 L15 11 Z" fill="var(--navy)" /></svg>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 13, padding: "8px 10px", borderRadius: 6, background: "#F1F8E9", border: "1px solid var(--success)", color: "var(--navy)" }}>MFR 6205-2RS</span>
            <span style={{ fontSize: 12, color: "#4E7D22", fontWeight: 500 }}>{t("partExample.note")}</span>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: panels[0].label,
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: panels[0].title,
                copy: panels[0].copy
              },
              {
                label: panels[1].label,
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: panels[1].title,
                copy: panels[1].copy
              }
            ]}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix={prefix}
        items={moreLinksData.map((item, i) => ({ href: moreLinkHrefs[i], label: item.label, title: item.title }))}
      />

      <CaseClosingCTA
        title={t("closing.title")}
        lead={t("closing.lead")}
        ctaLabel={t("closing.ctaLabel")}
        sample
      />
    </>
  );
}
