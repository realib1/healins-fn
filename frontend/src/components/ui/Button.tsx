import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

const variantMap = {
  primary:
    "bg-sage-700 text-white hover:bg-sage-800 shadow-sm",
  secondary:
    "bg-white text-sage-700 border border-sage-500/30 hover:bg-sage-50 shadow-sm",
  ghost:
    "bg-transparent text-sage-700 hover:bg-sage-50",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-sm" : "px-5 py-2.5 text-sm";
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer ${variantMap[variant]} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
