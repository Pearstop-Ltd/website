"use client";

import { useEffect, useRef } from "react";

type CalendlyGlobal = {
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

export function CalendlyInlineWidget({
  url,
  height = 700,
  hideEventTypeDetails = true
}: {
  url: string;
  height?: number;
  hideEventTypeDetails?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetUrl = hideEventTypeDetails ? `${url}?hide_event_type_details=1` : url;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getCalendly = () => (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;

    const init = () => {
      const calendly = getCalendly();
      if (!container || !calendly) return;
      container.innerHTML = "";
      calendly.initInlineWidget({ url: widgetUrl, parentElement: container });
    };

    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    if (getCalendly()) {
      init();
      return;
    }

    let script = document.getElementById("calendly-widget-js") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-widget-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [widgetUrl]);

  return (
    <div className="calendly-card">
      <div ref={containerRef} className="calendly-inline-widget" style={{ minWidth: "320px", height }} />
    </div>
  );
}
