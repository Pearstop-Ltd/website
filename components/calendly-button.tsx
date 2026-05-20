"use client";
import type React from "react";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/stephanie-pearstop/7-min-discovery";

export function CalendlyButton({ label, className, style }: { label: string; className?: string; style?: React.CSSProperties }) {
  useEffect(() => {
    if (document.getElementById("calendly-widget-css")) return;
    const link = document.createElement("link");
    link.id = "calendly-widget-css";
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    if (document.getElementById("calendly-widget-js")) return;
    const script = document.createElement("script");
    script.id = "calendly-widget-js";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
    >
      {label}
    </button>
  );
}
