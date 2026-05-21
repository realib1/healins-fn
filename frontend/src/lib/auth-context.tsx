"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Role = "patient" | "clinician" | "doctor" | "facility" | "admin" | "developer";

export interface Session {
  displayName: string;
  role: Role;
}

interface AuthContextValue {
  session: Session | null;
  login: (session: Session) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const login = useCallback((s: Session) => setSession(s), []);
  const logout = useCallback(() => setSession(null), []);

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
