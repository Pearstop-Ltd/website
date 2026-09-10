"use client";

import { useState, useEffect, useMemo, useRef, useDeferredValue } from "react";
import { demoData, type UNSPSCCommodity } from "@/lib/unspsc-demo-data";

/* ── Flat search index, built once from the static dataset ── */
interface IndexNode {
  id: string;
  level: 0 | 1 | 2 | 3 | 4; // group, segment, family, class, commodity
  code: string;
  title: string;
  color: string;
  path: string[];
  childCount: number;
  description?: string;
  exampleItems?: string[];
  searchText: string;
  words: string[];
}

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

function buildIndex(): IndexNode[] {
  const nodes: Array<Omit<IndexNode, "words">> = [];
  for (const group of demoData) {
    const groupPath = [group.title];
    nodes.push({
      id: group.code,
      level: 0,
      code: group.code,
      title: group.title,
      color: group.color,
      path: [],
      childCount: group.segments.length,
      searchText: `${group.code} ${group.title}`.toLowerCase(),
    });
    for (const segment of group.segments) {
      const segId = `${group.code}|${segment.code}`;
      const segPath = [...groupPath, segment.title];
      nodes.push({
        id: segId,
        level: 1,
        code: segment.code,
        title: segment.title,
        color: group.color,
        path: groupPath,
        childCount: segment.families.length,
        searchText: `${segment.code} ${segment.title}`.toLowerCase(),
      });
      for (const family of segment.families) {
        const famId = `${segId}|${family.code}`;
        const famPath = [...segPath, family.title];
        nodes.push({
          id: famId,
          level: 2,
          code: family.code,
          title: family.title,
          color: group.color,
          path: segPath,
          childCount: family.classes.length,
          searchText: `${family.code} ${family.title}`.toLowerCase(),
        });
        for (const cls of family.classes) {
          const clsId = `${famId}|${cls.code}`;
          const clsPath = [...famPath, cls.title];
          nodes.push({
            id: clsId,
            level: 3,
            code: cls.code,
            title: cls.title,
            color: group.color,
            path: famPath,
            childCount: cls.commodities.length,
            searchText: `${cls.code} ${cls.title}`.toLowerCase(),
          });
          for (const commodity of cls.commodities) {
            const comId = `${clsId}|${commodity.code}`;
            const extra = [commodity.description ?? "", ...(commodity.exampleItems ?? [])].join(" ");
            nodes.push({
              id: comId,
              level: 4,
              code: commodity.code,
              title: commodity.title,
              color: group.color,
              path: clsPath,
              childCount: 0,
              description: commodity.description,
              exampleItems: commodity.exampleItems,
              searchText: `${commodity.code} ${commodity.title} ${extra}`.toLowerCase(),
            });
          }
        }
      }
    }
  }
  return nodes.map((n) => ({ ...n, words: tokenize(n.searchText) }));
}

const SEARCH_INDEX = buildIndex();
const NODE_BY_ID = new Map(SEARCH_INDEX.map((n) => [n.id, n]));

function ancestorIds(id: string): string[] {
  const parts = id.split("|");
  const ids: string[] = [];
  for (let i = 1; i <= parts.length; i++) ids.push(parts.slice(0, i).join("|"));
  return ids;
}

interface SearchMatch extends IndexNode {
  rank: number;
}

// Iterative Levenshtein edit distance — used only as a fallback for short word
// lists, so a one- or two-letter typo still finds the right commodity.
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) prev[j] = j;
  for (let i = 1; i <= al; i++) {
    const curr = new Array(bl + 1);
    curr[0] = i;
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[bl];
}

// Does query token `token` match dataset word `word`? "tight" = exact/prefix/substring
// (no typo involved); a non-tight hit means it only matched via fuzzy distance.
function wordMatches(token: string, word: string): { hit: boolean; tight: boolean } {
  if (word === token || word.startsWith(token) || token.startsWith(word)) return { hit: true, tight: true };
  if (token.length >= 3 && word.includes(token)) return { hit: true, tight: true };
  if (token.length >= 3 && Math.abs(word.length - token.length) <= 2) {
    const maxDist = token.length <= 5 ? 1 : 2;
    if (levenshtein(token, word) <= maxDist) return { hit: true, tight: false };
  }
  return { hit: false, tight: false };
}

function search(query: string): SearchMatch[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const tokens = tokenize(q);
  const results: SearchMatch[] = [];

  for (const node of SEARCH_INDEX) {
    const titleLower = node.title.toLowerCase();
    const codeLower = node.code.toLowerCase();
    let rank: number | null = null;

    // Phrase-level matches first — a query typed as a contiguous phrase that
    // appears in the title/code/description ranks above everything else.
    if (codeLower === q) rank = 0;
    else if (titleLower === q) rank = 1;
    else if (titleLower.startsWith(q)) rank = 2;
    else if (codeLower.startsWith(q)) rank = 3;
    else if (titleLower.includes(q)) rank = 4;
    else if (codeLower.includes(q)) rank = 5;
    else if (node.searchText.includes(q)) rank = 6;

    // Fall back to order-independent, typo-tolerant token matching: every word
    // typed has to show up somewhere on the node (title, code, description or
    // example items), in any order, allowing a small spelling mistake.
    if (rank === null && tokens.length > 0) {
      let allMatched = true;
      let fuzzyCount = 0;
      for (const token of tokens) {
        let tokenHit = false;
        let tokenTight = false;
        for (const word of node.words) {
          const m = wordMatches(token, word);
          if (m.hit) {
            tokenHit = true;
            if (m.tight) { tokenTight = true; break; }
          }
        }
        if (!tokenHit) { allMatched = false; break; }
        if (!tokenTight) fuzzyCount++;
      }
      if (allMatched) rank = 7 + fuzzyCount;
    }

    if (rank !== null) results.push({ ...node, rank });
  }
  results.sort((a, b) => (a.rank - b.rank) || (a.level - b.level) || a.title.localeCompare(b.title));
  return results.slice(0, 60);
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
  node, depth, expanded, onToggle, rowRef, boxed, matched,
}: {
  node: IndexNode; depth: number; expanded: boolean; onToggle: () => void;
  rowRef?: (el: HTMLDivElement | null) => void; boxed?: boolean; matched?: boolean;
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
      <button type="button" className="ut-row" onClick={onToggle} disabled={!canExpand} style={{ cursor: canExpand ? "pointer" : "default" }}>
        <span className={`ut-chevron-btn${expanded ? " open" : ""}`}>
          {canExpand ? (
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
function CommodityDetail({ node, depth }: { node: IndexNode; depth: number }) {
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
  parentId, level, items, expandedIds, onToggle, rowRefs, pickedId, matchIds,
}: {
  parentId: string; level: 0 | 1 | 2 | 3 | 4; items: { code: string; title: string }[];
  expandedIds: Set<string>; onToggle: (id: string) => void;
  rowRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  pickedId: string | null; matchIds: Set<string>;
}) {
  return (
    <div className="ut-children-enter">
      {items.map((item) => {
        const id = parentId ? `${parentId}|${item.code}` : item.code;
        const node = NODE_BY_ID.get(id)!;
        const isOpen = expandedIds.has(id);
        return (
          <div key={id}>
            <Row
              node={node}
              depth={level}
              expanded={isOpen}
              onToggle={() => onToggle(id)}
              rowRef={(el) => rowRefs.current.set(id, el)}
              boxed={pickedId === id}
              matched={pickedId !== id && matchIds.has(id)}
            />
            {isOpen && node.level < 4 && (
              <Branch id={id} level={node.level} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} />
            )}
            {isOpen && node.level === 4 && <CommodityDetail node={node} depth={level} />}
          </div>
        );
      })}
    </div>
  );
}

function Branch({
  id, level, expandedIds, onToggle, rowRefs, pickedId, matchIds,
}: {
  id: string; level: 0 | 1 | 2 | 3;
  expandedIds: Set<string>; onToggle: (id: string) => void;
  rowRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  pickedId: string | null; matchIds: Set<string>;
}) {
  const parts = id.split("|");
  const group = demoData.find((g) => g.code === parts[0]);
  if (level === 0) {
    const segments = group?.segments ?? [];
    return <Children parentId={id} level={1} items={segments} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} />;
  }
  const segment = group?.segments.find((s) => s.code === parts[1]);
  if (level === 1) {
    const families = segment?.families ?? [];
    return <Children parentId={id} level={2} items={families} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} />;
  }
  const family = segment?.families.find((f) => f.code === parts[2]);
  if (level === 2) {
    const classes = family?.classes ?? [];
    return <Children parentId={id} level={3} items={classes} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} />;
  }
  const cls = family?.classes.find((c) => c.code === parts[3]);
  const commodities: UNSPSCCommodity[] = cls?.commodities ?? [];
  return <Children parentId={id} level={4} items={commodities} expandedIds={expandedIds} onToggle={onToggle} rowRefs={rowRefs} pickedId={pickedId} matchIds={matchIds} />;
}

/* ── search results list ── */
function SearchResults({
  matches, onPick,
}: {
  matches: SearchMatch[]; onPick: (node: IndexNode) => void;
}) {
  if (matches.length === 0) {
    return <div style={{ padding: "20px 12px", textAlign: "center", color: "#c0c8d8", fontSize: "0.85rem" }}>No matches. Try a different word or code.</div>;
  }
  return (
    <div>
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

/* ── Root ── */
export function UnspscTree() {
  useCSS();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [scrollToId, setScrollToId] = useState<string | null>(null);
  // pickedId: the specific match the user clicked. Set means "show the tree,
  // with every current match highlighted and this one boxed"; null while the
  // user is still typing/choosing, which shows the flat results list instead.
  const [pickedId, setPickedId] = useState<string | null>(null);
  const rowRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const matches = useMemo(() => search(deferredQuery), [deferredQuery]);
  const matchIds = useMemo(() => new Set(matches.map((m) => m.id)), [matches]);

  // Scroll to a freshly-picked search result once its ancestors have expanded.
  useEffect(() => {
    if (!scrollToId) return;
    const el = rowRefs.current.get(scrollToId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setScrollToId(null);
  }, [scrollToId, expandedIds]);

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSearch = () => {
    setQuery("");
    setPickedId(null);
  };

  const pickResult = (node: IndexNode) => {
    setPickedId(node.id);
    // Expand enough of the tree that every current match is visible at once,
    // not just the one clicked. The clicked node also opens its own children
    // (if it has any) since that's the one the user is actually looking at;
    // every other match only gets its ancestor path opened, so the row itself
    // is visible without also popping open its detail/children.
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
        <SearchResults matches={matches} onPick={pickResult} />
      ) : (
        <Children
          parentId=""
          level={0}
          items={demoData}
          expandedIds={expandedIds}
          onToggle={toggle}
          rowRefs={rowRefs}
          pickedId={pickedId}
          matchIds={matchIds}
        />
      )}
    </div>
  );
}
