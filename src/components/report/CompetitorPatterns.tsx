"use client";

import React, { useMemo, useState } from "react";
import { asArray, safeGet } from "./report-utils";

function Badge({ level }: { level: string }) {
  const l = String(level).toLowerCase();
  const text = l === "high" ? "High" : l === "medium" ? "Medium" : l === "low" ? "Low" : String(level ?? "—");
  return <span className="rounded-full border bg-white px-2 py-0.5 text-xs font-semibold">{text}</span>;
}

export function CompetitorPatterns({ ai, mode }: { ai: any; mode: "compact" | "detailed" }) {
  const patterns = useMemo(() => asArray<any>(safeGet(ai, "analysis.competitor_patterns")), [ai]);
  const [open, setOpen] = useState<number | null>(null);

  if (!patterns.length) return null;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {patterns.slice(0, 10).map((p, idx) => {
        const ev = asArray<any>(p?.evidence_sources);
        const weaknesses = asArray<string>(p?.weaknesses_or_gaps);
        const showEvidenceControls = mode === "detailed" && ev.length > 0;

        const desc = String(p?.description ?? "");
        const shortDesc = desc.length > 180 ? `${desc.slice(0, 180)}…` : desc;

        return (
          <div key={idx} className="rounded-2xl border bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-gray-900">{p?.pattern_name ?? "Pattern"}</div>
              <Badge level={p?.confidence_level ?? "—"} />
            </div>

            {desc ? <div className="mt-2 text-sm text-gray-700">{mode === "compact" ? shortDesc : desc}</div> : null}

            {weaknesses.length ? (
              <div className="mt-3">
                <div className="text-xs font-semibold text-gray-700">Weaknesses / gaps</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
                  {weaknesses.slice(0, mode === "compact" ? 2 : weaknesses.length).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {showEvidenceControls ? (
              <>
                <button
                  className="mt-3 w-full rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
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
