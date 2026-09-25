/** Small set of reusable 1.6px stroke icons, replacing the text-glyph icons
 * (↗ ≡ ⚡ × ✓) previously used on solution pages. Not a DESIGN.md component
 * in its own right — just shared SVGs for the SolutionPage outcome cards
 * and problem bullet markers across pages. */

const commonProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function TrendUpIcon({ color = "var(--blue)" }: { color?: string }) {
  return (
    <svg {...commonProps} stroke={color}>
      <path d="M3 17 L10 10 L14 14 L21 6" />
      <path d="M21 12 V6 H15" />
    </svg>
  );
}

export function LayersIcon({ color = "var(--blue)" }: { color?: string }) {
  return (
    <svg {...commonProps} stroke={color}>
      <path d="M12 3 L21 8 L12 13 L3 8 Z" />
      <path d="M3 14 L12 19 L21 14" />
    </svg>
  );
}

export function ZapIcon({ color = "var(--blue)" }: { color?: string }) {
  return (
    <svg {...commonProps} stroke={color}>
      <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" />
    </svg>
  );
}

/** Small marker replacing the "×" bullet character in problem-list items. */
export function XMarkIcon({ color = "var(--purple)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );
}
