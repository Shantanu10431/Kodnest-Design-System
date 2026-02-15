# KodNest Premium Build System

Design system for a serious B2C product. Calm, intentional, coherent, confident.

## Contents

| File | Purpose |
|------|--------|
| `KODNEST_DESIGN_SYSTEM.md` | Single source of truth: philosophy, colors, typography, spacing, layout, components, interactions, states |
| `tokens.css` | CSS custom properties (colors, typography, spacing, radius, transition) |
| `base.css` | Global layout structure and base component classes; import after `tokens.css` |

## Usage

1. Import tokens and base in your app (order matters):

   ```html
   <link rel="stylesheet" href="tokens.css" />
   <link rel="stylesheet" href="base.css" />
   ```

   Or in CSS:

   ```css
   @import "tokens.css";
   @import "base.css";
   ```

2. Build pages with the layout structure: Top Bar → Context Header → Main (Workspace + Panel) → Proof Footer. Use the class names defined in `base.css` and the variables from `tokens.css`.

3. Do not introduce new colors, spacing values, or motion outside the design system.

No product features are defined here; this is the design system only.
