---
name: responsive
description: Responsive design patterns. Breakpoint strategy, fluid typography, responsive grids, adaptive layouts, and conditional rendering for all screen sizes.
argument-hint: "[breakpoint|layout|component]"
---

# Responsive

## Purpose

Create interfaces that adapt gracefully to any screen size — from 320px mobile to 2560px ultra-wide. Every layout uses responsive design patterns, not separate mobile/desktop code paths.

## When to Activate

- User is generating any page or layout
- User types `/responsive` or asks about responsive behavior
- Auto-loaded with `/mobile` and `/design` commands
- User is reviewing or fixing responsive issues

## When NOT to Activate

- User is building an embedded display with fixed dimensions
- User is building a print stylesheet
- Backend-only code

## System Prompt

You are a responsive design expert. You use CSS Grid, Flexbox, and Tailwind breakpoints fluidly. You never hardcode widths. You design for content, not for specific devices.

## Breakpoint Strategy

Use Tailwind's default breakpoints:

```
sm:  640px   — Large phones (landscape)
md:  768px   — Tablets (portrait)
lg:  1024px  — Tablets (landscape), small desktops
xl:  1280px  — Standard desktops
2xl: 1536px  — Large desktops
```

### Breakpoint Usage Guidelines

- **Default (no prefix):** Mobile-first. 320px-639px.
- **sm:** Large phones in landscape, small tablets. Minor layout adjustments.
- **md:** Tablets. 2-column grids become possible. Sidebar can appear.
- **lg:** Small desktops. Full multi-column layouts. Sidebar navigation.
- **xl:** Standard desktops. Max-width containers limit readability.
- **2xl:** Large desktops. Some layouts benefit from wider containers.

## Responsive Patterns

### 1. Container with Max-Width

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
```

### 2. Responsive Grid

```tsx
// 1 col -> 2 col -> 3 col -> 4 col
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### 3. Fluid Typography

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
<p className="text-sm sm:text-base md:text-lg text-muted-foreground">
```

### 4. Responsive Spacing

```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
```

### 5. Conditional Rendering

```tsx
// Mobile-only content
<div className="block md:hidden">
  <MobileVersion />
</div>

// Desktop-only content
<div className="hidden md:block">
  <DesktopVersion />
</div>
```

### 6. Responsive Navigation

```tsx
// Mobile: hamburger menu
// Desktop: horizontal nav
<nav>
  <MobileNav className="flex md:hidden" />
  <DesktopNav className="hidden md:flex" />
</nav>
```

### 7. Responsive Tables

```tsx
// Desktop: traditional table
// Mobile: stacked card layout
<div className="overflow-x-auto md:overflow-visible">
  <table className="hidden md:table w-full">
    {/* ... */}
  </table>
  <div className="md:hidden space-y-4">
    {items.map(item => <MobileCard key={item.id} item={item} />)}
  </div>
</div>
```

### 8. Responsive Images

```tsx
<Image
  src={image.src}
  alt={image.alt}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

## Rules

1. **Mobile-first.** All styles start from mobile. Only add complexity at larger breakpoints.
2. **Never hide content on mobile** unless it's genuinely not needed. Prioritize, don't hide.
3. **Max-width on readable content.** Text containers: max-w-prose (65ch) or max-w-2xl (672px) for readability.
4. **No horizontal scroll at any breakpoint.** `overflow-x-hidden` on body as safety net.
5. **Touch targets 44px minimum** on screens < 1024px.
6. **Forms are single column** below md breakpoint.
7. **Navigation pattern changes** at breakpoints. Hamburger -> horizontal nav at lg.
8. **Images scale with container.** `w-full h-auto` on all images.
9. **Test at every breakpoint.** 320, 640, 768, 1024, 1280, 1536, 1920.

## Output Format

```tsx
// Responsive component
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground mt-2">
        {item.description}
      </p>
    </Card>
  ))}
</div>
```

## Examples

**Bad:** Fixed width containers, no breakpoints, content hidden on mobile, horizontal scroll

**Good:** Mobile-first grid, fluid typography, responsive spacing, all content accessible on mobile

## Related Skills

- mobile — Mobile-specific UX patterns
- design — Layout generation
- spacing — Responsive spacing scale
- typography — Responsive type sizing
- tailwind-layout — Tailwind responsive utilities

## Follow-up Skills

- mobile — Mobile optimization
- ui-review — Responsive scoring dimension
