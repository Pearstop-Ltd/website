// Server-only: backs the interactive taxonomy browser (components/unspsc-tree.tsx)
// with the complete official UNSPSC codeset. The browser itself only ships the
// lightweight segment/family/class shell (lib/data/unspsc-tree-shell.json, no
// commodity titles) to the client; this module holds the ~150k commodity
// titles and the full-text search index built from them, and is only ever
// reached via the two API routes under app/api/unspsc-tree/.
import shellData from "./data/unspsc-tree-shell.json";
import curatedCommoditiesData from "./data/unspsc-curated-commodities.json";
import { getAllSegments } from "./unspsc-taxonomy-index";

interface CuratedCommodity {
  code: string;
  title: string;
  description: string;
  exampleItems: string[];
}

export interface TreeCommodity {
  code: string;
  title: string;
  description?: string;
  exampleItems?: string[];
}

interface ShellClass { code: string; title: string; commodityCount: number }
interface ShellFamily { code: string; title: string; classes: ShellClass[] }
interface ShellSegment { code: string; title: string; color: string; families: ShellFamily[] }
interface ShellGroup { code: string; title: string; color: string; segments: ShellSegment[] }

const SHELL = shellData as ShellGroup[];

const curatedByCode = new Map<string, CuratedCommodity>(
  (curatedCommoditiesData as CuratedCommodity[]).map((c) => [c.code, c])
);

/** class code (6 digits) -> that class's full commodity list, curation layered in. */
let commoditiesByClass: Map<string, TreeCommodity[]> | null = null;

function buildCommoditiesByClass(): Map<string, TreeCommodity[]> {
  if (commoditiesByClass) return commoditiesByClass;
  const map = new Map<string, TreeCommodity[]>();
  for (const segment of getAllSegments()) {
    for (const family of segment.families) {
      for (const cls of family.classes) {
        const commodities: TreeCommodity[] = cls.commodities.map((c) => {
          const curated = curatedByCode.get(c.code);
          return curated
            ? { code: c.code, title: c.title, description: curated.description, exampleItems: curated.exampleItems }
            : { code: c.code, title: c.title };
        });
        map.set(cls.code, commodities);
      }
    }
  }
  commoditiesByClass = map;
  return map;
}

export function getCommoditiesForClass(classCode: string): TreeCommodity[] {
  return buildCommoditiesByClass().get(classCode) ?? [];
}

/* ── search index, mirroring the shape the client tree used to build itself ── */

export type SearchLevel = 0 | 1 | 2 | 3 | 4;

export interface TreeSearchNode {
  id: string;
  level: SearchLevel;
  code: string;
  title: string;
  color: string;
  path: string[];
  childCount: number;
  description?: string;
  exampleItems?: string[];
}

interface IndexedSearchNode extends TreeSearchNode {
  words: string[];
  searchText: string;
  titleLower: string;
  codeLower: string;
}

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

let searchIndex: IndexedSearchNode[] | null = null;

function buildSearchIndex(): IndexedSearchNode[] {
  if (searchIndex) return searchIndex;
  const nodes: TreeSearchNode[] = [];
  const commodities = buildCommoditiesByClass();

  for (const group of SHELL) {
    const groupPath = [group.title];
    nodes.push({
      id: group.code,
      level: 0,
      code: group.code,
      title: group.title,
      color: group.color,
      path: [],
      childCount: group.segments.length,
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
            childCount: cls.commodityCount,
          });
          for (const commodity of commodities.get(cls.code) ?? []) {
            nodes.push({
              id: `${clsId}|${commodity.code}`,
              level: 4,
              code: commodity.code,
              title: commodity.title,
              color: group.color,
              path: clsPath,
              childCount: 0,
              description: commodity.description,
              exampleItems: commodity.exampleItems,
            });
          }
        }
      }
    }
  }

  searchIndex = nodes.map((n) => {
    const searchText = `${n.code} ${n.title} ${n.description ?? ""} ${(n.exampleItems ?? []).join(" ")}`.toLowerCase();
    return { ...n, words: tokenize(searchText), searchText, titleLower: n.title.toLowerCase(), codeLower: n.code.toLowerCase() };
  });
  return searchIndex;
}

export interface TreeSearchMatch extends TreeSearchNode {
  rank: number;
}

// Iterative Levenshtein edit distance - used only as a fallback for short word
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

function wordMatches(token: string, word: string): { hit: boolean; tight: boolean } {
  // A minimum length on `word` for the prefix checks matters a lot at this
  // dataset's scale: many titles/codes tokenize into leftover 1-2 letter
  // fragments (e.g. "p" from "(p-32)", "to" as a stray word) that would
  // otherwise trivially "tight" prefix-match almost any longer query token.
  if (word === token) return { hit: true, tight: true };
  if (word.length >= 3 && (word.startsWith(token) || token.startsWith(word))) return { hit: true, tight: true };
  if (token.length >= 3 && word.length >= 3 && word.includes(token)) return { hit: true, tight: true };
  if (token.length >= 3 && word.length >= 3 && Math.abs(word.length - token.length) <= 2) {
    const maxDist = token.length <= 5 ? 1 : 2;
    if (levenshtein(token, word) <= maxDist) return { hit: true, tight: false };
  }
  return { hit: false, tight: false };
}

export function searchTree(query: string, limit = 60): TreeSearchMatch[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const tokens = tokenize(q);
  const nodes = buildSearchIndex();
  const results: TreeSearchMatch[] = [];

  for (const node of nodes) {
    const titleLower = node.titleLower;
    const codeLower = node.codeLower;
    let rank: number | null = null;

    if (codeLower === q) rank = 0;
    else if (titleLower === q) rank = 1;
    else if (titleLower.startsWith(q)) rank = 2;
    else if (codeLower.startsWith(q)) rank = 3;
    else if (titleLower.includes(q)) rank = 4;
    else if (codeLower.includes(q)) rank = 5;
    else if (node.searchText.includes(q)) rank = 6;

    if (rank === null && tokens.length > 0) {
      let allMatched = true;
      let fuzzyCount = 0;
      let tightCount = 0;
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
        if (tokenTight) tightCount++;
        else fuzzyCount++;
      }
      // Requiring at least one exact/prefix/substring hit (not purely fuzzy)
      // stops multi-word queries with no real match - e.g. "toilet paper",
      // since the real title is "toilet tissue" - from AND-ing together two
      // independent typo-distance guesses into a confident-looking but
      // nonsensical result. At ~150k candidates that collision becomes far
      // more likely than it was against the old ~10k-commodity subset.
      if (allMatched && tightCount > 0) rank = 7 + fuzzyCount;
    }

    if (rank !== null) {
      results.push({
        id: node.id,
        level: node.level,
        code: node.code,
        title: node.title,
        color: node.color,
        path: node.path,
        childCount: node.childCount,
        description: node.description,
        exampleItems: node.exampleItems,
        rank,
      });
    }
  }

  results.sort((a, b) => (a.rank - b.rank) || (a.level - b.level) || a.title.localeCompare(b.title));
  return results.slice(0, limit);
}
