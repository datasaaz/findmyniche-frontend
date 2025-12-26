"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../providers/auth-provider";
import { deleteReport, getReport, type ReportDetailResponse } from "../../../lib/api/endpoints";
import { ReportDashboard } from "../../../components/report/ReportDashboard";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();

  const rawId = params?.id;
  const reportId =
    typeof rawId === "string" ? Number(rawId) : Array.isArray(rawId) ? Number(rawId[0]) : Number.NaN;

  const { idToken, refreshToken } = useAuth();

  const [data, setData] = useState<ReportDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteErr, setDeleteErr] = useState<string | null>(null);

  async function token() {
    return idToken ?? (await refreshToken());
  }

  async function load() {
    if (!Number.isFinite(reportId)) {
      setErr("Invalid report id.");
      return;
    }

    setLoading(true);
    setErr(null);
    try {
      const t = await token();
      if (!t) {
        setErr("No session token. Please sign in again.");
        return;
      }

      const r = await getReport(t, reportId);
      if (!r.ok) {
        setErr(r.message);
        return;
      }

      setData(r.data);

      const runs = r.data.runs ?? [];
      if (runs.length) {
        const latest = [...runs].sort((a, b) => (b.run_no ?? 0) - (a.run_no ?? 0))[0];
        setSelectedRunId(latest.id);
      } else {
        setSelectedRunId(null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    if (!Number.isFinite(reportId)) return;

    setDeleting(true);
    setDeleteErr(null);
    try {
      const t = await token();
      if (!t) {
        setDeleteErr("No session token. Please sign in again.");
        return;
      }

      const r = await deleteReport(t, reportId);
      if (!r.ok) {
        setDeleteErr(r.message);
        return;
      }

      // Redirect back to session after delete
      router.push("/session");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawId]);

  const report = data?.report ?? null;
  const runs = data?.runs ?? [];

  const selectedRun = useMemo(() => {
    if (!runs.length || !selectedRunId) return null;
    return runs.find((r) => r.id === selectedRunId) ?? null;
  }, [runs, selectedRunId]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <ConfirmModal
        open={confirmOpen}
        title="Delete this report?"
        message="This will permanently delete the report and its saved history. This action cannot be undone."
        confirmText={deleting ? "Deleting…" : "Yes, delete"}
        cancelText="Cancel"
        danger
        onCancel={() => (deleting ? null : setConfirmOpen(false))}
        onConfirm={onDelete}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm text-gray-500">Report viewer</div>
          <h1 className="text-xl font-semibold text-gray-900">{report?.name ?? "—"}</h1>
          <div className="mt-1 text-sm text-gray-600">{report ? `Requests: ${report.request_count}` : ""}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {runs.length ? (
            <select
              className="rounded-xl border px-3 py-2 text-sm"
              value={selectedRunId ?? ""}
              onChange={(e) => setSelectedRunId(Number(e.target.value))}
            >
              {runs
                .slice()
                .sort((a, b) => (b.run_no ?? 0) - (a.run_no ?? 0))
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    Run #{r.run_no} — {new Date(r.created_at).toLocaleString()}
                  </option>
                ))}
            </select>
          ) : null}

          <button
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            onClick={() => router.push("/session")}
          >
            Back
          </button>

          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>

          <button
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            onClick={() => setConfirmOpen(true)}
            disabled={!report || deleting}
          >
            Delete
          </button>
        </div>
      </div>

      {loading ? <div className="mt-6 text-sm text-gray-600">Loading…</div> : null}
      {err ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{err}</div>
      ) : null}
      {deleteErr ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {deleteErr}
        </div>
      ) : null}

      {report ? (
        <div className="mt-6">
          <ReportDashboard report={report} run={selectedRun} />
        </div>
      ) : null}

      {!loading && report && runs.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-5 text-sm text-gray-700">
          No runs yet for this report. Run the analysis from the session page to generate insights.
        </div>
      ) : null}
    </main>
  );
}
