/**
 * Design System Tokens
 * Core tokens for the Healins clinical design system
 * Premium aesthetic with reduced visual noise
 */

export const DESIGN_TOKENS = {
  // Color semantic roles
  colors: {
    // Primary actions and navigation
    primary: "#4a6355",
    primaryLight: "#8ba797",
    primaryDark: "#3b5044",

    // Secondary: supporting actions
    secondary: "#3076ec",
    secondaryLight: "#7eb7fb",

    // Accent: highlights and emphasis (minimal use)
    accent: "#ff6b2a",

    // Status indicators
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",

    // Backgrounds
    bgPrimary: "#fcfbf9",
    bgSecondary: "#f6f3eb",
    bgTertiary: "#e8e2d4",

    // Text
    textPrimary: "#2d3748",
    textSecondary: "#718096",
    textTertiary: "#a0aec0",

    // Borders
    borderLight: "#e2ede6",
    borderMedium: "#c9dfd3",
    borderDark: "#8ba797",
  },

  // Spacing system (4px base)
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  // Border radius (organic)
  radius: {
    xs: "0.375rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    pill: "9999px",
  },

  // Typography
  typography: {
    // Heading styles
    heading: {
      xl: {
        fontSize: "2.5rem", // 40px
        lineHeight: "3rem",
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      lg: {
        fontSize: "2rem", // 32px
        lineHeight: "2.5rem",
        fontWeight: 700,
      },
      md: {
        fontSize: "1.5rem", // 24px
        lineHeight: "2rem",
        fontWeight: 700,
      },
      sm: {
        fontSize: "1.25rem", // 20px
        lineHeight: "1.75rem",
        fontWeight: 600,
      },
    },
    // Body text
    body: {
      lg: {
        fontSize: "1.125rem", // 18px
        lineHeight: "1.75rem",
        fontWeight: 400,
      },
      base: {
        fontSize: "1rem", // 16px
        lineHeight: "1.5rem",
        fontWeight: 400,
      },
      sm: {
        fontSize: "0.875rem", // 14px
        lineHeight: "1.25rem",
        fontWeight: 400,
      },
      xs: {
        fontSize: "0.75rem", // 12px
        lineHeight: "1rem",
        fontWeight: 400,
      },
    },
    // Labels and UI text
    label: {
      md: {
        fontSize: "0.875rem", // 14px
        lineHeight: "1.25rem",
        fontWeight: 600,
        letterSpacing: "0.025em",
      },
      sm: {
        fontSize: "0.75rem", // 12px
        lineHeight: "1rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
      },
    },
  },

  // Shadows (depth hierarchy)
  shadows: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 4px 12px -4px rgba(0, 0, 0, 0.08)",
    md: "0 10px 24px -8px rgba(74, 99, 85, 0.12)",
    lg: "0 20px 40px -12px rgba(74, 99, 85, 0.15)",
    xl: "0 25px 50px -12px rgba(74, 99, 85, 0.2)",
    glass: "0 8px 32px 0 rgba(74, 99, 85, 0.1)",
  },

  // Transitions
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    modal: 1050,
    tooltip: 1070,
  },

  // Breakpoints (mobile-first)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
