---
name: lazy-loading
description: Lazy loading patterns. Image lazy loading, component lazy loading, route-based lazy loading, infinite scroll, and intersection observer patterns.
argument-hint: "[image|component|scroll]"
---

# Lazy Loading

## Purpose

Implement lazy loading for images, components, routes, and data. Defer non-critical resources until needed. Improve initial page load time and perceived performance.

## When to Activate

- User types `/lazy-loading` or `/performance`
- User is building a page with many images or heavy components
- User needs infinite scroll or load-more patterns
- User needs to defer expensive rendering

## When NOT to Activate

- Everything above the fold should be eagerly loaded
- User is working on backend-only code
- The page is a simple static page with minimal content

## System Prompt

You are a lazy loading specialist. You defer everything that isn't needed immediately. You use Intersection Observer, `loading="lazy"`, and dynamic imports to keep initial load fast.

## Image Lazy Loading

### Native Lazy Loading

```tsx
// Browser-native lazy loading (works in modern browsers)
<img
  src="/large-image.jpg"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
  decoding="async"
/>

// Next.js Image (uses native lazy loading by default)
<Image
  src="/large-image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy" // default, only eager for priority images
/>
```

### Intersection Observer Lazy Loading

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function LazyImage({ src, alt, className }: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          onLoad={() => {/* transition in */}}
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
}
```

## Component Lazy Loading

### Dynamic Import with Next.js

```tsx
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Load only when needed
const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false, // Don't SSR — load on client only
  }
);

// Usage: only render when visible/interacted
{showChart && <HeavyChart />}
```

### Conditional Lazy Load (Tab/Accordion)

```tsx
function TabPanel({ isActive, children }: Props) {
  const [hasBeenActivated, setHasBeenActivated] = useState(false);

  useEffect(() => {
    if (isActive && !hasBeenActivated) {
      setHasBeenActivated(true);
    }
  }, [isActive]);

  if (!hasBeenActivated) return null;

  return (
    <Suspense fallback={<Skeleton className="h-64" />}>
      {children}
    </Suspense>
  );
}
```

## Infinite Scroll / Load More

```tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export function InfiniteList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam = 0 }) => fetchItems(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '400px' }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page) =>
        page.items.map((item) => <ItemCard key={item.id} item={item} />)
      )}

      <div ref={loadMoreRef}>
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
```

## Route-based Lazy Loading

Next.js App Router handles this automatically. Each route segment is its own bundle.

```tsx
// app/dashboard/page.tsx — automatically lazy-loaded
// app/settings/page.tsx — separate bundle
```

## Deferred Scripts

```tsx
// Defer non-critical scripts
<script src="/analytics.js" defer />
// OR
<script src="/chat-widget.js" async />
```

## Rules

1. **Images below the fold: `loading="lazy"`.** Above the fold images: `priority` or eager.
2. **Components below the fold: dynamic import.** Heavy charts, maps, editors, rich text.
3. **Intersection Observer with `rootMargin: '200px'`** so loading starts before the element is visible.
4. **Infinite scroll vs pagination:** Infinite scroll for social/content feeds. Pagination for data tables.
5. **Skeleton during lazy load.** Never show nothing — always show a placeholder matching the final layout.
6. **`requestIdleCallback` for non-urgent work.** Preconnect, prefetch, preload third-party resources.
7. **Progressive image loading.** Show a blurry placeholder or low-res image first, then replace with full-res.

## Related Skills

- performance — Web performance
- bundle-size — Code splitting for lazy loading
- images — Image optimization
- component-splitting — Split components for lazy loading

## Follow-up Skills

- performance — Measure lazy loading effectiveness
- bundle-size — Verify lazy loaded chunks are correct size
