# Design System Documentation

## Overview

Healins uses a premium, clinical-focused design system built on **Tailwind CSS v4** with a CSS-first configuration. The aesthetic emphasizes reduced visual noise, clear information hierarchy, and professional trust.

## Architecture

### 1. **Tailwind v4 CSS-First Setup**

- **Config**: `frontend/tailwind.config.ts` — minimal, mainly for plugins
- **Theme**: Defined in `frontend/src/app/globals.css` using `@theme inline`
- **Utilities**: Custom component utilities via `@utility` rules in globals.css

### 2. **Color Palette**

#### Foundation Colors
- **Sand** (Neutral): `#fcfbf9` → `#2d2620` — clean, warm neutrals
- **Sage** (Primary): `#4a6355` — clinical calm, trust, professionalism
- **Secondary** (Blue): `#3076ec` — competence, health, clarity
- **Accent** (Terracotta): `#ff6b2a` — vitality, energy (sparingly used)

All colors are defined as CSS custom properties in `:root` and referenced in `@theme inline`.

### 3. **Typography**

**Scale**:
- Heading XL: 2.5rem (40px) — page titles
- Heading LG: 2rem (32px) — section headers
- Heading MD: 1.5rem (24px) — subsections
- Body LG: 1.125rem (18px) — prominent text
- Body: 1rem (16px) — default body copy
- Body SM: 0.875rem (14px) — secondary info
- Muted: 0.75rem (12px) — labels, hints

**Weights**:
- 300 (Light) — de-emphasized
- 400 (Normal) — body text
- 500 (Medium) — labels
- 600 (Semibold) — emphasis
- 700 (Bold) — headings

### 4. **Spacing System**

4px base unit:
- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 1.5rem (24px)
- LG: 2rem (32px)
- XL: 2.5rem (40px)

### 5. **Components**

Located in `frontend/src/components/ui/`:

- **Button.tsx** — Primary, secondary, ghost variants
- **Card.tsx** — Elevated, flat, glass morphism surfaces
- **Badge.tsx** — Status, semantic coloring
- **AppHeader.tsx** — Top navigation
- **AppShell.tsx** — Layout wrapper
- **Sidebar.tsx** — Side navigation

#### Usage Example

```tsx
import { Button } from '@/components/ui/Button';

export default function Example() {
  return (
    <Button variant="primary" size="md">
      Save Changes
    </Button>
  );
}
```

### 6. **Utility Classes**

Custom utilities defined in globals.css:

```css
@utility btn-primary { ... }    /* Primary button styling */
@utility card-base { ... }      /* Base card styling */
@utility text-heading-xl { ... } /* Extra large heading */
```

Used with Tailwind's `@apply`:

```tsx
<div className="btn-primary">Click me</div>
```

### 7. **Responsive Design**

Mobile-first breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### 8. **Shadows & Depth**

Organic shadows with sage green tint:

```css
--shadow-organic: 0 10px 40px -10px rgba(139, 167, 151, 0.15);
--shadow-glass: 0 8px 32px 0 rgba(74, 99, 85, 0.1);
```

Used for depth hierarchy and glassmorphism effects.

### 9. **Glassmorphism**

Utility for layered, premium feel:

```tsx
<div className="glass">
  Frosted glass effect with blur and semi-transparency
</div>

<div className="glass-card">
  Glass card with padding and organic radius
</div>
```

## Design Principles

1. **Reduced Visual Noise** — Clean backgrounds, minimal decoration
2. **Semantic Coloring** — Purpose-driven color use (sage = trust, blue = clarity)
3. **Premium Spacing** — Generous margins and padding
4. **Accessibility** — WCAG AA contrast ratios, focus states, reduced motion support
5. **Performance** — CSS-first approach, minimal JavaScript
6. **Consistency** — Shared tokens and utilities across all components

## Adding New Components

1. Create file in `src/components/ui/ComponentName.tsx`
2. Use Tailwind classes + custom utilities
3. Export from `src/components/ui/index.ts`
4. Document variant props and usage

Example:
```tsx
export function Input({ disabled, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'input-base', // Custom utility
        error && 'input-error',
        disabled && 'disabled:opacity-50'
      )}
      disabled={disabled}
      {...props}
    />
  );
}
```

## Extending the Theme

To add new theme values (colors, spacing, etc.):

1. Add CSS custom property in `:root` in `globals.css`
2. Reference in `@theme inline` block
3. Use in components with `theme()` or direct class names

Example:
```css
:root {
  --color-custom: #123456;
}

@theme inline {
  --color-custom: var(--color-custom);
}
```

Then in components:
```tsx
<div className="bg-custom">...</div>
```

## Tailwind v4 Specifics

- **No PostCSS config needed** — `@tailwindcss/postcss` handles it
- **CSS-first** — Theme defined in CSS, not JS
- **Utilities inline** — Use `@utility` to define custom utilities
- **Theme inline** — Use `@theme inline` for custom theme values
- **Cleaner defaults** — Better semantics and reduced boilerplate

## Development Workflow

```bash
# Start dev server (includes Tailwind watch)
cd frontend && npm run dev

# Build for production
npm run build

# Type checking
npx tsc --noEmit
```

---

**Last Updated**: May 2026  
**System Version**: v1.0  
**Tailwind Version**: v4
