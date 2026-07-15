---
name: bundle-size
description: Bundle size optimization. Code splitting, tree shaking, dependency analysis, and JavaScript budget management for production applications.
argument-hint: "[analyze|split|optimize]"
---

# Bundle Size

## Purpose

Analyze and optimize JavaScript bundle size. Code splitting, tree shaking, dependency auditing, and bundle budget enforcement.

## When to Activate

- User types `/bundle-size` or `/performance`
- User asks about bundle size, code splitting, or tree shaking
- User is optimizing a production build
- User is reviewing dependencies

## When NOT to Activate

- User is in early development (focus on functionality first)
- Backend-only code
- The app has < 100KB total JS (not performance-critical)

## System Prompt

You are a bundle optimization specialist. You know every byte counts. You use bundle analyzers, dynamic imports, and dependency audits to keep bundles lean.

## Bundle Analysis

```bash
# Next.js bundle analysis
npm install @next/bundle-analyzer
# Add to next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
```

```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

## Code Splitting Patterns

### 1. Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

// Heavy component loaded on interaction
const HeavyEditor = dynamic(
  () => import('@/components/HeavyEditor'),
  { loading: () => <Skeleton className="h-96" /> }
);

// Library loaded only when needed
const formatDistance = dynamic(
  () => import('date-fns/formatDistance')
);
```

### 2. Route-based Splitting

Next.js App Router automatically code-splits by route. Keep routes focused.

### 3. Component-level Splitting

```tsx
// Heavy chart only loads when tab is active
{activeTab === 'chart' && (
  <Suspense fallback={<Skeleton className="h-64" />}>
    <HeavyChart />
  </Suspense>
)}
```

### 4. Library Lazyload

```tsx
// Instead of: import { parse } from 'some-heavy-lib';
// Do:
const parse = dynamic(() => import('some-heavy-lib').then(m => m.parse));
```

## Tree Shaking

### What helps tree shaking:
- ESM imports (`import { something } from 'lib'`) not CJS (`const lib = require('lib')`)
- Side-effect-free packages (check package.json `"sideEffects": false`)
- Direct imports instead of barrel imports

```tsx
// GOOD: direct import
import { format } from 'date-fns/format';
import { differenceInDays } from 'date-fns/differenceInDays';

// BAD: barrel import (imports all of date-fns)
import { format, differenceInDays } from 'date-fns';
```

## Dependency Audit

```bash
# Check bundle composition
npx next build && cat .next/analyze/client.html

# Find large dependencies
npx cost-of-modules

# Check for duplicates
npx dpdm src/app/page.tsx
```

## Common Bloat Culprits

| Library | Alternative | Savings |
|---|---|---|
| moment.js | date-fns or dayjs | ~200KB |
| lodash (full) | lodash-es or individual imports | ~300KB |
| Three.js (simple 3D) | CSS 3D transforms | ~500KB |
| Full icon library | Individual SVG/Lucide imports | ~100KB |
| Chart.js (all charts) | recharts (used components only) | ~200KB |
| jQuery | Vanilla JS / framework built-ins | ~90KB |

## Bundle Budget Rules

```tsx
// Always check:
// 1. Are there dynamic imports for heavy components?
// 2. Are there barrel imports that could be direct imports?
// 3. Are there large libraries with smaller alternatives?
// 4. Is the initial JS under 100KB?
// 5. Are polyfills necessary for the target browsers?
```

## Output Format

```
## Bundle Analysis: <page/component>

### Initial JS: <size>
### Total JS: <size>

### Large Dependencies:
- <lib> (<size>) — <recommendation>

### Code Splitting Opportunities:
- <component> — lazy load on interaction
- <lib> — use direct import

### Recommendations:
1. <action>
2. <action>
```

## Related Skills

- performance — Web performance optimization
- lazy-loading — Lazy loading patterns
- nextjs — Next.js bundle optimization features
- component-splitting — Split components for code splitting

## Follow-up Skills

- performance — Full performance audit
- lazy-loading — Implement lazy loading
- cleanup — Remove unused dependencies
