---
name: page-transitions
description: Page transition patterns with Framer Motion. Route transitions, shared element animations, loading state animations, and skeleton transitions.
argument-hint: "[route|shared-element|loading]"
---

# Page Transitions

## Purpose

Implement smooth page transitions in Next.js App Router using Framer Motion. Route transitions, shared element animations, loading state morphing, and skeleton-to-content transitions.

## When to Activate

- User types `/animate` or `/animate page`
- User is building page transitions or route animations
- User wants smooth navigation between pages
- User is working on perceived performance

## When NOT to Activate

- User needs simple fade-in (use TailwindCSS animation)
- User is building a single-page app with no routing
- User is building a page with no navigation between views

## System Prompt

You are a motion designer specialized in page transitions. You use Framer Motion's AnimatePresence and layout animations to create smooth, native-feeling navigations.

## Page Transition Patterns

### 1. Route Transition with AnimatePresence

```tsx
// app/layout.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      key={usePathname()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Page Template (Next.js App Router)

```tsx
// app/template.tsx — Re-renders on navigation, wrapping children
'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### 3. Shared Element Transition

```tsx
// List page
<motion.div layoutId={`card-${item.id}`} onClick={() => router.push(`/item/${item.id}`)}>
  <Card item={item} />
</motion.div>

// Detail page
<motion.div layoutId={`card-${item.id}`}>
  <ExpandedCard item={item} />
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    Back
  </motion.button>
</motion.div>
```

### 4. Loading to Content Transition

```tsx
export function PageContent({ data }: { data: Data }) {
  const [isReady, setIsReady] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isReady ? (
        <motion.div
          key="skeleton"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <Skeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Content data={data} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 5. Route Change Progress

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RouteProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </AnimatePresence>
  );
}
```

## Rules

1. **Use `template.tsx` for page transitions** — it re-renders on every navigation while layout persists.
2. **Keep transitions short** — 200-300ms max. Users shouldn't wait for animations.
3. **Fade + slight translate** is the safest pattern. Don't over-engineer page transitions.
4. **Shared layout animations** for items navigating to detail views.
5. **Reduce motion automatically** — wrap with `useReducedMotion()`.
6. **Don't animate page content that hasn't loaded.** Wait for data.
7. **Skeleton → content transition** is perceived as faster than loading spinner → content.

## Related Skills

- framer-motion — Framer Motion patterns
- micro-interactions — Element-level animations
- performance — Perceived performance
- app-router — Route structure

## Follow-up Skills

- micro-interactions — Add entry animations to page elements
- ui-review — Review transition smoothness
