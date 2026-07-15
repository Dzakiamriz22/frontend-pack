---
name: server-components
description: React Server Components patterns. Data fetching in server components, client component boundaries, composition patterns, and performance benefits.
argument-hint: "[pattern|composition|migration]"
---

# Server Components

## Purpose

Leverage React Server Components (RSC) for better performance, smaller bundles, and direct data access. Understand when and how to use server vs client components.

## When to Activate

- User types `/next` or `/server-components`
- User is building components in a Next.js app
- User asks about server vs client component decisions
- User needs to migrate client components to server components

## When NOT to Activate

- User is not using React 19 or Next.js 15+
- User is building a client-side only app (SPA without SSR)

## System Prompt

You are a React Server Components expert. You understand the mental model: components are server by default. You only add `"use client"` when interactivity is absolutely needed. You think in composition patterns that minimize client components.

## Core Principles

### Server Components Can:
- Access databases directly
- Read from the filesystem
- Use server-side APIs
- Keep sensitive logic/tokens on the server
- Reduce client bundle size to zero

### Server Components Cannot:
- Use state (useState, useReducer)
- Use effects (useEffect, useLayoutEffect)
- Use browser-only APIs
- Use event handlers (onClick, onChange)
- Use most custom hooks that use the above

### Client Components (`"use client"`) Can:
- Use all React hooks
- Handle interactivity
- Use browser APIs
- Have client-side state
- Access localStorage, etc.

## Composition Patterns

### Pattern 1: Push Client Boundaries Down

```tsx
// GOOD: Server component wraps a small client island
export default async function Page() {
  const posts = await getPosts(); // Server-side data

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post}>
          <LikeButton postId={post.id} /> {/* Only this is client */}
        </PostCard>
      ))}
    </div>
  );
}
```

### Pattern 2: Data Fetched on Server, Interactive on Client

```tsx
// Server Component
export default async function UserList() {
  const users = await getUsers();
  return <UserListClient users={users} />;
}

// Client Component
'use client';
export function UserListClient({ users }: { users: User[] }) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.map(user => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Pattern 3: Client Component with Server Children

```tsx
// Client component that renders server-provided children
'use client';
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data } = useDashboardData();

  return (
    <div>
      <header>{data.title}</header>
      {children} {/* Server-provided content */}
    </div>
  );
}

// Server component
export default async function Page() {
  return (
    <DashboardShell>
      <SlowServerComponent /> {/* Runs on server */}
    </DashboardShell>
  );
}
```

### Pattern 4: Shared Components (Server + Client)

```tsx
// For shared components, keep them "use client" only when hooks are used
// A purely presentational component does NOT need "use client"
export function Avatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="rounded-full" />;
}
// This can be imported in both server and client components
```

## Performance Benefits

### Smaller Bundle Size

```
Server Component:     0 KB JS
Client Component:     Full JS bundle
With good boundaries: 80-90% of code can be server components
```

### Direct Data Access

```tsx
// Server: direct DB access, no API call
export default async function Page() {
  const user = await db.user.findUnique({ where: { id: userId } });
  return <Profile user={user} />;
}

// Client equivalent: fetch API, loading state, error state
'use client';
export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json()),
  });
  // ...
}
```

## Rules

1. **Default to server components.** Only add `"use client"` when needed.
2. **Push `"use client"` as deep as possible.** The leaf interactive component, not the container.
3. **Server components can import client components,** but client components cannot import server components.
4. **Pass server data as props to client components.** The server component fetches, the client component renders interactively.
5. **Children prop pattern.** Client components can render server children: `<ClientShell><ServerComponent /></ClientShell>`.
6. **No API route needed for data that only this page uses.** Fetch directly in the server component.
7. **Co-locate queries with components.** Server components fetch what they need.
8. **Keep shared UI components (Button, Card, Badge) without `"use client"`** — they're pure render.

## Related Skills

- nextjs — Next.js integration
- app-router — Route-level RSC patterns
- react — React 19 patterns
- performance — Bundle size impact

## Follow-up Skills

- nextjs — Integrate with route handlers
- performance — Measure bundle size improvement
