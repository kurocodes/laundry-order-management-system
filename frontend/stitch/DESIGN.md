# Design System Specification: Utility & Elegance

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Ledger."** 

While the requirements call for a functional internal tool for laundry management, we move beyond the "generic dashboard" by treating the interface as a high-end piece of industrial design. We replace the cluttered "boxiness" of standard enterprise software with an editorial approach to information density. The goal is to make high-volume order management feel effortless, quiet, and premium.

By utilizing **intentional asymmetry** and **tonal depth**, we create a system where the "white space" isn't just empty—it’s a functional tool that guides the eye toward critical order statuses and customer data without the need for visual noise.

---

## 2. Colors: Tonal Architecture
This system utilizes a sophisticated palette of cool neutrals and technical blues. We achieve structure through color shifts rather than physical lines.

### The "No-Line" Rule
To achieve a signature, high-end feel, **do not use 1px solid borders for sectioning.** Boundaries are defined by background shifts. For example, a side navigation should use `surface_container_low`, while the main workspace remains `surface`. This creates a "molded" look rather than a "sketched" one.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Each layer represents a step deeper into the data.
*   **Base Layer:** `surface` (#f7f9fb) – The canvas of the application.
*   **Sectional Layer:** `surface_container_low` (#f0f4f7) – Used for grouping related data tables.
*   **Focus Layer:** `surface_container_lowest` (#ffffff) – Used for individual "Actionable Cards" to make them pop against the background.

### Signature Textures
While the system is minimal, main CTAs (like "Create New Order") should use a subtle transition from `primary` (#0053db) to `primary_dim` (#0048c1) to provide a "tactile" density that feels authoritative and professional.

---

## 3. Typography: Editorial Clarity
We use a dual-font strategy to balance character with function.

*   **Display & Headlines (Manrope):** A geometric sans-serif that provides a "technical" and "modern" voice. Use `display-md` for high-level metrics (e.g., total orders today) to give the internal tool a professional, data-driven soul.
*   **Body & Labels (Inter):** Chosen for its exceptional legibility in small sizes. Inter handles the heavy lifting of order lists and form fields.
*   **Visual Hierarchy:** Use `label-md` in all-caps with a `0.05em` letter-spacing for table headers to create a distinct "architectural" feel.

---

## 4. Elevation & Depth
We reject the "flat" look in favor of **Tonal Layering**.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` card on top of a `surface_container` background. The contrast in lightness provides the necessary "lift."
*   **Ambient Shadows:** For floating elements like Modals or Dropdowns, use an ultra-diffused shadow: `0px 12px 32px rgba(42, 52, 57, 0.06)`. Note the use of the `on_surface` color for the shadow tint, ensuring it feels like a natural part of the environment.
*   **The "Ghost Border" Fallback:** If containment is required for high-density data, use a "Ghost Border": `outline_variant` (#a9b4b9) at **15% opacity**. This provides a guide for the eye without creating visual "cages."

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` fill with `on_primary` text. Use `md` (0.375rem) roundedness for a contemporary, professional feel.
*   **Secondary:** `primary_container` fill. This provides a "soft blue" action that doesn't compete with the main CTA.
*   **Tertiary/Ghost:** No fill. Use `primary` text. Reserved for low-emphasis actions like "Cancel."

### Input Fields
*   **Styling:** Fields use `surface_container_low` as a background with a `none` border. On focus, transition the background to `surface_container_lowest` and add a 1px `primary` border.
*   **Readability:** Labels use `label-md` and sit 8px above the input. Helper text uses `label-sm` in `on_surface_variant`.

### Cards & Data Tables
*   **The "No-Divider" Rule:** Forbid the use of horizontal lines between table rows. Instead, use 12px of vertical padding and a subtle hover state shift to `surface_container_high`.
*   **Order Status Chips:** Use `secondary_container` for neutral states and `error_container` for "Overdue" or "Damaged" items. Always use `on_container` text colors for AA-level accessibility.

### Custom Component: The "Order Stage" Stepper
A custom horizontal element using `surface_container_highest` to show a garment’s progress (Washing, Drying, Folding, Ready). Use `primary` for the active state and `outline_variant` for upcoming stages.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use whitespace as a separator. If elements feel too close, increase the spacing rather than adding a line.
*   **DO** use `surface_bright` for areas that require maximum user focus, like the "Active Order Details" pane.
*   **DO** ensure all interactive icons have a minimum touch target of 44x44px, even if the icon itself is smaller.

### Don’t:
*   **DON’T** use pure black (#000000) for text. Always use `on_surface` (#2a3439) to maintain a sophisticated, soft-contrast look.
*   **DON’T** use high-contrast borders. If you feel the need to "box" something, use a tonal shift in the background color instead.
*   **DON’T** use default "Blue" for links. Always use the specified `primary` (#0053db) token.