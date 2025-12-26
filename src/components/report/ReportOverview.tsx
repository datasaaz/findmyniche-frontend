"use client";

import React from "react";
import { countConfidence, getPrimaryRecommendation, normalizeStatus, summarizeBusiness } from "./report-utils";
import type { Location } from "../../lib/api/endpoints";
import type { PinnedAction } from "./pins";

export function ReportOverview({
  ai,
  fallbackQuery,
  location,
  reportName,
  pinnedActions,
  onUnpin,
}: {
  ai: any;
  fallbackQuery: string;
  location: Location;
  reportName: string;
  pinnedActions: PinnedAction[];
  onUnpin: (id: string) => void;
}) {
  const { status, stage } = normalizeStatus(ai);
  const conf = countConfidence(ai);
  const primary = getPrimaryRecommendation(ai);
  const business = summarizeBusiness(ai, fallbackQuery);

  const externalId =
    ai && typeof ai === "object" && !Array.isArray(ai) && typeof (ai as any).report_id === "string"
      ? String((ai as any).report_id)
      : null;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs text-gray-500">Report</div>
          <h1 className="text-xl font-semibold text-gray-900">{reportName}</h1>

          <div className="mt-1 text-sm text-gray-700">
            <span className="font-medium">Business:</span> {business}
          </div>

          <div className="mt-1 text-sm text-gray-700">
            <span className="font-medium">Location:</span> {location.label}, {location.city} ({location.country_code})
          </div>

          {externalId ? (
            <div className="mt-1 text-sm text-gray-700">
              <span className="font-medium">External report id:</span>{" "}
              <span className="font-mono text-xs">{externalId}</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-3 text-sm md:min-w-[280px]">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status</span>
            <span className="rounded-full border bg-white px-2 py-0.5 text-xs font-semibold">{String(status)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Stage</span>
            <span className="rounded-full border bg-white px-2 py-0.5 text-xs font-semibold">{String(stage)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Confidence signals</span>
            <span className="text-xs font-semibold">
              High {conf.high} · Med {conf.medium} · Low {conf.low}
            </span>
          </div>
        </div>
      </div>

      {pinnedActions.length ? (
        <div className="mt-4 rounded-2xl border bg-gray-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-gray-700">Pinned actions</div>
            <a href="#actions" className="text-xs font-semibold text-gray-700 underline underline-offset-2">
              View all actions
            </a>
          </div>

          <div className="mt-3 space-y-2">
            {pinnedActions.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-3 rounded-xl border bg-white p-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{p.text}</div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                    {p.confidence ? (
                      <span className="rounded-full border bg-white px-2 py-0.5">
                        <span className="font-semibold">Confidence:</span> {p.confidence}
                      </span>
                    ) : null}
                    {p.linked_gap ? (
                      <span className="rounded-full border bg-white px-2 py-0.5">
                        <span className="font-semibold">Gap:</span> {p.linked_gap}
                      </span>
                    ) : null}
                  </div>
                </div>

                <button
                  className="shrink-0 rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                  onClick={() => onUnpin(p.id)}
                >
                  Unpin
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {primary ? (
        <div className="mt-4 rounded-2xl border bg-gray-50 p-4">
          <div className="text-xs font-semibold text-gray-700">Primary positioning suggestion</div>
          <div className="mt-1 text-sm text-gray-900">{primary}</div>
        </div>
      ) : null}
    </section>
  );
}
