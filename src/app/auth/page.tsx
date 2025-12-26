"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  friendlyAuthError,
  signInEmail,
  signUpEmail,
  signInGoogle,
  signInMicrosoft,
} from "../../lib/firebase/auth.actions";;

type Mode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.length >= 6 && !loading;
  }, [email, password, loading]);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUpEmail(email.trim(), password);
      } else {
        await signInEmail(email.trim(), password);
      }
      router.replace("/app");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleProvider(fn: () => Promise<unknown>) {
    setError(null);
    setLoading(true);
    try {
      await fn();
      router.replace("/session");
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <p className="mt-1 text-sm text-gray-600">
          {mode === "signup" ? "Create your account." : "Sign in to continue."}
        </p>

        {/* Mode toggle */}
        <div className="mt-5 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              mode === "signin" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              mode === "signup" ? "bg-white shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {/* Provider buttons */}
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={() => handleProvider(signInGoogle)}
            disabled={loading}
            className="w-full rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleProvider(signInMicrosoft)}
            disabled={loading}
            className="w-full rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Continue with Microsoft
          </button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Email/password */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              inputMode="email"
              autoComplete="email"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters.</p>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        By continuing, you agree to the MVP terms.
      </p>
    </main>
  );
}
