"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";

export function AppHeader() {
  const { session } = useAuth();

  if (!session) return null;

  return (
    <header className="glass flex items-center justify-between px-6 py-4 rounded-2xl mb-6 sticky top-4 z-50">
      <div className="flex items-center gap-4">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-lg font-bold text-text">Healins</span>
        </div>
        <div className="hidden md:flex items-center bg-sand-100 rounded-full px-4 py-2 border border-sand-200">
          <svg className="w-4 h-4 text-text-muted mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search patients, signals, records..."
            className="bg-transparent border-none outline-none text-sm w-64 placeholder-text-muted text-text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-text-muted hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-sand-200">
          <span className="text-sm font-medium hidden sm:block">{session.displayName}</span>
          <div className="w-9 h-9 rounded-full bg-sage-100 border border-sage-500 flex items-center justify-center">
            <span className="text-sage-700 font-semibold text-sm">
              {session.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
