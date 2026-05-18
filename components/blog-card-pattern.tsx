const CATEGORY_CONFIG: Record<string, { gradient: string; pattern: string }> = {
  Procurement: {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.85"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#3b0764"/>
        <circle cx="20" cy="20" r="1.5" fill="rgba(167,139,250,0.5)"/>
        <circle cx="0" cy="0" r="1.5" fill="rgba(167,139,250,0.5)"/>
        <circle cx="40" cy="0" r="1.5" fill="rgba(167,139,250,0.5)"/>
        <circle cx="0" cy="40" r="1.5" fill="rgba(167,139,250,0.5)"/>
        <circle cx="40" cy="40" r="1.5" fill="rgba(167,139,250,0.5)"/>
        <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(167,139,250,0.12)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  "Asset Management": {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0369a1" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse">
        <rect width="32" height="32" fill="#082f49"/>
        <rect x="0" y="0" width="16" height="16" fill="rgba(56,189,248,0.06)"/>
        <rect x="16" y="16" width="16" height="16" fill="rgba(56,189,248,0.06)"/>
        <rect x="6" y="6" width="4" height="4" rx="1" fill="rgba(56,189,248,0.2)"/>
        <rect x="22" y="22" width="4" height="4" rx="1" fill="rgba(56,189,248,0.2)"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  Technology: {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse">
        <rect width="48" height="48" fill="#022c22"/>
        <polyline points="0,24 12,12 24,24 36,12 48,24" fill="none" stroke="rgba(52,211,153,0.25)" stroke-width="1.5"/>
        <polyline points="0,36 12,24 24,36 36,24 48,36" fill="none" stroke="rgba(52,211,153,0.12)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  "Data Quality": {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d97706" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#451a03"/>
        <line x1="0" y1="0" x2="20" y2="20" stroke="rgba(251,191,36,0.15)" stroke-width="1"/>
        <line x1="20" y1="0" x2="0" y2="20" stroke="rgba(251,191,36,0.08)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  "AI & Digital": {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d9488" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="#042f2e"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="rgba(94,234,212,0.2)" stroke-width="1"/>
        <circle cx="12" cy="12" r="3" fill="none" stroke="rgba(94,234,212,0.15)" stroke-width="1"/>
        <line x1="0" y1="12" x2="24" y2="12" stroke="rgba(94,234,212,0.08)" stroke-width="1"/>
        <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(94,234,212,0.08)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  "Commercial FM": {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c2410c" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="#431407"/>
        <rect x="5" y="5" width="20" height="20" fill="none" stroke="rgba(251,146,60,0.2)" stroke-width="1"/>
        <rect x="10" y="10" width="10" height="10" fill="rgba(251,146,60,0.08)"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
  Construction: {
    gradient: `<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#15803d" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0d1b4b" stop-opacity="0.9"/>
    </linearGradient>`,
    pattern: `
      <pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse">
        <rect width="36" height="36" fill="#052e16"/>
        <line x1="0" y1="0" x2="36" y2="36" stroke="rgba(74,222,128,0.12)" stroke-width="1"/>
        <line x1="18" y1="0" x2="18" y2="36" stroke="rgba(74,222,128,0.08)" stroke-width="1"/>
        <line x1="0" y1="18" x2="36" y2="18" stroke="rgba(74,222,128,0.08)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#p)"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    `,
  },
};

const FALLBACK = CATEGORY_CONFIG["Procurement"];

export function BlogCardPattern({ category, image, height = 160, showLabel = true }: { category: string; image?: string; height?: number; showLabel?: boolean }) {
  const cfg = CATEGORY_CONFIG[category] ?? FALLBACK;
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${cfg.gradient}</defs>${cfg.pattern}</svg>`;
  const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

  if (image) {
    return (
      <div style={{ height, position: "relative", overflow: "hidden" }}>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,27,75,0.65) 0%, transparent 60%)" }} />
        {showLabel && (
          <span style={{ position: "absolute", bottom: "1rem", left: "1.25rem", background: "rgba(255,255,255,0.15)", color: "#fff", padding: "0.2rem 0.7rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            {category}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        height,
        backgroundImage: `url("${encoded}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "1rem 1.25rem",
      }}
    >
      {showLabel && (
        <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "0.2rem 0.7rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)" }}>
          {category}
        </span>
      )}
    </div>
  );
}
