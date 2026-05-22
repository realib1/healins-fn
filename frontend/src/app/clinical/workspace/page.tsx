"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePatient } from "@/lib/stores/patient-provider";
import { useEncounters } from "@/lib/stores/encounter-provider";
import { EncounterForm } from "@/components/ui/EncounterForm";

export default function ClinicalWorkspace() {
  const { patient, fetchPatient } = usePatient();
  const { encounters, fetchEncounters, addEncounter } = useEncounters();

  // For prototype, use fixed patientId from sessionStorage or fallback
  useEffect(() => {
    const pid = sessionStorage.getItem("patientId") || "pat-001";
    fetchPatient(pid);
    fetchEncounters();
  }, []); // Only run once on mount

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left panel */}
      <aside className="col-span-3">
        <Card>
          <h3 className="font-bold">Patient Queue</h3>
          <div className="mt-3 space-y-2">
            <div className="p-2 border rounded">
              Dr. Ama — {patient?.fullName ?? "No patient"}
            </div>
          </div>
        </Card>
      </aside>

      {/* Main Workspace */}
      <section className="col-span-9">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Clinical Workspace</h1>
          <p className="text-gray-600">Patient: {patient?.fullName ?? "—"}</p>
        </div>
        
        {/* Pass standard test patientId and a mockup clinicianId */}
        <EncounterForm patientId={patient?.id ?? "pat-001"} clinicianId="clinician-001" />
      </section>
    </div>
  );
}
