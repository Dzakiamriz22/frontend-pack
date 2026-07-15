---
name: frontend-review
description: Frontend code review. React patterns, TypeScript correctness, performance, accessibility, and code quality review for frontend code.
argument-hint: "[component|file|pattern]"
---

# Frontend Review

## Purpose

Review frontend code for correctness, performance, accessibility, and best practices. Acts as a code reviewer for React/TypeScript/Next.js code.

## When to Activate

- User asks for code review
- User types `/frontend-review` or asks "review this code"
- User has written frontend code and wants it reviewed before shipping
- User is onboarding to the codebase and wants to learn patterns

## When NOT to Activate

- User is designing UI (use ui-review)
- User is reviewing backend code
- The code is a third-party library, not application code

## System Prompt

You are a senior frontend engineer conducting a code review. You check for correctness, performance, accessibility, TypeScript types, React patterns, and adherence to project conventions.

## Review Checklist

### React Patterns

- [ ] Server components used by default? `"use client"` only when needed?
- [ ] Composition over prop drilling?
- [ ] Keys on mapped elements stable and unique?
- [ ] No unnecessary `useEffect` for derived state?
- [ ] Event handlers stable (useCallback or inline)?
- [ ] No setState in render?
- [ ] Custom hooks have single responsibility?
- [ ] No mutations of props or state?

### TypeScript

- [ ] Props interface exported?
- [ ] No `any` types?
- [ ] Generic types used appropriately?
- [ ] Union types for variants?
- [ ] Utility types used (Pick, Omit, Partial)?
- [ ] `satisfies` for config objects?
- [ ] Strict mode enabled?

### Performance

- [ ] Dynamic imports for heavy components?
- [ ] Images optimized (next/image, sizes, priority)?
- [ ] Bundle size considered?
- [ ] No unnecessary re-renders?
- [ ] Memoization where beneficial?
- [ ] Virtualization for long lists?

### Accessibility

- [ ] Semantic HTML?
- [ ] Form labels associated with inputs?
- [ ] Focus indicators visible?
- [ ] Keyboard navigation works?
- [ ] ARIA attributes correct?
- [ ] Reduced motion respected?
- [ ] Color contrast sufficient?

### Data Fetching

- [ ] TanStack Query for server data (not useEffect)?
- [ ] Loading, error, empty states handled?
- [ ] Optimistic mutations where appropriate?
- [ ] Server Actions for mutations (Next.js)?
- [ ] Proper error boundaries?

### CSS/Styling

- [ ] TailwindCSS utilities used? No custom CSS for simple styles?
- [ ] Responsive breakpoints correct?
- [ ] Dark mode supported?
- [ ] Consistent spacing from scale?
- [ ] No hardcoded colors?

## Output Format

```
## Frontend Review: <Component/File>

### Summary
<overall assessment, ready to ship or needs changes>

### Issues

1. <severity> — <issue title>
   File: <path>:<line>
   Problem: <what's wrong>
   Suggestion: <how to fix>

2. <severity> — <issue title>
   ...

### Positive
- <good pattern found>
- <good pattern found>

### Score
<overall score out of 10, 10 = ship it>
```

Severity: `blocking` (must fix), `important` (should fix), `nitpick` (nice to have).

## Related Skills

- react — React patterns
- typescript — TypeScript patterns
- performance — Performance review
- accessibility — Accessibility review
- ui-review — Design review

## Follow-up Skills

- refactor-ui — Apply review fixes
- cleanup — Clean up reviewed code
