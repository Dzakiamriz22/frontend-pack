---
name: state-management
description: State management patterns. Server state with TanStack Query, client state with React hooks, URL state, form state, and global state decisions.
argument-hint: "[pattern|query|store]"
---

# State Management

## Purpose

Choose and implement the right state management pattern for every type of state in a React application. Server state, client state, URL state, form state, and global state each have their own optimal solutions.

## When to Activate

- User is building React components with state
- User asks about state management patterns
- User is choosing between TanStack Query, Context, Zustand, or other solutions
- User is refactoring state management

## When NOT to Activate

- User is building a completely static site
- User is working on backend-only code

## System Prompt

You are a state management expert who has scaled React applications to millions of users. You know that most applications don't need Redux or a global store. You choose the simplest solution for each state type.

## State Categories

### 1. Server State

Data from the server that needs caching, refetching, and optimistic updates.

**Solution: TanStack Query (React Query)**

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
}

// Mutate data
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserInput) =>
      fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

**Patterns:**
- One custom hook per API resource
- Query keys as arrays: `['users', { page, filter }]`
- Optimistic updates for fast UIs
- Prefetching for predicted navigation
- Stale time > 0 for non-critical data

### 2. Client State

Ephemeral UI state that lives only on the client.

**Solution: React hooks (useState, useReducer)**

```tsx
// Modal open/close
const [isOpen, setIsOpen] = useState(false);

// Multi-step form
const [step, setStep] = useState(1);

// Complex state
const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
```

### 3. URL State

State that should survive page refresh and be shareable.

**Solution: useSearchParams (Next.js)**

```tsx
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return {
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    page: parseInt(searchParams.get('page') || '1'),
    setFilter,
  };
}
```

### 4. Form State

Complex form state with validation.

**Solution: React Hook Form + Zod**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('email')} />
      {form.formState.errors.email && (
        <p>{form.formState.errors.email.message}</p>
      )}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
  );
}
```

### 5. Global Client State

State shared across many unrelated components.

**Solution: Zustand (when React Context is insufficient)**

```tsx
import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

// Usage
function Sidebar() {
  const isOpen = useUIStore((s) => s.sidebarOpen);
  // ...
}
```

## Decision Tree

```
Is the data from the server?
  → Yes → TanStack Query
  → No  → Is it persistent (survives refresh)?
    → Yes → URL params (shareable) or localStorage (local-only)
    → No  → Is it shared across many components?
      → Yes → Consider Zustand or Context
      → No  → useState or useReducer in the component
```

## Rules

1. **TanStack Query for all server state.** No `useEffect` for data fetching.
2. **React Hook Form + Zod for all forms.** No manual form state management.
3. **URL params for filtered/sorted/paginated views.** The URL is a source of truth.
4. **Context is NOT a state management library.** It's for dependency injection (theming, auth context).
5. **Zustand only when multiple unrelated components need the same client state.** Otherwise, useState is fine.
6. **No Redux for new projects.** TanStack Query + Zustand cover 99% of use cases.
7. **Colocate state.** Put state as close as possible to where it's used.
8. **Optimistic updates for better UX.** Show the result immediately, revert on error.

## Output Format

```tsx
// Server state hook
export function useResource() {
  return useQuery({
    queryKey: ['resource'],
    queryFn: fetchResource,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Client state hook
export function useUI() {
  // zustand store or useState
}
```

## Related Skills

- react — React patterns for state
- hooks — Custom hooks for state logic
- forms — Form state management
- nextjs — URL state with App Router

## Follow-up Skills

- performance — State-driven re-render optimization
- frontend-review — Review state management choices
