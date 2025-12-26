export type ConfidenceLevel = "high" | "medium" | "low" | string;

export function isObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function asArray<T = any>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

export function safeGet(obj: any, path: string): any {
  // path like "analysis.niche_recommendations"
  if (!obj) return undefined;
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (!isObject(cur) || !(p in cur)) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function normalizeStatus(ai: any) {
  return {
    status: safeGet(ai, "status") ?? safeGet(ai, "stage") ?? "unknown",
    stage: safeGet(ai, "stage") ?? safeGet(ai, "status") ?? "unknown",
  };
}

export function countConfidence(ai: any) {
  const recs = asArray<any>(safeGet(ai, "analysis.niche_recommendations"));
  const patterns = asArray<any>(safeGet(ai, "analysis.competitor_patterns"));
  const gaps = asArray<any>(safeGet(ai, "analysis.market_gaps"));

  const all = [
    ...recs.map((x) => x?.confidence_level).filter(Boolean),
    ...patterns.map((x) => x?.confidence_level).filter(Boolean),
    ...gaps.map((x) => x?.confidence_level).filter(Boolean),
  ];

  const counts: Record<string, number> = {};
  for (const c of all) counts[String(c).toLowerCase()] = (counts[String(c).toLowerCase()] ?? 0) + 1;

  return {
    total: all.length,
    high: counts["high"] ?? 0,
    medium: counts["medium"] ?? 0,
    low: counts["low"] ?? 0,
  };
}

export function summarizeBusiness(ai: any, fallbackQuery: string) {
  return (
    safeGet(ai, "product_description") ??
    safeGet(ai, "analysis.messaging_angle.proposed_message") ??
    fallbackQuery ??
    "—"
  );
}

export function getPrimaryRecommendation(ai: any): string | null {
  const msg = safeGet(ai, "analysis.messaging_angle.proposed_message");
  if (typeof msg === "string" && msg.trim()) return msg.trim();

  const recs = asArray<any>(safeGet(ai, "analysis.niche_recommendations"));
  const first = recs[0]?.recommendation;
  if (typeof first === "string" && first.trim()) return first.trim();

  return null;
}

export function evidenceCount(item: any) {
  const ev = asArray<any>(item?.evidence_sources);
  return ev.length;
}
