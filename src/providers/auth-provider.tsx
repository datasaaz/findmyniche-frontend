"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase.client";

type AuthContextValue = {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
  refreshToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      async (u) => {
        setError(null);
        setUser(u);

        if (!u) {
          setIdToken(null);
          setLoading(false);
          return;
        }

        try {
          // get a fresh-ish token for API usage
          const token = await u.getIdToken();
          setIdToken(token);
        } catch (e) {
          setIdToken(null);
          setError("Failed to fetch auth token.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("onAuthStateChanged error:", err);
        setError("Authentication listener failed.");
        setUser(null);
        setIdToken(null);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  async function refreshToken() {
    if (!auth.currentUser) return null;
    try {
      const token = await auth.currentUser.getIdToken(true); // force refresh
      setIdToken(token);
      return token;
    } catch (e) {
      console.error("refreshToken error:", e);
      setError("Failed to refresh auth token.");
      return null;
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
    // onAuthStateChanged will clear state
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, idToken, loading, error, refreshToken, signOut }),
    [user, idToken, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
