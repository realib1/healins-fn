"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

const fallbackTimeline = [
  { date: "Today · 08:15", facility: "City Clinic", type: "Consultation", note: "Follow-up visit — blood pressure stable, medication refill authorized." },
  { date: "May 14 · 11:30", facility: "Regional Hospital", type: "Lab Results", note: "Complete blood count — all markers within normal range." },
  { date: "May 10 · 14:00", facility: "City Clinic", type: "Consultation", note: "Initial assessment for recurring headaches. Referred for imaging." },
];

export default function PatientDashboard() {
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  useEffect(() => {
    api
      .get<AuditEntry[]>("audit/PAT-123")
      .then(setAuditLog)
      .catch(() => {
        setAuditLog([
          { actor: "Dr. Ama Mensah", action: "AccessGranted", detail: "Full-read access granted for 24 hours", time: "Today · 08:15" },
          { actor: "City Clinic", action: "RecordAmended", detail: "Encounter ENC-505 clinical note updated", time: "Yesterday · 17:40" },
          { actor: "System", action: "AccessRevoked", detail: "Session expired for Lab Partner", time: "4 days ago · 11:05" },
        ]);
      });
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card>
        <div className="flex flex-col gap-3">
          <Badge tone="blue">Patient Dashboard</Badge>
          <h1 className="text-2xl font-bold text-text">My Health Overview</h1>
          <p className="text-text-muted max-w-2xl">
            Your self-sovereign health record. You control who sees your data, when, and for how long.
          </p>
          <div className="flex gap-3 mt-2">
            <Link href="/patient/access">
              <Button>Manage Access & Audit</Button>
            </Link>
            <Button variant="secondary">Download Records</Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Active Encounters", value: "3", sub: "Across 2 facilities" },
          { label: "Access Grants", value: "1", sub: "Dr. Mensah · 24h window" },
          { label: "Sovereignty Score", value: "98%", sub: "All records patient-owned" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</p>
            <p className="text-3xl font-bold text-text mt-2">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Timeline */}
        <div className="lg:col-span-7">
          <Card>
            <h2 className="text-lg font-bold text-text mb-5">Health Portability Timeline</h2>
            <div className="flex flex-col gap-4">
              {fallbackTimeline.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-sand-200 bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">{item.date}</span>
                    <Badge tone={item.type === "Lab Results" ? "amber" : "sage"}>{item.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-text">{item.facility}</h3>
                  <p className="text-sm text-text-muted mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Audit */}
        <div className="lg:col-span-5">
          <Card variant="sage">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Recent Access Log</h2>
              <Link href="/patient/access">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {auditLog.slice(0, 3).map((entry, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-sage-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-text">{entry.actor}</span>
                    <Badge tone={entry.action === "AccessGranted" ? "sage" : entry.action === "AccessRevoked" ? "red" : "neutral"} className="text-[0.65rem]">
                      {entry.action}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{entry.detail}</p>
                  <p className="text-[0.65rem] text-text-muted mt-1">{entry.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
