"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ReportDetailResponse } from "../../lib/api/endpoints";
import { SidebarNav, type NavItem } from "./SidebarNav";

import { ReportOverview } from "./ReportOverview";
import { ActionCards } from "./ActionCards";
import { MarketGaps } from "./MarketGaps";
import { TrendInsights } from "./TrendInsights";
import { CompetitorPatterns } from "./CompetitorPatterns";
import { QueryToolkit } from "./QueryToolkit";
import { EvidenceSummary } from "./EvidenceSummary";
import { RawJsonFallback } from "./RawJsonFallback";

import { asArray, safeGet } from "./report-utils";
import { Section } from "../ui/Section";

import type { PinnedAction } from "./pins";
import { loadPinnedActions, togglePinnedAction, removePinnedAction } from "./pins";

type DensityMode = "compact" | "detailed";

export function ReportDashboard({
  report,
  run,
}: {
  report: ReportDetailResponse["report"];
  run: ReportDetailResponse["runs"][number] | null;
}) {
  const ai = run?.ai_response_json ?? null;

  const [mode, setMode] = useState<DensityMode>("compact");
  const [pinned, setPinned] = useState<PinnedAction[]>([]);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem("report_density_mode");
      if (v === "compact" || v === "detailed") setMode(v);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("report_density_mode", mode);
    } catch {
      // ignore
    }
  }, [mode]);

  useEffect(() => {
    setPinned(loadPinnedActions(report.id));
  }, [report.id]);

  const pinnedIds = useMemo(() => new Set(pinned.map((p) => p.id)), [pinned]);

  const hasActions = asArray(safeGet(ai, "analysis.niche_recommendations")).length > 0;
  const hasGaps = asArray(safeGet(ai, "analysis.market_gaps")).length > 0;
  const hasTrends = !!safeGet(ai, "analysis.trend_insights");
  const hasPatterns = asArray(safeGet(ai, "analysis.competitor_patterns")).length > 0;
  const hasQueries = !!safeGet(ai, "search_queries");
  const hasEvidence = asArray(safeGet(ai, "analysis.evidence_summary")).length > 0;

  const pinnedCount = pinned.length;

  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [{ id: "overview", label: "Overview", required: true }];
    if (hasActions) items.push({ id: "actions", label: "Next actions" });
    if (hasGaps) items.push({ id: "gaps", label: "Market gaps" });
    if (hasTrends) items.push({ id: "demand", label: "Market demand" });
    if (hasPatterns) items.push({ id: "patterns", label: "Competitor patterns" });
    if (hasQueries) items.push({ id: "queries", label: "Query toolkit" });
    if (hasEvidence) items.push({ id: "evidence", label: "Evidence summary" });
    items.push({ id: "raw", label: "Raw insights" });
    return items;
  }, [hasActions, hasGaps, hasTrends, hasPatterns, hasQueries, hasEvidence]);

  const pinnedCountById = useMemo(() => {
    // Only show pinned count on "actions" section for now
    return pinnedCount > 0 ? { actions: pinnedCount } : {};
  }, [pinnedCount]);

  return (
    <div className="grid gap-5 md:grid-cols-[260px_1fr]">
      <SidebarNav
        items={navItems}
        pinnedCountById={pinnedCountById}
        topLinks={
          pinnedCount > 0 ? (
            <a
              href="#pinned"
              className="block rounded-xl border bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-100"
            >
              Jump to pinned ({pinnedCount})
            </a>
          ) : null
        }
      />

      <div className="space-y-5">
        {/* Pinned anchor section (HCI: quick recall, explicit target for sidebar jump) */}
        {pinnedCount > 0 ? (
          <div id="pinned" className="scroll-mt-24">
            <Section
              id="pinned"
              title="Pinned actions"
              subtitle="Your selected priorities for this report. Use these as your execution checklist."
              actions={
                <a href="#actions" className="text-xs font-semibold text-gray-700 underline underline-offset-2">
                  Manage pins
                </a>
              }
            >
              <div className="space-y-2">
                {pinned.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-start justify-between gap-3 rounded-xl border bg-gray-50 p-3">
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
                      onClick={() => setPinned(removePinnedAction(report.id, p.id))}
                    >
                      Unpin
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        ) : null}

        {/* Controls */}
        <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-gray-500">Viewing mode</div>
            <div className="text-sm font-semibold text-gray-900">
              {mode === "compact" ? "Compact (scan-friendly)" : "Detailed (evidence-ready)"}
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Compact reduces noise; Detailed surfaces evidence and long descriptions.
              {hasActions ? <span className="ml-1">Tip: Pin 1–2 actions you want to execute first.</span> : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                mode === "compact" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setMode("compact")}
              aria-pressed={mode === "compact"}
            >
              Compact
            </button>
            <button
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                mode === "detailed" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setMode("detailed")}
              aria-pressed={mode === "detailed"}
            >
              Detailed
            </button>
          </div>
        </div>

        {/* Overview */}
        <div id="overview" className="scroll-mt-24">
          <ReportOverview
            ai={ai}
            fallbackQuery={report.query}
            location={report.location_json}
            reportName={report.name}
            pinnedActions={pinned}
            onUnpin={(id) => setPinned(removePinnedAction(report.id, id))}
          />
        </div>

        {hasActions ? (
          <Section
            id="actions"
            title="What you should do next"
            subtitle="High-signal, practical steps derived from the analysis. Pin the ones you want to execute first."
          >
            <ActionCards
              ai={ai}
              mode={mode}
              pinnedIds={pinnedIds}
              onTogglePin={(a) => setPinned(togglePinnedAction(report.id, a))}
            />
          </Section>
        ) : null}

        {hasGaps ? (
          <Section id="gaps" title="Market gaps" subtitle="Where competitors under-serve customers—and why it matters.">
            <MarketGaps ai={ai} mode={mode} />
          </Section>
        ) : null}

        {hasTrends ? (
          <Section id="demand" title="Market demand" subtitle="Demand direction, keyword interest, and risk notes.">
            <TrendInsights ai={ai} mode={mode} />
          </Section>
        ) : null}

        {hasPatterns ? (
          <Section
            id="patterns"
            title="Competitor patterns"
            subtitle="What most competitors do—and where you can differentiate."
          >
            <CompetitorPatterns ai={ai} mode={mode} />
          </Section>
        ) : null}

        {hasQueries ? <QueryToolkit ai={ai} /> : null}

        {hasEvidence ? (
          <Section id="evidence" title="Evidence summary" subtitle="Claims with supporting sources (collapsed by default).">
            <EvidenceSummary ai={ai} mode={mode} />
          </Section>
        ) : null}

        <Section id="raw" title="Raw insights" subtitle="Optional: full payload for debugging or power users.">
          <RawJsonFallback ai={ai} />
        </Section>
      </div>
    </div>
  );
}
