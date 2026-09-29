// Server-only: the full official UNSPSC codeset (v260801, UNDP/UNGM export),
// ~149,000 commodities across 58 segments. At ~12MB this must never be
// imported from a client component; it backs both the classification search
// (lib/unspsc-search.ts / app/api/unspsc-lookup/route.ts) and the interactive
// taxonomy browser's on-demand commodity/search endpoints
// (lib/unspsc-tree-server.ts) - the browser itself only ever ships the
// lightweight segment/family/class shell (lib/unspsc-tree-shell.ts).
import fullTreeData from "./data/unspsc-official-full.json";

interface RawCommodity { code: string; title: string }
interface RawClass { code: string; title: string; commodities: RawCommodity[] }
interface RawFamily { code: string; title: string; classes: RawClass[] }
interface RawSegment { code: string; title: string; families: RawFamily[] }

const allSegments = fullTreeData as RawSegment[];

export function getAllSegments(): RawSegment[] {
  return allSegments;
}

interface ValidationEntry {
  segment: { code: string; title: string };
  family: { code: string; title: string };
  class: { code: string; title: string };
  commodity: { code: string; title: string };
}

let validationIndex: Map<string, ValidationEntry> | null = null;

/** Full code -> canonical hierarchy lookup, built once from the real dataset. */
export function getValidationIndex(): Map<string, ValidationEntry> {
  if (validationIndex) return validationIndex;
  const index = new Map<string, ValidationEntry>();
  for (const segment of allSegments) {
    for (const family of segment.families) {
      for (const cls of family.classes) {
        for (const commodity of cls.commodities) {
          index.set(commodity.code, {
            segment: { code: segment.code, title: segment.title },
            family: { code: family.code, title: family.title },
            class: { code: cls.code, title: cls.title },
            commodity: { code: commodity.code, title: commodity.title },
          });
        }
      }
    }
  }
  validationIndex = index;
  return index;
}
