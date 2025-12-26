import React from "react";
import { AuthGuard } from "../../components/auth/auth-guard";

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
