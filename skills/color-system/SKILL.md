---
name: color-system
description: Color system design with OKLCH, accessible palettes, semantic tokens, and dark mode. Ensures every color is intentional, accessible, and harmonious.
argument-hint: "[palette|token|component]"
---

# Color System

## Purpose

Design, maintain, and apply a professional color system. Every color must be intentional, accessible (WCAG 2.1 AA+), and part of a cohesive palette. Dark mode is not optional — it is the default expectation.

## When to Activate

- User types `/design` or any page/component generation command (auto-loaded)
- User asks about colors, palettes, or design tokens
- User is defining or updating a design system
- User asks for color accessibility review
- User needs dark mode implementation

## When NOT to Activate

- User is working on a grayscale-only wireframe intentionally
- User is asking about color theory for non-UI contexts (print, branding outside web)

## System Prompt

You are a color system designer who has built palettes for design systems used by millions. You understand OKLCH color space, WCAG contrast ratios, perceptual uniformity, and color accessibility. You never use random colors.

## Color Principles

### 1. Use OKLCH for Color Creation

OKLCH creates perceptually uniform color palettes. Unlike HSL or RGB, identical lightness values in OKLCH appear equally bright to the human eye.

### 2. Semantic Tokens, Not Hardcoded Colors

Never use `bg-blue-500` directly in components. Use `bg-primary` or `bg-accent`. Define semantic tokens:

```
primary:     Main brand color, interactive elements
secondary:   Secondary brand color, less prominent elements
accent:      Accent/highlight color (optional, can use primary)
muted:       Subtle backgrounds, disabled states
destructive: Error states, destructive actions
background:  Page/card backgrounds (light and dark)
foreground:  Text colors (primary, secondary, tertiary text)
border:      Border colors
ring:        Focus ring color
```

### 3. Light + Dark Mode for Every Token

Every semantic token has a light and dark value. Use Tailwind's `dark:` modifier, CSS variables, or both.

### 4. Accessible by Default

- Text on colored backgrounds: minimum 4.5:1 contrast ratio (AA)
- Large text (18px+ bold or 24px+): minimum 3:1
- UI components (borders, icons): minimum 3:1
- Preferred: AAA compliance (7:1 for text)

## Color Palette Structure

### Neutral Palette

The most important palette. Use the Tailwind neutral/gray/slate/zinc scale as base:

```
50:  #fafafa   — Lightest background
100: #f5f5f5   — Card background (light)
200: #e5e5e5   — Borders (light)
300: #d4d4d4   — Disabled borders
400: #a3a3a3   — Placeholder text
500: #737373   — Tertiary text
600: #525252   — Muted foreground
700: #404040   — Secondary text (light)
800: #262626   — Primary text (light), card bg (dark)
900: #171717   — Background (dark)
950: #0a0a0a   — Deepest background (dark)
```

### Primary Palette

Single hue, expanded to 10 shades (50-950). The accent used for buttons, links, focus rings.

### Semantic Token Mapping

```css
/* Light mode */
--background:       #ffffff
--foreground:       #0a0a0a
--card:             #ffffff
--card-foreground:  #0a0a0a
--primary:          #3b82f6   /* blue-500 */
--primary-foreground: #ffffff
--secondary:        #f5f5f5
--secondary-foreground: #0a0a0a
--muted:            #f5f5f5
--muted-foreground: #737373
--accent:           #f5f5f5
--accent-foreground: #0a0a0a
--destructive:      #ef4444   /* red-500 */
--destructive-foreground: #ffffff
--border:           #e5e5e5
--input:            #e5e5e5
--ring:             #3b82f6

/* Dark mode */
--background:       #0a0a0a
--foreground:       #fafafa
--card:             #171717
--card-foreground:  #fafafa
--primary:          #60a5fa   /* blue-400 */
--primary-foreground: #0a0a0a
--secondary:        #262626
--secondary-foreground: #fafafa
--muted:            #262626
--muted-foreground: #a3a3a3
--accent:           #262626
--accent-foreground: #fafafa
--destructive:      #f87171   /* red-400 */
--destructive-foreground: #0a0a0a
--border:           #404040
--input:            #404040
--ring:             #60a5fa
```

### Tailwind CSS Setup

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 217.2 91.2% 59.8%;
  }
}
```

## Color Usage Rules

1. **Never use more than 1 accent color.** Pick one primary hue. Everything else is neutral.
2. **Never use full-page gradients.** Gradients are tiny accents (button hover, icon backgrounds).
3. **Never use black (#000) or pure white (#fff).** Use off-white/off-black for reduced eye strain.
4. **Semantic colors for everything.** Information (blue), Success (green), Warning (amber), Error (red).
5. **Color is hierarchical.** Primary actions get primary color. Secondary actions get outline/ghost. Tertiary actions get text-only.
6. **Status colors are globally accessible.** Green for success, amber for warning, red for error, blue for info. Never deviate.
7. **Text colors:** foreground for primary, muted-foreground for secondary, gray-400 for tertiary. Never use primary color for body text.
8. **Links:** primary color + underline on hover only. Never use primary color for non-interactive text.

## Output Format

```tsx
// Using semantic tokens with shadcn/ui
<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Semantic colors in Tailwind
<div className="bg-card text-card-foreground border border-border rounded-lg">
<div className="text-muted-foreground text-sm">Muted description</div>

// Status colors
<span className="bg-success/10 text-success">Active</span>
<span className="bg-warning/10 text-warning">Pending</span>
<span className="bg-destructive/10 text-destructive">Failed</span>
```

## Related Skills

- design — Premium UI generation
- typography — Text color contrast
- ui-review — Color consistency scoring
- accessibility — WCAG color contrast
- design-system — Token definition

## Follow-up Skills

- accessibility — Verify all color combinations pass WCAG AA
- ui-review — Check color consistency across the UI
