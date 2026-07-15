---
name: hooks
description: React hooks patterns. Custom hooks, state management hooks, effect patterns, performance hooks, and reusable hook architecture.
argument-hint: "[hook-name|pattern]"
---

# Hooks

## Purpose

Design and implement reusable React hooks following modern best practices. Every hook has a single responsibility, proper cleanup, and TypeScript types.

## When to Activate

- User types `/react` or is writing React components (auto-loaded)
- User asks about hooks patterns or custom hooks
- User is extracting logic into reusable hooks
- User needs complex state management, effects, or browser API integrations

## When NOT to Activate

- User is working with class components (legacy codebases)
- User is writing backend-only code
- User is using a different framework

## System Prompt

You are a React hooks expert. You follow the Rules of Hooks strictly. You think in hooks — you extract logic, not components. Every hook is typed, tested, and has a single responsibility.

## Hook Patterns

### 1. State Hooks

```tsx
import { useState, useCallback } from 'react';

// Toggle hook
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(prev => !prev), []);
  const setTrue = useCallback(() => setOn(true), []);
  const setFalse = useCallback(() => setOn(false), []);
  return { on, toggle, setTrue, setFalse };
}
```

### 2. Effect Hooks

```tsx
import { useEffect, useRef } from 'react';

// Interval hook
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### 3. Ref Hooks

```tsx
import { useRef, useEffect } from 'react';

// Previous value
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

// Click outside
export function useClickOutside<T extends HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
}
```

### 4. Performance Hooks

```tsx
import { useMemo, useCallback } from 'react';

// Stable callback with deps
const handleSubmit = useCallback(async (data: FormData) => {
  await submit(data);
}, [deps]);

// Memoized value
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

### 5. Browser API Hooks

```tsx
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  }, [key, value]);

  return [value, setValue] as const;
}
```

### 6. Data Fetching Hooks

```tsx
// Prefer TanStack Query for complex cases.
// Simple fallback:
export function useData<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState(prev => ({ ...prev, loading: true }));

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => { cancelled = true; };
  }, [url]);

  return state;
}
```

## Rules

1. **Only call hooks at the top level.** No hooks inside conditions, loops, or nested functions.
2. **Only call hooks from React functions.** Components or custom hooks.
3. **Every `useEffect` has a cleanup.** Return cleanup for subscriptions, listeners, intervals.
4. **`useCallback` and `useMemo` are optimizations,** not guarantees. Use them when profiled need arises or when they stabilize deps for child components.
5. **Avoid `useEffect` for derived state.** Compute from existing state instead.
6. **Custom hooks start with `use`.** Always.
7. **One hook = one concern.** Don't create a "god hook" that does everything.
8. **Type the return value.** Use `as const` for tuple returns, or define an interface.
9. **Handle SSR.** Check for `typeof window !== 'undefined'` in browser-only hooks.

## Output Format

```tsx
import { useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = []
): UseAsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, deps);

  return { ...state, execute };
}
```

## Related Skills

- react — React patterns
- component-architecture — When to extract a hook vs a component
- state-management — Global state hooks
- performance — useMemo/useCallback optimization

## Follow-up Skills

- frontend-review — Review hooks for correctness
- refactor-ui — Extract logic into hooks from fat components
