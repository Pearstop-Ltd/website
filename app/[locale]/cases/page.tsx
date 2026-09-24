import type { Metadata } from "next";
import Link from "next/link";
import { CaseClosingCTA } from "@/components/case-design";
import { alternateLanguages, caseStudies, siteConfig } from "@/lib/site";
import { getPerson, initialsOf, type PersonId } from "@/lib/people";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real results from hard services, infrastructure, manufacturing, and FM companies that used Pearstop to clean their data, cut manual work, and protect their margins.",
  alternates: {
    canonical: `${siteConfig.url}/cases`,
    languages: alternateLanguages("/cases")
  }
};

const featured = caseStudies.find((c) => c.slug === "spie")!;
const clientCases = caseStudies.filter((c) => c.type === "client" && c.slug !== featured.slug);
const patterns = caseStudies.filter((c) => c.type === "pattern");

const quotes: { text: string; personId: PersonId; bg: string }[] = [
  { text: "The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows.", personId: "bartVanPeij", bg: "var(--primary-dark)" },
  { text: "We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week.", personId: "davidTorr", bg: "var(--primary)" },
  { text: "It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items.", personId: "vinceOut", bg: "var(--purple)" }
];

export default function CasesPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "88px 0 56px" }}>
        <div className="container cases-hero-row">
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)" }}>Cases</div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.4rem, 4.6vw, 3.75rem)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--primary-dark)" }}>Real work. Real margins.</h1>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>How project-based businesses in FM, construction, infrastructure, and manufacturing turn messy procurement and asset data into something they can act on.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 96px" }}>
        <div className="container">
          <Link href={`/cases/${featured.slug}`} className="cases-featured-card" style={{ display: "block", background: "var(--bg-soft)", borderRadius: 24, color: "inherit" }}>
            <div className="cases-featured-grid">
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)" }}>Featured client case</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{featured.category}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--primary-dark)" }}>{featured.title}</h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, fontWeight: 300, color: "var(--text)" }}>{featured.excerpt}</p>
                <div className="cases-stat-grid" style={{ paddingTop: 6 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 28, fontWeight: 600, color: "var(--navy)" }}>73.1%</span><span style={{ fontSize: 13, color: "var(--muted)" }}>matches confirmed</span></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 28, fontWeight: 600, color: "var(--navy)" }}>107,081</span><span style={{ fontSize: 13, color: "var(--muted)" }}>lines enhanced</span></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 28, fontWeight: 600, color: "var(--navy)" }}>204,029</span><span style={{ fontSize: 13, color: "var(--muted)" }}>asset records</span></div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--primary)" }}>Read the case →</span>
              </div>
              <div style={{ background: "var(--navy)", borderRadius: 18, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={siteConfig.assets.clients.spie} alt="SPIE" style={{ height: 40, width: "auto" }} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "0 0 96px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--primary-dark)" }}>Client cases</h2>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>Named work, real data</span>
          </div>
          <div className="cases-client-grid">
            {clientCases.map((c) => (
              <Link key={c.slug} href={`/cases/${c.slug}`} style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", background: "#fff", color: "inherit", flexDirection: "column" }} className="cg-grid-card">
                {c.image ? (
                  <div style={{ background: "var(--bg-soft)", padding: "20px 22px", display: "flex", alignItems: "center" }}>
                    <img src={c.image} alt="" aria-hidden="true" style={{ height: c.imageFit === "contain" ? 32 : 56, width: "auto", objectFit: c.imageFit ?? "contain" }} />
                  </div>
                ) : null}
                <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--primary)" }}>{c.category}</span>
                  <h3 style={{ margin: 0, fontSize: 21, lineHeight: 1.3, fontWeight: 600, color: "var(--primary-dark)" }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: 28, paddingTop: 4 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>{c.statPrimary}</span><span style={{ fontSize: 12, color: "var(--muted)" }}>{c.statPrimaryLabel}</span></div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)" }}>{c.statSecondary}</span><span style={{ fontSize: 12, color: "var(--muted)" }}>{c.statSecondaryLabel}</span></div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)", marginTop: "auto", paddingTop: 8 }}>Read the case →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)", padding: "88px 0 96px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--primary-dark)" }}>Patterns we see</h2>
          </div>
          <div className="cases-patterns-grid">
            {patterns.map((c) => (
              <Link key={c.slug} href={`/cases/${c.slug}`} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", color: "inherit" }}>
                {c.image ? (
                  <div style={{ height: 150, background: "var(--navy)", padding: 20, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
                    <img src={c.image} alt="" aria-hidden="true" style={{ maxHeight: 100, width: "auto" }} />
                  </div>
                ) : null}
                <div style={{ padding: "26px 28px 28px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A5CD6" }}>Pattern · {c.category.split("·")[0].trim()}</span>
                  <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.3, fontWeight: 600, color: "var(--primary-dark)" }}>{c.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: "var(--text)" }}>{c.statPrimary} {c.statPrimaryLabel.toLowerCase()}.</p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)", marginTop: "auto", paddingTop: 8 }}>See the pattern →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "96px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--primary-dark)" }}>In their words</h2>
          <div className="cases-quotes-grid">
            {quotes.map((q) => {
              const person = getPerson(q.personId);
              return (
                <figure key={q.personId} style={{ margin: 0, padding: 32, borderRadius: 20, background: "var(--bg-soft)", display: "flex", flexDirection: "column", gap: 24 }}>
                  <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.55, fontWeight: 400, color: "var(--navy)" }}>&ldquo;{q.text}&rdquo;</blockquote>
                  <figcaption style={{ display: "flex", gap: 12, alignItems: "center", marginTop: "auto" }}>
                    {person.headshot ? (
                      <img src={person.headshot} alt={person.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <span style={{ width: 44, height: 44, borderRadius: "50%", background: q.bg, color: "#fff", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{initialsOf(person.name)}</span>
                    )}
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <strong style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{person.name}</strong>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>{person.role}, {person.company}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <CaseClosingCTA
        title="Send us 200 lines. We send them back labelled."
        lead="No clean-up first, no cost, nothing to install. The fastest way to see what your own data looks like classified."
        ctaLabel="Send your sample"
        sample
      />
    </>
  );
}
