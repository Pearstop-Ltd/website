"use client";

import { useState, useEffect } from "react";

const FREE_LIMIT = 5;
const STORAGE_KEY = "unspsc_uses";

type ResultLabels = {
  code: string;
  segment: string;
  family: string;
  classLabel: string;
  commodity: string;
  confidence: string;
  notes: string;
  high: string;
  medium: string;
  low: string;
};

type LookupResult = {
  code?: string;
  segment?: string;
  family?: string;
  class?: string;
  commodity?: string;
  confidence?: "high" | "medium" | "low";
  notes?: string;
  error?: string;
};

const CONFIDENCE_COLOURS: Record<string, string> = {
  high: "#1a7f37",
  medium: "#9a6700",
  low: "#cf222e",
};

const EXAMPLES = [
  "Lighting maintenance",
  "HVAC filter replacement",
  "Galvanised M8 bolt",
  "Electrical panel inspection",
  "Subcontractor plumbing works",
];

export function UnspscLookupTool({
  placeholder,
  buttonLabel,
  loadingLabel,
  resultLabels,
}: {
  placeholder: string;
  buttonLabel: string;
  loadingLabel: string;
  resultLabels: ResultLabels;
}) {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usesLeft, setUsesLeft] = useState(FREE_LIMIT);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    setUsesLeft(Math.max(0, FREE_LIMIT - stored));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    if (usesLeft <= 0) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/unspsc-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data: LookupResult = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        const used = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10) + 1;
        localStorage.setItem(STORAGE_KEY, String(used));
        setUsesLeft(Math.max(0, FREE_LIMIT - used));
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function useExample(example: string) {
    setDescription(example);
    setResult(null);
    setError(null);
  }

  const confidenceColour = result?.confidence ? CONFIDENCE_COLOURS[result.confidence] ?? "#666" : "#666";
  const confidenceLabel = result?.confidence === "high"
    ? resultLabels.high
    : result?.confidence === "medium"
      ? resultLabels.medium
      : resultLabels.low;

  if (usesLeft <= 0) {
    return (
      <div style={{ border: "1.5px solid var(--primary, #6b46c1)", borderRadius: 16, padding: "2rem", background: "var(--purple-soft, #f5f3ff)", textAlign: "center" }}>
        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>✓</p>
        <p style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>You've used your 5 free lookups</p>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          For bulk classification — thousands of invoice lines, automated and accurate — talk to us about the full service.
        </p>
        <a href="https://calendly.com/stephanie-pearstop/7-min-discovery" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Book a 7-minute discovery call
        </a>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={placeholder}
            maxLength={500}
            rows={3}
            required
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "1rem",
              border: "1.5px solid #d0d5dd",
              borderRadius: "8px",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !description.trim()}
              style={{ minWidth: 180 }}
            >
              {loading ? loadingLabel : buttonLabel}
            </button>
            <span style={{ fontSize: "0.85rem", color: "#888" }}>
              {description.length}/500
            </span>
            <span style={{ fontSize: "0.8rem", color: usesLeft <= 2 ? "#b45309" : "#888", marginLeft: "auto" }}>
              {usesLeft} free {usesLeft === 1 ? "lookup" : "lookups"} remaining
            </span>
          </div>
        </div>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => useExample(ex)}
            style={{
              background: "none",
              border: "1px solid #d0d5dd",
              borderRadius: "20px",
              padding: "0.3rem 0.85rem",
              fontSize: "0.82rem",
              cursor: "pointer",
              color: "#444",
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: "1rem", background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "8px", color: "#b91c1c" }}>
          {error}
        </div>
      )}

      {result && !error && (
        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.5px", fontVariantNumeric: "tabular-nums" }}>
                {result.code}
              </span>
              <span style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "0.25rem 0.75rem",
                borderRadius: "20px",
                background: `${confidenceColour}18`,
                color: confidenceColour,
                border: `1px solid ${confidenceColour}40`,
              }}>
                {resultLabels.confidence}: {confidenceLabel}
              </span>
            </div>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem", color: "#555" }}>
              {result.commodity}
            </p>
          </div>

          <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: resultLabels.segment, value: result.segment },
              { label: resultLabels.family, value: result.family },
              { label: resultLabels.classLabel, value: result.class },
              { label: resultLabels.commodity, value: result.commodity },
            ].map(({ label, value }) => (
              value ? (
                <div key={label} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem" }}>
                  <span style={{ color: "#888", minWidth: 80 }}>{label}</span>
                  <span style={{ color: "#1a1a1a" }}>{value}</span>
                </div>
              ) : null
            ))}

            {result.notes && (
              <div style={{ marginTop: "0.5rem", padding: "0.75rem 1rem", background: "#fffbeb", borderRadius: "6px", fontSize: "0.88rem", color: "#92400e" }}>
                {result.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
