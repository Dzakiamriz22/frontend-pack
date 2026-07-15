---
name: tailwind-animation
description: TailwindCSS animation utilities. Transitions, keyframe animations, hover effects, and performance-optimized animations using Tailwind classes.
argument-hint: "[transition|hover|keyframe]"
---

# Tailwind Animation

## Purpose

Use TailwindCSS built-in animation utilities for performant, consistent animations. Transitions, hover effects, loaders, and custom keyframe animations all through Tailwind classes.

## When to Activate

- Auto-loaded with page/component generation commands
- User asks for hover effects, transitions, or animations
- User types `/animate` or `/tailwind-animation`
- User needs loading spinners, skeleton animations, or micro-interactions

## When NOT to Activate

- Complex page transitions (use framer-motion instead)
- Gesture-based animations (drag, swipe — use framer-motion)
- Animations that require spring physics

## System Prompt

You are an animation specialist who uses TailwindCSS utilities for simple UI animations. You reserve Framer Motion for complex interactions. You know which animations are performant (transform, opacity) and which are not (height, width, top, left).

## Transition Utilities

### Basic Transitions

```tsx
<button className="
  transition-colors duration-200
  bg-primary hover:bg-primary/90
">
  Hover me
</button>

<div className="
  transition-all duration-300 ease-in-out
  hover:scale-105 hover:shadow-lg
">
  Scale on hover
</div>
```

### Transition Properties

```tsx
transition-all       — animates all changing properties
transition-colors    — color, background-color, border-color (preferred)
transition-opacity   — opacity only (most performant)
transition-shadow    — box-shadow
transition-transform — transform (most performant)
transition-none      — no transition
```

### Transition Duration

```tsx
duration-75    — 75ms   (instant feedback)
duration-100   — 100ms  (button press)
duration-150   — 150ms  (default, hover effects)
duration-200   — 200ms  (menu open)
duration-300   — 300ms  (default transition)
duration-500   — 500ms  (page transitions)
duration-700   — 700ms  (emphasized)
duration-1000  — 1000ms (slow)
```

### Transition Timing

```tsx
ease-linear    — constant speed
ease-in        — slow start, fast end
ease-out       — fast start, slow end (recommended for UI)
ease-in-out    — slow start and end (recommended for property transitions)
```

## Hover Effects

### Scale

```tsx
<button className="hover:scale-105 active:scale-95 transition-transform">
```

### Elevation

```tsx
<Card className="hover:shadow-md transition-shadow">
```

### Color Shift

```tsx
<Button className="hover:bg-primary/90 transition-colors">
```

### Underline Reveal

```tsx
<a className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
```

## Animation Utilities

### Built-in Animations

```tsx
animate-spin       — 360° rotation (loaders)
animate-pulse      — opacity fade (skeleton)
animate-ping       — scale out (notification dots)
animate-bounce     — bounce (loading more, scroll indicator)
animate-none       — disabled animation
```

### Custom Keyframes

Add to `tailwind.config.ts`:

```ts
theme: {
  extend: {
    keyframes: {
      'fade-in': {
        from: { opacity: '0', transform: 'translateY(4px)' },
        to: { opacity: '1', transform: 'translateY(0)' },
      },
      'fade-in-up': {
        from: { opacity: '0', transform: 'translateY(12px)' },
        to: { opacity: '1', transform: 'translateY(0)' },
      },
      'scale-in': {
        from: { opacity: '0', transform: 'scale(0.95)' },
        to: { opacity: '1', transform: 'scale(1)' },
      },
      'slide-in-right': {
        from: { transform: 'translateX(100%)' },
        to: { transform: 'translateX(0)' },
      },
      'slide-out-right': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(100%)' },
      },
    },
    animation: {
      'fade-in': 'fade-in 0.2s ease-out',
      'fade-in-up': 'fade-in-up 0.3s ease-out',
      'scale-in': 'scale-in 0.2s ease-out',
      'slide-in-right': 'slide-in-right 0.3s ease-out',
      'slide-out-right': 'slide-out-right 0.3s ease-in',
    },
  },
},
```

Usage:

```tsx
<div className="animate-fade-in">
<div className="animate-fade-in-up">
<div className="animate-scale-in">
```

## Skeleton Animations

```tsx
// Make an animated skeleton
<div className="animate-pulse rounded-md bg-muted" />

// With Tailwind's built-in pulse
<div className="space-y-4">
  <div className="h-4 w-48 animate-pulse rounded bg-muted" />
  <div className="h-4 w-64 animate-pulse rounded bg-muted" />
  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
</div>
```

## Performance Rules

1. **Animate `transform` and `opacity` only.** These are GPU-accelerated. Never animate `height`, `width`, `top`, `left`, `margin`, `padding`.
2. **Use `transition-colors` over `transition-all`** when only colors change. All is convenient but paints more.
3. **300ms max for UI transitions.** Users perceive 200-300ms as instantaneous. Longer feels slow.
4. **Use `ease-out` for enter animations** (element appears). Use `ease-in` for exit (element disappears).
5. **Respect `prefers-reduced-motion`.** Disable or simplify animations.

## Examples

### Button with loading state

```tsx
<Button disabled={loading}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {loading ? 'Saving...' : 'Save'}
</Button>
```

### List item enter animation

```tsx
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-fade-in-up"
    style={{ animationDelay: `${i * 50}ms` }}
  >
    {item.name}
  </div>
))}
```

### Toast notification

```tsx
<div className="animate-slide-in-right data-[state=closed]:animate-slide-out-right">
```

## Related Skills

- framer-motion — Complex animations (use when Tailwind isn't enough)
- micro-interactions — Small interaction animations
- page-transitions — Full page transitions
- design — Animation in UI generation

## Follow-up Skills

- framer-motion — Migrate complex animations to Framer Motion
- micro-interactions — Add micro-interactions
