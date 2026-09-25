"use client";

import { useEffect, useRef, useState } from "react";
import { dsRoot } from "./tokens";
import styles from "./TaxonomyTree.module.css";

export interface TaxonomyNode {
  id: string;
  /** 0-indexed column (Segment, Family, Class, Commodity, ...). */
  col: number;
  row: number;
  name: string;
  sub: string;
  /** "selected" = the highlighted path. "sibling" = same-branch context,
   * shown grey at 50% opacity. "other" = everything else in the column,
   * faded by `opacity` (caller supplies distance-based fade, e.g. 0.5,
   * 0.28, 0.14, 0.07). */
  variant: "selected" | "sibling" | "other";
  opacity?: number;
}

export interface TaxonomyEdge {
  from: string;
  to: string;
  /** true = purple connector on the selected path, false = light grey. */
  active?: boolean;
}

export interface TaxonomyTreeProps {
  columns: string[];
  nodes: TaxonomyNode[];
  edges: TaxonomyEdge[];
  className?: string;
}

const COL_X = [0, 187, 374, 561];
const TOP = 40;
const ROW = 66;
const NODE_W = 159;
const NODE_H = 58;
const WIDTH = COL_X[COL_X.length - 1] + NODE_W;
const HEIGHT = 500;

function opacityFor(node: TaxonomyNode): number {
  if (node.variant === "selected") return 1;
  if (node.variant === "sibling") return 0.5;
  return node.opacity ?? 0.07;
}

/** Four-column UNSPSC-style taxonomy fold-out: a selected path highlighted
 * with curved connectors, siblings shown grey, everything else faded by
 * distance. Driven entirely by props so any solution page can reuse it with
 * its own taxonomy data. Scrolls horizontally in its own container below
 * 1024px so the page itself never scrolls sideways. */
export function TaxonomyTree({ columns, nodes, edges, className }: TaxonomyTreeProps) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Animate the selected (highlighted purple) path in once the tree
  // scrolls into view, instead of it just being there on load.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let selectedIndex = 0;

  return (
    <div ref={rootRef} className={dsRoot(styles.root, className)}>
      <div className={styles.canvas} style={{ width: WIDTH, height: HEIGHT }}>
        {columns.map((label, i) => (
          <span key={label} className={styles.colLabel} style={{ left: COL_X[i] }}>
            {label}
          </span>
        ))}
        <div className={styles.headerRule} />
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" aria-hidden="true" className={styles.edges}>
          {edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const x1 = COL_X[a.col] + NODE_W;
            const y1 = TOP + a.row * ROW + NODE_H / 2;
            const x2 = COL_X[b.col];
            const y2 = TOP + b.row * ROW + NODE_H / 2;
            const mx = (x1 + x2) / 2;
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
                stroke={edge.active ? "var(--purple)" : "var(--border)"}
                strokeWidth={edge.active ? 2 : 1.5}
              />
            );
          })}
        </svg>
        {nodes.map((node) => {
          const isSelected = node.variant === "selected";
          const delay = isSelected ? selectedIndex++ * 90 : 0;
          return (
            <div
              key={node.id}
              className={dsRoot(styles.node, isSelected ? styles.selected : undefined)}
              style={{
                left: COL_X[node.col],
                top: TOP + node.row * ROW,
                width: NODE_W,
                height: NODE_H,
                opacity: isSelected ? (inView ? 1 : 0) : opacityFor(node),
                transform: isSelected && !inView ? "translateY(10px) scale(0.97)" : undefined,
                transitionDelay: isSelected ? `${delay}ms` : undefined,
              }}
            >
              <span className={styles.bar} aria-hidden="true" />
              <div className={styles.text}>
                <span className={styles.name}>{node.name}</span>
                <span className={styles.sub}>{node.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
