import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseStepCards, CaseDataTable, CaseQuoteBig, CaseQuoteCard, CaseTwoPanel,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { CaseStatBar } from "@/components/case-design-charts";
import { alternateLanguages, siteConfig } from "@/lib/site";
import styles from "@/components/case-design.module.css";

const PAGE_URL = `${siteConfig.url}/cases/spie`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CaseSpie" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: PAGE_URL,
      languages: alternateLanguages("/cases/spie")
    }
  };
}

const pumpRows = [
  ["NORDPUMP", "Series 3", "Nordpump", "Series 3", "Base"],
  ["Nordpump B.V.", "S3 32-120 F", "Nordpump", "Series 3", "32-120 F"],
  ["Nordpmp", "SERIES3 25-60", "Nordpump", "Series 3", "25-60"],
  ["NORDPUMP NL", "s3 32-120F", "Nordpump", "Series 3", "32-120 F"],
  ["Nordpump Pompen", "Series-3 40-80", "Nordpump", "Series 3", "40-80"]
];

export default async function SpieCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "CaseSpie" });

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumb")} />
          <CaseHero
            aside={
              <CaseFactSheet
                rows={[
                  { label: "Client", value: "SPIE Building Solutions BV" },
                  { label: "Data", value: "Asset register: manufacturer and equipment type" },
                  { label: "Scope", value: "204,029 asset records" },
                  { label: "Approach", value: "Rules + LLM cross-check + human review" }
                ]}
              />
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="client" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("badge")}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
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
        <div className={`container ${styles.twoCol}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <CaseSectionLabel>{t("situation.label")}</CaseSectionLabel>
            <CaseH2>{t("situation.title")}</CaseH2>
            <CaseBodyP>{t("situation.p1")}</CaseBodyP>
            <CaseBodyP>{t("situation.p2")}</CaseBodyP>
          </div>
          <div style={{ background: "var(--bg-soft)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{t("whyProblemToo.label")}</span>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, fontWeight: 400, color: "var(--navy)" }}>
              {t("whyProblemToo.copy")}
            </p>
            <div style={{ display: "flex", gap: 12, paddingTop: 8, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{t("whyProblemToo.poLabel")}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{t("whyProblemToo.poValue")}</span>
              </div>
              <div style={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{t("whyProblemToo.assetLabel")}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{t("whyProblemToo.assetValue")}</span>
              </div>
            </div>
          </div>
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
              { text: t("howItWorked.diagramOutputs.o1"), bg: "#F1F8E9" },
              { text: t("howItWorked.diagramOutputs.o2"), bg: "var(--blue-soft)" },
              { text: t("howItWorked.diagramOutputs.o3"), bg: "var(--purple-soft)" }
            ]}
          />
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
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("example.label")}</CaseSectionLabel>
            <CaseH2>{t("example.title")}</CaseH2>
            <CaseBodyP>{t("example.intro")}</CaseBodyP>
          </div>
          <CaseDataTable
            columns={[
              t("example.tableColumns.c1"),
              t("example.tableColumns.c2"),
              t("example.tableColumns.c3"),
              t("example.tableColumns.c4"),
              t("example.tableColumns.c5")
            ]}
            rows={pumpRows}
            footnote={t("example.tableFootnote")}
          />
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className={`container ${styles.twoColCenter}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <CaseSectionLabel>{t("whereToLook.label")}</CaseSectionLabel>
            <CaseH2>{t("whereToLook.title")}</CaseH2>
            <CaseBodyP>{t("whereToLook.intro")}</CaseBodyP>
            <CaseStatBar
              percent="73.1%"
              segments={[
                { width: "73.1%", bg: "var(--success)", label: t("whereToLook.confirmedLabel"), color: "var(--navy)" },
                { width: "auto", bg: "var(--purple)", label: t("whereToLook.reviewLabel"), legendLabel: t("whereToLook.reviewLegend"), color: "var(--navy)" }
              ]}
            />
          </div>
          <CaseQuoteBig
            quote={t("quoteBig")}
            personId="bartVanPeij"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseTwoPanel
            panels={[
              {
                label: t("twoPanel.p1.label"),
                labelColor: "#5A3FC0",
                bg: "var(--purple-soft)",
                title: t("twoPanel.p1.title"),
                copy: t("twoPanel.p1.copy")
              },
              {
                label: t("twoPanel.p2.label"),
                labelColor: "var(--primary)",
                bg: "var(--bg-soft)",
                title: t("twoPanel.p2.title"),
                copy: t("twoPanel.p2.copy"),
                pullQuote: t("twoPanel.p2.pullQuote")
              }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container">
          <CaseQuoteCard
            quote={t("quoteCard")}
            personId="martijnVanBalkom"
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix={prefix}
        items={[
          { href: "/cases/strukton", label: t("moreLinks.l1.label"), title: t("moreLinks.l1.title") },
          { href: "/cases/faro", label: t("moreLinks.l2.label"), title: t("moreLinks.l2.title") },
          { href: "/cases/cleaning-consumables-consolidation", label: t("moreLinks.l3.label"), title: t("moreLinks.l3.title") }
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
