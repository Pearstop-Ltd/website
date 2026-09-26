import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHeadlineAccent, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseQuoteCard,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";
import styles from "@/components/case-design.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseConstructionSpendBenchmarking" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases/construction-spend-benchmarking`,
      languages: alternateLanguages("/cases/construction-spend-benchmarking")
    }
  };
}

const windowsillRows = [
  ["WS-ALU-2000", "AluBuild Ltd", "£42.10"],
  ["Vensterbank alu", "Vensterbank BV", "£38.50"],
  ["Sill, window, aluminium", "Sill Supplies UK", "£51.20"],
  ["Windowsill alu 200cm", "NorthFrame Aluminium", "£44.00"],
  ["ALU SILL 2M", "BuildRight Merchants", "£36.75"],
  ["Aluminium sill 2000mm", "Fenster & Co", "£47.90"]
];

type MoreLink = { label: string; title: string };
type Feature = { t: string; c: string };

export default async function ConstructionSpendBenchmarkingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("CaseConstructionSpendBenchmarking");
  const common = await getTranslations("Common");
  const processInputs = t.raw("process.inputs") as string[];
  const processSteps = t.raw("process.steps") as string[];
  const processOutputs = t.raw("process.outputs") as { text: string }[];
  const features = t.raw("features") as Feature[];
  const moreLinksData = t.raw("moreLinks") as MoreLink[];
  const moreLinkHrefs = ["/cases/strukton", "/cases/cleaning-consumables-consolidation", "/cases/mro-confidential"];

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 88px" }}>
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
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, fontWeight: 300, color: "var(--text)" }}>
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
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("section1.label")}</CaseSectionLabel>
            <CaseH2>{t("section1.h2")}</CaseH2>
            <CaseBodyP>{t("section1.body")}</CaseBodyP>
          </div>
          <div className={styles.microTableScroll}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              <div className={styles.dataTableGrid} style={{ "--cols": 3, background: "var(--bg-soft)", padding: "14px 28px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" } as CSSProperties}>
                <span>{t("table.header")}</span><span>{t("table.supplier")}</span><span>{t("table.price")}</span>
              </div>
              {windowsillRows.map((row) => (
                <div key={row[0]} className={styles.dataTableGrid} style={{ "--cols": 3, padding: "16px 28px", borderTop: "1px solid var(--border)", fontSize: 15, alignItems: "center" } as CSSProperties}>
                  <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 14 }}>{row[0]}</span>
                  <span>{row[1]}</span>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#F1F8E9", border: "1.5px solid var(--success)", borderRadius: 16, padding: "22px 24px" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E7D22", display: "block", marginBottom: 6 }}>{t("classifiedBox.label")}</span>
            <strong style={{ fontSize: 18, color: "var(--navy)" }}>{t("classifiedBox.title")}</strong>
            <span style={{ display: "block", fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{t("classifiedBox.meta")}</span>
          </div>
          <CaseBodyP>{t("body2")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("section2.label")}</CaseSectionLabel>
          <CaseH2>{t("section2.h2")}</CaseH2>
          <CaseBodyP>{t("section2.body")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("section3.label")}</CaseSectionLabel>
            <CaseH2>{t("section3.h2")}</CaseH2>
            <CaseBodyP>{t("section3.body")}</CaseBodyP>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: 15, padding: "10px 14px", borderRadius: 8, background: "var(--bg-soft)", color: "var(--text)" }}>6100-42-K</span>
            <svg width="30" height="14" viewBox="0 0 30 14" fill="none" aria-hidden="true"><path d="M0 7 H24" stroke="var(--navy)" strokeWidth="1.6" /><path d="M22 2 L29 7 L22 12 Z" fill="var(--navy)" /></svg>
            <span style={{ fontSize: 16, fontWeight: 600, padding: "10px 14px", borderRadius: 8, background: "#F1F8E9", border: "1px solid var(--success)", color: "var(--navy)" }}>{t("ledgerExample.resolved")}</span>
          </div>
          <CaseBodyP>{t("body3")}</CaseBodyP>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseH2>{t("section4h2")}</CaseH2>
          <CaseProcessDiagram
            inputs={processInputs}
            steps={processSteps}
            outputs={[
              { text: processOutputs[0].text, bg: "var(--blue-soft)" },
              { text: processOutputs[1].text, bg: "var(--purple-soft)" },
              { text: processOutputs[2].text, bg: "#F1F8E9" }
            ]}
          />
          <div className={styles.grid3} style={{ "--cols": 3, gap: 20 } as CSSProperties}>
            {features.map((f) => (
              <div key={f.t} style={{ background: "#fff", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--primary-dark)" }}>{f.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{f.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "96px 0" }}>
        <div className={`container ${styles.twoPanel}`}>
          <div style={{ background: "#F1F8E9", borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E7D22" }}>{t("resultBadge")}</span>
            <span style={{ fontSize: 64, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--navy)" }}>{t("resultStat")}</span>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: "var(--navy)" }}>{t("resultCopy")}</p>
          </div>
          <CaseQuoteCard
            quote={t("quote")}
            role={t("quoteRole")}
          />
        </div>
      </section>

      <CaseMoreLinks
        prefix={prefix}
        items={moreLinksData.map((item, i) => ({ href: moreLinkHrefs[i], label: item.label, title: item.title }))}
      />

      <CaseClosingCTA
        secondaryLabel={common("bookDiscovery")}
        title={t("closing.title")}
        lead={t("closing.lead")}
        ctaLabel={t("closing.ctaLabel")}
        sample
      />
    </>
  );
}
