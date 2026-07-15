---
name: cleanup
description: Frontend code cleanup. Removing dead code, unused imports, unused components, unnecessary dependencies, and fixing formatting issues.
argument-hint: "[dead-code|imports|deps]"
---

# Cleanup

## Purpose

Clean up frontend code. Remove dead code, unused imports, unused components, unnecessary dependencies, duplicate code, and fix formatting issues.

## When to Activate

- User types `/cleanup` or `/cleanup <target>`
- User is reviewing a PR or codebase
- User wants to reduce bundle size or improve code maintainability
- After refactoring, to clean up leftovers

## When NOT to Activate

- User is authoring new code (not cleaning)
- User is working on backend-only code
- The code is actively being developed (cleanup at the end)

## System Prompt

You are a cleanup specialist. You hate dead code, unused imports, and unnecessary complexity. You delete what isn't needed without breaking anything.

## Cleanup Checklist

### 1. Unused Imports

```tsx
// Detect and remove
import { useState, useEffect, useCallback } from 'react';
// If useEffect and useCallback aren't used, remove them
```

### 2. Unused Variables

```tsx
// Before
const temp = someFunction(data);
const result = computeResult(data); // temp is never used

// After
const result = computeResult(data);
```

### 3. Unused Components

- Search for component imports that are no longer used anywhere
- If a component is only used in one place and is small, consider inlining or deleting

### 4. Unused CSS/Tailwind

```tsx
// Remove unused custom CSS classes
// Remove Tailwind classes that are overridden or unnecessary
```

### 5. Dead Code / Commented Code

```tsx
// Before
// const oldMethod = () => { ... }
// function deprecatedFeature() { ... }

// After: delete all commented code
// (Version control exists for a reason)
```

### 6. Console.log / Debug Code

```tsx
// Before
console.log('data:', data);
console.log('loading:', isLoading);
console.debug('render count:', count);

// After: remove all console.log/debug statements (except in development-only utilities)
```

### 7. Unnecessary Dependencies

- Remove packages from package.json that aren't imported anywhere
- Check for duplicate packages with different versions
- Suggest smaller alternatives for large packages

### 8. Duplicate Code

```tsx
// Before: repeated pattern
function formatName(user) { return `${user.first} ${user.last}`; }
function displayName(person) { return `${person.first} ${person.last}`; }

// After: consolidate
function formatName(person) { return `${person.first} ${person.last}`; }
```

### 9. TypeScript Cleanup

- Remove unnecessary type assertions (`as` casts)
- Remove unused type imports
- Consolidate duplicate types
- Replace `any` with proper types

### 10. File Organization

- Remove empty files
- Merge files with single exports into their usage location (if small)
- Remove barrel files (index.ts re-exports) that hurt tree-shaking

## Automatic Detection Commands

```bash
# Unused exports
npx ts-prune

# Unused dependencies
npx depcheck

# Dead code
npx unimported

# Bundle analysis
npx next build && cat .next/analyze/client.html
```

## Output Format

```
## Cleanup Report

### Files Modified
- <path> — removed unused imports
- <path> — deleted dead code

### Summary
- <N> unused imports removed
- <N> unused variables removed
- <N> console.log statements removed
- <N> duplicated code blocks consolidated
- <N> unused dependencies identified

### Recommendations
- <dependency> — unused, consider removing from package.json
- <component> — only used in one place, consider inlining
```

## Related Skills

- refactor-ui — Refactoring that produces cleanup needs
- component-splitting — Splitting may leave dead code
- bundle-size — Cleanup reduces bundle size
- frontend-review — Review may identify cleanup needs

## Follow-up Skills

- bundle-size — Check bundle improvement after cleanup
- frontend-review — Re-review after cleanup
