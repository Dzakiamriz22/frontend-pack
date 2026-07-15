# Refactor UI Command Examples

## Refactor Current Component

```
/refactor-ui
```

The plugin loads: refactor-ui, ai-slop-detector, accessibility, component-splitting, cleanup.

## What Gets Fixed

1. **Accessibility** — Add ARIA attributes, semantic HTML, focus management
2. **Dark Mode** — Add dark: variants using CSS variables
3. **Loading States** — Add skeleton loaders for async data
4. **Empty States** — Add empty state with illustration and CTA
5. **Error States** — Add error state with retry button
6. **Responsiveness** — Fix breakpoints, add mobile layout
7. **Spacing** — Normalize to 4px/8px grid
8. **TypeScript** — Add types, remove any
9. **Component Splitting** — Break >200 line components
10. **Dead Code** — Remove unused imports, variables, console.log

## Example Output

```
## Refactoring: UserProfile

### Changes Made

1. Added loading/error/empty states
   File: components/user-profile.tsx
   + Loading skeleton matching profile layout
   + Error state with retry
   + Empty state for no user

2. Added dark mode variants
   File: components/user-profile.tsx
   - bg-white → bg-card
   - text-gray-900 → text-card-foreground

3. Added TypeScript interface
   File: types/user.ts
   + export interface User { ... }

4. Split component
   File: components/user-profile.tsx → components/user-avatar.tsx
   + Extracted avatar upload into separate component

### Impact
- Accessible: WCAG AA compliant
- All states handled
- Dark mode ready
- Smaller, focused components
```
