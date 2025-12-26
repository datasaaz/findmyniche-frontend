"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/auth-provider";
import {
  createBillingPortal,
  createCheckout,
  getMe,
  listReports,
  postBootstrap,
  serviceSearch,
  suggestLocations,
  type Location,
  type MeResponse,
  type ProductDetails,
  type ReportSummary,
} from "../../lib/api/endpoints";
import { LocationSelector } from "../../components/location/LocationSelector";

function normalizeTag(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

function TagInput({
  label,
  help,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  help?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState("");

  function addTag(raw: string) {
    const t = normalizeTag(raw);
    if (!t) return;
    if (value.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    onChange([...value, t]);
    setDraft("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    }
    if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="mt-4">
      <div className="text-sm font-semibold text-gray-900">{label}</div>
      {help ? <p className="mt-1 text-sm text-gray-600">{help}</p> : null}

      <div className="mt-2 flex flex-wrap gap-2 rounded-xl border p-2">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs">
            <span className="text-gray-900">{t}</span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900 disabled:opacity-60"
              onClick={() => onChange(value.filter((x) => x !== t))}
              disabled={!!disabled}
              aria-label={`Remove ${t}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="min-w-[180px] flex-1 border-0 bg-transparent px-2 py-1 text-sm outline-none"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={placeholder ?? "Type and press Enter"}
          disabled={!!disabled}
        />
      </div>

      <div className="mt-1 text-xs text-gray-500">Press Enter or comma to add. Backspace removes last tag.</div>
    </div>
  );
}

const PLATFORM_OPTIONS = ["physical", "online"] as const;

export default function SessionPage() {
  const router = useRouter();
  const { user, idToken, refreshToken, signOut } = useAuth();

  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingMe, setLoadingMe] = useState(false);
  const [meError, setMeError] = useState<string | null>(null);

  // Existing “business description”
  const [idea, setIdea] = useState("");

  // Intelligent selector value (nullable until chosen)
  const [location, setLocation] = useState<Location | null>(null);

  // NEW: product_details
  const [features, setFeatures] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState("");
  const [pricing, setPricing] = useState("");

  // Modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [reportName, setReportName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const [aiResponse, setAiResponse] = useState<any | null>(null);

  const [billingLoading, setBillingLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Past reports
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  const isPaywalled = me?.status === "PAYWALL_REQUIRED";
  const isPaidMonthly = me?.status === "PAID_ACCESS_ACTIVE" && me?.plan_code === "monthly";

  async function getTokenOrRefresh() {
    if (idToken) return idToken;
    return await refreshToken();
  }

  async function loadMe() {
    setLoadingMe(true);
    setMeError(null);
    try {
      const token = await getTokenOrRefresh();
      if (!token) {
        setMeError("No ID token available. Please sign in again.");
        return;
      }

      const b = await postBootstrap(token);
      if (!b.ok) {
        setMeError(`bootstrap failed: ${b.message}`);
        return;
      }

      const r = await getMe(token);
      if (!r.ok) {
        setMeError(`me failed: ${r.message}`);
        return;
      }
      setMe(r.data);
    } finally {
      setLoadingMe(false);
    }
  }

  async function loadReports() {
    setReportsLoading(true);
    try {
      const token = await getTokenOrRefresh();
      if (!token) return;
      const r = await listReports(token);
      if (r.ok) setReports(r.data.reports);
    } finally {
      setReportsLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quotaText = useMemo(() => {
    if (!me) return "—";
    const used = me.quota_used ?? 0;
    const limit = me.quota_limit ?? 0;
    const remaining = me.quota_remaining ?? Math.max(0, limit - used);
    return `${remaining} remaining (used ${used} / ${limit})`;
  }, [me]);

  const periodEndText = useMemo(() => {
    const cpe = me?.current_period_end ?? null;
    if (!cpe) return null;
    try {
      return new Date(cpe).toLocaleString();
    } catch {
      return cpe;
    }
  }, [me]);

  const ideaCharsLeft = 600 - idea.length;

  function buildProductDetails(): ProductDetails {
    return {
      features,
      benefits,
      platforms,
      target_audience: targetAudience.trim(),
      pricing: pricing.trim(),
    };
  }

  function validateProductDetails(pd: ProductDetails): string | null {
    if (!pd.features.length) return "Please add at least 1 feature.";
    if (!pd.benefits.length) return "Please add at least 1 benefit.";
    if (!pd.platforms.length) return "Please choose at least 1 platform.";
    if (!pd.target_audience) return "Please enter the target audience.";
    if (!pd.pricing) return "Please enter the pricing.";
    return null;
  }

  function togglePlatform(p: string) {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function openSaveModal() {
    setUiError(null);

    if (!idea.trim()) {
      setUiError("Please describe your business idea.");
      return;
    }
    if (idea.length > 600) {
      setUiError("Please keep the description within 600 characters.");
      return;
    }
    if (!location) {
      setUiError("Please select a location from the suggestions.");
      return;
    }

    const pd = buildProductDetails();
    const pdErr = validateProductDetails(pd);
    if (pdErr) {
      setUiError(pdErr);
      return;
    }

    setReportName("");
    setShowSaveModal(true);
  }

  async function runSearch(save: boolean, name?: string) {
    setSubmitting(true);
    setUiError(null);
    setAiResponse(null);

    try {
      const token = await getTokenOrRefresh();
      if (!token) {
        setUiError("No session token available. Please sign in again.");
        return;
      }

      if (!location) {
        setUiError("Please select a location from the suggestions.");
        return;
      }

      const pd = buildProductDetails();
      const pdErr = validateProductDetails(pd);
      if (pdErr) {
        setUiError(pdErr);
        return;
      }

      const payload = {
        query: idea.trim(),
        product_details: pd,
        location,
        save,
        ...(save ? { report_name: name } : {}),
      };

      const r = await serviceSearch(token, payload);

      if (!r.ok) {
        if (r.status === 402) {
          await loadMe();
          setUiError("Access requires a subscription. Please subscribe to continue.");
          return;
        }
        if (r.status === 429) {
          await loadMe();
          setUiError(periodEndText ? `Monthly quota exhausted. Resets at ${periodEndText}.` : "Monthly quota exhausted.");
          return;
        }
        if (r.status === 409) {
          setUiError("Report name already exists. Please choose another name.");
          return;
        }
        setUiError(r.message);
        return;
      }

      setAiResponse(r.data.ai_response);

      // If saved, refresh report list
      if (r.data.saved) {
        await loadReports();
      }

      await loadMe();
    } finally {
      setSubmitting(false);
      setShowSaveModal(false);
    }
  }

  async function handleSaveAndRun() {
    const name = reportName.trim();
    if (!name) {
      setUiError("Report name is required.");
      return;
    }
    if (name.length > 50) {
      setUiError("Report name must be 50 characters or less.");
      return;
    }

    // client-side uniqueness check (nice UX; backend still enforces)
    if (reports.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
      setUiError("You already have a report with this name. Please choose another.");
      return;
    }

    await runSearch(true, name);
  }

  async function handleDontSaveAndRun() {
    await runSearch(false);
  }

  async function handleUnlock() {
    setBillingLoading(true);
    try {
      const token = await getTokenOrRefresh();
      if (!token) return;

      const r = await createCheckout(token);
      if (!r.ok) {
        setUiError(`Checkout failed: ${r.message}`);
        return;
      }
      window.location.href = r.data.checkout_url;
    } finally {
      setBillingLoading(false);
    }
  }

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const token = await getTokenOrRefresh();
      if (!token) return;

      const r = await createBillingPortal(token);
      if (!r.ok) {
        setUiError(`Could not open billing portal: ${r.message}`);
        return;
      }
      window.location.href = r.data.url;
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/auth");
    } finally {
      setSigningOut(false);
    }
  }

  // Suggestion loader used by LocationSelector
  async function fetchLocationSuggestions(q: string): Promise<Location[]> {
    const token = await getTokenOrRefresh();
    if (!token) return [];

    const r = await suggestLocations(token, q);
    if (!r.ok) return [];
    return r.data.items as Location[];
  }

  return (
    <div className="min-h-[70vh]">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-gray-900">FindMyNiche MVP</div>
            <div className="text-xs text-gray-500">Session</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
              onClick={() => {
                loadMe();
                loadReports();
              }}
              disabled={loadingMe}
            >
              {loadingMe ? "Refreshing…" : "Refresh"}
            </button>

            {isPaidMonthly ? (
              <button
                className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
                onClick={handleManageSubscription}
                disabled={portalLoading}
              >
                {portalLoading ? "Opening…" : "Manage subscription"}
              </button>
            ) : null}

            <button
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Create a new report</h1>
              <p className="mt-1 text-sm text-gray-600">
                Signed in as <span className="font-medium">{user?.email ?? "—"}</span>
              </p>
              {isPaidMonthly && me?.cancel_at_period_end ? (
                <p className="mt-1 text-sm text-amber-700">
                  Subscription will cancel at period end{periodEndText ? `: ${periodEndText}` : "."}
                </p>
              ) : null}
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-6">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">{me?.status ?? "—"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-6">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{me?.plan_code ?? "—"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-6">
                <span className="text-gray-600">Quota</span>
                <span className="font-medium">{quotaText}</span>
              </div>
              {periodEndText ? (
                <div className="mt-2 flex items-center justify-between gap-6">
                  <span className="text-gray-600">Resets at</span>
                  <span className="font-medium">{periodEndText}</span>
                </div>
              ) : null}
            </div>
          </div>

          {meError ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {meError}
            </div>
          ) : null}

          {uiError ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {uiError}
            </div>
          ) : null}

          <section className="mt-6 rounded-2xl border bg-white p-5">
            <div className="text-sm font-semibold text-gray-900">Business idea</div>
            <p className="mt-1 text-sm text-gray-600">Describe the business you intend to start (max 600 characters).</p>

            <textarea
              className="mt-3 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              maxLength={600}
              placeholder='Example: "I want to start a coffee business in Vienna 1160"'
              disabled={submitting || billingLoading || portalLoading}
            />

            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>Max 600 characters</span>
              <span>{ideaCharsLeft} left</span>
            </div>

            <div className="mt-6">
              <LocationSelector
                value={location}
                onChange={setLocation}
                fetchSuggestions={fetchLocationSuggestions}
                disabled={submitting || billingLoading || portalLoading}
              />
            </div>

            {/* NEW: Product details */}
            <div className="mt-8 border-t pt-6">
              <div className="text-sm font-semibold text-gray-900">Product details</div>
              <p className="mt-1 text-sm text-gray-600">
                Add specifics so the analysis can be more grounded. (Required)
              </p>

              <TagInput
                label="Features"
                help="Examples: chicken and beef, vegan option, fast service"
                value={features}
                onChange={setFeatures}
                placeholder="Type a feature and press Enter"
                disabled={submitting || billingLoading || portalLoading}
              />

              <TagInput
                label="Benefits"
                help="Examples: halal, free mango loco on purchase of more than 10 euro"
                value={benefits}
                onChange={setBenefits}
                placeholder="Type a benefit and press Enter"
                disabled={submitting || billingLoading || portalLoading}
              />

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-900">Platforms</div>
                <p className="mt-1 text-sm text-gray-600">Choose one or more. (Fixed options)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PLATFORM_OPTIONS.map((p) => {
                    const selected = platforms.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        className={
                          selected
                            ? "rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                            : "rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-60"
                        }
                        onClick={() => togglePlatform(p)}
                        disabled={submitting || billingLoading || portalLoading}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-900">Target audience</label>
                <input
                  className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-60"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Example: all genders and all ages"
                  disabled={submitting || billingLoading || portalLoading}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-900">Pricing</label>
                <input
                  className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-60"
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                  placeholder="Example: chicken 10 euro and beef 12 euro"
                  disabled={submitting || billingLoading || portalLoading}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 md:flex-row">
              <button
                className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                onClick={openSaveModal}
                disabled={submitting || billingLoading || portalLoading || isPaywalled}
              >
                {submitting ? "Running…" : "Search"}
              </button>

              {me?.status === "PAYWALL_REQUIRED" ? (
                <button
                  className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50 disabled:opacity-60"
                  onClick={handleUnlock}
                  disabled={billingLoading}
                >
                  {billingLoading ? "Redirecting…" : "Unlock Access"}
                </button>
              ) : null}
            </div>

            {aiResponse ? (
              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-900">AI Insights (saved in DB if you saved the report)</div>
                <pre className="mt-2 max-h-96 overflow-auto rounded-xl border bg-gray-50 p-4 text-xs">
                  {JSON.stringify(aiResponse, null, 2)}
                </pre>
              </div>
            ) : null}
          </section>

          <section className="mt-6 rounded-2xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-900">Past reports</div>
                <div className="mt-1 text-sm text-gray-600">Open a saved report to resume later.</div>
              </div>
              <button
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
                onClick={loadReports}
                disabled={reportsLoading}
              >
                {reportsLoading ? "Loading…" : "Reload"}
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {reports.map((r) => (
                <button
                  key={r.id}
                  className="w-full rounded-xl border px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => router.push(`/reports/${r.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-500">{new Date(r.updated_at).toLocaleString()}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-700 line-clamp-2">{r.query}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {r.location_json.label}, {r.location_json.city} ({r.location_json.country_code}) · requests:{" "}
                    {r.request_count}
                  </div>
                </button>
              ))}
              {reports.length === 0 ? <div className="text-sm text-gray-600">No saved reports yet.</div> : null}
            </div>
          </section>
        </div>
      </main>

      {/* Save modal */}
      {showSaveModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
            <div className="text-sm font-semibold text-gray-900">Save this report?</div>
            <p className="mt-1 text-sm text-gray-600">
              If you save, we will store the query, location, product details and AI response. Report name must be unique and max 50 chars.
            </p>

            <label className="mt-4 block text-sm font-medium text-gray-900" htmlFor="reportName">
              Report name
            </label>
            <input
              id="reportName"
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              maxLength={50}
              placeholder="e.g., Vienna coffee shop idea"
              disabled={submitting}
            />

            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                onClick={handleSaveAndRun}
                disabled={submitting}
              >
                Save & Run
              </button>
              <button
                className="flex-1 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50 disabled:opacity-60"
                onClick={handleDontSaveAndRun}
                disabled={submitting}
              >
                Don’t save
              </button>
            </div>

            <button
              className="mt-3 w-full rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
              onClick={() => setShowSaveModal(false)}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
