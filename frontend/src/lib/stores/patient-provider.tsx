"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { api } from "@/lib/api";

type Patient = any;

type PatientContextValue = {
  patient: Patient | null;
  loading: boolean;
  error: string | null;
  fetchPatient: (patientId: string) => Promise<void>;
  clear: () => void;
};

const PatientContext = createContext<PatientContextValue | undefined>(
  undefined,
);

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = useCallback(async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const p = await api.get(`/patients/${patientId}`);
      setPatient(p);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => setPatient(null), []);

  return (
    <PatientContext.Provider
      value={{ patient, loading, error, fetchPatient, clear }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error("usePatient must be used within PatientProvider");
  return ctx;
}
