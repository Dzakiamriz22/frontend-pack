---
name: design-system
description: Design system architecture. Token definition, component library structure, theme management, and documentation. Creates production-grade design systems.
argument-hint: "[token|component|theme]"
---

# Design System

## Purpose

Architect and implement production-grade design systems. Define design tokens (colors, typography, spacing, shadows, radii), component patterns, theme switching, and system documentation.

## When to Activate

- User types `/design-system` or `/design-system <subcommand>`
- User asks to create or update a design system
- User needs to define/update design tokens
- User is creating a new component library
- User needs theme management (light/dark/custom)

## When NOT to Activate

- User is building a one-off page with no reusable intent
- User is exploring a quick prototype
- Backend-only work

## System Prompt

You are a design system architect who has built systems used by thousands of developers at top-tier companies. You think in tokens, not values. You design for scale, consistency, and developer experience.

## Design System Architecture

### 1. Design Tokens

All visual primitives are defined as tokens:

```tsx
// styles/tokens.ts
export const tokens = {
  colors: {
    // Neutral scale
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      // ...
      950: '#0a0a0a',
    },
    // Semantic
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    destructive: '#ef4444',
    info: '#3b82f6',
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.1',
      snug: '1.25',
      normal: '1.5',
      relaxed: '1.625',
    },
  },
  radii: {
    none: '0',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
```

### 2. Semantic Theme

```tsx
// styles/theme.ts
export const lightTheme = {
  background: '#ffffff',
  foreground: '#0a0a0a',
  card: '#ffffff',
  'card-foreground': '#0a0a0a',
  primary: '#3b82f6',
  'primary-foreground': '#ffffff',
  secondary: '#f5f5f5',
  'secondary-foreground': '#0a0a0a',
  muted: '#f5f5f5',
  'muted-foreground': '#737373',
  accent: '#f5f5f5',
  'accent-foreground': '#0a0a0a',
  destructive: '#ef4444',
  'destructive-foreground': '#ffffff',
  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#3b82f6',
};

export const darkTheme: typeof lightTheme = {
  background: '#0a0a0a',
  foreground: '#fafafa',
  // ...
};
```

### 3. Component Layer

Components use tokens, not hardcoded values:

```tsx
// Good
<Button className="bg-primary text-primary-foreground rounded-md px-4 py-2">

// Bad
<button className="bg-blue-500 text-white rounded px-3 py-1">
```

### 4. shadcn/ui as Base

Prefer shadcn/ui components. Customize via `tailwind.config.ts` and `globals.css`:

```tsx
// tailwind.config.ts — Customize shadcn/ui theme
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#3b82f6', foreground: '#ffffff' },
        // ...
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
};
```

## Design System Checklist

### Tokens
- [ ] Color palette (neutral + primary + semantic)
- [ ] Typography scale (weights, sizes, line heights)
- [ ] Spacing scale (4px base)
- [ ] Border radii (max 3 distinct values)
- [ ] Shadow scale (sm/md/lg/xl)
- [ ] Breakpoints (sm/md/lg/xl/2xl)
- [ ] Z-index scale (dropdown, sticky, modal, toast)

### Theme
- [ ] Light mode tokens
- [ ] Dark mode tokens
- [ ] High-contrast mode (optional)
- [ ] CSS variables for runtime theming

### Components
- [ ] Button (primary, secondary, outline, ghost, destructive, sizes)
- [ ] Input (text, email, password, search, with icon, with error)
- [ ] Select (native or custom)
- [ ] Checkbox, Radio, Switch
- [ ] Card (with header, content, footer variants)
- [ ] Dialog/Modal (with shadcn/ui)
- [ ] Dropdown menu
- [ ] Command palette
- [ ] Table (sortable, paginated, selectable)
- [ ] Navigation (sidebar, top bar, tabs, breadcrumbs)
- [ ] Badge, Avatar, Tooltip, Toast
- [ ] Skeleton loader
- [ ] Empty state
- [ ] Error state

### Documentation
- [ ] Token reference
- [ ] Component usage examples
- [ ] Dark mode preview
- [ ] Accessibility notes
- [ ] Responsive behavior

## Output Format

For token creation:
```tsx
// styles/tokens.ts
// styles/theme.ts
// tailwind.config.ts
```

For component creation:
```tsx
// components/ui/<name>.tsx — shadcn/ui style
```

## Related Skills

- color-system — Color palette definition
- typography — Type scale definition
- spacing — Spacing scale
- shadcn — shadcn/ui integration
- tailwind — TailwindCSS config

## Follow-up Skills

- ui-review — Review design system consistency
- accessibility — Verify token accessibility
- documentation — Document the system
