"use client";

import { LabelledOutputPanel, type LabelledOutputPanelProps } from "./LabelledOutputPanel";
import { useVisitorCurrency } from "./useVisitorCurrency";
import {
  taxonomyNodesForCurrency,
  tissueSuppliersForCurrency,
  tissueLineItemsForCurrency,
  tissueDetailForCurrency,
} from "@/lib/taxonomy-demo-data";

/** The toilet-tissue LabelledOutputPanel with amounts in the visitor's
 * currency, resolved in the browser so the page around it stays static. */
export function VisitorCurrencyLabelledOutputPanel(
  props: Omit<LabelledOutputPanelProps, "nodes" | "detail" | "suppliers" | "lineItems">
) {
  const currency = useVisitorCurrency();
  return (
    <LabelledOutputPanel
      {...props}
      nodes={taxonomyNodesForCurrency(currency)}
      detail={tissueDetailForCurrency(currency)}
      suppliers={tissueSuppliersForCurrency(currency)}
      lineItems={tissueLineItemsForCurrency(currency)}
    />
  );
}
