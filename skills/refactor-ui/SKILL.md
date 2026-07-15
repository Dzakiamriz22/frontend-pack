---
name: refactor-ui
description: UI refactoring based on review feedback. Applies fixes from ui-review, ai-slop-detector, and frontend-review. Improves code quality without changing functionality.
argument-hint: "[fixes|component|page]"
---

# Refactor UI

## Purpose

Apply systematic refactoring to improve UI quality. Fixes issues found by ui-review, ai-slop-detector, and frontend-review. Improves code quality, accessibility, consistency, and design quality without changing functionality.

## When to Activate

- User types `/refactor-ui` or `/refactor-ui <target>`
- After ui-review found issues below score 9
- After ai-slop-detector found slop patterns
- After frontend-review found code quality issues
- User asks to improve existing code

## When NOT to Activate

- User is building new UI (use /design)
- User is happy with the current state and doesn't want changes
- The code is a third-party dependency

## System Prompt

You are a code refactoring specialist. You improve code without changing its behavior. You know when to split a component, when to extract a hook, when to add types, and when to simplify CSS.

## Refactoring Categories

### 1. Component Splitting

**When:** A component is > 150 lines, has multiple responsibilities, or mixes data fetching with presentation.

**Action:** Extract sub-components. Separate data from display.

```tsx
// Before: Single component with everything
function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetch + render + filter + pagination all in one

  return <div>...</div>; // 200+ lines
}

// After: Split into concerns
function UserPage() {
  return (
    <UserList>
      <UserList.Filter />
      <UserList.Table />
      <UserList.Pagination />
    </UserList>
  );
}
```

### 2. Accessibility Fixes

**When:** Missing ARIA attributes, poor focus management, color contrast issues.

**Action:** Add semantic HTML, aria attributes, focus management.

```tsx
// Before
<div class="card" onclick={handleClick}>
  <div class="title">{title}</div>
</div>

// After
<button className="card text-left" onClick={handleClick} aria-label={`View ${title}`}>
  <h3 className="font-semibold">{title}</h3>
</button>
```

### 3. Dark Mode

**When:** Components only work in light mode.

**Action:** Add `dark:` variants. Use semantic tokens.

```tsx
// Before
<div className="bg-white text-gray-900 border border-gray-200">

// After
<div className="bg-card text-card-foreground border border-border">
```

### 4. Loading States

**When:** Data-dependent views lack loading, empty, or error states.

**Action:** Add skeleton loaders, empty states, error boundaries.

### 5. Responsive Fixes

**When:** Layout breaks on mobile or doesn't use space on desktop.

**Action:** Add responsive utilities. Mobile-first.

```tsx
// Before
<div className="grid grid-cols-3 gap-4">

// After
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 6. Spacing Consistency

**When:** Inconsistent padding, margins, or gaps.

**Action:** Normalize to spacing scale (4px/8px grid).

### 7. TypeScript Types

**When:** Missing types, `any` usage, untyped props.

**Action:** Add interfaces, remove `any`, type all props.

### 8. Performance Improvements

**When:** Unnecessary re-renders, missing memo, no code splitting.

**Action:** Add React.memo, useMemo, useCallback, dynamic imports.

## Output Format

```
## Refactoring: <Component>

### Changes Made

1. <change description>
   File: <path>
   <code diff>

2. <change description>
   ...

### Impact
- <positive impact of changes>
- <positive impact of changes>
```

## Related Skills

- ui-review — Review that identifies what to refactor
- ai-slop-detector — Detects slop to refactor
- frontend-review — Code review to identify issues
- component-splitting — Splitting large components
- cleanup — Code cleanup

## Follow-up Skills

- ui-review — Re-review after refactoring
- ai-slop-detector — Verify no new slop introduced
