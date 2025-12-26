"use client";

import React, { useMemo, useState } from "react";
import { asArray, evidenceCount, safeGet } from "./report-utils";
import type { PinnedAction } from "./pins";

function Badge({ level }: { level: string }) {
  const l = String(level).toLowerCase();
  const text = l === "high" ? "High" : l === "medium" ? "Medium" : l === "low" ? "Low" : String(level ?? "—");
  return <span className="rounded-full border bg-white px-2 py-0.5 text-xs font-semibold">{text}</span>;
}

export function ActionCards({
  ai,
  mode,
  pinnedIds,
  onTogglePin,
}: {
  ai: any;
  mode: "compact" | "detailed";
  pinnedIds: Set<string>;
  onTogglePin: (action: PinnedAction) => void;
}) {
  const recs = useMemo(() => asArray<any>(safeGet(ai, "analysis.niche_recommendations")), [ai]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!recs.length) return null;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {recs.slice(0, 6).map((r, idx) => {
        const ev = asArray<any>(r?.evidence_sources);
        const showEvidenceControls = mode === "detailed" && ev.length > 0;

        // Stable pin id: based on index + text (good enough for MVP without backend ids)
        const recText = String(r?.recommendation ?? "");
        const id = `rec_${idx}_${recText.slice(0, 32).replace(/\s+/g, "_")}`;
        const pinned = pinnedIds.has(id);

        const pinPayload: PinnedAction = {
          id,
          text: recText || "Recommendation",
          confidence: r?.confidence_level ?? null,
          linked_gap: r?.linked_market_gap ?? null,
        };

        return (
          <div key={id} className="rounded-2xl border bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-gray-900">{pinPayload.text}</div>
              <div className="flex items-center gap-2">
                <Badge level={r?.confidence_level ?? "—"} />
                <button
                  className={`rounded-xl border px-2 py-1 text-xs font-semibold ${
                    pinned ? "bg-black text-white" : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => onTogglePin(pinPayload)}
                  aria-pressed={pinned}
                  aria-label={pinned ? "Unpin action" : "Pin action"}
                  title={pinned ? "Unpin" : "Pin"}
                >
                  {pinned ? "Pinned" : "Pin"}
                </button>
              </div>
            </div>

            {r?.linked_market_gap ? (
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-semibold">Linked gap:</span> {r.linked_market_gap}
              </div>
            ) : null}

            <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
              <span>Evidence items</span>
              <span className="font-semibold">{evidenceCount(r)}</span>
            </div>

            {showEvidenceControls ? (
              <button
                className="mt-3 w-full rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {openIndex === idx ? "Hide evidence" : "Show evidence"}
              </button>
            ) : null}

            {mode === "detailed" && openIndex === idx && ev.length ? (
              <div className="mt-3 space-y-2">
                {ev.map((e, j) => (
                  <div key={j} className="rounded-xl border bg-white p-3 text-xs">
                    <div className="font-semibold text-gray-900">{e?.source ?? "source"}</div>
                    <div className="mt-1 text-gray-700">{e?.detail ?? ""}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
