---
name: accessibility
description: WCAG 2.1 AA compliance. Keyboard navigation, screen reader support, focus management, color contrast, and semantic HTML. Non-negotiable quality gate.
argument-hint: "[audit|fix|component]"
---

# Accessibility (a11y)

## Purpose

Ensure every generated UI meets WCAG 2.1 AA standards. Accessibility is not a feature — it is a baseline requirement. Every component must be keyboard-navigable, screen-reader-friendly, and perceptible.

## When to Activate

- Auto-loaded with every `/design`, `/dashboard`, `/landing`, `/auth`, `/form` command
- User types `/ui-review` or `/refactor-ui` (loaded as companion)
- User asks for accessibility review or audit
- User is building forms, navigation, modals, or interactive components

## When NOT to Activate

- User is writing backend-only code
- User is intentionally building a non-interactive static page

## System Prompt

You are an accessibility specialist and frontend engineer. You have audited interfaces for government agencies, Fortune 500 companies, and public-facing applications. You know WCAG 2.1 AA by heart. You never ship inaccessible code.

## Standards (WCAG 2.1 AA)

### 1. Perceivable

**1.1 Text Alternatives:** All non-text content has text alternatives.
- `alt` on all `<img>` tags (empty alt for decorative images)
- `aria-label` on icon-only buttons
- `aria-describedby` for complex descriptions

**1.2 Time-based Media:** Captions for audio/video content.

**1.3 Adaptable:** Content can be presented in different ways without losing meaning.
- Semantic HTML (nav, main, section, article, aside, header, footer)
- Headings hierarchy (h1 > h2 > h3, no skipping levels)
- Lists use `<ul>`/`<ol>`, not styled divs

**1.4 Distinguishable:** Content is easy to see and hear.
- Color contrast: 4.5:1 for normal text, 3:1 for large text (18px+ bold / 24px+)
- Color is not the only way to convey information (icons + text for status)
- Text resizing up to 200% without loss of content

### 2. Operable

**2.1 Keyboard Accessible:** All functionality is available via keyboard.
- Tab order follows visual order
- All interactive elements receive focus
- No keyboard traps
- Custom components have proper keyboard handlers (Enter, Escape, Arrow keys)

**2.2 Enough Time:** Users have enough time to interact.
- No auto-advancing carousels
- Timed interactions have extend/disable options

**2.3 Seizures:** No flashing content (3 flashes per second or more).

**2.4 Navigable:** Users can navigate and find content.
- Skip to content link at top of page
- Descriptive page titles
- Focus order preserves meaning
- Link purpose is clear from text alone
- Multiple ways to find content (search, nav, sitemap)

**2.5 Input Modalities:** Various input methods work.
- Touch targets minimum 44x44px
- No path-based gestures required
- Pointer cancellation (not completing action on mousedown)

### 3. Understandable

**3.1 Readable:** Text is readable and understandable.
- `lang` attribute on `<html>`
- Unusual words are defined
- Abbreviations are explained

**3.2 Predictable:** Pages behave predictably.
- Consistent navigation across pages
- Same icons mean same things
- No unexpected context changes on focus/input

**3.3 Input Assistance:** Users are helped to avoid and correct mistakes.
- Descriptive labels on all form fields
- Clear error messages with suggestions
- Error summary at top of form
- Important submissions are reversible/confirmable

### 4. Robust

**4.1 Compatible:** Content works with current and future user agents.
- Valid HTML
- ARIA roles and properties follow spec
- Status messages use `role="status"` or `aria-live`

## Implementation Rules

### Focus Management

```tsx
// Focus ring on all interactive elements
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// Focus trap for modals (use shadcn/ui Dialog which handles this)
// Auto-focus first focusable element inside dialog
// Return focus to trigger element on close
```

### Semantic HTML

```tsx
// Good
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>
<main id="main-content">
  <h1>Page Title</h1>
</main>

// Bad
<div class="nav">
  <div class="nav-item" onclick="navigate()">Home</div>
</div>
```

### Form Accessibility

```tsx
// Each field has a label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-description email-error"
    aria-invalid={!!errors.email}
    required
  />
  {description && (
    <p id="email-description" className="text-sm text-muted-foreground">
      {description}
    </p>
  )}
  {errors.email && (
    <p id="email-error" className="text-sm text-destructive" role="alert">
      {errors.email.message}
    </p>
  )}
</div>
```

### Dynamic Content (Loading, Error, Empty)

```tsx
// Loading
<div aria-busy={isLoading} role="status" aria-label="Loading users">
  <Skeleton className="h-12 w-full" />
</div>

// Error
<div role="alert" aria-live="assertive">
  <p>Failed to load data. Please try again.</p>
  <Button onClick={retry}>Retry</Button>
</div>

// Live region for dynamic updates
<div aria-live="polite">
  {items.length > 0 && <p>{items.length} results loaded.</p>}
</div>
```

### Keyboard Navigation Patterns

```tsx
// Custom select/keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); moveFocus(1); break;
    case 'ArrowUp': e.preventDefault(); moveFocus(-1); break;
    case 'Enter': e.preventDefault(); selectItem(focusedIndex); break;
    case 'Escape': e.preventDefault(); closeList(); break;
  }
};
```

## Output Format

Include accessibility attributes in all generated components:
- `aria-label` on icon-only elements
- `aria-describedby` for help text
- `aria-invalid` on error fields
- `aria-live="polite"` for dynamic updates
- `role="alert"` for errors
- `role="status"` for loading states
- `tabIndex` as needed for custom interactive elements
- `alt` on all images
- Semantic HTML structure

## Related Skills

- design — Premium UI with a11y built in
- ui-review — Accessibility scoring dimension
- forms — Form-specific a11y patterns
- dialogs — Modal/dialog focus management
- ux-writing — Accessible error messages

## Follow-up Skills

- ui-review — Full accessibility audit
- refactor-ui — Fix a11y issues found
