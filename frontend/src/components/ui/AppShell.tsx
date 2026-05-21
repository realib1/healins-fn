"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/ui/Sidebar";
import { AppHeader } from "@/components/ui/AppHeader";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const pathname = usePathname();

  // Auth page gets a clean, full-width layout
  const isAuthPage = pathname === "/" || pathname === "/auth";

  if (!session || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0">
        <AppHeader />
        <main className="flex-1 max-w-7xl w-full">{children}</main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner>{children}</ShellInner>
    </AuthProvider>
  );
}
