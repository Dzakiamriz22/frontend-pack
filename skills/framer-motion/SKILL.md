---
name: framer-motion
description: Framer Motion animation patterns. Layout animations, spring physics, gestures, exit animations, SVG animations, and shared layout animations.
argument-hint: "[animation|gesture|layout]"
---

# Framer Motion

## Purpose

Use Framer Motion for production-grade React animations. Layout animations, micro-interactions, gesture handling, page transitions, and SVG animations — all performant and accessible.

## When to Activate

- User types `/animate` or `/framer-motion`
- User needs animations beyond TailwindCSS capabilities
- User needs page transitions
- User needs gesture-based interactions (drag, swipe, hover)
- User needs layout animations (AnimatePresence, layoutId)

## When NOT to Activate

- Simple hover effects or transitions (use TailwindCSS transition utilities)
- CSS-only animations (use Tailwind's animate-* utilities)
- The animation can be achieved with zero JS

## System Prompt

You are a motion designer who uses Framer Motion for web animations. You think in spring physics, not duration-based timing. You respect `prefers-reduced-motion`. You animate `transform` and `opacity` for performance.

## Core Patterns

### 1. Basic Animations

```tsx
import { motion } from 'framer-motion';

// Scale on hover
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
>
  Click me
</motion.button>

// Fade in on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### 2. Stagger Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item, i) => (
    <motion.li key={item.id} variants={item}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### 3. AnimatePresence (Exit Animations)

```tsx
import { AnimatePresence, motion } from 'framer-motion';

{isOpen && (
  <AnimatePresence>
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <ModalContent />
    </motion.div>
  </AnimatePresence>
)}

// List add/remove
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {item.name}
    </motion.div>
  ))}
</AnimatePresence>
```

### 4. Layout Animations

```tsx
// Shared layout animations (magical)
<motion.div layoutId="card" onClick={() => setSelected(id)}>
  <Card />
</motion.div>

// In the detail view:
<motion.div layoutId="card">
  <ExpandedCard />
</motion.div>
```

### 5. Gesture Handling

```tsx
import { useDragControls } from 'framer-motion';

// Drag
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  onDragEnd={(_, info) => {
    if (info.offset.x > 100) onSwipeRight();
    if (info.offset.x < -100) onSwipeLeft();
  }}
>
  Swipeable card
</motion.div>

// Hover
<motion.div whileHover={{ scale: 1.05 }} />
```

### 6. Scroll Animations

```tsx
import { useInView } from 'framer-motion';

function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

## Animation Variants Pattern

Extract reusable variants:

```tsx
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

export const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};
```

## Performance Rules

1. **Animate `transform` and `opacity` only.** These are GPU-accelerated. Never animate `height`, `width`, `top`, `left`.
2. **Use `layout` prop instead of animating dimensions.** Framer Motion handles it performantly.
3. **Use `will-change: transform` on animated elements** (or let Framer Motion handle it).
4. **Animate only what's visible.** Don't animate off-screen elements.
5. **Use `once: true` in useInView** to avoid re-triggering scroll animations.
6. **Avoid animating 100+ elements.** Batch with stagger children instead.

## Accessibility

```tsx
// Respect reduced motion
import { useReducedMotion } from 'framer-motion';

function Component() {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} } // No animation
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return <motion.div variants={variants}>...</motion.div>;
}
```

## Related Skills

- page-transitions — Full page transition patterns
- micro-interactions — Small interaction details
- tailwind-animation — Simple Tailwind animations
- design — Animated UI generation

## Follow-up Skills

- page-transitions — Add page transitions to routes
- micro-interactions — Polish interactions
- ui-review — Review animation quality
