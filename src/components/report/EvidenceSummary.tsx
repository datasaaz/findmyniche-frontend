"use client";

import React, { useMemo, useState } from "react";
import { asArray, safeGet } from "./report-utils";

export function EvidenceSummary({ ai, mode }: { ai: any; mode: "compact" | "detailed" }) {
  const summary = useMemo(() => asArray<any>(safeGet(ai, "analysis.evidence_summary")), [ai]);
  const [open, setOpen] = useState<number | null>(null);

  if (!summary.length) return null;

  return (
    <div className="space-y-3">
      {summary.map((s, idx) => {
        const ev = asArray<any>(s?.evidence_sources);
        const showControls = mode === "detailed" && ev.length > 0;

        return (
          <div key={idx} className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">{s?.claim ?? "Claim"}</div>

            {showControls ? (
              <>
                <button
                  className="mt-3 rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  {open === idx ? "Hide sources" : "Show sources"}
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
