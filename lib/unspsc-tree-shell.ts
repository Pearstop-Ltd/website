// Client-safe: the lightweight segment/family/class hierarchy (codes and
// titles only, no commodity titles) that ships to the browser to render the
// interactive taxonomy browser (components/unspsc-tree.tsx). Commodity-level
// data and search are fetched on demand from app/api/unspsc-tree/* instead of
// being bundled here - the complete dataset is ~150k commodities (~12MB),
// which must never ship to the client (see lib/unspsc-tree-server.ts).
import shellData from "./data/unspsc-tree-shell.json";

// Number of entries in lib/data/unspsc-curated-commodities.json - kept as a
// plain constant rather than importing that file here, since this module is
// client-safe and that file is only needed server-side (it's merged into
// commodity responses by lib/unspsc-tree-server.ts). Update if that file's
// entry count changes.
const CURATED_COMMODITY_COUNT = 220;

// Update this when the dataset is re-checked against the official codeset.
export const unspscDataSource = {
  verifiedDate: "29 September 2026",
  sourceName: "UNDP UNSPSC codeset (v260801, English)",
  sourceUrl: "https://www.ungm.org/Public/UNSPSC",
};

export interface ShellClass { code: string; title: string; commodityCount: number }
export interface ShellFamily { code: string; title: string; classes: ShellClass[] }
export interface ShellSegment { code: string; title: string; color: string; families: ShellFamily[] }
export interface ShellGroup { code: string; title: string; color: string; segments: ShellSegment[] }

export const treeShell = shellData as ShellGroup[];

export const treeShellStats = (() => {
  let families = 0, classes = 0, commodities = 0;
  for (const group of treeShell) {
    for (const segment of group.segments) {
      families += segment.families.length;
      for (const family of segment.families) {
        classes += family.classes.length;
        for (const cls of family.classes) commodities += cls.commodityCount;
      }
    }
  }
  return {
    groups: treeShell.length,
    segments: treeShell.reduce((n, g) => n + g.segments.length, 0),
    families,
    classes,
    commodities,
    curated: CURATED_COMMODITY_COUNT,
  };
})();
