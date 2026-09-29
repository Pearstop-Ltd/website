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
