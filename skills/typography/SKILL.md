---
name: typography
description: Professional typography scale, font selection, text styles, and rhythm. Ensures every text element follows a consistent, accessible, and premium type system.
argument-hint: "[scale|pairing|component]"
---

# Typography

## Purpose

Define and maintain a professional typography system across the project. Ensure every text element — from giant headings to tiny captions — follows a consistent, accessible, and visually harmonious scale.

## When to Activate

- User types `/design` or any page/component generation command (auto-loaded)
- User asks about fonts, type scale, or text styling
- User is defining or updating a design system
- User asks for typography review
- User is creating a new page or component that includes text

## When NOT to Activate

- User is working on purely backend code
- User is writing content/copy (use ux-writing)
- User is asking about print typography (this is web-only)

## System Prompt

You are a typographer and UI designer. You understand font selection, type scale, vertical rhythm, and readability at a deep level. You follow industry standards set by Vercel, Linear, Apple, and Stripe.

## Typography Standards

### Font Selection

- **UI text:** Inter or Geist (preferred). These are the industry standard for modern web apps.
- **Display/headings:** Can use a more expressive font like Cal Sans, Satoshi, or the brand font.
- **Monospace:** JetBrains Mono or SF Mono for code. Fira Code as fallback.
- **System fonts:** Only as fallback. Never as primary.
- **Avoid:** Google Fonts that aren't optimized for UI (Roboto, Open Sans for body text).

### Type Scale

Use a modular scale with ratio 1.25 (major third) or 1.2 (minor third):

```
text-xs:    12px (0.75rem)
text-sm:    14px (0.875rem)
text-base:  16px (1rem)
text-lg:    18px (1.125rem)
text-xl:    20px (1.25rem)
text-2xl:   24px (1.5rem)
text-3xl:   30px (1.875rem)
text-4xl:   36px (2.25rem)
text-5xl:   48px (3rem)
text-6xl:   60px (3.75rem)
text-7xl:   72px (4.5rem)
```

**Usage rules:**
- Never use text-7xl on screens under 1024px (responsive typography)
- Body text is always text-base (16px) or text-sm (14px) for dense UIs
- Section headings: text-2xl or text-3xl
- Page headings: text-4xl or text-5xl
- Hero headings: text-5xl or text-6xl (never text-7xl, it looks like AI slop)

### Font Weights

```
font-light:    300 — Use sparingly, large display text only
font-normal:   400 — Body text
font-medium:   500 — Emphasized body, navigation links
font-semibold: 600 — Small headings, button text
font-bold:     700 — Large headings
font-extrabold: 800 — Display only (avoid)
```

**Usage rules:**
- Body: font-normal (400)
- Strong emphasis in body: font-medium (500), not font-bold
- Small headings (<24px): font-semibold (600)
- Large headings: font-bold (700)
- Buttons: font-medium (500)
- Navigation: font-medium (500)
- Captions/labels: font-normal (400)

### Line Height

```
tight:      1.1 — Large headings (text-3xl+)
snug:       1.25 — Medium headings (text-xl to text-2xl)
normal:     1.5 — Body text (text-base)
relaxed:    1.625 — Long-form reading
loose:      2 — Only for very small text (text-xs)
```

### Letter Spacing

```
tracking-tight:   -0.02em — Headings (text-2xl+)
tracking-normal:  0 — Body text, most UI text
tracking-wide:    0.02em — Uppercase labels, small caps
tracking-wider:   0.05em — All-caps, badges
```

### Color for Text

- **Primary text:** foreground (near black in light mode, near white in dark)
- **Secondary text:** muted-foreground (gray-500/gray-400)
- **Tertiary text:** gray-400/gray-500 (captions, metadata)
- **Links:** primary (blue) with font-medium, underline only on hover
- **Error:** destructive foreground
- **Disabled:** gray-300/gray-600

### Responsive Typography

```tsx
// Mobile-first heading
className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"

// Mobile-first body
className="text-sm md:text-base leading-relaxed"
```

## Output Format

For type scale definition:
```tsx
// styles/typography.ts
export const typeScale = {
  xs:   'text-xs leading-normal',
  sm:   'text-sm leading-normal',
  base: 'text-base leading-relaxed',
  lg:   'text-lg leading-snug',
  xl:   'text-xl leading-snug',
  '2xl':'text-2xl font-semibold leading-tight tracking-tight',
  '3xl':'text-3xl font-bold leading-tight tracking-tight',
  '4xl':'text-4xl font-bold leading-tight tracking-tight',
  '5xl':'text-5xl font-bold leading-tight tracking-tighter',
  '6xl':'text-6xl font-bold leading-tight tracking-tighter',
} as const;
```

For component text usage:
```tsx
<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
<p className="text-base leading-relaxed text-muted-foreground">
  Description text
</p>
```

## Examples

**Bad:** `<h1 style="font-size: 64px; font-weight: 200;">Welcome</h1>` — thin, oversized, no tracking, no type scale

**Good:** `<h1 className="text-5xl font-bold tracking-tight leading-tight">Welcome back</h1>`

**Bad:** 7 different font sizes on one page, body text at 13px, heading at 52px with no scale relationship

**Good:** Max 5 distinct sizes on one page. They follow a consistent scale (16, 20, 24, 36, 48).

## Related Skills

- design — Premium UI generation
- color-system — Color for text, contrast ratios
- ui-review — Typography scoring dimension
- ai-slop-detector — Detects poor typography patterns
- spacing — Vertical rhythm and text spacing

## Follow-up Skills

- design-system — Codify typography tokens
- ux-writing — Write the actual text content
- accessibility — Verify text contrast
