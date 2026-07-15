---
name: react
description: React 19 best practices. Server components, client components, composition patterns, performance optimization, and TypeScript patterns for modern React.
argument-hint: "[pattern|component|optimization]"
---

# React

## Purpose

Generate React code using modern best practices — React 19, Server Components, client component boundaries, composition patterns, and TypeScript. Every component follows current React patterns.

## When to Activate

- User types `/react` or `/react <pattern>`
- Auto-loaded with any component/page generation command
- User asks about React patterns, architecture, or best practices
- User is writing React components

## When NOT to Activate

- User is using a different framework (Vue, Svelte, Angular)
- User is writing backend-only code
- User is asking about legacy React patterns (class components, componentWillMount)

## System Prompt

You are a React engineer who has shipped production apps at scale. You follow the latest React 19 patterns — Server Components by default, client components only when needed, proper composition, and TypeScript throughout.

## React 19 Patterns

### 1. Server Components by Default

```tsx
// app/page.tsx — Server Component (default)
export default async function Page() {
  const data = await fetchData(); // Direct database/API access
  return <ClientList data={data} />;
}
```

Add `"use client"` only when:
- Using hooks (useState, useEffect, useContext)
- Using browser APIs
- Using event handlers (onClick, onSubmit)
- Using client-side state management
- Using most third-party React libraries

### 2. Composition Over Props Drilling

```tsx
// Good: Layout as composition
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// Usage: Components keep their own data dependencies
function Page() {
  return (
    <Layout>
      <UserList />
      <ActivityFeed />
    </Layout>
  );
}
```

### 3. use() Hook (React 19)

```tsx
import { use } from 'react';

function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);
  // No need for Suspense boundary here — parent handles it
}
```

### 4. Server Actions

```tsx
// app/actions.ts
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name');
  // Validate, save to DB, revalidate cache
  revalidatePath('/users');
}
```

### 5. Form Actions

```tsx
// Client component with server action
'use client';

export function CreateUserForm() {
  return (
    <form action={createUser}>
      <Input name="name" required />
      <Button type="submit">Create</Button>
    </form>
  );
}
```

## Component Architecture

### Functional Components with TypeScript

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  icon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
}
```

### Custom Hooks

```tsx
import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false // SSR default
  );
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}
```

## Patterns to Follow

1. **Server Components by default.** Only add `"use client"` when necessary.
2. **Composition.** Pass children, not props. Let parent components own data fetching.
3. **TypeScript.** Every component is typed. Props interfaces exported. No `any`.
4. **Custom hooks for logic.** Extract state and effects into reusable hooks.
5. **React Hook Form for forms.** Not manual state management.
6. **TanStack Query for server state.** Not useEffect for data fetching.
7. **Zod for validation.** Both client and server side.
8. **Error boundaries.** One per route segment.
9. **Suspense boundaries.** For async data loading.
10. **useCallback/useMemo only when necessary.** Profile first, optimize second.
11. **No barrel files (index.ts re-exports).** They break tree-shaking.
12. **Default exports for pages,** named exports for components.

## Output Format

```tsx
// Component with full typing
interface ComponentProps {
  // ...
}

export function Component({ ... }: ComponentProps) {
  // ...
}
```

## Related Skills

- hooks — Custom hooks patterns
- component-architecture — Component design patterns
- state-management — Client state patterns
- nextjs — Next.js integration
- server-components — React Server Components

## Follow-up Skills

- frontend-review — Code review for React patterns
- performance — React performance optimization
- component-splitting — Refactor large components
