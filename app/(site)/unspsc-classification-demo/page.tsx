import type { Metadata } from "next";
import Link from "next/link";
import { UnspscTree } from "@/components/unspsc-tree";
import { CalendlyButton } from "@/components/calendly-button";

export const metadata: Metadata = {
  title: "UNSPSC Classification Tree — Interactive Demo | Pearstop",
  description: "Explore the UNSPSC taxonomy interactively. Navigate from segment to family to class to commodity with real facilities management examples.",
};

const levels = [
  { digits: "XX", level: "Segment", example: "72 — Construction", color: "#2563eb" },
  { digits: "XXXX", level: "Family", example: "7210 — General build", color: "#7c3aed" },
  { digits: "XXXXXX", level: "Class", example: "721011 — Residential", color: "#0891b2" },
  { digits: "XXXXXXXX", level: "Commodity", example: "72101101 — Single family", color: "#16a34a" },
];

const whyLevels = [
  { title: "Segment", use: "Executive dashboards, board reporting", limit: "Too broad to drive savings", icon: "◈" },
  { title: "Family", use: "Budget allocation, category ownership", limit: "Still too coarse for sourcing", icon: "◉" },
  { title: "Class", use: "Sourcing events, supplier selection", limit: "Misses unit-price benchmarking", icon: "◎" },
  { title: "Commodity", use: "Price benchmarking, AI automation", limit: "Requires consistent coding", icon: "●" },
];

export default function UnspscDemoPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(160deg, #0a1540 0%, #0f2060 55%, #162880 100%)",
        padding: "5.5rem 0 4.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(57,211,83,0.08) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(57,211,83,0.12)", color: "#39d353",
            fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase",
            letterSpacing: "0.12em", padding: "5px 14px", borderRadius: 20,
            marginBottom: 22, border: "1px solid rgba(57,211,83,0.25)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39d353", display: "inline-block" }} />
            Interactive Demo
          </span>
          <h1 style={{
            color: "#fff", fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.18, marginBottom: "1.1rem",
            letterSpacing: "-0.02em",
          }}>
            Explore the UNSPSC<br />Classification Tree
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.62)", fontSize: "1.05rem",
            lineHeight: 1.7, maxWidth: 580, margin: "0 auto 2.25rem",
          }}>
            Four levels, one taxonomy. Click through real FM and procurement spend categories — from broad segment all the way to 8-digit commodity code.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/unspsc-code-lookup" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "#39d353", color: "#0a1f0a", fontWeight: 700,
              fontSize: "0.92rem", padding: "0.75rem 1.8rem", borderRadius: 10,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(57,211,83,0.35)",
            }}>
              Try the free lookup →
            </Link>
            <Link href="/unspsc" style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)",
              fontWeight: 500, fontSize: "0.92rem", padding: "0.75rem 1.8rem",
              borderRadius: 10, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}>
              What is UNSPSC?
            </Link>
          </div>
        </div>
      </section>

      {/* Level strip */}
      <section style={{ background: "#fff", borderBottom: "1px solid #f0f2f5", padding: "0" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "stretch" }}>
            {levels.map(({ digits, level, example, color }, i) => (
              <div key={level} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.4rem 0.75rem",
                borderRight: i < 3 ? "1px solid #f0f2f5" : "none",
                position: "relative",
              }}>
                {i < 3 && (
                  <div style={{
                    position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)",
                    width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 2l5 4-5 4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div style={{ fontFamily: "monospace", fontSize: "0.95rem", fontWeight: 800, color, marginBottom: 3, letterSpacing: "0.04em" }}>{digits}</div>
                <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#111827" }}>{level}</div>
                <div style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: 2, textAlign: "center" }}>{example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tree section */}
      <section style={{ padding: "3rem 0 2.5rem", background: "#f8fafc" }}>
        <div className="container" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: 4, letterSpacing: "-0.01em" }}>
              Browse the hierarchy
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              6 segments · 16 families · 32 classes · 78 commodities — real FM, procurement and professional services spend data.
            </p>
          </div>
          <div style={{
            background: "#fff",
            borderRadius: 18,
            border: "1px solid #eaeff5",
            padding: "22px 18px",
            boxShadow: "0 2px 32px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <UnspscTree />
          </div>
        </div>
      </section>

      {/* Why levels */}
      <section style={{ padding: "3rem 0", background: "#fff", borderTop: "1px solid #f0f2f5" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
            Why does the level of detail matter?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {whyLevels.map(({ title, use, limit, icon }) => (
              <div key={title} style={{
                borderRadius: 12,
                padding: "18px 18px",
                border: "1px solid #eaeff5",
                background: "#fafbfc",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1rem", color: "#2563eb" }}>{icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827" }}>{title} level</span>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#16a34a", marginBottom: 2 }}>Good for</div>
                  <div style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5 }}>{use}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#dc2626", marginBottom: 2 }}>Limitation</div>
                  <div style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5 }}>{limit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(160deg, #0a1540 0%, #0f2060 55%, #162880 100%)",
        padding: "4.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(57,211,83,0.07) 0%, transparent 70%)",
        }} />
        <div className="container" style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            color: "#fff", fontWeight: 700,
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
            marginBottom: "0.8rem",
            letterSpacing: "-0.02em",
          }}>
            Ready to classify your own spend data?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.97rem", lineHeight: 1.65, marginBottom: "2rem" }}>
            Pearstop helps procurement and FM teams reach commodity-level accuracy — automatically. Book a 7-minute call to see how.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/unspsc-code-lookup" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "#39d353", color: "#0a1f0a", fontWeight: 700,
              fontSize: "0.95rem", padding: "0.8rem 2rem", borderRadius: 10,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(57,211,83,0.3)",
            }}>
              Try the free lookup →
            </Link>
            <CalendlyButton
              label="Book a 7-min call"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 500,
                fontSize: "0.95rem",
                padding: "0.8rem 2rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
