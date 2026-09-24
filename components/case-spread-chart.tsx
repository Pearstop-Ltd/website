type CaseSpreadChartProps = {
  title: string;
  points: number[];
  minLabel: string;
  maxLabel: string;
  percent: string;
  percentLabel: string;
};

export function CaseSpreadChart({ title, points, minLabel, maxLabel, percent, percentLabel }: CaseSpreadChartProps) {
  const lo = Math.min(...points);
  const hi = Math.max(...points);
  const range = hi - lo || 1;

  return (
    <div className="case-stat-card">
      <h4>{title}</h4>
      <svg viewBox="0 0 300 24" width="100%" height="24" style={{ display: "block" }}>
        <line x1="8" y1="12" x2="292" y2="12" stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={8 + ((p - lo) / range) * 284} cy="12" r="6" fill="var(--primary)" />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.4rem" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <div className="case-stat-big" style={{ marginTop: "1rem" }}>{percent}</div>
      <p className="light-copy" style={{ margin: "0.25rem 0 0" }}>{percentLabel}</p>
    </div>
  );
}
