"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "./Button";
import { Card } from "./Card";
import { Badge } from "./Badge";

export function PermissionGrantModal({
  patientId,
  onClose,
  onGranted,
}: {
  patientId: string;
  onClose: () => void;
  onGranted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinicianId, setClinicianId] = useState("");
  const [duration, setDuration] = useState("24");

  const handleGrant = async () => {
    if (!clinicianId) return setError("Please enter a Clinician ID");
    
    setLoading(true);
    setError(null);
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + parseInt(duration, 10));

      await api.post("permissions/grant", {
        patientId,
        clinicianId,
        expiresAt: expiresAt.toISOString(),
        reason: "Patient initiated grant",
      });
      onGranted();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Grant Access</h2>
            <p className="text-sm text-gray-600">Give a clinician temporary access to your records.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinician ID
            </label>
            <input
              type="text"
              value={clinicianId}
              onChange={(e) => setClinicianId(e.target.value)}
              placeholder="e.g. Dr. Ama Mensah"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="1">1 Hour</option>
              <option value="24">24 Hours</option>
              <option value="168">1 Week</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleGrant} disabled={loading}>
              {loading ? "Granting..." : "Grant Access"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
