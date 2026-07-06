"use client";

import { useState } from "react";

export function BlogNewsletterWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, var(--navy) 0%, #2a3990 55%, var(--primary) 100%)",
      borderRadius: 16,
      padding: "2rem 1.5rem",
      textAlign: "center",
      color: "#fff",
    }}>
      {/* Envelope icon */}
      <div style={{ marginBottom: "1.25rem" }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" style={{ display: "inline-block" }}>
          <rect x="6" y="16" width="44" height="30" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M6 20l22 14 22-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M30 10l4 4-4 4" stroke="#74c0fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="38" cy="12" r="3" fill="#74c0fc" opacity="0.7" />
        </svg>
      </div>

      {status === "success" ? (
        <div>
          <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>You&apos;re in!</p>
          <p style={{ fontSize: "0.875rem", opacity: 0.85 }}>Thanks — we&apos;ll be in touch with procurement insights.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.35, marginBottom: "1.25rem" }}>
            Get procurement insights
          </p>
          <div style={{ textAlign: "left", marginBottom: "0.75rem" }}>
            <label htmlFor="newsletter-email" style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
              Email<span style={{ color: "#f87171" }}>*</span>
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your business email"
              style={{
                width: "100%",
                padding: "0.65rem 1rem",
                borderRadius: 8,
                border: "none",
                fontSize: "0.9rem",
                background: "rgba(255,255,255,0.92)",
                color: "#111",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          {status === "error" && (
            <p style={{ fontSize: "0.8rem", color: "#fca5a5", marginBottom: "0.5rem" }}>Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.75rem",
              borderRadius: 999,
              background: "var(--primary-dark)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" ? "Submitting…" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
