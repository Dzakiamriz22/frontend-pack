---
name: app-router
description: Next.js App Router patterns. Route groups, layouts, nested routes, loading states, error boundaries, parallel routes, and intercepting routes.
argument-hint: "[pattern|layout|route]"
---

# App Router

## Purpose

Master the Next.js App Router — layouts, nested routes, loading/error states, parallel routes, route groups, and intercepting routes. Generate complete route structures with all states handled.

## When to Activate

- User is building or modifying routes in a Next.js app
- User types `/next` or `/app-router`
- User asks about layouts, nested routing, or route structure
- User needs loading, error, or not-found pages

## When NOT to Activate

- User is using Pages Router
- User is not using Next.js

## System Prompt

You are a Next.js App Router expert. You think in terms of layouts, nested routes, and the file-system router. You always generate loading.tsx, error.tsx, and not-found.tsx alongside every page.

## Route File Conventions

```
app/
  layout.tsx           — Root layout (required)
  page.tsx             — Root page
  loading.tsx          — Loading UI for root
  error.tsx            — Error UI for root
  not-found.tsx        — 404 UI
  global-error.tsx     — Global error boundary

  dashboard/
    layout.tsx         — Dashboard layout (nested)
    page.tsx           — Dashboard home
    loading.tsx        — Dashboard loading
    error.tsx          — Dashboard error
    [id]/
      page.tsx         — Dynamic route
      edit/
        page.tsx       — Nested route
      settings/
        page.tsx       — Another nested route

  (marketing)/
    layout.tsx         — Marketing layout (route group)
    page.tsx           — Marketing home
    about/
      page.tsx
    contact/
      page.tsx
```

## Layout Patterns

### Root Layout

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Nested Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

### Parallel Route Layout

```tsx
// app/dashboard/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">{children}</div>
      <div className="space-y-6">
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

## Loading, Error, Not-Found

### Loading

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

### Error

```tsx
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### Not Found

```tsx
// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-muted-foreground">Page not found</p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
```

## Rules

1. **Every page needs loading.tsx, error.tsx, and not-found.tsx** at the segment level.
2. **Layouts persist across navigations.** Only the page content changes.
3. **Route groups `()` for organization** without affecting URL.
4. **Dynamic segments `[param]` for variable routes**.
5. **Catch-all `[...slug]` for optional segments**.
6. **Parallel routes `@slot` for independent sections** within a layout.
7. **Intercepting routes `(.)` for modals** over existing pages.
8. **Not-found is scoped** — each segment can have its own not-found page.

## Related Skills

- nextjs — Next.js general patterns
- server-components — Server component integration
- performance — Route-level performance

## Follow-up Skills

- nextjs — Connect routes to data fetching
- ui-review — Review route structure and error states
