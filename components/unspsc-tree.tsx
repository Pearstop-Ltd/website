"use client";

import { useState, useEffect, useRef } from "react";
import { demoData, type UNSPSCSegment, type UNSPSCFamily, type UNSPSCClass, type UNSPSCCommodity } from "@/lib/unspsc-demo-data";

interface Selection {
  segment: UNSPSCSegment | null;
  family: UNSPSCFamily | null;
  cls: UNSPSCClass | null;
  commodity: UNSPSCCommodity | null;
}

const LABELS = ["Segment", "Family", "Class", "Commodity"];

const CSS = `
  .ut-root * { box-sizing: border-box; }

  .ut-item {
    all: unset;
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    text-align: left;
    padding: 9px 10px;
    border-radius: 9px;
    border: 1.5px solid #eef1f5;
    background: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition:
      border-color 220ms cubic-bezier(0.4,0,0.2,1),
      background   220ms cubic-bezier(0.4,0,0.2,1),
      box-shadow   220ms cubic-bezier(0.4,0,0.2,1),
      transform    150ms cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .ut-item::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 200ms;
    pointer-events: none;
    border-radius: inherit;
  }
  .ut-item:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.09); border-color: #dde3ec; }
  .ut-item:hover::before { opacity: 1; }
  .ut-item:active { transform: translateY(0) scale(0.98); transition-duration: 80ms; }
  .ut-item--sel {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  }

  .ut-code {
    font-family: monospace;
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    padding: 2px 6px;
    border-radius: 4px;
    width: fit-content;
    transition: background 220ms, color 220ms;
  }

  .ut-label {
    font-size: 0.78rem;
    font-weight: 600;
    line-height: 1.35;
    transition: color 220ms;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ut-chevron {
    margin-left: auto;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 180ms, transform 180ms;
    flex-shrink: 0;
    align-self: center;
  }
  .ut-item:hover .ut-chevron,
  .ut-item--sel .ut-chevron {
    opacity: 1;
    transform: translateX(0);
  }

  /* staggered item entry */
  .ut-items-enter .ut-item {
    animation: ut-item-in 260ms cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes ut-item-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* panel slide-up */
  .ut-panel {
    animation: ut-panel-in 300ms cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes ut-panel-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* breadcrumb fade */
  .ut-crumb { animation: ut-fade 220ms ease both; }
  @keyframes ut-fade { from { opacity:0; transform:translateX(-4px); } to { opacity:1; transform:none; } }

  /* connector pulse */
  .ut-conn-active { animation: none; }
  .ut-conn-line {
    transition: stroke 350ms cubic-bezier(0.4,0,0.2,1), stroke-dasharray 350ms;
  }
  .ut-conn-arrow {
    transition: stroke 350ms cubic-bezier(0.4,0,0.2,1), opacity 350ms;
  }

  /* column dim fade */
  .ut-col { transition: opacity 280ms cubic-bezier(0.4,0,0.2,1); }

  /* empty placeholder */
  .ut-empty {
    padding: 14px;
    border-radius: 10px;
    border: 1.5px dashed #eef1f5;
    background: #fafbfc;
    color: #c8d0dc;
    font-size: 0.78rem;
    font-style: italic;
    transition: border-color 300ms, color 300ms;
  }

  .ut-tag {
    display: inline-block;
    font-size: 0.77rem;
    padding: 4px 11px;
    border-radius: 20px;
    background: #f3f5f8;
    color: #475569;
    font-weight: 500;
    transition: background 150ms;
    cursor: default;
  }
  .ut-tag:hover { background: #e8ecf2; }
`;

function useCSS() {
  useEffect(() => {
    if (document.getElementById("ut-css")) return;
    const s = document.createElement("style");
    s.id = "ut-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}

/* ── TreeItem ── */
function TreeItem({
  code, title, color, selected, delay, onClick,
}: {
  code: string; title: string; color: string; selected: boolean; delay?: number; onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`ut-item${selected ? " ut-item--sel" : ""}`}
      onClick={onClick}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
        borderColor: selected ? `${color}50` : undefined,
        background: selected ? `${color}0d` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          className="ut-code"
          style={selected
            ? { background: `${color}20`, color }
            : { background: "#f3f5f8", color: "#aab0bc" }}
        >
          {code}
        </span>
        <svg className="ut-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2.5l4 3.5-4 3.5" stroke={selected ? color : "#94a3b8"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="ut-label" style={{ color: selected ? color : "#1e293b" }}>
        {title}
      </span>
    </button>
  );
}

/* ── Column ── */
function Column({
  label, items, selectedCode, onSelect, color, dimmed,
}: {
  label: string; items: { code: string; title: string }[]; selectedCode: string | null;
  onSelect: (code: string) => void; color: string; dimmed?: boolean;
}) {
  const [enterKey, setEnterKey] = useState(0);
  const prevLen = useRef(items.length);

  useEffect(() => {
    if (items.length !== prevLen.current) {
      setEnterKey((k) => k + 1);
      prevLen.current = items.length;
    }
  }, [items]);

  return (
    <div className="ut-col" style={{ flex: 1, minWidth: 0, opacity: dimmed ? 0.28 : 1 }}>
      <div style={{
        fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.1em", color: "#b8c0cc", marginBottom: 7, paddingLeft: 2,
      }}>
        {label}
      </div>
      <div
        key={enterKey}
        className={items.length > 0 ? "ut-items-enter" : ""}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        {items.length === 0 ? (
          <div className="ut-empty">Select {label.toLowerCase()} first</div>
        ) : (
          items.map((item, i) => (
            <TreeItem
              key={item.code}
              code={item.code}
              title={item.title}
              color={color}
              selected={selectedCode === item.code}
              delay={i * 40}
              onClick={() => onSelect(item.code)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ── Connector ── */
function Connector({ active }: { active: boolean }) {
  return (
    <div style={{ width: 20, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 30 }}>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <line
          className="ut-conn-line"
          x1="1" y1="7" x2="16" y2="7"
          stroke={active ? "#94a3b8" : "#e2e8f0"}
          strokeWidth="1.3"
          strokeDasharray={active ? "none" : "3 2"}
        />
        <path
          className="ut-conn-arrow"
          d="M12 3L17 7L12 11"
          stroke={active ? "#94a3b8" : "#e2e8f0"}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: active ? 1 : 0.5 }}
        />
      </svg>
    </div>
  );
}

/* ── Commodity panel ── */
function CommodityPanel({ commodity, color }: { commodity: UNSPSCCommodity; color: string }) {
  return (
    <div className="ut-panel" style={{
      marginTop: 22,
      borderRadius: 14,
      overflow: "hidden",
      border: `1.5px solid ${color}25`,
      background: "#fff",
      boxShadow: `0 8px 40px ${color}14, 0 2px 8px rgba(0,0,0,0.04)`,
    }}>
      <div style={{
        padding: "15px 20px",
        background: `linear-gradient(135deg, ${color}12, ${color}06)`,
        borderBottom: `1px solid ${color}18`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{
          fontFamily: "monospace", fontWeight: 800, fontSize: "0.7rem",
          letterSpacing: "0.05em", padding: "3px 9px", borderRadius: 5,
          background: color, color: "#fff",
        }}>
          {commodity.code}
        </span>
        <span style={{ fontWeight: 700, fontSize: "0.97rem", color: "#0f172a" }}>
          {commodity.title}
        </span>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <p style={{ color: "#475569", fontSize: "0.86rem", lineHeight: 1.7, margin: "0 0 16px" }}>
          {commodity.description}
        </p>

        <div style={{
          fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "#c0c8d8", marginBottom: 10,
        }}>
          Example items
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 6,
          marginBottom: 16,
        }}>
          {commodity.exampleItems.map((item) => (
            <div key={item} style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 11px",
              borderRadius: 8,
              background: "#f8fafc",
              border: "1px solid #eef1f6",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: color, flexShrink: 0, opacity: 0.75,
              }} />
              <span style={{ fontSize: "0.78rem", color: "#334155", fontWeight: 500, lineHeight: 1.3 }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 13px", borderRadius: 8,
          background: `${color}0a`, border: `1px solid ${color}20`,
        }}>
          <span style={{ fontSize: "0.72rem", color: "#64748b" }}>8-digit code</span>
          <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.88rem", color, letterSpacing: "0.05em" }}>
            {commodity.code}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Breadcrumb ── */
function Breadcrumb({ sel }: { sel: Selection }) {
  if (!sel.segment) return null;
  const crumbs = [
    { label: sel.segment.title, color: sel.segment.color },
    sel.family && { label: sel.family.title, color: sel.segment.color },
    sel.cls && { label: sel.cls.title, color: sel.segment.color },
    sel.commodity && { label: sel.commodity.title, color: sel.segment.color },
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap",
      padding: "9px 14px", borderRadius: 9,
      background: "#f8fafc", border: "1px solid #eef1f6",
      marginBottom: 16,
    }}>
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="ut-crumb" style={{
          display: "flex", alignItems: "center", gap: 5,
          animationDelay: `${i * 60}ms`,
        }}>
          {i > 0 && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 2l3.5 3L3 8" stroke="#cbd5e1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span style={{
            fontSize: "0.74rem",
            fontWeight: i === crumbs.length - 1 ? 700 : 500,
            color: i === crumbs.length - 1 ? c.color : "#94a3b8",
          }}>
            {c.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ── Root ── */
export function UnspscTree() {
  useCSS();

  const [sel, setSel] = useState<Selection>({ segment: null, family: null, cls: null, commodity: null });

  const selectSegment = (code: string) => {
    const segment = demoData.find((s) => s.code === code) ?? null;
    setSel({ segment, family: null, cls: null, commodity: null });
  };
  const selectFamily = (code: string) => {
    const family = sel.segment?.families.find((f) => f.code === code) ?? null;
    setSel((p) => ({ ...p, family, cls: null, commodity: null }));
  };
  const selectClass = (code: string) => {
    const cls = sel.family?.classes.find((c) => c.code === code) ?? null;
    setSel((p) => ({ ...p, cls, commodity: null }));
  };
  const selectCommodity = (code: string) => {
    const commodity = sel.cls?.commodities.find((c) => c.code === code) ?? null;
    setSel((p) => ({ ...p, commodity }));
  };

  const color = sel.segment?.color ?? "#2563eb";

  return (
    <div className="ut-root">
      <Breadcrumb sel={sel} />

      <div style={{ display: "flex", gap: 0, alignItems: "flex-start", width: "100%", minWidth: 0 }}>
        <Column label={LABELS[0]} items={demoData} selectedCode={sel.segment?.code ?? null} onSelect={selectSegment} color={color} />
        <Connector active={!!sel.segment} />
        <Column label={LABELS[1]} items={sel.segment?.families ?? []} selectedCode={sel.family?.code ?? null} onSelect={selectFamily} color={color} dimmed={!sel.segment} />
        <Connector active={!!sel.family} />
        <Column label={LABELS[2]} items={sel.family?.classes ?? []} selectedCode={sel.cls?.code ?? null} onSelect={selectClass} color={color} dimmed={!sel.family} />
        <Connector active={!!sel.cls} />
        <Column label={LABELS[3]} items={sel.cls?.commodities ?? []} selectedCode={sel.commodity?.code ?? null} onSelect={selectCommodity} color={color} dimmed={!sel.cls} />
      </div>

      {sel.commodity
        ? <CommodityPanel key={sel.commodity.code} commodity={sel.commodity} color={color} />
        : (
          <div style={{
            marginTop: 10,
            padding: "16px",
            borderRadius: 10,
            border: "1.5px dashed #eef1f6",
            background: "#fafbfc",
            textAlign: "center",
            color: "#c0c8d8",
            fontSize: "0.82rem",
            transition: "opacity 300ms",
          }}>
            {!sel.segment ? "Click a segment on the left to explore ↑" : !sel.family ? "Now select a family →" : !sel.cls ? "Select a class →" : "Select a commodity →"}
          </div>
        )
      }
    </div>
  );
}
