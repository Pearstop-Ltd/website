// Full category group / segment / family / class / commodity tree, generated directly from
// the official UNSPSC codeset (live export from the UN Global Marketplace, ungm.org/Public/UNSPSC).
// lib/data/unspsc-full-tree.json is a mechanical dump of that export — every code and title in
// it is official. lib/data/unspsc-curated-commodities.json is hand-written editorial copy
// (description + example items) for a subset of commodities, keyed by 8-digit code, layered on
// top at import time — it is NOT part of the standard.
//
// The 10 "category groups" (A-J) are NOT one of the 4 official UNSPSC levels — they are
// UNGM's own browsing grouping on top of the standard, used here purely so all 58 official
// segments can be browsed in manageable clusters. The official standard itself only has
// four levels: Segment, Family, Class, Commodity.
//
// Scale note: the full tree is ~58 segments, ~448 families, ~2,100 classes and ~10,700
// commodity-level codes — every one of them real. Writing bespoke descriptions and example
// items for all ~10,700 commodities isn't practical by hand, so only ~220 commodities across
// the segments most relevant to Pearstop's audience (facilities management, procurement,
// professional services) carry that editorial layer today; every other commodity still shows
// its real code and title, just without the extra description/example panel.

import fullTreeData from "./data/unspsc-full-tree.json";
import curatedCommoditiesData from "./data/unspsc-curated-commodities.json";

// Update this when the demo data is re-checked against the official codeset.
export const unspscDataSource = {
  verifiedDate: "10 September 2026",
  sourceName: "UN Global Marketplace (UNGM)",
  sourceUrl: "https://www.ungm.org/Public/UNSPSC",
};

export interface UNSPSCCommodity {
  code: string;
  title: string;
  description?: string;
  exampleItems?: string[];
}

export interface UNSPSCClass {
  code: string;
  title: string;
  commodities: UNSPSCCommodity[];
}

export interface UNSPSCFamily {
  code: string;
  title: string;
  classes: UNSPSCClass[];
}

export interface UNSPSCSegment {
  code: string;
  title: string;
  color: string;
  families: UNSPSCFamily[];
}

export interface UNSPSCCategoryGroup {
  code: string;
  title: string;
  color: string;
  segments: UNSPSCSegment[];
}

interface CuratedCommodity {
  code: string;
  title: string;
  description: string;
  exampleItems: string[];
}

const curatedByCode = new Map<string, CuratedCommodity>(
  (curatedCommoditiesData as CuratedCommodity[]).map((c) => [c.code, c])
);

function withCuration(commodity: UNSPSCCommodity): UNSPSCCommodity {
  const curated = curatedByCode.get(commodity.code);
  return curated
    ? { ...commodity, description: curated.description, exampleItems: curated.exampleItems }
    : commodity;
}

export const demoData: UNSPSCCategoryGroup[] = (fullTreeData as UNSPSCCategoryGroup[]).map((group) => ({
  ...group,
  segments: group.segments.map((segment) => ({
    ...segment,
    families: segment.families.map((family) => ({
      ...family,
      classes: family.classes.map((cls) => ({
        ...cls,
        commodities: cls.commodities.map(withCuration),
      })),
    })),
  })),
}));

export const treeStats = (() => {
  let families = 0, classes = 0, commodities = 0;
  for (const group of demoData) {
    for (const segment of group.segments) {
      families += segment.families.length;
      for (const family of segment.families) {
        classes += family.classes.length;
        for (const cls of family.classes) commodities += cls.commodities.length;
      }
    }
  }
  return {
    groups: demoData.length,
    segments: demoData.reduce((n, g) => n + g.segments.length, 0),
    families,
    classes,
    commodities,
    curated: curatedByCode.size,
  };
})();
