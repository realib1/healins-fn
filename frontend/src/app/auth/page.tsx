"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Role } from "@/lib/auth-context";

interface RoleOption {
  role: Role;
  label: string;
  displayName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const roles: RoleOption[] = [
  {
    role: "patient",
    label: "Patient",
    displayName: "Ama Mensah",
    description: "View your health records, control access, and review the cryptographic audit log.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "from-blue-400 to-blue-600",
  },
  {
    role: "clinician",
    label: "Clinician",
    displayName: "Dr. Kofi Asante",
    description: "Manage consultations, patient queues, and clinical decision support.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "from-sage-500 to-sage-700",
  },
  {
    role: "doctor",
    label: "Doctor",
    displayName: "Dr. Elara Vance",
    description: "Full clinical workspace with AI insights, verified timelines, and prescriptions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "from-purple-400 to-purple-600",
  },
  {
    role: "facility",
    label: "Facility",
    displayName: "City Clinic Admin",
    description: "Monitor facility operations, stock levels, and district-level intelligence.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: "from-amber-400 to-amber-600",
  },
  {
    role: "admin",
    label: "Admin",
    displayName: "System Admin",
    description: "Governance, system health monitoring, and network moderation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "from-red-400 to-red-600",
  },
  {
    role: "developer",
    label: "Developer",
    displayName: "Superadmin",
    description: "Tenant control, API monitoring, and system configuration.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: "from-gray-500 to-gray-700",
  },
];

const roleRouteMap: Record<Role, string> = {
  patient: "/patient",
  clinician: "/clinical",
  doctor: "/clinical",
  facility: "/clinical",
  admin: "/admin",
  developer: "/developer",
};

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSelect = (option: RoleOption) => {
    login({ displayName: option.displayName, role: option.role });
    router.push(roleRouteMap[option.role]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Hero */}
      <div className="text-center mb-12 max-w-xl">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-lg mx-auto mb-6">
          <span className="text-white font-bold text-2xl">H</span>
        </div>
        <h1 className="text-3xl font-bold text-text mb-3">Welcome to Healins</h1>
        <p className="text-text-muted text-lg leading-relaxed">
          Self-sovereign health data. Choose your role to enter the federated clinical workspace.
        </p>
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full">
        {roles.map((option) => (
          <button
            key={option.role}
            onClick={() => handleSelect(option)}
            className="group glass-card p-6 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(139,167,151,0.3)]"
          >
            <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${option.color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {option.icon}
            </div>
            <h3 className="text-lg font-bold text-text mb-1">{option.label}</h3>
            <p className="text-xs text-text-muted font-medium mb-2">{option.displayName}</p>
            <p className="text-sm text-text-muted leading-relaxed">{option.description}</p>
          </button>
        ))}
      </div>

      <p className="mt-10 text-xs text-text-muted">
        Prototype mode · No credentials required
      </p>
    </div>
  );
}
