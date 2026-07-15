---
name: performance
description: Web performance optimization. Core Web Vitals, rendering optimization, asset optimization, caching strategies, and performance measurement.
argument-hint: "[audit|optimize|measure]"
---

# Performance

## Purpose

Optimize web application performance. Core Web Vitals (LCP, FID/INP, CLS), rendering optimization, asset optimization, caching, and performance measurement.

## When to Activate

- User asks about performance optimization
- User is building a performance-critical page
- User needs to improve Core Web Vitals scores
- User types `/performance` or `/performance audit`

## When NOT to Activate

- User is prototyping or in early development (optimize later)
- User is building an internal tool with low traffic
- Backend-only database optimization (use a backend-specific skill)

## System Prompt

You are a web performance engineer. You have optimized sites for millions of users. You think in terms of Critical Rendering Path, Core Web Vitals, bundle budgets, and caching strategies.

## Core Web Vitals

### Largest Contentful Paint (LCP)

Target: < 2.5s

**Optimization:**
- Preload hero images: `<link rel="preload" as="image" href="/hero.webp">`
- Optimize images: WebP/AVIF, responsive sizes, proper dimensions
- Minimize render-blocking resources: inline critical CSS, defer non-critical JS
- Server-side render above-the-fold content
- Use a CDN for static assets

```tsx
// Preload hero image
export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/hero.webp" />
      <Image
        src="/hero.webp"
        alt="Hero"
        priority // Next.js will preload this
        sizes="100vw"
        className="w-full h-auto"
      />
    </>
  );
}
```

### First Input Delay / Interaction to Next Paint (FID/INP)

Target: < 100ms FID, < 200ms INP

**Optimization:**
- Minimize main thread blocking (long tasks)
- Code-split JavaScript (dynamic imports)
- Defer non-critical event handlers
- Use `requestIdleCallback` for non-urgent work
- Avoid large DOM sizes (< 1500 elements)

### Cumulative Layout Shift (CLS)

Target: < 0.1

**Optimization:**
- Set explicit dimensions on images/videos
- Use `aspect-ratio` CSS property
- Reserve space for ads/dynamic content
- Avoid inserting content above existing content
- Use `min-height` on loading skeletons

```tsx
// Prevent layout shift with aspect ratio
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  className="w-full h-auto"
  // Or use aspect-ratio:
  // className="aspect-[4/3] object-cover"
/>
```

## Rendering Optimization

### React/Next.js

```tsx
// 1. Server Components (zero JS for static content)
export default async function StaticSection() {
  const content = await getContent();
  return <div>{content}</div>;
}

// 2. Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false, // If chart is client-only
});

// 3. Memoize expensive computations
const sorted = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// 4. Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div key={virtualItem.key} style={{
            position: 'absolute',
            top: 0,
            transform: `translateY(${virtualItem.start}px)`,
          }}>
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Asset Optimization

### Images

```tsx
// Next.js Image (automatic optimization)
<Image
  src="/large-photo.jpg"
  alt="Description"
  width={1200}
  height={800}
  priority // Above the fold
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
/>

// Manual: responsive images with srcSet
<img
  srcSet="/photo-400.webp 400w, /photo-800.webp 800w, /photo-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="/photo-800.webp"
  alt="Description"
/>
```

### Fonts

```tsx
// Self-host or use next/font (automatic optimization)
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show text in fallback font until custom loads
  preload: true,
});
```

### JavaScript

```tsx
// Dynamic imports for code splitting
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <Skeleton />,
});

// Web worker for heavy computation
// (Use next.js worker or comlink)
```

## Caching Strategies

```tsx
// TanStack Query with stale time
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30,    // 30 minutes (formerly cacheTime)
});

// Next.js ISR
fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }, // Revalidate every hour
});
```

## Bundle Size Budget

| Asset | Budget |
|---|---|
| Initial HTML | < 50KB |
| Initial CSS | < 20KB |
| Initial JS (critical) | < 100KB |
| Total JS (all routes) | < 300KB |
| Fonts | < 50KB |
| Hero image | < 200KB |

## Rules

1. **Measure before optimizing.** Use Lighthouse, Web Vitals library, or RUM data.
2. **LCP < 2.5s.** Prioritize above-the-fold content loading.
3. **CLS < 0.1.** Set dimensions on all media elements.
4. **INP < 200ms.** Keep main thread responsive.
5. **Code-split by routes.** Dynamic imports for heavy components.
6. **Optimize images first.** Images are the #1 cause of bloat.
7. **Staticize when possible.** Server components, ISR, static generation.
8. **Bundle analysis.** Use `@next/bundle-analyzer` or `source-map-explorer`.

## Related Skills

- bundle-size — Bundle size optimization
- lazy-loading — Lazy loading patterns
- nextjs — Next.js performance features
- server-components — RSC for zero-JS rendering

## Follow-up Skills

- bundle-size — Audit bundle composition
- lazy-loading — Add lazy loading where missing
- ui-review — Review performance as part of UX
