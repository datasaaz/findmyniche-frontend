export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

function getApiBaseUrl() {
  const base = 'http://127.0.0.1:8000';
  if (!base) throw new Error("Missing API_BASE_URL env var");
  return base.replace(/\/+$/, "");
}

export async function apiFetch<T>(
  path: string,
  opts: {
    method?: string;
    token?: string | null;
    body?: unknown;
    signal?: AbortSignal;
  } = {}
): Promise<ApiResult<T>> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  try {
    const res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

    if (!res.ok) {
      const message =
        (payload && typeof payload === "object" && "detail" in payload && String((payload as any).detail)) ||
        (typeof payload === "string" && payload) ||
        `Request failed (${res.status})`;
      return { ok: false, status: res.status, message };
    }

    return { ok: true, data: payload as T };
  } catch (e: any) {
    return { ok: false, status: 0, message: e?.message ?? "Network error" };
  }
}
