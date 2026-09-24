interface PearstopMarkProps {
  color: string;
  size?: number;
  wordmark?: boolean;
  wordmarkSize?: number;
}

/** Pear icon + "pearstop." wordmark, as used inside SourceDiagram's process
 * box and ClosingCTA's footer line in the refs. Not a standalone DESIGN.md
 * component, kept internal. */
export function PearstopMark({ color, size = 18, wordmark = true, wordmarkSize = 18 }: PearstopMarkProps) {
  const height = size * (24 / 18);
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 3, color, lineHeight: 1 }}>
      <svg width={size} height={height} viewBox="0 0 18 24" fill="none" aria-hidden="true">
        <path
          d="M9 2 C10 1 11.5 0.6 13 1"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 4 C6.5 4 5.8 6.6 5.2 8.4 C4.4 10.6 1.5 11.8 1.5 16 C1.5 20.2 4.8 23 9 23 C13.2 23 16.5 20.2 16.5 16 C16.5 11.8 13.6 10.6 12.8 8.4 C12.2 6.6 11.5 4 9 4 Z"
          fill={color}
        />
      </svg>
      {wordmark ? <span style={{ fontSize: wordmarkSize, fontWeight: 600, lineHeight: 1 }}>pearstop.</span> : null}
    </span>
  );
}
