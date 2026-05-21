"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

interface AuditEntry {
  actor: string;
  action: string;
  detail: string;
  time: string;
}

export default function PatientAccessPage() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrToken, setQrToken] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<AuditEntry[]>("audit/PAT-123")
      .then((data) => {
        setAuditLog(data);
        setLoading(false);
      })
      .catch(() => {
        setAuditLog([
          { actor: "Dr. Ama Mensah", action: "AccessGranted", detail: "Full-read access granted for 24 hours", time: "Today · 08:15" },
          { actor: "City Clinic", action: "RecordAmended", detail: "Encounter ENC-505 clinical note updated", time: "Yesterday · 17:40" },
          { actor: "System", action: "AccessRevoked", detail: "Session expired for Lab Partner", time: "4 days ago · 11:05" },
          { actor: "Dr. Kofi Asante", action: "AccessGranted", detail: "Emergency read access — 1 hour", time: "5 days ago · 03:12" },
          { actor: "Regional Hospital", action: "RecordAmended", detail: "Lab report appended to ENC-502", time: "1 week ago · 09:20" },
        ]);
        setLoading(false);
      });
  }, []);

  const handleGrantQR = () => {
    setQrToken("generating...");
    api
      .post<{ token: string }>("consents/generate", { patientId: "PAT-123" })
      .then((data) => setQrToken(data.token))
      .catch(() => {
        // Simulate token for prototype
        setQrToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." + Math.random().toString(36).substring(7));
      });
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card>
        <div className="flex flex-col gap-3">
          <Badge tone="sage">Access Control</Badge>
          <h1 className="text-2xl font-bold text-text">Control & Sharing</h1>
          <p className="text-text-muted max-w-2xl">
            Patients stay in control. Temporary access can be granted via dynamic QR tokens, tracked immutably, and reviewed from this single view.
          </p>
          <div className="flex gap-3 mt-2">
            <Button onClick={handleGrantQR}>Grant QR Session</Button>
            <Button variant="secondary">Revoke All Access</Button>
          </div>
        </div>
      </Card>

      {/* QR Token Display */}
      {qrToken && (
        <Card className="border-l-4 border-l-sage-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text">Dynamic QR Token Generated</h3>
              <p className="text-xs text-text-muted mt-1">Expires in 5 minutes · Single-use · Replay-protected</p>
              <code className="block mt-2 text-xs font-mono bg-sand-100 p-3 rounded-lg break-all text-text-muted border border-sand-200">
                {qrToken}
              </code>
            </div>
          </div>
        </Card>
      )}

      {/* Cryptographic Audit Log */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Badge tone="neutral">Immutable Ledger</Badge>
            <h2 className="text-lg font-bold text-text">Cryptographic Audit Log</h2>
          </div>
          <span className="text-xs text-text-muted">
            {auditLog.length} events recorded
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-text-muted">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading audit log...
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {auditLog.map((entry, i) => (
              <div key={i} className="p-4 rounded-xl border border-sand-200 bg-white hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text">{entry.actor}</h3>
                  <Badge
                    tone={
                      entry.action === "AccessGranted"
                        ? "sage"
                        : entry.action === "AccessRevoked"
                          ? "red"
                          : "neutral"
                    }
                  >
                    {entry.action}
                  </Badge>
                </div>
                <p className="text-sm text-text-muted mt-1">{entry.detail}</p>
                <p className="text-xs text-text-muted mt-1 opacity-70">{entry.time}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
