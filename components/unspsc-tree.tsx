"use client";

import { useState, useEffect, useMemo, useRef, useDeferredValue } from "react";
import { treeShell, type ShellClass } from "@/lib/unspsc-tree-shell";

/* ── Node shape shared by the shell tree and by lazily-fetched commodities/search results ── */
interface TreeNode {
  id: string;
  level: 0 | 1 | 2 | 3 | 4; // group, segment, family, class, commodity
  code: string;
  title: string;
  color: string;
  path: string[];
  childCount: number;
  description?: string;
  exampleItems?: string[];
}

interface FetchedCommodity {
  code: string;
  title: string;
  description?: string;
  exampleItems?: string[];
}

/* ── shell node lookup (groups/segments/families/classes only - no commodities) ── */
const SHELL_BY_ID = new Map<string, TreeNode>();
for (const group of treeShell) {
  const groupPath: string[] = [];
  SHELL_BY_ID.set(group.code, {
    id: group.code, level: 0, code: group.code, title: group.title, color: group.color,
    path: groupPath, childCount: group.segments.length,
  });
  for (const segment of group.segments) {
    const segId = `${group.code}|${segment.code}`;
    const segPath = [group.title];
    SHELL_BY_ID.set(segId, {
      id: segId, level: 1, code: segment.code, title: segment.title, color: group.color,
      path: segPath, childCount: segment.families.length,
    });
    for (const family of segment.families) {
      const famId = `${segId}|${family.code}`;
      const famPath = [...segPath, segment.title];
      SHELL_BY_ID.set(famId, {
        id: famId, level: 2, code: family.code, title: family.title, color: group.color,
        path: famPath, childCount: family.classes.length,
      });
      for (const cls of family.classes) {
        const clsId = `${famId}|${cls.code}`;
        const clsPath = [...famPath, family.title];
        SHELL_BY_ID.set(clsId, {
          id: clsId, level: 3, code: cls.code, title: cls.title, color: group.color,
          path: clsPath, childCount: cls.commodityCount,
        });
      }
    }
  }
}

function ancestorIds(id: string): string[] {
  const parts = id.split("|");
  const ids: string[] = [];
  for (let i = 1; i <= parts.length; i++) ids.push(parts.slice(0, i).join("|"));
  return ids;
}

/** classId ("group|segment|family|class") -> the six-digit class code at the end. */
function classCodeFromId(classId: string): string {
  const parts = classId.split("|");
  return parts[parts.length - 1];
}

interface SearchMatch extends TreeNode {
  rank: number;
}

/* ── styles ── */
const CSS = `
  .ut-root * { box-sizing: border-box; }

  .ut-row {
    all: unset;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    text-align: left;
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 150ms;
  }
  .ut-row:hover { background: #f6f8fb; }
  .ut-row:active { background: #eef1f6; }

  .ut-chevron-btn {
    display: flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; flex-shrink: 0;
    transition: transform 200ms cubic-bezier(0.4,0,0.2,1);
  }
  .ut-chevron-btn.open { transform: rotate(90deg); }

  .ut-code {
    font-family: monospace;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    padding: 2px 7px;
    border-radius: 5px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ut-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .ut-count {
    margin-left: auto;
    flex-shrink: 0;
    font-size: 0.68rem;
    color: #b0b8c4;
    font-weight: 600;
    padding-left: 8px;
  }

  .ut-children-enter {
    animation: ut-children-in 200ms cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes ut-children-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ut-detail {
    animation: ut-children-in 200ms cubic-bezier(0.22,1,0.36,1) both;
  }

  .ut-search-input {
    width: 100%;
    padding: 11px 38px 11px 40px;
    border-radius: 10px;
    border: 1.5px solid #e5e9f0;
    font-size: 0.88rem;
    outline: none;
    transition: border-color 150ms;
    background: #fff;
  }
  .ut-search-input:focus { border-color: #94a3b8; }

  .ut-search-clear {
    all: unset;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    color: #94a3b8;
    cursor: pointer;
  }
  .ut-search-clear:hover { background: #f1f4f8; color: #64748b; }

  @media (max-width: 480px) {
    .ut-title { white-space: normal; }
  }
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

/* ── one row, any level ── */
function Row({
  node, depth, expanded, onToggle, rowRef, boxed, matched, loading,
}: {
  node: TreeNode; depth: number; expanded: boolean; onToggle: () => void;
  rowRef?: (el: HTMLDivElement | null) => void; boxed?: boolean; matched?: boolean; loading?: boolean;
}) {
  const canExpand = node.level === 4 ? !!(node.description || (node.exampleItems && node.exampleItems.length > 0)) : node.childCount > 0;
  return (
    <div
      ref={rowRef}
      style={{
        paddingLeft: 8 + depth * 20,
        borderRadius: 8,
        boxShadow: boxed ? `0 0 0 2px ${node.color}` : "0 0 0 0 transparent",
        background: boxed ? `${node.color}0d` : matched ? `${node.color}10` : "transparent",
        transition: "box-shadow 200ms ease, background 200ms ease",
      }}
    >
      <button type="button" className="ut-row" onClick={onToggle} disabled={!canExpand && !loading} style={{ cursor: canExpand || loading ? "pointer" : "default" }}>
        <span className={`ut-chevron-btn${expanded ? " open" : ""}`}>
          {loading ? (
            <span style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid #cbd5e1", borderTopColor: "#64748b", display: "inline-block", animation: "ut-spin 600ms linear infinite" }} />
          ) : canExpand ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 1.5l4.5 3.5L3 8.5" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#dde3ec", display: "inline-block" }} />
          )}
        </span>
        <span className="ut-code" style={{ background: `${node.color}18`, color: node.color }}>
          {node.code}
        </span>
        <span className="ut-title">{node.title}</span>
        {node.childCount > 0 && <span className="ut-count">{node.childCount}</span>}
      </button>
    </div>
  );
}

/* ── inline commodity detail ── */
function CommodityDetail({ node, depth }: { node: TreeNode; depth: number }) {
  return (
    <div className="ut-detail" style={{ paddingLeft: 8 + depth * 20 + 20, paddingRight: 12, paddingBottom: 10 }}>
      <div style={{
        borderRadius: 10, border: `1px solid ${node.color}22`, background: `${node.color}08`,
        padding: "10px 14px",
      }}>
        {node.description ? (
          <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.6, margin: node.exampleItems?.length ? "0 0 10px" : 0 }}>
            {node.description}
          </p>
        ) : (
          <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            Official UNSPSC commodity code — no editorial description added yet.
          </p>
        )}
        {node.exampleItems && node.exampleItems.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {node.exampleItems.map((item) => (
              <span key={item} style={{
                fontSize: "0.75rem", color: "#334155", fontWeight: 500,
                padding: "4px 10px", borderRadius: 20, background: "#fff",
                border: "1px solid #eef1f6",
              }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── recursive branch: renders a node's children (if expanded) ── */
function Children({
  parentId, level, items, expandedIds, onToggle, rowRefs, pickedId, matchIds, loadedCommodities, loadingClassIds,
}: {
  parentId: string; level: 0 | 1 | 2 | 3 | 4; items: { code: string; title: string }[];
  expandedIds: Set<string>; onToggle: (id: string, node: TreeNode) => void;
  rowRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  pickedId: string | null; matchIds: Set<string>;
  loadedCommodities: Map<string, FetchedCommodity[]>;
  loadingClassIds: Set<string>;
}) {
  return (
    <div className="ut-children-enter">
      {items.map((item) => {
        const id = parentId ? `${parentId}|${item.code}` : item.code;
        const node = nodeFor(id, level, item);
        if (!node) return null;
        const isOpen = expandedIds.has(id);
        const isLoading = level === 3 && isOpen && loadingClassIds.has(id);
        return (
          <div key={id}>
            <Row
              node={node}
              depth={level}
              expanded={isOpen}
              onToggle={() => onToggle(id, node)}
              rowRef={(el) => rowRefs.current.set(id, el)}
              boxed={pickedId === id}
              matched={pickedId !== id && matchIds.has(id)}
              loading={isLoading}
            />
            {isOpen && node.level !== 4 && (
              <Branch
                id={id} level={node.level} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs}
                pickedId={pickedId} matchIds={matchIds} loadedCommodities={loadedCommodities} loadingClassIds={loadingClassIds}
              />
            )}
            {isOpen && node.level === 4 && <CommodityDetail node={node} depth={level} />}
          </div>
        );
      })}
    </div>
  );
}

function nodeFor(
  id: string,
  level: 0 | 1 | 2 | 3 | 4,
  item: { code: string; title: string }
): TreeNode | null {
  if (level < 4) return SHELL_BY_ID.get(id) ?? null;
  // Level 4: item is a fetched commodity, not in the shell. Reconstruct its
  // node shape (path/color) from its parent class, which is in the shell.
  const parts = id.split("|");
  const classId = parts.slice(0, 4).join("|");
  const classNode = SHELL_BY_ID.get(classId);
  if (!classNode) return null;
  const commodity = item as FetchedCommodity;
  return {
    id, level: 4, code: commodity.code, title: commodity.title, color: classNode.color,
    path: [...classNode.path, classNode.title], childCount: 0,
    description: commodity.description, exampleItems: commodity.exampleItems,
  };
}

function Branch({
  id, level, expandedIds, onToggle, rowRefs, pickedId, matchIds, loadedCommodities, loadingClassIds,
}: {
  id: string; level: 0 | 1 | 2 | 3;
  expandedIds: Set<string>; onToggle: (id: string, node: TreeNode) => void;
  rowRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  pickedId: string | null; matchIds: Set<string>;
  loadedCommodities: Map<string, FetchedCommodity[]>;
  loadingClassIds: Set<string>;
}) {
  const parts = id.split("|");
  const group = treeShell.find((g) => g.code === parts[0]);
  if (level === 0) {
    const segments = group?.segments ?? [];
    return <Children parentId={id} level={1} items={segments} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} loadedCommodities={loadedCommodities} loadingClassIds={loadingClassIds} />;
  }
  const segment = group?.segments.find((s) => s.code === parts[1]);
  if (level === 1) {
    const families = segment?.families ?? [];
    return <Children parentId={id} level={2} items={families} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} loadedCommodities={loadedCommodities} loadingClassIds={loadingClassIds} />;
  }
  const family = segment?.families.find((f) => f.code === parts[2]);
  if (level === 2) {
    const classes = family?.classes ?? [];
    return <Children parentId={id} level={3} items={classes} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} loadedCommodities={loadedCommodities} loadingClassIds={loadingClassIds} />;
  }
  const cls: ShellClass | undefined = family?.classes.find((c) => c.code === parts[3]);
  const commodities: FetchedCommodity[] = loadedCommodities.get(id) ?? [];
  if (!cls) return null;
  return <Children parentId={id} level={4} items={commodities} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} loadedCommodities={loadedCommodities} loadingClassIds={loadingClassIds} />;
}

/* ── search results list ── */
function SearchResults({
  matches, onPick, isSearching,
}: {
  matches: SearchMatch[]; onPick: (node: TreeNode) => void; isSearching: boolean;
}) {
  if (matches.length === 0) {
    return (
      <div style={{ padding: "20px 12px", textAlign: "center", color: "#c0c8d8", fontSize: "0.85rem" }}>
        {isSearching ? "Searching…" : "No matches. Try a different word or code."}
      </div>
    );
  }
  return (
    <div style={{ opacity: isSearching ? 0.6 : 1, transition: "opacity 150ms" }}>
      {matches.map((m) => (
        <button
          key={m.id}
          type="button"
          className="ut-row"
          onClick={() => onPick(m)}
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 3, padding: "10px 12px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            <span className="ut-code" style={{ background: `${m.color}18`, color: m.color }}>{m.code}</span>
            <span className="ut-title" style={{ whiteSpace: "normal" }}>{m.title}</span>
          </div>
          {m.path.length > 0 && (
            <div style={{ fontSize: "0.72rem", color: "#aab2c0", paddingLeft: 2 }}>
              in {m.path.join(" › ")}
            </div>
          )}
        </button>
      ))}
      {matches.length === 60 && (
        <div style={{ padding: "10px 12px", fontSize: "0.75rem", color: "#c0c8d8", textAlign: "center" }}>
          Showing the top 60 matches — refine your search for more precise results.
        </div>
      )}
    </div>
  );
}

async function fetchClassCommodities(classCode: string): Promise<FetchedCommodity[]> {
  const res = await fetch(`/api/unspsc-tree/commodities?class=${encodeURIComponent(classCode)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.commodities) ? data.commodities : [];
}

async function fetchSearchMatches(query: string): Promise<SearchMatch[]> {
  const res = await fetch(`/api/unspsc-tree/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.matches) ? data.matches : [];
}

/* ── Root ── */
export function UnspscTree() {
  useCSS();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [scrollToId, setScrollToId] = useState<string | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const rowRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const [loadedCommodities, setLoadedCommodities] = useState<Map<string, FetchedCommodity[]>>(new Map());
  const [loadingClassIds, setLoadingClassIds] = useState<Set<string>>(new Set());

  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchSeq = useRef(0);

  const matchIds = useMemo(() => new Set(matches.map((m) => m.id)), [matches]);

  // Debounced server search - the full ~150k-commodity search runs server-side
  // (see app/api/unspsc-tree/search), never shipped to the browser.
  useEffect(() => {
    const q = deferredQuery.trim();
    if (q.length === 0) {
      setMatches([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const seq = ++searchSeq.current;
    const timer = setTimeout(() => {
      fetchSearchMatches(q).then((results) => {
        if (searchSeq.current === seq) {
          setMatches(results);
          setIsSearching(false);
        }
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [deferredQuery]);

  useEffect(() => {
    if (!scrollToId) return;
    const el = rowRefs.current.get(scrollToId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setScrollToId(null);
  }, [scrollToId, expandedIds, loadedCommodities]);

  const loadClass = async (classId: string) => {
    if (loadedCommodities.has(classId) || loadingClassIds.has(classId)) return;
    setLoadingClassIds((prev) => new Set(prev).add(classId));
    const commodities = await fetchClassCommodities(classCodeFromId(classId));
    setLoadedCommodities((prev) => new Map(prev).set(classId, commodities));
    setLoadingClassIds((prev) => {
      const next = new Set(prev);
      next.delete(classId);
      return next;
    });
  };

  const toggle = (id: string, node: TreeNode) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (node.level === 3 && !loadedCommodities.has(id)) void loadClass(id);
  };

  const clearSearch = () => {
    setQuery("");
    setPickedId(null);
  };

  const pickResult = async (node: TreeNode) => {
    setPickedId(node.id);

    // Every commodity-level match's parent class is about to be marked
    // expanded below, which only shows something once that class's
    // commodities are fetched (they aren't in the shell). The picked node's
    // own class is awaited so the scroll-to below has something to scroll
    // to; the others just get a background prefetch.
    const pickedClassId = node.level === 4 ? node.id.split("|").slice(0, 4).join("|") : null;
    if (pickedClassId) await loadClass(pickedClassId);
    for (const m of matches) {
      if (m.level !== 4) continue;
      const classId = m.id.split("|").slice(0, 4).join("|");
      if (classId !== pickedClassId) void loadClass(classId);
    }

    setExpandedIds((prev) => {
      const next = new Set(prev);
      for (const m of matches) {
        const chain = ancestorIds(m.id);
        const ids = m.id === node.id && m.level < 4 ? chain : chain.slice(0, -1);
        for (const id of ids) next.add(id);
      }
      return next;
    });
    setScrollToId(node.id);
  };

  const showResultsList = query.trim().length > 0 && !pickedId;

  return (
    <div className="ut-root">
      <style>{"@keyframes ut-spin { to { transform: rotate(360deg); } }"}</style>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <circle cx="6.5" cy="6.5" r="5" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="10.2" y1="10.2" x2="14" y2="14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="ut-search-input"
          placeholder="Search all segments, families, classes and commodities…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPickedId(null);
          }}
        />
        {query.length > 0 && (
          <button type="button" className="ut-search-clear" aria-label="Clear search" onClick={clearSearch}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {showResultsList ? (
        <SearchResults matches={matches} onPick={pickResult} isSearching={isSearching} />
      ) : (
        <Children
          parentId=""
          level={0}
          items={treeShell}
          expandedIds={expandedIds}
          onToggle={toggle}
          rowRefs={rowRefs}
          pickedId={pickedId}
          matchIds={matchIds}
          loadedCommodities={loadedCommodities}
          loadingClassIds={loadingClassIds}
        />
      )}
    </div>
  );
}
