# Design System Document: Editorial Clinical

## 1. Overview & Creative North Star: "The Clinical Curator"
The Creative North Star for this design system is **"The Clinical Curator."** We are moving away from the "utility-first" appearance of traditional medical software and toward a high-end editorial experience. This system treats medical data with the same reverence a gallery treats art—using expansive whitespace, bold typographic hierarchies, and layered depth to create an environment of absolute calm and authoritative trust.

To break the "template" look, we favor **intentional asymmetry**. Align text to a rigorous grid, but allow high-quality imagery or data visualizations to bleed off-edge or overlap container boundaries. This system is not about "filling space"; it is about the "luxury of the void"—using generous margins to focus the user’s eye on what truly matters.

---

## 2. Colors & Tonal Depth
Our palette is anchored by the sophisticated `#1E3A8A` (Primary Container), a deep, intellectual blue that communicates stability.

### The "No-Line" Rule
**Explicit Instruction:** Sectioning via 1px solid borders is strictly prohibited. Physical boundaries must be defined solely through background color shifts or tonal transitions. To separate a sidebar from a main feed, use a shift from `surface` to `surface-container-low`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine, heavy-weight paper.
*   **Base:** `surface` (#faf8ff) for the overall canvas.
*   **Sectioning:** `surface-container-low` (#f4f3fa) for large content blocks.
*   **Focus Elements:** `surface-container-lowest` (#ffffff) for the most prominent "hero" cards to create a subtle, natural lift.

### The "Glass & Gradient" Rule
To inject "soul" into the clinical aesthetic:
*   **Glassmorphism:** Use semi-transparent `surface` colors with a 20px-40px backdrop-blur for floating navigation or overlays.
*   **Signature Gradients:** For primary CTAs or hero backgrounds, use a subtle linear gradient from `primary` (#00236f) to `primary_container` (#1e3a8a) at a 135-degree angle. This adds a "lithographic" quality that flat colors lack.

---

### 3. Typography: The Manrope Scale
We use **Manrope** exclusively. It is a modern geometric sans-serif that balances the warmth of a humanist face with the precision of a technical font.

*   **Display (lg/md/sm):** Use for high-impact editorial statements. Set with tight letter-spacing (-0.02em) and `on_surface` color.
*   **Headline (lg/md):** The "Curator's Voice." Use these for section headers. Ensure they have at least 48px of top-margin to breathe.
*   **Body (lg/md):** Optimized for long-form clinical reading. Use `body-lg` (1rem) for primary insights to maintain a premium, legible feel.
*   **Label (md/sm):** Reserved for metadata. Use `on_surface_variant` (#444651) to create a clear hierarchy between content and "the system."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too "dirty" for a clinical environment. We achieve depth through atmospheric light.

### The Layering Principle
Depth is achieved by "stacking" tiers. Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that feels architectural rather than digital.

### Ambient Shadows
When a floating effect is required (e.g., a modal or a floating action button):
*   **Blur:** 32px to 64px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted shadow. Instead of black, use `on_surface` (#1a1b21) at low opacity to mimic natural, ambient light.

### The "Ghost Border" Fallback
If a border is required for accessibility, it must be a **Ghost Border**: Use `outline_variant` (#c5c5d3) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons & Interaction
*   **Primary:** A gradient-filled container (`primary` to `primary_container`) with `on_primary` text. Use `xl` (0.75rem) roundedness for a soft, approachable feel.
*   **Secondary:** No fill. Use a Ghost Border and `primary` text. 
*   **Tertiary:** Text-only with an underline that appears on hover, reinforcing the editorial feel.

### Clinical Data Cards
*   **Rule:** Forbid the use of divider lines.
*   **Structure:** Separate data points using the Spacing Scale (e.g., 24px vertical gaps). Use `surface-container-highest` for small status tags/chips to make them pop against the `surface-container-lowest` card background.

### Input Fields
*   **Visual Style:** Minimalist. Only a bottom-aligned Ghost Border that transitions to a 2px `primary_container` line on focus. Labels should use `label-md` and always sit above the field, never as placeholders.

### Additional Component: The "Curated Insight" Block
A specialized component for healthcare: A large-format callout using `primary_fixed` background and `on_primary_fixed` text. It uses asymmetric padding (e.g., more padding on the left than the right) to house critical patient "At-a-Glance" data.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the Asymmetric Grid:** Let images or charts hang off the right side of the container to create visual interest.
*   **Prioritize White Space:** If a screen feels "busy," increase the margins. This system thrives on "air."
*   **Use Tonal Transitions:** Transition from `surface` to `surface-container-low` to define different functional areas of the app.

### Don't:
*   **Don't use Divider Lines:** If you feel the need to draw a line, try adding 16px of whitespace or changing the background shade instead.
*   **Don't use Hard Shadows:** Avoid the "floating card" look of 2014-era Material Design. Keep shadows diffused and nearly invisible.
*   **Don't Cram Content:** This is an "Editorial" system. If the data is dense, break it into multiple "chapters" or paginated views rather than a single scrolling list.