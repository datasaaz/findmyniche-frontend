import { apiFetch } from "./api-client";

export type Location = {
  label: string;
  city: string;
  country_code: string;
  lat: number;
  lon: number;
};

export type ProductDetails = {
  features: string[];
  target_audience: string;
  pricing: string;
  platforms: string[]; // fixed options in UI, backend stores as array
  benefits: string[];
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
    product_details_json?: ProductDetails | any; // NEW (optional for older rows)
    ai_response_json: any;
    external_report_id?: string | null;
    created_at: string;
  }>;
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
  payload: {
    query: string;
    product_details: ProductDetails; // NEW
    location: Location;
    save: boolean;
    report_name?: string;
  }
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

export async function suggestLocations(token: string, q: string) {
  return apiFetch<{ ok: boolean; items: Location[] }>(`/locations/suggest?q=${encodeURIComponent(q)}`, {
    method: "GET",
    token,
  });
}
