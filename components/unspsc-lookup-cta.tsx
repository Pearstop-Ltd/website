import Link from "next/link";

export function UnspscLookupCta({ prefix = "" }: { prefix?: string }) {
  return (
    <section style={{ background: "linear-gradient(135deg, #0d1b4b 0%, #1a2f6b 100%)", padding: "4rem 0", margin: "3rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <span style={{ color: "#39d353", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Free Tool</span>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", margin: "0.6rem 0 0.75rem", lineHeight: 1.25 }}>
            Not sure which UNSPSC code to use?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.6, margin: "0 0 2rem" }}>
            Paste any product or service description and get the correct 8-digit code instantly — free, no login required.
          </p>
          <Link
            href={`${prefix}/unspsc-code-lookup`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#39d353",
              color: "#0d1b4b",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.9rem 2.25rem",
              borderRadius: 10,
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            className="unspsc-cta-btn"
          >
            Try the free lookup →
          </Link>
        </div>
      </div>
      <style>{`.unspsc-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(57,211,83,0.4); }`}</style>
    </section>
  );
}
