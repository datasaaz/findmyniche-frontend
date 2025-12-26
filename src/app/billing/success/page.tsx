"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/auth-provider";
import { getMe } from "../../../lib/api/endpoints";

export default function BillingSuccessPage() {
  const router = useRouter();
  const { idToken, refreshToken } = useAuth();

  const [status, setStatus] = useState<string>("CHECKOUT_PENDING");
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);

  const canPoll = useMemo(() => Boolean(idToken), [idToken]);

  useEffect(() => {
    let timer: any;
    let poller: any;
    let active = true;

    async function poll() {
      setError(null);

      let token = idToken;
      if (!token) token = await refreshToken();

      if (!token) {
        setError("Missing session token. Please sign in again.");
        return;
      }

      const r = await getMe(token);
      if (!active) return;

      if (!r.ok) {
        setError(r.message);
        return;
      }

      setStatus(r.data.status);

      if (r.data.status === "PAID_ACCESS_ACTIVE") {
        router.replace("/session");
      }
    }

    // countdown
    timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    // poll every 2.5s up to 60s
    poller = setInterval(() => {
      poll();
    }, 2500);

    // kick off immediately
    poll();

    // stop after 60 seconds
    const stopper = setTimeout(() => {
      clearInterval(poller);
    }, 60000);

    return () => {
      active = false;
      clearInterval(timer);
      clearInterval(poller);
      clearTimeout(stopper);
    };
  }, [idToken, refreshToken, router]);

  return (
    <main className="mx-auto max-w-xl py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Processing payment…</h1>
        <p className="mt-2 text-sm text-gray-600">
          We’re confirming your subscription. This page will automatically redirect you once access is unlocked.
        </p>

        <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current status</span>
            <span className="font-medium">{status}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-gray-600">Timeout</span>
            <span className="font-medium">{secondsLeft}s</span>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {!canPoll || secondsLeft === 0 ? (
          <div className="mt-6 rounded-xl border bg-white p-4 text-sm text-gray-700">
            If this is taking longer than expected, please refresh later or return to the app.
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                onClick={() => router.replace("/session")}
              >
                Go to app
              </button>
              <button
                className="rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
