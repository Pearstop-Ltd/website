"use client";

import { useState, type ReactNode } from "react";

/** Dev-only toggle so /design-test can be checked at a 390px mobile
 * viewport without leaving the page or resizing the browser window. */
export function ViewportPreview({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState(false);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#111827",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          gap: 12,
          alignItems: "center",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        <span>/design-test viewport:</span>
        <button
          type="button"
          onClick={() => setMobile(false)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: 0,
            cursor: "pointer",
            background: mobile ? "#374151" : "#fff",
            color: mobile ? "#fff" : "#111827",
          }}
        >
          Desktop
        </button>
        <button
          type="button"
          onClick={() => setMobile(true)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: 0,
            cursor: "pointer",
            background: mobile ? "#fff" : "#374151",
            color: mobile ? "#111827" : "#fff",
          }}
        >
          Mobile · 390px
        </button>
      </div>
      {mobile ? (
        <div style={{ display: "flex", justifyContent: "center", background: "#e5e7eb", padding: "24px 0" }}>
          <div style={{ width: 390, background: "#fff", boxShadow: "0 0 0 1px #d1d5db" }}>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
