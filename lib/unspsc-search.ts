import { getValidationIndex } from "./unspsc-industries";
import { INDUSTRIES, type IndustryKey } from "./unspsc-industries";

export type SearchCandidate = {
  code: string;
  title: string;
  classCode: string;
  classTitle: string;
  familyCode: string;
  familyTitle: string;
  segmentCode: string;
  segmentTitle: string;
};

const STOPWORDS = new Set([
  "the", "a", "an", "of", "for", "and", "or", "to", "in", "on", "with", "by",
  "at", "from", "per", "each", "x", "case", "box", "pack", "unit", "other",
  "not", "elsewhere", "classified", "general", "purpose", "type", "types",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/** Very small stemmer for the common plural/suffix cases in this dataset -
 * good enough to match "toilets"/"toilet", "cleaners"/"cleaning" without
 * pulling in a real NLP dependency for a keyword-matching shortlist. */
function stem(token: string): string {
  if (token.endsWith("ies") && token.length > 4) return token.slice(0, -3) + "y";
  if (token.endsWith("es") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 3) return token.slice(0, -1);
  return token;
}

type Indexed = {
  candidate: SearchCandidate;
  titleTokens: string[];
  classTokens: Set<string>;
  familyTokens: Set<string>;
};

let indexed: Indexed[] | null = null;
let idf: Map<string, number> | null = null;

function buildIndex(): { indexed: Indexed[]; idf: Map<string, number> } {
  if (indexed && idf) return { indexed, idf };

  const list: Indexed[] = [];
  const documentFrequency = new Map<string, number>();

  for (const entry of getValidationIndex().values()) {
    const candidate: SearchCandidate = {
      code: entry.commodity.code,
      title: entry.commodity.title,
      classCode: entry.class.code,
      classTitle: entry.class.title,
      familyCode: entry.family.code,
      familyTitle: entry.family.title,
      segmentCode: entry.segment.code,
      segmentTitle: entry.segment.title,
    };
    const titleTokens = tokenize(candidate.title).map(stem);
    const classTokens = new Set(tokenize(candidate.classTitle).map(stem));
    const familyTokens = new Set(tokenize(candidate.familyTitle).map(stem));

    for (const t of new Set(titleTokens)) {
      documentFrequency.set(t, (documentFrequency.get(t) ?? 0) + 1);
    }

    list.push({ candidate, titleTokens, classTokens, familyTokens });
  }

  const n = list.length;
  const idfMap = new Map<string, number>();
  for (const [token, df] of documentFrequency) {
    idfMap.set(token, Math.log(1 + n / df));
  }

  indexed = list;
  idf = idfMap;
  return { indexed, idf };
}

/** True if two words share a long-enough common prefix to plausibly be the
 * same root (clean/cleaning/cleaner/cleaned), without being so short a
 * prefix that unrelated words would false-match. */
function sharesRoot(a: string, b: string): boolean {
  const minLen = Math.min(a.length, b.length);
  if (minLen < 5) return false;
  const prefixLen = Math.min(5, minLen);
  return a.slice(0, prefixLen) === b.slice(0, prefixLen);
}

function tokenWeight(token: string, idfMap: Map<string, number>): number {
  // A token that appears in very few titles (e.g. "toilet") is far more
  // useful for telling candidates apart than one that appears in hundreds
  // (e.g. "paper").
  return idfMap.get(token) ?? Math.log(2);
}

function scoreEntry(queryTokens: string[], queryText: string, entry: Indexed, idfMap: Map<string, number>): number {
  const titleTokenSet = new Set(entry.titleTokens);
  let titleTokenMatches = 0;
  let matchedTitleWeight = 0;
  let secondaryScore = 0;

  for (const qt of queryTokens) {
    const w = tokenWeight(qt, idfMap);
    if (titleTokenSet.has(qt)) {
      titleTokenMatches += 1;
      matchedTitleWeight += w;
    } else if (entry.titleTokens.some((t) => t.length > 3 && (t.startsWith(qt) || qt.startsWith(t)))) {
      titleTokenMatches += 0.5;
      matchedTitleWeight += w * 0.5;
    } else if (entry.titleTokens.some((t) => sharesRoot(t, qt))) {
      // Bridges word-family cases the mini-stemmer above doesn't handle
      // (e.g. query "cleaning" vs a title's stemmed "cleaner" - both share
      // the root "clean" but diverge on suffix, so neither is a prefix of
      // the other and the check above misses it).
      titleTokenMatches += 0.5;
      matchedTitleWeight += w * 0.4;
    } else if (entry.classTokens.has(qt)) {
      secondaryScore += w * 0.3;
    } else if (entry.familyTokens.has(qt)) {
      secondaryScore += w * 0.15;
    }
  }

  // Breadth first: matching a larger share of the query's distinct words is
  // what actually separates the one candidate that matches everything the
  // description said from one that only shares a single word with it. Word
  // weight only orders candidates that matched the same share.
  const breadth = queryTokens.length > 0 ? titleTokenMatches / queryTokens.length : 0;
  let score = breadth * 1000 + matchedTitleWeight * 10 + secondaryScore;

  const titleLower = entry.candidate.title.toLowerCase();
  const queryLower = queryText.toLowerCase();
  if (titleLower === queryLower) {
    score += 5000;
  } else if (titleLower.length > 3) {
    // Word-boundary match only - a naive .includes() would treat "Lace" or
    // "Cement" as present in "HVAC filter replacement" since those words
    // are literal substrings of "rep-LACE-ment"/"repla-CEMENT".
    const boundaryPattern = new RegExp(`(?:^|\\W)${titleLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\W)`);
    if (boundaryPattern.test(queryLower)) score += 2000;
  }

  return score;
}

/**
 * Keyword-matches a free-text description against the real UNSPSC dataset
 * and returns the best-scoring commodities, optionally boosted toward the
 * segments an industry typically buys from. This exists so the LLM step
 * that follows only ever has to *choose* between real, valid codes rather
 * than generate one from memory - it can no longer hallucinate a
 * plausible-sounding code (or a real code for the wrong item) because the
 * only options it's shown are ones this search actually found.
 */
export function searchCandidates(description: string, industryKey: IndustryKey | null, limit = 25): SearchCandidate[] {
  const { indexed: entries, idf: idfMap } = buildIndex();
  const queryTokens = tokenize(description).map(stem);
  const industry = INDUSTRIES.find((i) => i.key === industryKey);
  const boostSegments = industry && industry.segments.length > 0 ? new Set(industry.segments) : null;

  const scored = entries.map((entry) => {
    let score = scoreEntry(queryTokens, description, entry, idfMap);
    if (boostSegments?.has(entry.candidate.segmentCode)) score *= 1.15;
    return { candidate: entry.candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const positive = scored.filter((s) => s.score > 0);
  if (positive.length >= limit) return positive.slice(0, limit).map((s) => s.candidate);

  // Too few keyword hits (a vague or unusual description) - top up with the
  // industry's own segments so the model still gets a relevant shortlist
  // instead of an empty or tiny one.
  if (boostSegments) {
    const fallback = scored.filter((s) => s.score === 0 && boostSegments.has(s.candidate.segmentCode));
    return [...positive, ...fallback].slice(0, limit).map((s) => s.candidate);
  }

  return positive.slice(0, limit).map((s) => s.candidate);
}
