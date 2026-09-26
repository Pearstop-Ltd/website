import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CaseBreadcrumb, CaseHero, CaseHeadlineAccent, CaseTypeBadge, CaseFactSheet, CaseResultsBand, CaseSectionLabel, CaseH2, CaseBodyP,
  CaseProcessDiagram, CaseQuoteCard, CaseMoreLinks, CaseClosingCTA
} from "@/components/case-design";
import { alternateLanguages, siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseLemtech" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/cases/lemtech`,
      languages: alternateLanguages("/cases/lemtech")
    }
  };
}

type Row = { label: string; value: string };
type MoreLink = { label: string; title: string };

export default async function LemtechCaseStudyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("CaseLemtech");
  const common = await getTranslations("Common");
  const factSheetRows = t.raw("factSheetRows") as Row[];
  const stats = t.raw("stats") as { value: string; label: string }[];
  const howInputs = t.raw("how.inputs") as string[];
  const howSteps = t.raw("how.steps") as string[];
  const howOutputs = t.raw("how.outputs") as { text: string }[];
  const moreLinksData = t.raw("moreLinks") as MoreLink[];
  const moreLinkHrefs = ["/cases/faro", "/cases/spie", "/cases/mro-confidential"];

  return (
    <>
      <section style={{ background: "#fff", padding: "56px 0 72px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <CaseBreadcrumb current={t("breadcrumbCurrent")} />
          <CaseHero
            aside={<CaseFactSheet rows={factSheetRows} />}
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

      <CaseResultsBand stats={stats} />

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("problem.label")}</CaseSectionLabel>
          <CaseH2>{t("problem.h2")}</CaseH2>
          <CaseBodyP>{t("problem.body")}</CaseBodyP>
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
              { text: howOutputs[0].text, bg: "var(--blue-soft)" },
              { text: howOutputs[1].text, bg: "#F1F8E9" }
            ]}
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "104px 0" }}>
        <div className="container">
          <CaseQuoteCard
            quote={t("quote")}
            personId="vinceOut"
          />
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 104px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <CaseSectionLabel>{t("result.label")}</CaseSectionLabel>
          <CaseH2>{t("result.h2")}</CaseH2>
          <CaseBodyP>{t("result.body")}</CaseBodyP>
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
