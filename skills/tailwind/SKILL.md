---
name: tailwind
description: TailwindCSS v4 patterns. Utility-first CSS, custom config, design tokens, responsive utilities, and production optimization. The preferred styling solution.
argument-hint: "[utility|config|pattern]"
---

# TailwindCSS

## Purpose

Generate TailwindCSS styles following best practices. Use the utility-first approach effectively — compose utilities, create component classes sparingly, and maintain a consistent design system through configuration.

## When to Activate

- User types `/tailwind` or `/tailwind <pattern>`
- Auto-loaded with every page/component generation command
- User is writing TailwindCSS classes
- User needs to configure or customize Tailwind

## When NOT to Activate

- User is using plain CSS or a different CSS framework
- User is writing backend code

## System Prompt

You are a TailwindCSS expert. You write utility classes directly in JSX. You rarely write custom CSS. You extend the config only when the design system demands it. You know every variant, every utility, and every optimization trick.

## Core Patterns

### 1. Utility-First Approach

Write styles directly in JSX. Compose small utility classes. Avoid creating custom CSS classes for one-off styles.

```tsx
// Good: Utility classes
<div className="flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm">

// Bad: Custom CSS
<div className="card">
// Plus .card { display: flex; ... }
```

### 2. Extracting Components

Only extract repeated patterns into component classes using `@apply` when they appear 3+ times identically. Prefer React component extraction over CSS extraction.

```tsx
// Prefer: React component
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      {children}
    </div>
  );
}
```

### 3. Responsive Utilities

Mobile-first. Default styles = mobile. Add breakpoint prefixes for larger screens.

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### 4. State Variants

```tsx
<button className="
  bg-primary text-primary-foreground
  hover:bg-primary/90
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  disabled:opacity-50 disabled:pointer-events-none
">
```

### 5. Dark Mode

Every component supports dark mode using the `dark:` variant.

```tsx
<div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-800">
```

### 6. Arbitrary Values (Sparingly)

Use arbitrary values only when the design token scale doesn't cover the need.

```tsx
<div className="w-[calc(100%-2rem)] top-[37px]">
```

## Key Utilities Reference

### Layout

```
flex, grid, inline-flex, block, hidden
flex-col, flex-row, flex-wrap
items-start, items-center, items-end
justify-start, justify-center, justify-between
gap-0 through gap-24
grid-cols-1 through grid-cols-12
```

### Spacing

```
p-0 through p-24, px-*, py-*, pt-*, pb-*, pl-*, pr-*
m-0 through m-24, mx-*, my-*, mt-*, mb-*, ml-*, mr-*
space-x-*, space-y-*
```

### Typography

```
text-xs through text-7xl, text-base
font-light through font-black
leading-tight, leading-snug, leading-normal, leading-relaxed
tracking-tight, tracking-normal, tracking-wide
text-left, text-center, text-right
```

### Colors

```
bg-*, text-*, border-*, ring-*
/opacity suffix: bg-primary/10, text-muted-foreground/80
dark: variant: dark:bg-gray-950
```

### Borders

```
border, border-0, border-2, border-4, border-8
border-border, border-primary
rounded-none, rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-full
divide-*, divide-y, divide-x
```

### Effects

```
shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
opacity-0 through opacity-100
ring-0, ring-1, ring-2, ring-ring, ring-offset-*, ring-offset-background
```

### Transitions & Animation

```
transition, transition-all, transition-colors, transition-opacity, transition-transform
duration-150 through duration-1000
ease-linear, ease-in, ease-out, ease-in-out
animate-spin, animate-pulse, animate-ping, animate-bounce
```

## Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // or 'media'
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom only if Tailwind's built-in palette doesn't cover it
        brand: {
          50: '#eff6ff',
          // ...
          500: '#3b82f6',
          // ...
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // shadcn/ui defaults
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

## Rules

1. **Never write custom CSS** for styling that can be achieved with utilities.
2. **Use Tailwind's built-in color palette.** Extend only for brand-specific colors.
3. **Use the shadcn/ui CSS variables** for theming (`bg-primary`, `text-muted-foreground`).
4. **Responsive utilities are mobile-first.** `grid-cols-1` (mobile), `lg:grid-cols-3` (desktop).
5. **Never use arbitrary values when the scale covers it.** Prefer `p-6` over `p-[24px]`.
6. **State variants always included.** `hover:`, `focus-visible:`, `disabled:`, `active:`.
7. **Dark mode variants for every background and text color.**
8. **Use `cn()` utility for conditional classes** (from `clsx` + `tailwind-merge`).

## Output Format

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm",
  className
)}>
```

## Related Skills

- tailwind-layout — Layout-specific patterns
- tailwind-animation — Animation utilities
- design-system — Design token integration
- shadcn — shadcn/ui + TailwindCSS integration

## Follow-up Skills

- tailwind-layout — Complex layout patterns
- responsive — Responsive breakpoint usage
