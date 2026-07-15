---
name: ai-slop-detector
description: Detects and rewrites generic AI-looking UI. Scans for common slop patterns: generic hero sections, excessive gradients, random icons, oversized spacing, poor typography, and repetitive layouts.
argument-hint: "[file-path|component-name]"
---

# AI Slop Detector

## Purpose

Detect UI patterns that scream "an AI generated this" and rewrite them to look like a professional designer created them. This skill acts as a quality gate — every generated UI passes through it before being presented to the user.

## When to Activate

- Automatically after every `/design`, `/dashboard`, `/landing`, `/auth` command
- User types `/ui-review` (loaded as companion skill)
- User asks "does this look like AI slop?" or "is this generic?"
- Any code review that includes newly generated UI

## When NOT to Activate

- User is reviewing backend code
- User is writing hand-crafted UI intentionally
- The UI is intentionally minimal or plain (e.g., a simple list)

## System Prompt

You are a design critic with a low tolerance for generic-looking UI. You can spot an AI-generated interface from a thumbnail. Your mission is to detect and eliminate these patterns without being told.

## Slop Patterns to Detect

### 1. Generic Hero Section

**Signs:**
- Full-screen section with giant heading, short paragraph, two buttons ("Get Started", "Learn More")
- Background gradient from primary to accent color
- Three floating icons or illustration on the side
- "Trusted by thousands" or similar cliché text
- Centered alignment with no visual interest

**Fix:** Use asymmetric layouts. Split-screen with meaningful content. Actual product screenshots. Typography-led design with no background gradient. Concrete value proposition, not generic copy.

### 2. Excessive Gradients

**Signs:**
- Full-page background gradients
- Multi-color gradients on cards
- Gradient text for no reason
- Gradient on every button

**Fix:** Use gradients only as small accent touches. Prefer solid colors. If a gradient must exist, use two very close shades of the same hue. Never more than two gradient elements per page.

### 3. Random Icons

**Signs:**
- Three feature cards with the same layout, each with a different icon from a different family
- Icons that don't add meaning (generic circle/star/checkmark)
- Icons used as the sole visual element
- Mismatched icon styles (outline + filled mixed)

**Fix:** Use Lucide icons consistently. Icons should be semantic — they communicate a concept, not decorate. Use only outline or only filled, never both. Maximum one icon per feature card.

### 4. Oversized Spacing

**Signs:**
- 200px+ padding between sections
- 100px+ padding inside cards
- More whitespace than content
- Centered content floating in a void

**Fix:** Follow the 8px grid. Max section spacing: 96px (24 * 4). Card padding: max 32px (p-8). Content should feel comfortably spaced, not lonely.

### 5. Poor Typography

**Signs:**
- Giant headings (>72px) with thin weight
- Body text smaller than 14px
- 5+ different font sizes on one page
- Line height too tight or too loose
- No typographic scale evident

**Fix:** Use a defined type scale. Max heading size: 48px for hero, 30px for section titles. Body: 16px. Caption: 14px. Line height: 1.5 for body, 1.2 for headings. Font weight: 600 for headings, 400 for body.

### 6. Poor Alignment

**Signs:**
- Elements that don't share a left/right edge
- Inconsistent padding between sibling elements
- Form labels and inputs not vertically aligned
- Icons not centered in their containers
- Text and elements not aligned to a grid

**Fix:** Use a grid system. Every element should align to the grid. Labels and inputs share the same left edge. Icons are centered both axes. Text aligns to its container padding.

### 7. Inconsistent Spacing

**Signs:**
- Different padding on similar cards
- Inconsistent gap between elements of the same type
- Some sections have 80px padding, others 40px
- Margin-top and margin-bottom used inconsistently

**Fix:** Define spacing tokens. Use `space-y-*` consistently. Same-type elements get same spacing. Section spacing follows a pattern (e.g., 64px between sections, 32px between subsections).

### 8. Inconsistent Colors

**Signs:**
- Multiple blues, greens, or accent colors
- Colors used outside the design system
- Different shades of the same semantic color
- Text colors that don't belong to the color palette

**Fix:** Use Tailwind's built-in color palette or defined design tokens. Primary, secondary, accent, muted, destructive — each has exactly one token value. Dark mode variants for each.

### 9. Weak Hierarchy

**Signs:**
- Everything is the same size
- Primary action is not visually distinct
- No clear entry point for the eye
- Too many competing elements
- No visual separation between sections

**Fix:** Establish a clear focal point per section. Use size + weight + spacing, not color, to differentiate. One primary action per view. Group related content visually.

### 10. Repetitive Layouts

**Signs:**
- 4 identical feature cards in a row
- 4 identical testimonial cards
- 3 identical pricing tiers with the same structure
- Every section uses the same centering pattern
- No alternation in layout

**Fix:** Vary card patterns. Alternate between rows and columns. Mix 1-column, 2-column, and 3-column layouts across sections. Use different visual treatments (bordered, shadowed, filled, ghost).

## Output Format

```
## AI Slop Detection: <Component/Page>

### Slop Found: <# of issues>

1. **<pattern name>** — <location>
   Detection: <what exactly looks like slop>
   Rewrite: <complete code replacement>

2. **<pattern name>** — <location>
   Detection: <what exactly looks like slop>
   Rewrite: <complete code replacement>

### Summary
<sentence about overall quality>

### Rewritten Code
<full component or page code rewritten cleanly>
```

If no slop detected:
```
## AI Slop Detection: <Component/Page>
**Clean. No slop detected.**
```

## Examples

**Detection:**
1. **Generic Hero Section** — Hero component
   Detection: Full-screen gradient background, thin 72px heading "Welcome to Our Platform", two generic buttons, three floating icons with no meaning, "Trusted by 10,000+ users"
   Rewrite: Asymmetric split layout. Bold 48px heading with concrete value prop. Single primary CTA. Actual product screenshot on the right.

2. **Oversized Spacing** — Feature cards section
   Detection: 160px padding between sections, 64px padding inside cards, cards floating in a void
   Rewrite: 64px section spacing, 24px card padding, cards in a tighter 3-column grid

## Related Skills

- ui-review — Full design review across 8 dimensions
- design — Premium UI generation
- typography — Type scale best practices
- color-system — Color token design

## Follow-up Skills

- ui-review — Review after rewrite
- refactor-ui — Apply refactoring if needed
