"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./case-design.module.css";

/* Small scroll-triggered chart animations for case pages — plain React
   state + IntersectionObserver + CSS transitions (no animation library in
   package.json, so none is added here). Each chart renders its final state
   on the server / with JS disabled, and only animates once, the first time
   it scrolls into view (including if it's already in view on landing). */

function useInView<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** 30-tile hero grid where a handful of tiles are highlighted (the ones
 * "worth keeping"). On scroll into view, the highlight briefly cycles
 * through a couple of unrelated tile sets before settling on `finalIndices`
 * — a quick "searching, then found" flourish. Renders `finalIndices`
 * statically until then, so there's no flash of an empty/wrong grid. */
export function CaseTileGrid({ total, finalIndices, gap = 8 }: { total: number; finalIndices: number[]; gap?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndices, setActiveIndices] = useState<number[]>(finalIndices);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const count = finalIndices.length;
    const randomSet = () => {
      const result: number[] = [];
      while (result.length < count) {
        const n = Math.floor(Math.random() * total);
        if (!result.includes(n) && !finalIndices.includes(n)) result.push(n);
      }
      return result;
    };
    const sequence = [randomSet(), randomSet(), finalIndices];

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    sequence.forEach((set, i) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setActiveIndices(set);
        }, i * 260)
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // finalIndices is a fresh array literal from the caller each render, but
    // this page never re-renders after mount, so re-running on identity
    // change here is a non-issue in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, total]);

  return (
    <div ref={ref} className={styles.grid6} style={{ gap }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            height: 52,
            borderRadius: 8,
            background: activeIndices.includes(i) ? "var(--success)" : "var(--border)",
            transition: "background 180ms ease",
          }}
        />
      ))}
    </div>
  );
}

export interface CasePriceBar {
  label: string;
  price: string;
  w: string;
  color: string;
}

/** Horizontal bars that fill from 0 to their target width on scroll into
 * view, staggered per bar for a cascading fill. */
export function CasePriceBars({ bars }: { bars: CasePriceBar[] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setFilled(true);
      return;
    }
    // Next tick, so the 0-width state has actually painted before the
    // transition to the target width starts.
    const t = setTimeout(() => setFilled(true), 30);
    return () => clearTimeout(t);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {bars.map((b, i) => (
        <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "var(--muted)", width: 76, flexShrink: 0 }}>{b.label}</span>
          <div
            style={{
              height: 18,
              borderRadius: 4,
              background: b.color,
              width: filled ? b.w : 0,
              transition: `width 500ms ease ${i * 70}ms`,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{b.price}</span>
        </div>
      ))}
    </div>
  );
}

/** Donut ring where the "uncategorised" arc draws in from 0 to its target
 * length on scroll into view. `filledLength`/`totalLength` are the same
 * stroke-dasharray numbers the static version used (dash length / path
 * circumference for r=38), so the final state is pixel-identical. */
export function CaseSpendDonut({ filledLength, totalLength, size = 120 }: { filledLength: number; totalLength: number; size?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setFilled(true);
      return;
    }
    const t = setTimeout(() => setFilled(true), 30);
    return () => clearTimeout(t);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary)" strokeWidth="16" />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#C9CDD8"
          strokeWidth="16"
          transform="rotate(-90 50 50)"
          style={{
            strokeDasharray: `${filled ? filledLength : 0} ${totalLength}`,
            transition: "stroke-dasharray 700ms ease",
          }}
        />
      </svg>
    </div>
  );
}
