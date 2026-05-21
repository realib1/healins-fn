"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function DeveloperWorkspace() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card>
        <div className="flex flex-col gap-3">
          <Badge tone="neutral">Developer / Superadmin</Badge>
          <h1 className="text-2xl font-bold text-text">Tenant Control & System Config</h1>
          <p className="text-text-muted max-w-2xl">
            Infrastructure monitoring, API health, queue management, and tenant provisioning.
          </p>
        </div>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {[
          { label: "API Latency (p99)", value: "42ms", sub: "NestJS @ port 8000" },
          { label: "BullMQ Queue", value: "0 pending", sub: "ai-insights queue" },
          { label: "Redis", value: "Connected", sub: "Port 6380" },
          { label: "PostgreSQL", value: "Healthy", sub: "Prisma ORM connected" },
        ].map((m) => (
          <Card key={m.label}>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{m.label}</p>
            <p className="text-xl font-bold text-text mt-2">{m.value}</p>
            <p className="text-xs text-text-muted mt-1">{m.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* API & Infrastructure */}
        <div className="lg:col-span-7">
          <Card>
            <h2 className="text-lg font-bold text-text mb-5">API Routes & Infrastructure</h2>
            <div className="space-y-2">
              {[
                { method: "GET", path: "/v1/patients", status: "✓ Active" },
                { method: "GET", path: "/v1/patients/:id", status: "✓ Active" },
                { method: "GET", path: "/v1/audit/:patientId", status: "✓ Active" },
                { method: "GET", path: "/v1/facilities", status: "✓ Active" },
                { method: "GET", path: "/v1/encounters", status: "✓ Active" },
                { method: "GET", path: "/v1/forecast/summary", status: "✓ Active" },
                { method: "POST", path: "/v1/ai/insights", status: "✓ Async (BullMQ)" },
                { method: "WS", path: "AI_INSIGHT_READY", status: "✓ Socket.IO" },
              ].map((route) => (
                <div key={route.path} className="flex items-center justify-between p-3 rounded-lg bg-sand-50 border border-sand-200 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      route.method === "POST" ? "bg-amber-100 text-amber-700"
                        : route.method === "WS" ? "bg-purple-100 text-purple-700"
                          : "bg-sage-100 text-sage-700"
                    }`}>
                      {route.method}
                    </span>
                    <span className="text-text">{route.path}</span>
                  </div>
                  <span className="text-xs text-sage-700 font-semibold">{route.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tenant & Config */}
        <div className="lg:col-span-5">
          <Card variant="sage">
            <h2 className="text-lg font-bold text-text mb-5">Tenant Configuration</h2>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-white border border-sage-100">
                <h3 className="font-semibold text-sm text-text">Prisma Schema</h3>
                <p className="text-xs text-text-muted mt-1">Organization, Location, Practitioner, Patient, ClinicalEvent</p>
                <p className="text-xs font-bold text-sage-700 mt-1">5 models · FHIR-aligned</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-sage-100">
                <h3 className="font-semibold text-sm text-text">Event Sourcing</h3>
                <p className="text-xs text-text-muted mt-1">Append-only ClinicalEvent ledger</p>
                <p className="text-xs font-bold text-sage-700 mt-1">EncounterCreated · DiagnosisConfirmed</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-sage-100">
                <h3 className="font-semibold text-sm text-text">Async Pipeline</h3>
                <p className="text-xs text-text-muted mt-1">BullMQ → AiProcessor → AiGateway (WebSocket)</p>
                <p className="text-xs font-bold text-sage-700 mt-1">Queue: ai-insights</p>
              </div>
              <Button variant="secondary" size="sm">Run Database Migration</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
