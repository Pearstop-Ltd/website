import type { ReactNode } from "react";
import Link from "next/link";

/* Shared visual language for the redesigned /cases pages, translated from
   Stephanie's Claude-Design mockup (CaseSPIE.dc.html / CaseCleaning.dc.html /
   Main.dc.html). Mockup hex values map to existing CSS custom properties:
   #1F2A68 -> --navy, #353FFF -> --primary, #2A3990 -> --primary-dark,
   #A383FF -> --purple, #8BC34A -> --success, #F8F9FA -> --bg-soft,
   #DCE1F8 -> --blue-soft, #E8E0FC -> --purple-soft. */

export function CaseBreadcrumb({ current }: { current: string }) {
  return (
    <nav style={{ fontSize: 14, color: "var(--muted)", display: "flex", gap: 8 }}>
      <Link href="/cases" style={{ color: "var(--muted)" }}>Cases</Link>
      <span>/</span>
      <span style={{ color: "var(--navy)" }}>{current}</span>
    </nav>
  );
}

export function CaseTypeBadge({ type }: { type: "client" | "pattern" }) {
  return type === "client" ? (
    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "var(--primary)", padding: "5px 10px", borderRadius: 6 }}>
      Client case
    </span>
  ) : (
    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)", background: "var(--purple-soft)", padding: "5px 10px", borderRadius: 6 }}>
      Pattern
    </span>
  );
}

export function CaseFactSheet({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <aside style={{ background: "var(--bg-soft)", borderRadius: 20, padding: "28px 30px", display: "flex", flexDirection: "column", gap: 18 }}>
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: "flex", flexDirection: "column", gap: 3, borderTop: i === 0 ? "none" : "1px solid var(--blue-soft)", paddingTop: i === 0 ? 0 : 16 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{r.label}</span>
          <span style={{ fontSize: 15, color: "var(--navy)", fontWeight: 500 }}>{r.value}</span>
        </div>
      ))}
    </aside>
  );
}

export function CaseResultsBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section style={{ background: "#fff", padding: "0 0 96px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`, borderRadius: 20, overflow: "hidden", background: "var(--primary-dark)" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "32px 30px", display: "flex", flexDirection: "column", gap: 8, borderRight: i < stats.length - 1 ? "1px solid rgba(220,225,248,0.18)" : "none" }}>
              <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>{s.value}</span>
              <span style={{ fontSize: 14, lineHeight: 1.45, color: "var(--blue-soft)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseSectionLabel({ children }: { children: ReactNode }) {
  return <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)" }}>{children}</span>;
}

export function CaseH2({ children }: { children: ReactNode }) {
  return <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1.15, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--primary-dark)" }}>{children}</h2>;
}

export function CaseBodyP({ children }: { children: ReactNode }) {
  return <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, fontWeight: 300, color: "var(--text)" }}>{children}</p>;
}

/* "How it worked" process diagram: N input boxes -> curved connector ->
   pearstop box (with step list) -> arrow -> N colored output boxes. */
export function CaseProcessDiagram({ inputs, steps, outputs }: {
  inputs: string[];
  steps: string[];
  outputs: { text: string; bg: string }[];
}) {
  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "44px 48px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 210, flexShrink: 0 }}>
        {inputs.map((label) => (
          <div key={label} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14, color: "var(--text)" }}>{label}</div>
        ))}
      </div>
      <CaseArrow />
      <div style={{ background: "var(--primary)", borderRadius: 14, padding: "22px 24px", width: 250, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>pearstop.</span>
        <span style={{ fontSize: 13, lineHeight: 1.6, color: "#fff" }}>
          {steps.map((s, i) => <span key={s}>{i + 1} · {s}{i < steps.length - 1 ? <br /> : null}</span>)}
        </span>
      </div>
      <CaseArrow />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flexGrow: 1, minWidth: 200 }}>
        {outputs.map((o) => (
          <div key={o.text} style={{ padding: "14px 16px", borderRadius: 10, background: o.bg, fontSize: 14, color: "var(--navy)", fontWeight: 500 }}>{o.text}</div>
        ))}
      </div>
    </div>
  );
}

function CaseArrow() {
  return (
    <svg width="36" height="12" viewBox="0 0 36 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M0 6 H30" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M28 1 L35 6 L28 11 Z" fill="var(--navy)" />
    </svg>
  );
}

export function CaseStepCards({ steps }: { steps: { title: string; copy: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`, gap: 24 }}>
      {steps.map((s, i) => (
        <div key={s.title} style={{ background: "#fff", borderRadius: 18, padding: 30, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-dark)", color: "#fff", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "var(--primary-dark)" }}>{s.title}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, fontWeight: 300, color: "var(--text)" }}>{s.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseDataTable({ columns, rows, footnote }: {
  columns: string[];
  rows: string[][];
  footnote?: string;
}) {
  return (
    <div>
      <div style={{ border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`, background: "var(--bg-soft)", padding: "14px 28px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>
          {columns.map((c) => <span key={c}>{c}</span>)}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`, padding: "16px 28px", borderTop: "1px solid var(--border)", alignItems: "center", fontSize: 15 }}>
            {row.map((cell, j) => <span key={j} style={{ color: j < row.length / 2 ? "var(--text)" : "var(--navy)", fontWeight: j < row.length / 2 ? 400 : 600, fontFamily: j < row.length / 2 ? "'SF Mono', Menlo, monospace" : "inherit", fontSize: j < row.length / 2 ? 14 : 15 }}>{cell}</span>)}
          </div>
        ))}
      </div>
      {footnote ? <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--muted)" }}>{footnote}</p> : null}
    </div>
  );
}

export function CaseStatBar({ percent, segments }: {
  percent: string;
  segments: { width: string; bg: string; label: string; color: string }[];
}) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", height: 36, borderRadius: 8, overflow: "hidden" }}>
        {segments.map((s) => (
          <div key={s.label} style={{ width: s.width, flexGrow: s.width === "auto" ? 1 : undefined, background: s.bg, display: "flex", alignItems: "center", paddingLeft: 14, fontSize: 14, fontWeight: 600, color: s.color }}>
            {s.width !== "auto" ? percent + " " + s.label : s.label}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--muted)", flexWrap: "wrap" }}>
        {segments.map((s) => (
          <span key={s.label} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.bg }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CaseQuoteBig({ quote, initials, name, role }: { quote: string; initials: string; name: string; role: string }) {
  return (
    <figure style={{ margin: 0, background: "var(--primary-dark)", borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 28 }}>
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <path d="M0 28 V16 C0 7 5 1.5 14 0 L15.5 4 C10 5.5 7.5 9 7.5 13 H14 V28 Z M21 28 V16 C21 7 26 1.5 35 0 L36 4 C31 5.5 28.5 9 28.5 13 H35 V28 Z" fill="var(--purple)" />
      </svg>
      <blockquote style={{ margin: 0, fontSize: 24, lineHeight: 1.45, fontWeight: 400, color: "#fff" }}>{quote}</blockquote>
      <figcaption style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--blue-soft)", color: "var(--navy)", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{initials}</span>
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <strong style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{name}</strong>
          <span style={{ fontSize: 13, color: "var(--blue-soft)" }}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function CaseQuoteCard({ quote, initials, name, role, bg = "var(--primary-dark)" }: { quote: string; initials: string; name: string; role: string; bg?: string }) {
  return (
    <figure style={{ margin: 0, display: "flex", gap: 40, alignItems: "center", padding: "40px 48px", border: "1px solid var(--border)", borderRadius: 24, flexWrap: "wrap" }}>
      <span style={{ width: 72, height: 72, borderRadius: "50%", background: bg, color: "#fff", fontSize: 20, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{initials}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <blockquote style={{ margin: 0, fontSize: 22, lineHeight: 1.5, fontWeight: 400, color: "var(--navy)" }}>&ldquo;{quote}&rdquo;</blockquote>
        <figcaption style={{ fontSize: 14, color: "var(--muted)" }}><strong style={{ color: "var(--navy)", fontWeight: 600 }}>{name}</strong> · {role}</figcaption>
      </div>
    </figure>
  );
}

export function CaseTwoPanel({ panels }: { panels: { label: string; labelColor: string; bg: string; title: string; copy: string; pullQuote?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
      {panels.map((p) => (
        <div key={p.title} style={{ background: p.bg, borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: p.labelColor }}>{p.label}</span>
          <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.015em", color: "var(--navy)" }}>{p.title}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: "var(--navy)" }}>{p.copy}</p>
          {p.pullQuote ? (
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, fontWeight: 500, color: "var(--primary-dark)", paddingLeft: 16, borderLeft: "3px solid var(--primary)" }}>&ldquo;{p.pullQuote}&rdquo;</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function CaseMoreLinks({ prefix, items }: { prefix: string; items: { href: string; label: string; title: string }[] }) {
  return (
    <section style={{ background: "var(--bg-soft)", padding: "80px 0" }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 600, color: "var(--primary-dark)" }}>More cases</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
            {items.map((item) => (
              <Link key={item.href} href={`${prefix}${item.href}`} style={{ background: "#fff", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--primary)" }}>{item.label}</span>
                <span style={{ fontSize: 17, lineHeight: 1.35, fontWeight: 600, color: "var(--primary-dark)" }}>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseClosingCTA({ title, lead, ctaLabel, ctaHref, external }: { title: string; lead: string; ctaLabel: string; ctaHref: string; external?: boolean }) {
  return (
    <section style={{ background: "var(--navy)", padding: "96px 0 72px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 64, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 660 }}>
            <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>{title}</h2>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, fontWeight: 300, color: "var(--blue-soft)" }}>{lead}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}>
            <a href={ctaHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} style={{ background: "#fff", color: "var(--navy)", fontSize: 16, fontWeight: 600, padding: "16px 28px", borderRadius: 12 }}>{ctaLabel}</a>
            <Link href="/contact" style={{ color: "var(--purple)", fontSize: 15, fontWeight: 500 }}>Or talk to Stephanie →</Link>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(220,225,248,0.2)", marginTop: 56, paddingTop: 28, display: "flex", justifyContent: "space-between", fontSize: 13, color: "#7A8BE6", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontWeight: 600, color: "#fff", fontSize: 18 }}>pearstop.</span>
          <span>© 2026 Pearstop · Privacy · Terms</span>
        </div>
      </div>
    </section>
  );
}
