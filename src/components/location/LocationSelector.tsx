"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Location } from "../../lib/api/endpoints";

function useDebounced<T>(value: T, delayMs: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return v;
}

export function LocationSelector({
  value,
  onChange,
  fetchSuggestions,
  disabled,
}: {
  value: Location | null;
  onChange: (loc: Location | null) => void;
  fetchSuggestions: (q: string) => Promise<Location[]>;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const debounced = useDebounced(query.trim(), 300);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setErr(null);

      if (disabled) return;

      if (debounced.length < 2) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetchSuggestions(debounced);
        if (cancelled) return;
        setItems(res);
        setOpen(true);
      } catch (e: any) {
        if (cancelled) return;
        setErr(e?.message ?? "Failed to load locations");
        setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [debounced, disabled, fetchSuggestions]);

  return (
    <div ref={rootRef} className="relative">
      <label className="block text-sm font-semibold text-gray-900">Location</label>
      <p className="mt-1 text-sm text-gray-600">Type and select from suggestions.</p>

      <div className="mt-2 flex items-center gap-2">
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-60"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value) onChange(null);
          }}
          onFocus={() => {
            if (items.length) setOpen(true);
          }}
          placeholder="e.g., Ottakring, Vienna"
          disabled={!!disabled}
        />

        {value ? (
          <button
            type="button"
            className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
            onClick={() => {
              onChange(null);
              setQuery("");
              setItems([]);
              setOpen(false);
            }}
            disabled={!!disabled}
          >
            Clear
          </button>
        ) : null}
      </div>

      {loading ? <div className="mt-2 text-xs text-gray-500">Loading suggestions…</div> : null}
      {err ? <div className="mt-2 text-xs font-semibold text-red-600">{err}</div> : null}

      {value ? (
        <div className="mt-2 rounded-xl border bg-gray-50 px-3 py-2 text-xs text-gray-700">
          Selected:{" "}
          <span className="font-semibold">
            {value.label}, {value.city} ({value.country_code}) · {value.lat.toFixed(3)}, {value.lon.toFixed(3)}
          </span>
        </div>
      ) : null}

      {open && items.length ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
          {items.map((it, idx) => (
            <button
              key={`${it.label}-${it.lat}-${it.lon}-${idx}`}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-gray-50"
              onClick={() => {
                onChange(it);
                setQuery(`${it.label}, ${it.city}`);
                setOpen(false);
              }}
            >
              <div className="text-sm font-semibold text-gray-900">
                {it.label}, {it.city} ({it.country_code})
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {it.lat.toFixed(3)}, {it.lon.toFixed(3)}
              </div>
            </button>
          ))}
        </div>
      ) : null}

      {!disabled && open && debounced.length >= 2 && !loading && items.length === 0 ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border bg-white p-3 text-xs text-gray-600 shadow-sm">
          No matches. Try “Vienna” or a broader area name.
        </div>
      ) : null}
    </div>
  );
}
