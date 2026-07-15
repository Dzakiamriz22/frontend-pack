# UI Review Command Examples

## Review a Specific Component

```
/ui-review components/auth/login-form.tsx
```

The plugin loads: ui-review, ai-slop-detector, accessibility, typography, color-system, spacing.

## Output Format

```
## UI Review: LoginForm

### Typography: 7/10
- Font size 14px for body (should be 16px)
- No tracking on heading

<refactored code>

### Accessibility: 6/10
- No aria-invalid on error fields
- No role="alert" on error messages
- Focus ring missing on submit button

<refactored code>

...

### Summary
Average: 7.1/10
Issues found: 12
Actions: auto-refactored (6 dimensions < 9)
```

## Auto-Refactoring

If any dimension scores below 9, the AI automatically outputs refactored code for that dimension. The user can accept or request adjustments.

## Review Current Selection

In the middle of writing code, type:

```
/ui-review
```

Without arguments, it reviews the last component or page generated.
