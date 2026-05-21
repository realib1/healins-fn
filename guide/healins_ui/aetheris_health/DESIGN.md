# Design System Strategy: The Luminous Precision Framework

## 1. Overview & Creative North Star: "The Clinical Ether"
This design system moves healthcare away from the sterile, flat, and anxiety-inducing aesthetics of the past. Our Creative North Star is **"The Clinical Ether"**—a digital environment that feels breathable, infinitely deep, and hyper-intelligent. 

We reject the "boxed-in" layout of traditional dashboards. Instead, we embrace a high-end editorial approach where data floats in a multidimensional space. By using intentional asymmetry, overlapping translucent layers, and high-contrast typography scales, we create an interface that feels less like a database and more like a futuristic medical diagnostic suite. The goal is to convey "Innovation through Clarity."

## 2. Color & Atmospheric Depth
Our palette is anchored in `#060e20` (Surface), providing a deep, celestial void that allows our glass elements to shimmer.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for defining sections. Boundaries must be articulated through background shifts—specifically by nesting a `surface-container-low` section against the base `surface`—or through the subtle refraction of glassmorphic blurs.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of frosted acrylic.
    *   **Base:** `surface` (#060e20)
    *   **Level 1 (Sections):** `surface-container-low` (#091328)
    *   **Level 2 (Interactive Cards):** `surface-container` (#0f1930) with 60% opacity and `backdrop-filter: blur(20px)`.
*   **The "Glass & Gradient" Rule:** For AI-driven insights or critical healthcare data, utilize a signature gradient transition from `primary` (#90abff) to `secondary` (#89f5e7). This "Vibrant Pulse" should be reserved for high-value data visualizations or primary CTAs to ensure they feel "alive."
*   **Signature Textures:** Apply a subtle 2% noise texture over glass cards to break digital banding and add a premium, tactile quality.

## 3. Typography: Editorial Authority
We pair the technical precision of **Space Grotesk** with the humanistic readability of **Manrope**.

*   **Display & Headlines (Space Grotesk):** Used for data hero-numbers and section titles. The wide apertures and geometric shapes of Space Grotesk signal a futuristic, high-tech orientation. Use `display-lg` (3.5rem) for critical health scores to create an authoritative editorial focal point.
*   **Body & Titles (Manrope):** Manrope provides a necessary warmth. Use `body-lg` (1rem) for patient notes to ensure maximum legibility against dark, translucent backgrounds.
*   **Hierarchy as Navigation:** Use extreme scale contrast (e.g., a `label-sm` immediately adjacent to a `display-md`) to guide the eye without needing physical dividers.

## 4. Elevation & Depth: Tonal Layering
In this system, "Elevation" is not a drop shadow; it is a change in light transmission.

*   **The Layering Principle:** To lift an element, move it up the surface tier. A `surface-container-highest` card placed on a `surface-dim` background creates a natural optical lift.
*   **Ambient Shadows:** When an element must "float" (like a modal or a floating action button), use a 40px–60px blur radius with a 6% opacity shadow tinted with `surface-tint` (#90abff). Avoid neutral black or grey shadows, which "dirty" the translucency.
*   **The "Ghost Border" Fallback:** If a container requires definition against a complex background, use the `outline-variant` (#40485d) at **15% opacity**. This creates a "specular highlight" on the edge of the glass rather than a heavy stroke.
*   **Refraction:** All glass cards must utilize a `backdrop-blur` of at least 16px to ensure that background content is obscured enough to maintain text contrast while still feeling "anchored" in the environment.

## 5. Components & Primitives

*   **Buttons:**
    *   *Primary:* A vibrant gradient from `primary` to `tertiary`. No border.
    *   *Secondary:* `surface-container-high` with a 10% `outline` "Ghost Border."
    *   *Rounding:* Always use `full` (9999px) for buttons to contrast against the `2xl` cards.
*   **Glass Cards:** Use `rounded-2xl` (1.5rem). Forbid divider lines within cards. Separate patient metrics using 2rem of vertical whitespace or a subtle `surface-container-highest` background fill for sub-sections.
*   **AI Insight Chips:** Use `secondary-container` with `on-secondary-container` text. Apply a subtle outer glow using the `secondary` color at 20% opacity to indicate "active" intelligence.
*   **Input Fields:** Use `surface-container-lowest` as the fill. The active state should not change the border color to a heavy solid; instead, increase the `backdrop-filter` intensity and add a `primary` "Ghost Border."
*   **Bio-Telemetry Charts:** Use `tertiary` (#47c4ff) for active data lines, using a 3px stroke width with a "bloom" effect (soft outer glow).

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. Place a large `display-lg` metric on the left with significant white space to its right to create a premium, editorial feel.
*   **Do** overlap elements. Allow a glass card to slightly overlap a background gradient to demonstrate the blur effect.
*   **Do** prioritize `on-surface-variant` (#a3aac4) for secondary metadata to maintain a soft visual hierarchy.

### Don’t:
*   **Don’t** use 100% opaque cards. This kills the "Modern Glassmorphic" intent and makes the UI feel heavy and dated.
*   **Don’t** use pure white (#FFFFFF) for text. Always use `on-surface` (#dee5ff) to ensure the glow of the interface feels integrated with the dark background.
*   **Don’t** use standard "Material Design" shadows. They are too aggressive for a light-based glass interface. If it looks like a shadow, it’s probably too dark.