import React from "react";

type Tone = "sage" | "amber" | "blue" | "red" | "neutral";

const toneMap: Record<Tone, string> = {
  sage: "bg-sage-100 text-sage-800 border-sage-500/30",
  amber: "bg-amber-100 text-amber-800 border-amber-500/30",
  blue: "bg-blue-100 text-blue-800 border-blue-500/30",
  red: "bg-red-100 text-red-800 border-red-500/30",
  neutral: "bg-sand-200 text-gray-700 border-gray-300/30",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = "sage", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full border ${toneMap[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
