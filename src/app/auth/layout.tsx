"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/auth-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If user is already signed in, block /auth and send them to the protected area
    if (!loading && user) {
      router.replace("/session"); // change to "/app" if that becomes your protected route
    }
  }, [loading, user, router]);

  // While resolving auth state, show a minimal loading UI
  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
          Checking session…
        </div>
      </div>
    );
  }

  // If signed in, redirect is in progress
  if (user) return null;

  return <>{children}</>;
}
