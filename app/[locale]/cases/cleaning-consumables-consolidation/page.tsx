import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseSectionLabel, CaseH2, CaseBodyP, CaseProcessDiagram, CaseQuoteCard,
  CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { CaseTileGrid, CasePriceBars, CaseSpendDonut } from "@/components/case-design-charts";
import { alternateLanguages, siteConfig } from "@/lib/site";
import styles from "@/components/case-design.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseCleaningConsumablesConsolidation" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases/cleaning-consumables-consolidation`,
      languages: alternateLanguages("/cases/cleaning-consumables-consolidation")
    }
  };
}

const suppliers = [
  { name: "Gompels", price: "£0.31" },
  { name: "Bunzl CHS", price: "£0.33" },
  { name: "Pattersons", price: "£0.38" },
  { name: "Amazon Business", price: "£0.41" }
];

const bars = [0.31, 0.36, 0.41, 0.47, 0.52].map((p, i) => ({
  label: "Supplier " + "ABCDE"[i],
  price: "£" + p.toFixed(2),
  w: Math.round((p / 0.52) * 100) + "%",
  color: i === 4 ? "var(--purple)" : "var(--primary)"
}));

type MoreLink = { label: string; title: string };
type Card = { t: string; c: string };
type SupplierTerms = { terms: string; delivery: string };

export default async function CleaningCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("CaseCleaningConsumablesConsolidation");
  const cards = t.raw("cards") as Card[];
  const features = t.raw("features") as Card[];
  const processInputs = t.raw("process.inputs") as string[];
  const processSteps = t.raw("process.steps") as string[];
  const processOutputs = t.raw("process.outputs") as { text: string }[];
  const decisionItems = t.raw("decisionBox.items") as string[];
  const moreLinksData = t.raw("moreLinks") as MoreLink[];
  const moreLinkHrefs = ["/cases/spie", "/cases/construction-spend-benchmarking", "/cases/mro-confidential"];
  const supplierTermsDelivery: SupplierTerms[] = [
    { terms: "Account, 30 days", delivery: "National, 2 to 3 days" },
    { terms: "Contracted, one invoice", delivery: "National, scheduled" },
    { terms: "Account, 30 days", delivery: "Regional, next day" },
    { terms: "Spot, no terms", delivery: "Next day, per parcel" }
  ];

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 88px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumbCurrent")} />
          <CaseHero
            equal
            aside={
              <div style={{ background: "var(--bg-soft)", borderRadius: 24, padding: 40, display: "flex", flexDirection: "column", gap: 18 }}>
                <CaseTileGrid total={30} finalIndices={[4, 15, 25]} />

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)", flexWrap: "wrap", gap: 8 }}>
                  <span>{t("asideCaption")}</span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--success)" }} />{t("asideLegend")}
                  </span>
                </div>
              </div>
            }
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <CaseTypeBadge type="pattern" />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("badge")}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>
              {t("h1")}
            </h1>
            <CaseHeadlineAccent />
            <p style={{ margin: 0, fontSize: 22, lineHeight: 1.5, fontWeight: 300, color: "var(--text)" }}>
              {t("lead")}
            </p>
          </CaseHero>
        </div>
      </section>

      <section style={{ background: "var(--purple-soft)", padding: "18px 0", fontSize: 14, color: "var(--navy)" }}>
        <div className="container">
          {t("patternNote")}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("section1.label")}</CaseSectionLabel>
            <CaseH2>{t("section1.h2")}</CaseH2>
            <CaseBodyP>{t("section1.body")}</CaseBodyP>
          </div>
          <div className={styles.grid4} style={{ "--cols": 4, gap: 20 } as CSSProperties}>
            {cards.map((b, i) => (
              <div key={b.t} style={{ background: "var(--bg-soft)", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: i === 3 ? "var(--purple)" : "var(--primary)" }} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--primary-dark)" }}>{b.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{b.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "104px 0" }}>
        <div className={`container ${styles.twoColWide}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <CaseSectionLabel>{t("section2.label")}</CaseSectionLabel>
            <CaseH2>{t("section2.h2")}</CaseH2>
            <CaseBodyP>{t("section2.body")}</CaseBodyP>
            <div style={{ background: "#F1F8E9", border: "1.5px solid var(--success)", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#4E7D22", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t("decisionBox.label")}</span>
              {decisionItems.map((item, i) => {
                const [name, ...rest] = item.split(" · ");
                return (
                  <span key={i} style={{ fontSize: 15, color: "var(--navy)" }}><strong style={{ fontWeight: 600 }}>{name}</strong> · {rest.join(" · ")}</span>
                );
              })}
            </div>
          </div>
          <div className={styles.microTableScroll}>
            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.6fr 1.3fr", background: "var(--primary-dark)", padding: "16px 24px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff" }}>
                <span>{t("table.supplier")}</span><span>{t("table.price")}</span><span>{t("table.terms")}</span><span>{t("table.delivery")}</span>
              </div>
              {suppliers.map((s, i) => (
                <div key={s.name} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr 1.6fr 1.3fr", padding: "16px 24px", borderTop: "1px solid var(--border)", fontSize: 15, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>{s.name}</span>
                  <span style={{ color: "var(--navy)", fontWeight: 500 }}>{s.price}</span>
                  <span style={{ color: "var(--text)", fontWeight: 300 }}>{supplierTermsDelivery[i].terms}</span>
                  <span style={{ color: "var(--text)", fontWeight: 300 }}>{supplierTermsDelivery[i].delivery}</span>
                </div>
              ))}
              <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>{t("table.footnote")}</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
            <CaseSectionLabel>{t("section3.label")}</CaseSectionLabel>
            <CaseH2>{t("section3.h2")}</CaseH2>
          </div>
          <div className={styles.grid3} style={{ "--cols": 3, gap: 24 } as CSSProperties}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>{t("offContract.title")}</h3>
              <div style={{ border: "1px solid var(--blue-soft)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{t("offContract.contractedLabel")}</span>
                <span style={{ fontSize: 26, fontWeight: 600, color: "var(--primary)" }}>£19.20 <span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)" }}>{t("offContract.contractedUnit")}</span></span>
              </div>
              <div style={{ border: "1.5px solid var(--purple)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4, background: "#FAF8FF" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{t("offContract.actualLabel")}</span>
                <span style={{ fontSize: 26, fontWeight: 600, color: "var(--primary-dark)" }}>£26.80 <span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)" }}>{t("offContract.actualNote")}</span></span>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{t("offContract.body")}</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>{t("priceSpread.title")}</h3>
              <span style={{ fontSize: 13, color: "var(--muted)", marginTop: -8 }}>{t("priceSpread.subtitle")}</span>
              <CasePriceBars bars={bars} />
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}><strong style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>68%</strong> {t("priceSpread.body")}</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "var(--primary-dark)" }}>{t("spendVisibility.title")}</h3>
              <CaseSpendDonut filledLength={57.3} totalLength={238.8} />
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}><strong style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>24%</strong> {t("spendVisibility.body")}</p>
            </div>
          </div>
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
        title={t("closing.title")}
        lead={t("closing.lead")}
        ctaLabel={t("closing.ctaLabel")}
        sample
      />
    </>
  );
}
