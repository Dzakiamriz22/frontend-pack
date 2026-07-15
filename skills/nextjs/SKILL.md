---
name: nextjs
description: Next.js 15+ best practices. App Router, server components, data fetching patterns, ISR, middleware, and route handlers. Production Next.js patterns.
argument-hint: "[pattern|route|middleware]"
---

# Next.js

## Purpose

Generate Next.js applications following current best practices — App Router, Server Components, streaming, ISR, middleware, and optimized data fetching. Every pattern is production-ready.

## When to Activate

- User types `/next` or `/nextjs`
- Auto-loaded with any page generation command
- User is building a Next.js application
- User asks about Next.js patterns, routing, or data fetching

## When NOT to Activate

- User is using a different framework
- User is working on backend-only code unrelated to Next.js
- User is asking about Pages Router (legacy)

## System Prompt

You are a Next.js power user who has deployed production apps at scale. You use App Router exclusively. You understand streaming, server components, ISR, and the mental model shift from Pages Router.

## App Router Architecture

### Route Groups

```tsx
// (marketing)/page.tsx — Route group for organization
// (dashboard)/page.tsx — Different layout, same URL segment
```

### Parallel Routes

```tsx
// @analytics/page.tsx — Slot for parallel rendering
// @team/page.tsx — Different slot, independent loading
export default function Layout({ children, analytics, team }: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  // ...
}
```

### Intercepting Routes

```tsx
// (..)photo/[id]/page.tsx — Intercept route from parent
// Used for modals that show the same content as the full page
```

## Data Fetching Patterns

### 1. Server-side Fetching (Default)

```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // ISR
  });
  const json = await data.json();

  return <ClientComponent data={json} />;
}
```

### 2. Streaming with Suspense

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowData />
      </Suspense>
    </div>
  );
}

async function SlowData() {
  await new Promise(r => setTimeout(r, 2000));
  const data = await fetchData();
  return <DataView data={data} />;
}
```

### 3. Parallel Data Fetching

```tsx
export default async function Page() {
  const [user, posts, stats] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <StatsGrid stats={stats} />
    </div>
  );
}
```

### 4. Incremental Static Regeneration (ISR)

```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }, // Regenerate every 60 seconds
    // Or use tags for on-demand revalidation:
    // next: { tags: ['posts'] }
  });
}
```

## Route Handlers

```tsx
// app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.users.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return Response.json(user, { status: 201 });
}
```

## Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

## Rules

1. **App Router only.** No Pages Router in new code.
2. **Server Components by default.** Client components need `"use client"`.
3. **Use `fetch` with `next.revalidate` or `next.tags`** for data caching.
4. **Stream loading boundaries** with `<Suspense>` for slow data.
5. **Colocate data fetching** in the component that needs it—no `getServerSideProps`.
6. **Route handlers for API endpoints**, not Pages Router API routes.
7. **Middleware for auth, redirects, and headers.** Keep it fast (edge runtime).
8. **Metadata API for SEO** — export `metadata` object or `generateMetadata`.
9. **No `"use client"` in layout.tsx** — layouts can be server components containing client children.
10. **Use `next/image` for images** — never an `<img>` tag.

## Output Format

```tsx
// app/<route>/page.tsx — Server component
import { Suspense } from 'react';

export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default async function Page() {
  // ...
}

// app/<route>/loading.tsx — Loading UI
export default function Loading() {
  return <Skeleton />;
}

// app/<route>/error.tsx — Error UI
'use client';
export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorUI error={error} onRetry={reset} />;
}
```

## Related Skills

- app-router — App Router specific patterns
- server-components — React Server Components
- server-actions — Server Actions
- react — React integration

## Follow-up Skills

- performance — Next.js performance optimization
- frontend-review — Review Next.js patterns
