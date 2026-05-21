"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AdminWorkspace() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card>
        <div className="flex flex-col gap-3">
          <Badge tone="red">Admin</Badge>
          <h1 className="text-2xl font-bold text-text">Governance & System Health</h1>
          <p className="text-text-muted max-w-2xl">
            Monitor network integrity, manage facility governance, and moderate platform activity.
          </p>
        </div>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {[
          { label: "Active Facilities", value: "12", trend: "+2 this month" },
          { label: "Total Practitioners", value: "47", trend: "3 pending verification" },
          { label: "Uptime", value: "99.97%", trend: "Last 30 days" },
          { label: "Event Ledger", value: "14,208", trend: "Append-only, immutable" },
        ].map((m) => (
          <Card key={m.label}>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{m.label}</p>
            <p className="text-2xl font-bold text-text mt-2">{m.value}</p>
            <p className="text-xs text-text-muted mt-1">{m.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Governance Modules */}
        <div className="lg:col-span-7">
          <Card>
            <h2 className="text-lg font-bold text-text mb-5">Governance Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Access Policy Engine", desc: "Define and enforce role-based access policies across the network." },
                { title: "Compliance Monitor", desc: "Track regulatory compliance and generate audit reports for external review." },
                { title: "Facility Onboarding", desc: "Manage the provisioning and configuration of new facilities." },
                { title: "Network Federation", desc: "Control inter-facility data sharing agreements and trust boundaries." },
              ].map((mod) => (
                <div key={mod.title} className="p-4 rounded-xl border border-sand-200 bg-white hover:shadow-sm transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-text">{mod.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{mod.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Moderation Queue */}
        <div className="lg:col-span-5">
          <Card variant="sage">
            <h2 className="text-lg font-bold text-text mb-5">Moderation Queue</h2>
            <div className="flex flex-col gap-3">
              {[
                { title: "Practitioner Verification", scope: "Dr. Kwame Boateng — License #GH-2847", status: "Pending review" },
                { title: "Facility Data Export Request", scope: "Regional Hospital → External Audit", status: "Awaiting approval" },
                { title: "Access Anomaly Detected", scope: "Unusual login pattern — City Clinic", status: "Under investigation" },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-white border border-sage-100">
                  <h3 className="font-semibold text-sm text-text">{item.title}</h3>
                  <p className="text-xs text-text-muted mt-1">{item.scope}</p>
                  <p className="text-xs font-bold text-sage-700 mt-1">{item.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
