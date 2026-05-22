/**
 * Component Utility Classes
 * Reusable CSS patterns for consistent component styling
 */

export const componentClasses = {
  // Containers
  container: "max-w-7xl mx-auto px-md",
  containerTight: "max-w-5xl mx-auto px-md",
  containerWide: "max-w-full px-md",

  // Cards and surfaces
  card: "bg-white rounded-lg shadow-md border border-neutral-200",
  cardElevated: "bg-white rounded-lg shadow-lg border border-neutral-100",
  cardFlat: "bg-neutral-50 rounded-lg border border-neutral-200",

  // Glass morphism
  glass:
    "bg-white/65 backdrop-blur-md border border-white/50 shadow-glass rounded-lg",
  glassCard:
    "bg-white/70 backdrop-blur-lg border border-white/80 shadow-glass rounded-lg",

  // Backgrounds
  bgGradient: "bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-100",
  bgGradientAccent: "bg-gradient-to-r from-primary-600 to-secondary-600",

  // Text utilities
  textHeading: "text-neutral-900 font-bold tracking-tight",
  textBody: "text-neutral-800 font-normal leading-relaxed",
  textMuted: "text-neutral-600 font-normal",
  textCaption: "text-neutral-500 text-sm font-medium uppercase tracking-wide",

  // Focus states (accessible)
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  focusRingGlass:
    "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-0",

  // Button variants
  buttonBase:
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none",
  buttonPrimary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",
  buttonSecondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 disabled:opacity-50",
  buttonGhost:
    "text-primary-600 hover:bg-primary-50 active:bg-primary-100 disabled:opacity-50",
  buttonDanger:
    "bg-error text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50",

  // Input variants
  inputBase:
    "w-full px-md py-sm rounded-md border border-neutral-300 bg-white font-normal text-neutral-900 placeholder-neutral-400 transition-colors duration-200",
  inputFocused: "focus:border-primary-500 focus:ring-1 focus:ring-primary-100",
  inputError: "border-error focus:border-error focus:ring-1 focus:ring-red-100",

  // Badges and pills
  badge:
    "inline-flex items-center px-md py-xs rounded-full text-xs font-semibold",
  badgePrimary: "badge bg-primary-100 text-primary-800",
  badgeSuccess: "badge bg-green-100 text-green-800",
  badgeWarning: "badge bg-yellow-100 text-yellow-800",
  badgeError: "badge bg-red-100 text-red-800",

  // Dividers
  dividerHorizontal: "h-px bg-neutral-200",
  dividerVertical: "w-px bg-neutral-200",

  // Flex utilities
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  flexColumnCenter: "flex flex-col items-center justify-center",

  // Grid utilities
  gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg",
  gridTwoCols: "grid grid-cols-1 md:grid-cols-2 gap-lg",

  // Opacity and visibility
  disabledState: "opacity-50 cursor-not-allowed pointer-events-none",
  hiddenVisually: "sr-only",

  // Spacing utilities
  spacingStack: "space-y-md",
  spacingInline: "space-x-md",

  // Interactive states
  hoverElevated:
    "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
  activePressed:
    "active:shadow-sm active:translate-y-0.5 transition-all duration-75",

  // Loading and skeleton
  skeletonBase: "bg-neutral-200 animate-pulse rounded",
  loadingSpinner:
    "animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600",
};

/**
 * Component class builder utilities
 * Combine classes conditionally
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Get component size utility classes
 */
export const sizes = {
  xs: "px-md py-xs text-xs",
  sm: "px-md py-sm text-sm",
  md: "px-lg py-md text-base",
  lg: "px-lg py-lg text-lg",
  xl: "px-xl py-lg text-xl",
} as const;

/**
 * Get button size utilities
 */
export const buttonSizes = {
  xs: "px-md py-xs text-xs h-8",
  sm: "px-md py-sm text-sm h-9",
  md: "px-lg py-md text-base h-10",
  lg: "px-lg py-lg text-lg h-12",
} as const;
