"use client";

import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { useMedicationsStore } from "@/lib/stores/medications-store";
import { useEncounters } from "@/lib/stores/encounter-provider";

export function EncounterForm({ patientId, clinicianId }: { patientId: string; clinicianId: string }) {
  const { medications, isLoading, error, fetchMedications, addMedication } = useMedicationsStore();
  const { encounters } = useEncounters();

  const [medName, setMedName] = useState("");
  const [medDose, setMedDose] = useState("");
  const [medFreq, setMedFreq] = useState("");
  const [isPrescribing, setIsPrescribing] = useState(false);

  useEffect(() => {
    // Only fetch if patientId changes
    if (patientId) {
      fetchMedications(patientId);
    }
  }, [patientId]); // Remove fetchMedications from deps

  const patientMeds = medications[patientId] || [];
  const patientEncounters = encounters || [];

  const handlePrescribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !medDose || !medFreq) return;

    await addMedication(patientId, {
      name: medName,
      dose: medDose,
      frequency: medFreq,
      startDate: new Date().toISOString(),
      clinicianId,
    });

    setIsPrescribing(false);
    setMedName("");
    setMedDose("");
    setMedFreq("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Timeline View */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Clinical Timeline</h2>
        <div className="space-y-4">
          {patientEncounters.length === 0 ? (
            <p className="text-gray-500">No previous encounters found.</p>
          ) : (
            patientEncounters.map((enc: any) => (
              <div key={enc.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{enc.visitDate ? new Date(enc.visitDate).toLocaleDateString() : "Unknown Date"}</span>
                  <Badge tone="sage">{enc.diagnosis}</Badge>
                </div>
                <p className="text-sm text-gray-700">{enc.notes || "No notes available."}</p>
                {enc.medicines && enc.medicines.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">Meds: {enc.medicines.join(", ")}</p>
                )}
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Medications and Prescribing */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Active Medications</h2>
          <Button size="sm" onClick={() => setIsPrescribing(!isPrescribing)}>
            {isPrescribing ? "Cancel" : "+ Prescribe"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isPrescribing && (
          <form onSubmit={handlePrescribe} className="mb-6 p-4 border border-sage-200 bg-sage-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medication Name</label>
              <input type="text" value={medName} onChange={e => setMedName(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g. Amoxicillin" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dose</label>
                <input type="text" value={medDose} onChange={e => setMedDose(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g. 500mg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <input type="text" value={medFreq} onChange={e => setMedFreq(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g. Twice daily" required />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Saving..." : "Sign & Prescribe"}
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {isLoading && patientMeds.length === 0 ? (
            <p className="text-gray-500">Loading medications...</p>
          ) : patientMeds.length === 0 ? (
            <p className="text-gray-500">No active medications.</p>
          ) : (
            patientMeds.map((med) => (
              <div key={med.id} className="flex justify-between items-center p-3 border-b">
                <div>
                  <p className="font-semibold">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dose} • {med.frequency}</p>
                </div>
                <Badge tone="blue">Active</Badge>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
