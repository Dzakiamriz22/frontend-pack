---
name: tailwind-layout
description: TailwindCSS layout patterns. Flexbox, CSS Grid, responsive layouts, containers, and alignment utilities for complex page layouts.
argument-hint: "[grid|flex|page-layout]"
---

# Tailwind Layout

## Purpose

Build complex, responsive layouts using TailwindCSS Flexbox and Grid utilities. Every layout is responsive by default, follows the 12-column convention, and handles edge cases like overflow and alignment.

## When to Activate

- User is building page layouts or complex grid systems
- User types `/tailwind` or `/tailwind-layout`
- User asks about layout patterns or alignment
- User needs responsive grid or flex layouts

## When NOT to Activate

- User is working on single-element components (buttons, inputs)
- User is writing backend code

## System Prompt

You are a CSS layout expert. You use CSS Grid for 2D layouts and Flexbox for 1D layouts. You never use float-based layouts. Every layout is responsive, accessible, and performs well.

## Layout Decision Guide

| Requirement | Solution |
|---|---|
| 2D grid (rows + columns) | CSS Grid: `grid grid-cols-*` |
| 1D row/column | Flexbox: `flex`, `flex-col` |
| Centering content | `flex items-center justify-center` |
| Equal-width columns | `grid grid-cols-<n>` |
| Sidebar + content | `grid grid-cols-[250px_1fr]` |
| Sticky footer | `flex flex-col min-h-screen` + `flex-1` on main |
| Holy grail layout | Grid with named areas |

## Page Layout Patterns

### 1. Dashboard Layout

```tsx
<div className="flex min-h-screen">
  <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
    {/* Sidebar */}
  </aside>
  <div className="flex flex-1 flex-col">
    <header className="sticky top-0 z-10 border-b bg-background px-6 h-14 flex items-center">
      {/* Top nav */}
    </header>
    <main className="flex-1 p-6">
      {/* Page content */}
    </main>
  </div>
</div>
```

### 2. Marketing/Site Layout

```tsx
<div className="flex flex-col min-h-screen">
  <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    {/* Nav */}
  </header>
  <main className="flex-1">
    {/* Content */}
  </main>
  <footer className="border-t">
    {/* Footer */}
  </footer>
</div>
```

### 3. Centered Card Layout

```tsx
<div className="flex min-h-screen items-center justify-center p-4">
  <div className="w-full max-w-md space-y-6">
    {/* Card content */}
  </div>
</div>
```

## CSS Grid Patterns

### 1. Auto-fit Grid

```tsx
// Responsive grid, cards auto-fit
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### 2. Sidebar + Content

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
  <aside>{/* Sidebar */}</aside>
  <main>{/* Main content */}</main>
</div>
```

### 3. Asymmetric Grid

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main */}</div>
  <div>{/* Sidebar */}</div>
</div>
```

### 4. Full-Width Hero + Constrained Content

```tsx
<Hero className="w-full" />
<div className="container mx-auto max-w-7xl px-4 md:px-6">
  {/* Content */}
</div>
```

## Flexbox Patterns

### 1. Toolbar/Action Bar

```tsx
<div className="flex items-center justify-between gap-4">
  <div className="flex items-center gap-2">
    {/* Left actions */}
  </div>
  <div className="flex items-center gap-2">
    {/* Right actions */}
  </div>
</div>
```

### 2. Card Row with Centered Content

```tsx
<div className="flex items-center gap-4 p-4">
  <Avatar className="h-10 w-10" />
  <div className="flex-1 min-w-0">
    <p className="font-medium truncate">Name</p>
    <p className="text-sm text-muted-foreground truncate">Description</p>
  </div>
  <div className="flex items-center gap-2">
    <Badge>Active</Badge>
    <Button variant="ghost" size="icon">...</Button>
  </div>
</div>
```

### 3. Centered Layout

```tsx
<div className="flex flex-col items-center justify-center text-center">
  <Icon className="h-12 w-12 text-muted-foreground" />
  <h3 className="mt-4 text-lg font-semibold">Title</h3>
  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
    Description text limited in width for readability.
  </p>
  <Button className="mt-4">Action</Button>
</div>
```

## Responsive Breakpoints

```tsx
// Mobile-first breakpoints
className="
  grid-cols-1     /* mobile: 1 column */
  sm:grid-cols-2  /* tablet: 2 columns */
  lg:grid-cols-3  /* desktop: 3 columns */
  xl:grid-cols-4  /* wide: 4 columns */
"
```

## Spacing for Layouts

```tsx
// Section padding
className="py-12 sm:py-16 lg:py-20"

// Container padding
className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"

// Gap between items
className="gap-4 sm:gap-6 lg:gap-8"

// Stack spacing
className="space-y-4 sm:space-y-6 lg:space-y-8"
```

## Rules

1. **Use CSS Grid for 2D layouts** (rows + columns). Use Flexbox for 1D (single row/column).
2. **Avoid fixed heights.** Let content determine height. Use `min-h-*` instead of `h-*`.
3. **Avoid negative margins.** Use `gap-*` on the parent instead.
4. **Don't use `mx-auto` without a width constraint** (max-w-*, container, or w-*).
5. **Sidebar width: 280px** on desktop. Full width on mobile.
6. **Max content width: 1280px** (`max-w-7xl`). Text max-width: 65ch.
7. **Use `min-w-0` on flex children** with truncation to prevent overflow.
8. **Sticky headers need `z-50`** and proper background (backdrop-blur on glass).

## Related Skills

- tailwind — TailwindCSS utilities
- responsive — Responsive breakpoints
- spacing — Spacing scale
- design — Layout generation

## Follow-up Skills

- responsive — Test layout at all breakpoints
- mobile — Mobile layout optimization
