"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BillingCancelPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-xl py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Payment cancelled</h1>
        <p className="mt-2 text-sm text-gray-600">
          No worries—your subscription wasn’t completed. You can try again anytime.
        </p>

        <div className="mt-6 flex gap-2">
          <button
            className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => router.replace("/session")}
          >
            Back to app
          </button>
          <button
            className="rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
            onClick={() => router.replace("/session")}
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
