# Design System Document: Utility Compact Healthcare

## 1. Overview & Creative North Star
### The North Star: "The Clinical Architect"
This design system moves beyond the standard "friendly" medical app and leans into a high-performance, precision-based aesthetic. The objective is **The Clinical Architect**: a UI that feels like a professional surgical instrument—refined, dense, and unapologetically efficient. 

Unlike consumer-grade apps that prioritize "breathability," this system embraces **Functional Density**. We achieve a premium feel not through white space, but through mathematical precision, intentional tonal layering, and sophisticated typography pairings. We are moving away from "soft and round" toward "sharp and structured," ensuring that doctors and patients can scan complex data sets with zero friction.

---

## 2. Colors & Surface Logic
The palette is anchored by `#1E3A8A` (Primary Container), providing an authoritative, trust-heavy foundation. 

### The "No-Line" Hierarchy & Tonal Layering
To maintain a high-end feel in a data-dense environment, we prohibit the use of standard 1px high-contrast dividers for sectioning. 
- **Surface Nesting:** Hierarchy is built by "stacking" tones. The base `background` (#f7f9fb) hosts `surface-container-low` (#f2f4f6) regions. Within those, data cards use `surface-container-lowest` (#ffffff). This creates a "recessed" and "protruding" effect that guides the eye without visual clutter.
- **The Glass & Gradient Rule:** For floating headers or critical "sticky" summaries, use `surface-container-lowest` at 85% opacity with a `20px backdrop-blur`. This ensures the data-heavy background is visible but doesn't interfere with legibility.
- **Signature Accents:** Use a subtle linear gradient for Primary CTAs (transitioning from `primary` #00236f to `primary-container` #1e3a8a). This adds "soul" and a tactile depth to an otherwise utilitarian interface.

---

## 3. Typography
We use a tri-font strategy to separate intent and improve "scannability" under stress.

- **Display & Headlines (Manrope):** A geometric, modern sans-serif. Use `display-md` and `headline-sm` for high-level dashboard summaries. Its wide apertures ensure clarity even at a glance.
- **Interface & Data (Inter):** Our workhorse. Used for `body-md` and `title-sm`. Inter’s tall x-height is optimized for the "Compact" nature of this system, remaining legible in tight data grids.
- **Metadata & Labels (Public Sans):** Used for `label-md` and `label-sm`. Public Sans is a "stronger" neutral font. We use it in **Bold** for attribute labels (e.g., **BLOOD PRESSURE**) to create a high-contrast anchor for the data values following them.

---

## 4. Elevation & Depth
In a "Utility Compact" system, shadows are the enemy of density. We replace them with **Tonal Architecture**.

- **The Layering Principle:** Avoid elevation 1-5. Instead, use `surface-container-high` (#e6e8ea) to indicate interactive zones and `surface-container-lowest` (#ffffff) to highlight primary content cards.
- **Ambient Shadows:** Only used for temporary overlays (Modals/Popovers). Shadows must use `on-surface` (#191c1e) at 6% opacity with a `32px` blur and `0px` offset. It should look like a soft glow, not a drop shadow.
- **The "Ghost Border":** For card definition, use the `outline-variant` (#c5c5d3) at **30% opacity**. This creates a "whisper" of a boundary that defines the edge without breaking the flow of the grid.

---

## 5. Components

### Cards & Data Modules
*   **Style:** No shadows. Use `surface-container-lowest` background with a 30% `outline-variant` Ghost Border. 
*   **Spacing:** Use `0.75rem` internal padding to maximize data density.
*   **Density:** Forbid dividers. Separate patient records or vitals using a `0.5rem` vertical gap and a background shift to `surface-container-low`.

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. `0.25rem` (Default) corner radius. Text is `on-primary` (#ffffff) using `label-md` bold.
*   **Secondary:** No fill. `outline` (#757682) at 40% opacity. 
*   **Tertiary:** `primary` text on a transparent background. No border.

### Input Fields
*   **State:** Standard fields use `surface-container-highest` (#e0e3e5) with a bottom-only `primary` border (2px) to signify focus. 
*   **Labels:** Always use `label-sm` in `on-surface-variant` (#444651) positioned above the input, never as a placeholder.

### Clinical Chips
*   **Style:** Compact, `0.125rem` (sm) radius.
*   **Context:** Use `tertiary-container` (#6e2c00) for "Urgent" status and `secondary-container` (#d0d8ff) for "Routine."

### Navigation Rail (Specific to Healthcare)
*   A slim, high-density vertical rail using `primary-fixed-dim`. Icons should be 20px, stroke-based, and use `on-primary-fixed-variant`.

---

## 6. Do's and Don'ts

### Do
- **Do** use `label-sm` in All Caps for non-editable data headers to increase professional authority.
- **Do** use `surface-container-lowest` as the "active" state for a selected item in a list.
- **Do** rely on the `0.25rem` (Default) and `0.125rem` (sm) roundedness for a precision-engineered look.

### Don't
- **Don't** use 100% opaque borders; it creates visual "noise" that slows down clinical decision-making.
- **Don't** use `xl` or `full` rounded corners for functional elements; keep them sharp and architectural.
- **Don't** use shadows to separate cards in a list; use the Tonal Layering of `surface` vs `surface-container`.
- **Don't** use standard blue for alerts; use `tertiary` (#4b1c00) for a more sophisticated, "Editorial" approach to warnings.