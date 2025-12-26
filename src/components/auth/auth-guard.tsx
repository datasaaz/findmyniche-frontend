"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/auth-provider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
          Checking session…
        </div>
      </div>
    );
  }

  if (!user) return null; // redirect in progress

  return <>{children}</>;
}
