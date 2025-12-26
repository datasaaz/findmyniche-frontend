"use client";

import React, { useMemo } from "react";
import { asArray, safeGet } from "./report-utils";

export function TrendInsights({ ai, mode }: { ai: any; mode: "compact" | "detailed" }) {
  const t = useMemo(() => safeGet(ai, "analysis.trend_insights"), [ai]);
  if (!t) return null;

  const dir = t?.overall_demand_direction ?? "unknown";
  const keywords = asArray<string>(t?.high_interest_keywords);
  const risks = asArray<string>(t?.demand_risk_notes);
  const ev = asArray<any>(t?.evidence_sources);

  return (
    <div className="rounded-2xl border bg-gray-50 p-4">
      <div className="text-xs text-gray-600">Overall demand direction</div>
      <div className="mt-1 text-base font-semibold text-gray-900">{String(dir)}</div>

      {keywords.length ? (
        <>
          <div className="mt-4 text-xs font-semibold text-gray-700">High-interest keywords</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {keywords.map((k, i) => (
              <span key={i} className="rounded-full border bg-white px-3 py-1 text-xs">
                {k}
              </span>
            ))}
          </div>
        </>
      ) : null}

      {mode === "detailed" && risks.length ? (
        <>
          <div className="mt-4 text-xs font-semibold text-gray-700">Demand risk notes</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
            {risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      ) : null}

      {mode === "detailed" && ev.length ? (
        <>
          <div className="mt-4 text-xs font-semibold text-gray-700">Evidence</div>
          <div className="mt-2 space-y-2">
            {ev.map((e, i) => (
              <div key={i} className="rounded-xl border bg-white p-3 text-xs">
                <div className="font-semibold text-gray-900">{e?.source ?? "source"}</div>
                <div className="mt-1 text-gray-700">{e?.detail ?? ""}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
