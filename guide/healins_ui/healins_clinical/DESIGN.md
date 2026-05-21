```markdown
# Design System Document: The Editorial Health Experience

## 1. Overview & Creative North Star: "The Clinical Curator"

This design system moves away from the cold, sterile, and boxy aesthetics of traditional healthcare portals. Our Creative North Star is **The Clinical Curator**. It positions the healthcare experience as an editorial journey—one that is authoritative yet breathing, professional yet deeply human.

To break the "template" look, we utilize **Intentional Asymmetry**. We shun rigid, centered grids in favor of purposeful whitespace and overlapping elements that guide the eye naturally. By pairing the technical precision of `Inter` with the expressive, architectural nature of `Manrope`, we create a high-contrast typographic scale that feels more like a premium health journal than a database.

---

### 2. Colors & Surface Architecture

Our palette is rooted in a deep, authoritative blue (`primary`), balanced by the warmth of our neutral surfaces.

#### The "No-Line" Rule
**Borders are a failure of hierarchy.** In this system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through:
- **Background Color Shifts:** Placing a `surface-container-lowest` card on a `surface-container-low` background.
- **Tonal Transitions:** Using depth to signal change.

#### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-stock paper.
- **Base Layer:** `surface` (#faf8ff)
- **Sectioning:** `surface-container-low` (#f4f3fa) for secondary content areas.
- **Interactive Focus:** `surface-container-lowest` (#ffffff) for the most important cards or input areas.
- **Nesting:** Always ensure that nested containers move "up" or "down" the surface scale to maintain a sense of physical reality.

#### The "Glass & Gradient" Rule
To add visual "soul," use subtle gradients for primary actions. 
- **Signature Gradient:** Transition from `primary` (#00236f) to `primary_container` (#1e3a8a) at a 135-degree angle.
- **Glassmorphism:** For floating mobile navigations or modal overlays, use `surface` at 80% opacity with a `20px` backdrop-blur to soften the interface.

---

### 3. Typography: The Editorial Voice

We use a dual-font strategy to balance authority with readability.

- **Display & Headlines (Manrope):** These are our "Editorial" moments. Use `display-lg` through `headline-sm` to create a rhythmic hierarchy. The generous x-height of Manrope provides an approachable, modern feel.
- **Body & Labels (Inter):** For data-heavy clinical information, `Inter` provides unparalleled clarity.
- **The Hierarchy Principle:** Use `on_surface_variant` (#444651) for body text to reduce eye strain, reserving `on_surface` (#1a1b21) for headlines to create "Weight Contrast."

---

### 4. Elevation & Depth: Tonal Layering

We do not use shadows to create "pop"; we use them to create "presence."

- **The Layering Principle:** Avoid elevation levels 1-5. Instead, stack `surface-container-lowest` on `surface-container-low`.
- **Ambient Shadows:** If a card must float (e.g., a QR code display), use an "Ambient Shadow": `Shadow Color: #1a1b21 (at 4% opacity), Blur: 40px, Y: 12px`. It should feel like a soft glow of light, not a hard drop shadow.
- **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a `1px` border of `outline_variant` at **15% opacity**. This creates a "Ghost Border" that defines space without cluttering the visual field.

---

### 5. Components

#### Cards & Lists
- **Rule:** Absolute prohibition of divider lines.
- **Implementation:** Separate list items using `16px` of vertical whitespace (from the spacing scale). Use a `surface-container-high` background on hover to define the interactive area.
- **Cards:** Use `rounded-lg` (1rem) as the standard. For medical records, use a "Vertical Timeline" card where the timeline spine is a 2px track of `primary_fixed_dim`.

#### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `rounded-full` (9999px) for a mobile-first, tactile feel.
- **Secondary:** `surface-container-high` background with `on_primary_fixed_variant` text. No border.
- **Tertiary:** Text-only using `primary` tokens, bold weight, with a subtle underline appearing only on hover.

#### QR Code Displays
- Treat QR codes as "Hero Artifacts." Place them on a `surface-container-lowest` card with an "Ambient Shadow." Surround the code with generous padding (at least `2rem`) to ensure it feels like a high-priority medical credential.

#### Input Fields
- **Style:** Subtle `surface-container-highest` background.
- **Active State:** Instead of a thick border, use a 2px bottom-accent of `primary` and a subtle shift in background color to `surface_bright`.

---

### 6. Do’s and Don’ts

**Do:**
- Use **asymmetric padding** in hero sections to create an editorial feel (e.g., more padding on the left than the right on desktop).
- Use `secondary` (#006c49) for success states sparingly; it should feel like a "stamp of approval."
- Ensure all icons use a "Light" or "Thin" weight to match the `Inter` typography.

**Don’t:**
- **Don’t use pure black (#000000).** Use `on_surface` for high contrast.
- **Don’t use 100% opaque borders.** They create "visual noise" that fatigues patients.
- **Don’t crowd data.** If a medical timeline feels cramped, increase the surface area; never decrease the font size below `body-sm`.
- **Don’t use default shadows.** They make a premium healthcare app look like a generic dashboard.

---

### 7. Signature Elements for Healthcare
- **The Vitality Glow:** Use a very soft, large-scale radial gradient of `primary_fixed` in the background of "Summary" pages to create a sense of calm and "breathing" space.
- **The Structured Timeline:** Use `tertiary_container` (#860011) for urgent health alerts within the vertical timeline, ensuring the high-contrast `on_tertiary_container` text is legible.```