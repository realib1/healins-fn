"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, type Role } from "@/lib/auth-context";

interface NavItem {
  label: string;
  href: string;
  roles: Role[];
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Clinical",
    href: "/clinical",
    roles: ["facility", "clinician", "doctor"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Patient",
    href: "/patient",
    roles: ["patient"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Admin",
    href: "/admin",
    roles: ["admin", "developer"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Developer",
    href: "/developer",
    roles: ["developer"],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { session, logout } = useAuth();
  const pathname = usePathname();

  if (!session) return null;

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(session.role)
  );

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 p-6 shrink-0">
      {/* Brand */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-text">Healins</h1>
            <p className="text-xs text-text-muted">Federated Health Network</p>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]" />
          Network Active
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {visibleItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-sage-100 text-sage-800 border border-sage-500/20"
                  : "text-text-muted hover:bg-sand-100 hover:text-text border border-transparent"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="glass-card p-5">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-text-muted">Signed in as</p>
        <p className="mt-1 text-sm font-bold text-text">{session.displayName}</p>
        <p className="mt-0.5 text-xs text-text-muted capitalize">{session.role}</p>
        <button
          onClick={logout}
          className="mt-4 w-full text-center text-xs font-semibold text-red-600 hover:text-red-700 py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
