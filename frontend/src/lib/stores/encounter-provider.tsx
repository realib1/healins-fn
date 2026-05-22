"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";

type Encounter = any;

type EncounterContextValue = {
  encounters: Encounter[];
  loading: boolean;
  error: string | null;
  fetchEncounters: () => Promise<void>;
  addEncounter: (payload: Partial<Encounter>) => Promise<any>;
};

const EncounterContext = createContext<EncounterContextValue | undefined>(undefined);

export const EncounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEncounters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = (await api.get(`encounters`)) as any;
      setEncounters(res.items || res);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const addEncounter = useCallback(async (payload: Partial<Encounter>) => {
    const res = (await api.post(`encounters`, payload)) as any;
    // naive update
    setEncounters((s) => [res, ...s]);
    return res;
  }, []);

  return (
    <EncounterContext.Provider
      value={{ encounters, loading, error, fetchEncounters, addEncounter }}
    >
      {children}
    </EncounterContext.Provider>
  );
};

export function useEncounters() {
  const ctx = useContext(EncounterContext);
  if (!ctx) throw new Error("useEncounters must be used within EncounterProvider");
  return ctx;
}
