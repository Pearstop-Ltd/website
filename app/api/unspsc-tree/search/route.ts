import { NextRequest, NextResponse } from "next/server";
import { searchTree } from "@/lib/unspsc-tree-server";

// Backs the interactive taxonomy browser's search box (components/unspsc-tree.tsx),
// searching the complete official codeset (~150k commodities) server-side rather
// than shipping that whole dataset to the browser to search client-side.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (q.trim().length === 0) {
    return NextResponse.json({ matches: [] });
  }
  const matches = searchTree(q, 60);
  return NextResponse.json({ matches });
}
