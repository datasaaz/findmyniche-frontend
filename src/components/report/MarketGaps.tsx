"use client";

import React, { useMemo, useState } from "react";
import { asArray, safeGet } from "./report-utils";

export function MarketGaps({ ai, mode }: { ai: any; mode: "compact" | "detailed" }) {
  const gaps = useMemo(() => asArray<any>(safeGet(ai, "analysis.market_gaps")), [ai]);
  const [open, setOpen] = useState<number | null>(null);

  if (!gaps.length) return null;

  return (
    <div className="space-y-3">
      {gaps.map((g, idx) => {
        const ev = asArray<any>(g?.evidence_sources);
        const showEvidenceControls = mode === "detailed" && ev.length > 0;

        const why = String(g?.why_it_matters ?? "");
        const shortWhy = why.length > 140 ? `${why.slice(0, 140)}…` : why;

        return (
          <div key={idx} className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">{g?.gap ?? "Gap"}</div>

            {why ? (
              <div className="mt-1 text-sm text-gray-700">{mode === "compact" ? shortWhy : why}</div>
            ) : null}

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
              {g?.how_many_competitors_lack_this ? (
                <span className="rounded-full border bg-white px-3 py-1">
                  <span className="font-semibold">Prevalence:</span> {g.how_many_competitors_lack_this}
                </span>
              ) : null}
              {g?.confidence_level ? (
                <span className="rounded-full border bg-white px-3 py-1">
                  <span className="font-semibold">Confidence:</span> {g.confidence_level}
                </span>
              ) : null}
            </div>

            {showEvidenceControls ? (
              <>
                <button
                  className="mt-3 rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  {open === idx ? "Hide evidence" : "Show evidence"}
                </button>

                {open === idx ? (
                  <div className="mt-3 space-y-2">
                    {ev.map((e, j) => (
                      <div key={j} className="rounded-xl border bg-white p-3 text-xs">
                        <div className="font-semibold text-gray-900">{e?.source ?? "source"}</div>
                        <div className="mt-1 text-gray-700">{e?.detail ?? ""}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
