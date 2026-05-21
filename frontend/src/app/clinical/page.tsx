"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";

export default function ClinicalWorkspace() {
  const { session } = useAuth();
  const isDoctor = session?.role === "doctor";
  const isFacility = session?.role === "facility";

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card>
        <div className="flex flex-col gap-3">
          <Badge tone="sage">Clinical Workspace</Badge>
          <h1 className="text-2xl font-bold text-text">
            {isFacility ? "Facility Operations Workspace" : "Clinician Operations Workspace"}
          </h1>
          <p className="text-text-muted max-w-2xl">
            {isFacility
              ? "Monitor facility and district intelligence in one operational view."
              : "Manage consultations and patient-linked decision support from one workspace."}
          </p>
          {!isFacility && (
            <div className="mt-2">
              <Button>Scan Patient QR (Access Grant)</Button>
            </div>
          )}
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Operational Signals */}
        <div className="lg:col-span-4">
          <Card>
            <h2 className="text-lg font-bold text-text mb-5">Operational Signals</h2>
            <div className="flex flex-col gap-3">
              {[
                { icon: "👤", title: "Staff Meeting", sub: "Key meeting staff", time: "10:00 AM", bg: "bg-sage-100" },
                { icon: "🧪", title: "Lab Results", sub: "Patient J. Doe", time: "10:00 AM", bg: "bg-orange-50" },
                { icon: "💊", title: "Pharmacy Update", sub: "Inventory stock check", time: "9:00 AM", bg: "bg-amber-50" },
                { icon: "📋", title: "Report Meeting", sub: "Patient Adorson", time: "2:00 PM", bg: "bg-blue-50" },
              ].map((signal, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-sage-50 transition-colors cursor-pointer border border-transparent hover:border-sage-100">
                  <div className={`w-10 h-10 rounded-full ${signal.bg} flex items-center justify-center shrink-0 text-lg`}>
                    {signal.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text truncate">{signal.title}</h3>
                    <p className="text-sm text-text-muted mt-0.5 truncate">{signal.sub}</p>
                  </div>
                  <span className="text-xs font-medium text-text-muted whitespace-nowrap">{signal.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Patient Queue */}
        <div className="lg:col-span-5">
          <Card variant="transparent">
            <h2 className="text-lg font-bold text-text mb-5">Patient Queue</h2>
            <div className="flex flex-col gap-4">
              {[
                { num: 1, name: "James Miller", time: "10:15 AM", room: "302", status: "Waiting", statusColor: "amber", accent: "bg-sage-500" },
                { num: 2, name: "Sarah Chen", time: "10:30 AM", room: "305", status: null, statusColor: "", accent: "" },
                { num: 3, name: "Robert Davis", time: "10:45 AM", room: "301", status: "In-Consult", statusColor: "blue", accent: "bg-blue-400" },
                { num: 4, name: "Maria Lopez", time: "11:00 AM", room: "304", status: null, statusColor: "", accent: "" },
              ].map((p) => (
                <div key={p.num} className="bg-white rounded-2xl p-5 shadow-sm border border-sand-200 relative overflow-hidden">
                  {p.accent && <div className={`absolute left-0 top-0 bottom-0 w-1 ${p.accent}`} />}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <span className={`text-2xl font-light ${p.num === 1 ? "text-sage-500" : "text-text-muted"}`}>#{p.num}</span>
                      <div>
                        <h3 className="text-lg font-bold text-text">{p.name}</h3>
                        <p className="text-sm text-text-muted mt-1">{p.time} · Room {p.room}</p>
                      </div>
                    </div>
                    {p.status && <Badge tone={p.statusColor as "amber" | "blue"}>{p.status}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Facility Metrics */}
        <div className="lg:col-span-3">
          <Card variant="sage">
            <h2 className="text-lg font-bold text-text mb-5">Facility Metrics</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100">
                <h3 className="text-sm font-semibold text-text">Wait Times</h3>
                <div className="text-xl font-bold text-text mt-1">Avg: 18 min</div>
                <div className="flex items-end gap-1.5 h-10 mt-3">
                  {[30, 20, 50, 35, 80, 40, 60].map((h, i) => (
                    <div key={i} className={`w-full rounded-t-sm ${i === 4 ? "bg-sage-500" : "bg-sage-100"}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100">
                <h3 className="text-sm font-semibold text-text">Room Occupancy</h3>
                <div className="text-xl font-bold text-text mt-1">8/10</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100">
                <h3 className="text-sm font-semibold text-text">Lab Processing</h3>
                <div className="text-xl font-bold text-text mt-1">95% complete</div>
                <div className="w-full h-2 bg-sage-100 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-sage-700 rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Doctor-only: AI Insights Panel */}
      {isDoctor && (
        <Card className="border-l-4 border-l-purple-400">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-text">AI Health Intelligence</h2>
                <Badge tone="sage">Doctor Only</Badge>
              </div>
              <p className="text-sm text-text-muted mb-4">
                Real-time insights powered by the async BullMQ pipeline. Results are pushed via WebSocket as soon as AI processing completes.
              </p>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-sm text-purple-800">
                <p className="font-semibold">🔮 AI Narrative flagged one recurrence pattern for priority review.</p>
                <p className="mt-1 text-purple-600">Patient J. Doe — Medication adherence score: 78%</p>
              </div>
              <div className="mt-4">
                <Button variant="secondary" size="sm">Generate AI Summary</Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
