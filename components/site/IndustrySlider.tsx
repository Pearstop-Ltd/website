"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dsRoot } from "./tokens";
import { IndustrySection, type IndustrySectionCopy } from "./IndustrySection";
import styles from "./IndustrySlider.module.css";

const ALIASES: Record<string, string> = {
  "facilities-management": "integrated-fm",
  cleaning: "soft-services"
};

function resolveHashId(hash: string, ids: string[]): string | null {
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;
  const id = ALIASES[raw] ?? raw;
  return ids.includes(id) ? id : null;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="M15 6 L9 12 L15 18" /> : <path d="M9 6 L15 12 L9 18" />}
    </svg>
  );
}

export function IndustrySlider({ sections }: { sections: IndustrySectionCopy[] }) {
  const ids = sections.map((s) => s.id);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const suppressScrollSync = useRef(false);

  const prefersReducedMotion = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const goTo = useCallback(
    (index: number, options?: { smooth?: boolean; scrollPage?: boolean }) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, index));
      const track = trackRef.current;
      const slide = slideRefs.current[clamped];
      if (track && slide) {
        suppressScrollSync.current = true;
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: prefersReducedMotion() || options?.smooth === false ? "auto" : "smooth"
        });
        window.setTimeout(() => {
          suppressScrollSync.current = false;
        }, 500);
      }
      setActiveIndex(clamped);
      const id = ids[clamped];
      if (typeof window !== "undefined" && window.location.hash.replace("#", "") !== id) {
        window.history.replaceState(null, "", `#${id}`);
      }
      if (options?.scrollPage !== false) {
        rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      }
    },
    [ids, sections.length, prefersReducedMotion]
  );

  // Deep-link on load + respond to hash changes (tab/arrow/"Next industry"
  // clicks all just set location.hash; a real hash navigation always fires
  // 'hashchange', while our own history.replaceState calls in goTo() never
  // do, so this can't loop against itself).
  useEffect(() => {
    const applyHash = (opts: { smooth?: boolean; scrollPage?: boolean }) => {
      const id = resolveHashId(window.location.hash, ids);
      if (id) goTo(ids.indexOf(id), opts);
    };
    applyHash({ smooth: false, scrollPage: false });
    const onHashChange = () => applyHash({ smooth: true, scrollPage: true });
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Free horizontal scroll (trackpad / touch swipe with native scroll-snap)
  // keeps the active tab/counter in sync without hijacking vertical scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (suppressScrollSync.current) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        let nearest = 0;
        let nearestDistance = Infinity;
        slideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = i;
          }
        });
        setActiveIndex((current) => {
          if (current === nearest) return current;
          window.history.replaceState(null, "", `#${ids[nearest]}`);
          return nearest;
        });
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className={dsRoot(styles.root)} ref={rootRef}>
      <nav aria-label="Industries on this page" className={styles.tabBar}>
        <div role="tablist" aria-label="Industries on this page" className={styles.tabs}>
          {sections.map((section, i) => (
            <a
              key={section.id}
              id={`industry-tab-${section.id}`}
              href={`#${section.id}`}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={section.id}
              tabIndex={i === activeIndex ? 0 : -1}
              className={dsRoot(styles.tab, i === activeIndex ? styles.tabActive : undefined)}
              onKeyDown={(event) => onTabKeyDown(event, i)}
            >
              {section.tabLabel}
            </a>
          ))}
        </div>
        <div className={styles.controls}>
          <span className={styles.counter}>
            {activeIndex + 1} of {sections.length}
          </span>
          <button
            type="button"
            aria-label="Previous industry"
            className={styles.arrowButton}
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next industry"
            className={styles.arrowButton}
            disabled={activeIndex === sections.length - 1}
            onClick={() => goTo(activeIndex + 1)}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </nav>

      <div className={styles.track} ref={trackRef}>
        {sections.map((section, i) => (
          <div
            key={section.id}
            className={styles.slide}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
          >
            <IndustrySection
              copy={section}
              isActive={i === activeIndex}
              isLast={i === sections.length - 1}
              nextIndustry={i < sections.length - 1 ? { id: sections[i + 1].id, label: sections[i + 1].tabLabel } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
