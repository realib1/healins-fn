import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "sage" | "transparent";
}

export function Card({ children, className = "", variant = "default" }: CardProps) {
  const base =
    variant === "sage"
      ? "glass-card bg-sage-50/50"
      : variant === "transparent"
        ? "glass-card bg-white/40"
        : "glass-card";

  return <div className={`${base} p-6 ${className}`}>{children}</div>;
}
