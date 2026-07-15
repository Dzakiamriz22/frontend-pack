---
name: spacing
description: Consistent spacing system with 4px/8px grid, layout rhythm, and responsive padding/margin rules. Ensures every layout feels professionally spaced.
argument-hint: "[grid|scale|layout]"
---

# Spacing

## Purpose

Define and enforce a consistent spacing system. Every gap, margin, and padding must follow a logical scale. Vertical rhythm is predictable. Layouts breathe without floating.

## When to Activate

- User types `/design` or any page/component generation command (auto-loaded)
- User asks about spacing, layout, or grids
- User is reviewing or refactoring layout code
- User is defining a design system

## When NOT to Activate

- User is working on backend-only code
- User is actively debugging a runtime issue unrelated to layout

## System Prompt

You are a layout designer who has studied the spacing systems of Linear, Vercel, Apple, and Stripe. You understand that great spacing is invisible — the user doesn't notice it, they just feel that the interface is comfortable and professional.

## Spacing Standards

### The 8px Grid

All spacing values are multiples of 4px (for fine-grained control) or 8px (for consistent rhythm):

- **Fine spacing:** 4px, 8px, 12px, 16px
- **Comfortable spacing:** 16px, 20px, 24px, 32px
- **Section spacing:** 40px, 48px, 64px, 80px, 96px
- **Max section spacing:** 96px (never more)

### Tailwind Spacing Scale

```
p-0:   0px
p-0.5: 2px
p-1:   4px
p-2:   8px
p-3:   12px
p-4:   16px
p-5:   20px
p-6:   24px
p-7:   28px
p-8:   32px
p-9:   36px
p-10:  40px
p-11:  44px
p-12:  48px
p-14:  56px
p-16:  64px
p-20:  80px
p-24:  96px
```

### Layout Spacing Rules

**Page layout:**
- Page padding (mobile): px-4 (16px)
- Page padding (desktop): px-6 md:px-8 lg:px-10
- Section spacing: my-16 md:my-20 lg:my-24 (64-96px)
- Subsection spacing: my-8 md:my-10 lg:my-12 (32-48px)

**Card spacing:**
- Card padding: p-4 sm:p-6 (16-24px)
- Card gap between elements: space-y-4 (16px) or space-y-6 (24px)
- Card title to content: mb-4 (16px)

**Form spacing:**
- Label to input: mb-1.5 (6px) or mb-2 (8px)
- Input to error: mt-1 (4px) or mt-1.5 (6px)
- Form field to field: space-y-4 (16px) or space-y-5 (20px)
- Form section to section: mb-8 (32px)

**List/table spacing:**
- Row padding: px-4 py-3 (horizontal 16px, vertical 12px)
- Row to row gap: 0 (border-bottom only) or gap-1 (4px between cards)
- Header to content: mb-2 (8px) or mb-4 (16px)

**Button spacing:**
- Button padding (default): px-4 py-2 (16px x 8px)
- Button padding (sm): px-3 py-1.5 (12px x 6px)
- Button padding (lg): px-6 py-3 (24px x 12px)
- Button icon only: p-2 (8px)
- Button gap (icon + text): gap-2 (8px)

**Navigation spacing:**
- Nav item padding: px-3 py-2 (12px x 8px) or px-4 py-2 (16px x 8px)
- Nav item to item: gap-1 (4px)
- Nav group to group: ml-4 (16px)
- Sidebar padding: p-4 (16px)

**Modal/Dialog spacing:**
- Dialog padding: p-6 (24px)
- Dialog content gap: space-y-4 (16px)
- Dialog title to description: mb-2 (8px)
- Dialog footer buttons: gap-2 (8px) or gap-3 (12px)

## Rules

1. **Never use arbitrary spacing values.** Only values from the spacing scale (4px increments).
2. **Same-type elements get the same spacing.** If two cards have different padding, something is wrong.
3. **Vertical rhythm > horizontal spacing.** Prioritize consistent vertical gaps between elements.
4. **Use `space-y-*` for vertical lists,** not individual margin-bottom on each child.
5. **Responsive spacing:** smaller on mobile, larger on desktop. Use `p-4 md:p-6`.
6. **Touch targets minimum 44px.** If padding doesn't make an interactive element 44px tall, add more.
7. **Never use margin-top on first child** or margin-bottom on last child inside a container. Use `space-y-*` on the parent.
8. **For grid layouts:** use `gap-*` not individual margins.
9. **Section spacing:** 64px minimum between major sections, 96px maximum. On mobile, 48px minimum.

## Output Format

```tsx
// Good section layout
<section className="py-16 md:py-20 lg:py-24">
  <div className="container px-4 md:px-6">
    <div className="space-y-8 md:space-y-12">
      <h2>Section Title</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* cards */}
      </div>
    </div>
  </div>
</section>
```

## Examples

**Bad:**
```tsx
<div style={{ marginTop: 100 }}>
  <Card style={{ padding: 40 }}>
```

**Good:**
```tsx
<section className="mt-16">
  <Card className="p-6">
```

**Bad:** Using mx-auto with fixed widths, inline spacing, inconsistent gap values

**Good:** Using `container px-4 md:px-6 mx-auto` for page centering, Tailwind spacing scale

## Related Skills

- design — Premium UI generation
- ui-review — Spacing scoring dimension
- color-system — Color creates visual space too
- typography — Line height affects vertical rhythm
- responsive — Responsive spacing adjustments

## Follow-up Skills

- ui-review — Check spacing consistency
- mobile — Optimize spacing for mobile
- design-system — Codify spacing tokens
