// src/lib/api/endpoints.ts
import { apiFetch } from "./api-client";

export type Location = {
  label: string;
  city: string;
  country_code: string;
  lat: number;
  lon: number;
};

export type MeResponse = {
  status: "TRIAL_ACTIVE" | "PAYWALL_REQUIRED" | "CHECKOUT_PENDING" | "PAID_ACCESS_ACTIVE" | "ERROR" | "UNKNOWN";
  uid?: string;
  email?: string | null;
  plan_code?: string;
  quota_used?: number;
  quota_limit?: number;
  quota_remaining?: number;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
};

export type ServiceSearchResponse = {
  ok: boolean;
  quota: { used: number; limit: number; remaining: number };
  status: string;
  saved: boolean;
  report_id: number | null;
  run: any | null;
  ai_response: any;
};

export type ReportSummary = {
  id: number;
  uid: string;
  name: string;
  query: string;
  location_json: Location;
  request_count: number;
  created_at: string;
  updated_at: string;
};

export type ReportsListResponse = {
  ok: boolean;
  reports: ReportSummary[];
};

export type ReportDetailResponse = {
  ok: boolean;
  report: ReportSummary;
  runs: Array<{
    id: number;
    report_id: number;
    run_no: number;
    query: string;
    location_json: Location;
    ai_response_json: any;
    external_report_id?: string | null;
    created_at: string;
  }>;
};

/**
 * Location suggest endpoint response
 */
export type LocationSuggestResponse = {
  ok: boolean;
  items: Location[];
};

export async function postBootstrap(token: string) {
  return apiFetch<{ ok: true; user: any }>(`/auth/bootstrap`, { method: "POST", token });
}

export async function getMe(token: string) {
  return apiFetch<MeResponse>(`/me`, { method: "GET", token });
}

export async function createCheckout(token: string) {
  return apiFetch<{ checkout_url: string }>(`/billing/checkout`, { method: "POST", token });
}

export async function createBillingPortal(token: string) {
  return apiFetch<{ url: string }>(`/billing/portal`, { method: "POST", token });
}

export async function serviceSearch(
  token: string,
  payload: { query: string; location: Location; save: boolean; report_name?: string }
) {
  return apiFetch<ServiceSearchResponse>(`/service/search`, {
    method: "POST",
    token,
    body: payload,
  });
}

export async function listReports(token: string) {
  return apiFetch<ReportsListResponse>(`/reports`, { method: "GET", token });
}

export async function getReport(token: string, reportId: number) {
  return apiFetch<ReportDetailResponse>(`/reports/${reportId}`, { method: "GET", token });
}

export async function deleteReport(token: string, reportId: number) {
  return apiFetch<{ ok: boolean; deleted_report_id: number }>(`/reports/${reportId}`, {
    method: "DELETE",
    token,
  });
}

/**
 * Intelligent location suggestion (backend: GET /locations/suggest?q=...)
 * Uses apiFetch so it automatically uses NEXT_PUBLIC_API_BASE_URL + Bearer token.
 */
export async function suggestLocations(token: string, q: string) {
  // q is user typed text; enforce small length to avoid wasting calls
  const trimmed = q.trim();
  if (trimmed.length < 2) {
    return { ok: true as const, status: 200, message: "ok", data: { items: [] as Location[] } };
  }

  // apiFetch should accept querystrings; we keep URL-encoding here.
  const path = `/locations/suggest?q=${encodeURIComponent(trimmed)}`;

  // Backend returns: { items: Location[] }
  // We normalize into { ok, items } for convenience.
  const r = await apiFetch<{ items: Location[] }>(path, { method: "GET", token });

  if (!r.ok) return r as any;

  return {
    ...r,
    data: {
      items: Array.isArray((r as any).data?.items) ? (r as any).data.items : [],
    },
  };
}
