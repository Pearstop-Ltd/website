import type { TaxonomyNode, TaxonomyEdge } from "@/components/site/TaxonomyTree";
import type { BreakdownSupplier, BreakdownLineItem } from "@/components/site/BreakdownPanel";
import { formatMoney, type CurrencyInfo } from "@/lib/currency";

// Illustrative only — not real client data. Amounts are stored as a GBP
// base and converted to the visitor's currency at render time (see
// lib/currency.ts). Shared by every page that reuses the "Every line,
// labelled" TaxonomyTree/BreakdownPanel section: the homepage
// (app/[locale]/page.tsx, app/(site)/page.tsx) and
// components/site/pages/InvoiceDataExtraction.tsx.

interface RawNode {
  id: string;
  col: number;
  row: number;
  name: string;
  code?: string;
  amountGBP: number;
  variant: TaxonomyNode["variant"];
  opacity?: number;
}

const RAW_NODES: RawNode[] = [
  { id: "seg-healthcare", col: 0, row: 0, name: "Healthcare services", amountGBP: 29600, variant: "other", opacity: 0.07 },
  { id: "seg-office", col: 0, row: 1, name: "Office equipment and accessories", amountGBP: 23290, variant: "other", opacity: 0.14 },
  { id: "seg-domestic", col: 0, row: 2, name: "Domestic appliances and supplies", amountGBP: 22740, variant: "other", opacity: 0.28 },
  { id: "seg-cleaning", col: 0, row: 3, name: "Cleaning equipment and supplies", amountGBP: 20410, variant: "other", opacity: 0.5 },
  { id: "seg-paper", col: 0, row: 4, name: "Paper materials and products", code: "14000000", amountGBP: 20030, variant: "selected" },
  { id: "seg-distribution", col: 0, row: 5, name: "Distribution and conditioning systems", amountGBP: 19660, variant: "other", opacity: 0.5 },
  { id: "seg-personal", col: 0, row: 6, name: "Personal and domestic services", amountGBP: 18770, variant: "other", opacity: 0.28 },
  { id: "fam-paper", col: 1, row: 3, name: "Paper products", code: "14110000", amountGBP: 19820, variant: "selected" },
  { id: "fam-industrial", col: 1, row: 4, name: "Industrial use papers", amountGBP: 210, variant: "sibling" },
  { id: "cls-personal-paper", col: 2, row: 2, name: "Personal paper products", code: "14111700", amountGBP: 19610, variant: "selected" },
  { id: "cls-printing", col: 2, row: 3, name: "Printing and writing paper", amountGBP: 210, variant: "sibling" },
  { id: "com-tissue", col: 3, row: 1, name: "Toilet tissue", code: "14111704", amountGBP: 13190, variant: "selected" },
  { id: "com-towels", col: 3, row: 2, name: "Paper towels", amountGBP: 5840, variant: "sibling" },
  { id: "com-napkins", col: 3, row: 3, name: "Paper napkins or serviettes", amountGBP: 580, variant: "sibling" },
];

export const TAXONOMY_EDGES: TaxonomyEdge[] = [
  { from: "seg-paper", to: "fam-industrial", active: false },
  { from: "fam-paper", to: "cls-printing", active: false },
  { from: "cls-personal-paper", to: "com-towels", active: false },
  { from: "cls-personal-paper", to: "com-napkins", active: false },
  { from: "seg-paper", to: "fam-paper", active: true },
  { from: "fam-paper", to: "cls-personal-paper", active: true },
  { from: "cls-personal-paper", to: "com-tissue", active: true },
];

const RAW_TISSUE_SUPPLIERS = [
  { name: "Bunzl CHS", amountGBP: 5180, lines: "212 lines" },
  { name: "Nordhall Hygiene", amountGBP: 4960, lines: "61 lines" },
  { name: "Castleford Supplies", amountGBP: 2140, lines: "18 lines" },
  { name: "Kestrel Facility Products", amountGBP: 910, lines: "9 lines" },
];

const RAW_TISSUE_LINE_ITEMS = [
  { description: "Toilet roll, case of 36", supplier: "Bunzl CHS", qty: "12", unit: "case", amountGBP: 230.4 },
  { description: "TLT TISSUE 2PLY 9PK", supplier: "Nordhall Hygiene", qty: "30", unit: "pack", amountGBP: 171 },
  { description: "Loo roll 2ply x48", supplier: "Castleford Supplies", qty: "6", unit: "box", amountGBP: 129.6 },
  { description: "Toilet rolls (24)", supplier: "Kestrel Facility Products", qty: "10", unit: "pack", amountGBP: 148.8 },
];

const TISSUE_COMMODITY_GBP = 13190;
const TISSUE_COMMODITY_CODE = "14111704";
const TISSUE_COMMODITY_LINES = "300 lines";

export function taxonomyNodesForCurrency(currency: CurrencyInfo): TaxonomyNode[] {
  return RAW_NODES.map(({ code, amountGBP, ...rest }) => ({
    ...rest,
    sub: code ? `${code} · ${formatMoney(amountGBP, currency)}` : formatMoney(amountGBP, currency),
  }));
}

export function tissueSuppliersForCurrency(currency: CurrencyInfo): BreakdownSupplier[] {
  return RAW_TISSUE_SUPPLIERS.map(({ amountGBP, ...rest }) => ({
    ...rest,
    spend: formatMoney(amountGBP, currency),
  }));
}

export function tissueLineItemsForCurrency(currency: CurrencyInfo): BreakdownLineItem[] {
  return RAW_TISSUE_LINE_ITEMS.map(({ amountGBP, ...rest }) => ({
    ...rest,
    total: formatMoney(amountGBP, currency, true),
  }));
}

export function tissueDetailForCurrency(currency: CurrencyInfo): string {
  return `${formatMoney(TISSUE_COMMODITY_GBP, currency)} · ${TISSUE_COMMODITY_LINES} · ${TISSUE_COMMODITY_CODE}`;
}
