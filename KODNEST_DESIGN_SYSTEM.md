# KodNest Premium Build System

**Design system for a serious B2C product company.**  
Single source of truth. One mind. No visual drift.

---

## 1. Design Philosophy

- **Calm, Intentional, Coherent, Confident**
- Not flashy, not loud, not playful, not hackathon-style
- **No gradients, no glassmorphism, no neon colors, no animation noise**

---

## 2. Color System

**Maximum 4 colors across the entire system.**

| Role       | Value     | Usage |
|-----------|-----------|--------|
| Background | `#F7F6F3` | Page and card backgrounds (off-white) |
| Primary text | `#111111` | Headings, body, labels |
| Accent    | `#8B0000` | Primary actions, key UI emphasis (deep red) |
| Success   | Muted green | Success states, confirmations |
| Warning   | Muted amber | Warnings, caution (non-error) |

**Semantic (muted):** Success and warning are muted so the palette stays restrained. No additional bright colors.

- **Success (muted green):** `#3D5C3D` or equivalent
- **Warning (muted amber):** `#8B6914` or equivalent

No decorative or secondary accent colors beyond this set.

---

## 3. Typography

### Headings
- **Font:** Serif. Large, confident, generous letter-spacing.
- **Sizes:** Use a consistent scale (e.g. one size for page title, one for section).
- **Spacing:** Generous; headings breathe.

### Body
- **Font:** Clean sans-serif (e.g. system UI or a single web font).
- **Size:** 16–18px.
- **Line height:** 1.6–1.8.
- **Measure:** Max width **720px** for text blocks. Never full-width long-form text.

### Rules
- No decorative or novelty fonts.
- No random sizes; use the defined scale only.

---

## 4. Spacing System

**Only these values.** No 13px, 27px, or other ad-hoc spacing. Whitespace is part of the design.

| Token | Value |
|-------|--------|
| `space-1` | 8px |
| `space-2` | 16px |
| `space-3` | 24px |
| `space-4` | 40px |
| `space-5` | 64px |

Use multiples of 8 where a step between tokens is needed (e.g. 32px = 4×8 only if explicitly added to the scale later; otherwise use 24 or 40).

---

## 5. Global Layout Structure

Every page follows this structure in order:

1. **Top Bar**
2. **Context Header**
3. **Primary Workspace + Secondary Panel** (side by side)
4. **Proof Footer**

---

### 5.1 Top Bar

- **Left:** Project name (plain text or minimal label).
- **Center:** Progress indicator — e.g. “Step X / Y” (text or minimal control).
- **Right:** Status badge: one of **Not Started** | **In Progress** | **Shipped**.

Styling: minimal, no heavy borders or backgrounds. Same height on all pages.

---

### 5.2 Context Header

- **Headline:** Large serif, one line when possible.
- **Subtext:** One line only. Clear purpose. No hype or marketing language.
- **Tone:** Informative and confident, not salesy.

---

### 5.3 Primary Workspace (70% width)

- Where the main product interaction happens.
- **Content:** Clean cards, predictable components.
- **Density:** No crowding. Use the spacing scale.
- **Cards:** Subtle border, no drop shadows, balanced padding (from spacing scale).

---

### 5.4 Secondary Panel (30% width)

- **Step explanation:** Short copy; what this step is and why it matters.
- **Copyable prompt box:** Monospace or clear font; one “Copy” action.
- **Actions (buttons):**
  - Copy
  - Build in Lovable
  - It Worked
  - Error
  - Add Screenshot
- **Style:** Calm, consistent with the rest of the system. No competing visuals.

---

### 5.5 Proof Footer (persistent bottom section)

- **Pattern:** Checklist. Always visible at bottom of viewport or page.
- **Items:**
  - □ UI Built
  - □ Logic Working
  - □ Test Passed
  - □ Deployed
- **Behavior:** Each checkbox requires user proof input (e.g. link, note, or confirmation). Not decorative; each item is completable with evidence.

---

## 6. Component Rules

### Buttons
- **Primary:** Solid deep red (`#8B0000`). One primary per context when possible.
- **Secondary:** Outlined (border in accent or text color; transparent fill).
- **Hover:** Same hover effect for all buttons (e.g. slight darken or opacity change).
- **Border radius:** Same value everywhere (e.g. 4px or 6px). No mixed radii.

### Inputs
- Clean borders (1px solid).
- No heavy shadows.
- **Focus:** Clear focus state (e.g. outline or border change). Accessible.

### Cards
- Subtle border (e.g. 1px solid neutral).
- **No drop shadows.**
- Padding from spacing scale (e.g. 24px / 40px).

### Consistency
- Same hover effect and border radius across all interactive components.
- No one-off styles.

---

## 7. Interaction Rules

- **Transitions:** 150–200ms, `ease-in-out` only.
- **No bounce, no parallax, no decorative motion.**
- Use transitions for state changes (e.g. hover, focus, open/close), not for attention-grabbing effects.

---

## 8. Error & Empty States

### Errors
- **Explain** what went wrong in plain language.
- **Explain** how to fix it (next step or link).
- **Never blame the user.** Tone: helpful and neutral.

### Empty states
- **Provide the next action** (e.g. “Add your first item” with a clear button or link).
- Never leave a section feeling dead or unexplained.

---

## 9. Summary

- **One mind:** Every screen and component should feel like part of the same product.
- **No visual drift:** Use only colors, type scale, spacing, and layout defined here.
- **Restraint:** No gradients, glassmorphism, neon, or animation noise.
- **Confidence:** Serif headlines, clear hierarchy, generous space, and a limited palette.

*KodNest Premium Build System — Calm, Intentional, Coherent, Confident.*
