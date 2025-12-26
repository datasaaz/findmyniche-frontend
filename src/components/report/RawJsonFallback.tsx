"use client";

import React, { useState } from "react";

export function RawJsonFallback({ ai }: { ai: any }) {
  const [open, setOpen] = useState(false);
  if (!ai) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-600">
          For debugging schema changes or power users who want the full payload.
        </div>
        <button
          className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open ? (
        <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl border bg-gray-50 p-4 text-xs">
          {JSON.stringify(ai, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
