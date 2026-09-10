import fullTreeData from "./data/unspsc-full-tree.json";

interface RawCommodity { code: string; title: string }
interface RawClass { code: string; title: string; commodities: RawCommodity[] }
interface RawFamily { code: string; title: string; classes: RawClass[] }
interface RawSegment { code: string; title: string; families: RawFamily[] }
interface RawGroup { code: string; title: string; segments: RawSegment[] }

const TREE = fullTreeData as RawGroup[];

export type IndustryKey =
  | "facilities_management"
  | "general_facilities_management"
  | "soft_services"
  | "cleaning"
  | "hard_services"
  | "construction"
  | "manufacturing"
  | "other";

export const INDUSTRIES: { key: IndustryKey; label: string; segments: string[] }[] = [
  { key: "facilities_management", label: "Facilities management", segments: ["72", "76", "80", "81"] },
  { key: "general_facilities_management", label: "General facilities management", segments: ["72", "76", "80", "81"] },
  { key: "soft_services", label: "Soft services", segments: ["76", "90", "92", "77"] },
  { key: "cleaning", label: "Cleaning", segments: ["76", "47"] },
  { key: "hard_services", label: "Hard services", segments: ["72", "39", "40", "81"] },
  { key: "construction", label: "Construction", segments: ["72", "22", "30", "95"] },
  { key: "manufacturing", label: "Manufacturing", segments: ["73", "23", "31"] },
  { key: "other", label: "Other / not sure", segments: [] },
];

export function isIndustryKey(value: unknown): value is IndustryKey {
  return typeof value === "string" && INDUSTRIES.some((i) => i.key === value);
}

const allSegments: RawSegment[] = TREE.flatMap((g) => g.segments);

/**
 * A condensed, real-data summary of the families under an industry's relevant
 * segments, for grounding the LLM's segment/family choice. Not exhaustive —
 * just enough context to bias the model toward the right area without
 * shipping the full ~10,700-row codeset in every prompt. The model can still
 * pick outside this list; the result is validated against the full dataset
 * afterward regardless.
 */
export function buildIndustryContext(industryKey: IndustryKey | null): string {
  const industry = INDUSTRIES.find((i) => i.key === industryKey);
  if (!industry || industry.segments.length === 0) return "";

  const lines: string[] = [];
  for (const segCode of industry.segments) {
    const segment = allSegments.find((s) => s.code === segCode);
    if (!segment) continue;
    lines.push(`Segment ${segment.code} — ${segment.title}`);
    for (const family of segment.families) {
      lines.push(`  Family ${family.code} — ${family.title}`);
    }
  }
  return lines.join("\n");
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
