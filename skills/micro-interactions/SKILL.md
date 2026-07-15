---
name: micro-interactions
description: Micro-interaction patterns with Framer Motion and CSS. Button feedback, form validation, notifications, loading states, and hover effects that feel polished.
argument-hint: "[button|notification|input|hover]"
---

# Micro-interactions

## Purpose

Add polished micro-interactions that make the UI feel responsive, alive, and premium. Button press feedback, form validation animations, toast notifications, loading states, and hover effects.

## When to Activate

- User types `/animate` or `/micro-interactions`
- Auto-loaded with page/component generation
- User is polishing UI interactions
- User wants to add feedback to user actions

## When NOT to Activate

- User needs large-scale animations (page transitions, hero animations)
- User is prototyping (add micro-interactions later)
- User is working on backend code

## System Prompt

You are a motion designer specializing in micro-interactions. You believe every user action should get immediate, delightful feedback. Buttons press, forms validate, items appear, notifications slide in — all under 300ms.

## Pattern Library

### 1. Button Feedback

```tsx
import { motion } from 'framer-motion';

<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
>
  Click me
</motion.button>

// Loading state
<motion.button
  disabled={isLoading}
  className="relative overflow-hidden"
>
  <AnimatePresence mode="wait">
    {isLoading ? (
      <motion.span
        key="loading"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="flex items-center gap-2"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Saving...
      </motion.span>
    ) : (
      <motion.span
        key="idle"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
      >
        Save
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>
```

### 2. Input Feedback

```tsx
// Focus ring animation
<motion.div
  className="relative"
  animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
>
  <Input
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
  />
</motion.div>

// Validation feedback
<AnimatePresence>
  {error && (
    <motion.p
      initial={{ opacity: 0, y: -4, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -4, height: 0 }}
      className="text-sm text-destructive"
      role="alert"
    >
      {error}
    </motion.p>
  )}
</AnimatePresence>

// Character count
<motion.span
  key={value.length}
  initial={{ scale: 1.2 }}
  animate={{ scale: 1 }}
  className="text-xs text-muted-foreground"
>
  {value.length}/{maxLength}
</motion.span>
```

### 3. Toast/Notification

```tsx
// Toast enter/exit
<motion.div
  initial={{ opacity: 0, x: 100, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  exit={{ opacity: 0, x: 100, scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  className="fixed top-4 right-4 bg-card border shadow-lg rounded-lg p-4"
>
  <p className="text-sm font-medium">Message sent!</p>
</motion.div>
```

### 4. List Item Appear

```tsx
<AnimatePresence>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ delay: i * 0.03 }}
    >
      <ItemRow item={item} />
    </motion.div>
  ))}
</AnimatePresence>
```

### 5. Checkbox/Switch Toggle

```tsx
<motion.div
  animate={checked ? { backgroundColor: 'var(--primary)' } : {}}
  className="w-10 h-6 rounded-full bg-muted p-1 cursor-pointer"
  onClick={() => setChecked(!checked)}
>
  <motion.div
    animate={checked ? { x: 16 } : { x: 0 }}
    className="w-4 h-4 rounded-full bg-white shadow-sm"
  />
</motion.div>
```

### 6. Hover Card Effect

```tsx
<motion.div
  whileHover={{ y: -2 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
>
  <CardContent />
</motion.div>
```

### 7. Copy to Clipboard

```tsx
const [copied, setCopied] = useState(false);

const copy = async (text: string) => {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<Button onClick={() => copy(text)}>
  <AnimatePresence mode="wait">
    {copied ? (
      <motion.span
        key="check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <Check className="h-4 w-4" />
      </motion.span>
    ) : (
      <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <Copy className="h-4 w-4" />
      </motion.span>
    )}
  </AnimatePresence>
  {copied ? 'Copied!' : 'Copy'}
</Button>
```

## Timing Guidelines

| Interaction | Duration | Easing |
|---|---|---|
| Button press | 100ms | ease-out |
| Hover effect | 150ms | ease-out |
| Modal enter | 200ms | ease-out |
| Modal exit | 150ms | ease-in |
| Toast enter | 300ms | spring |
| Toast exit | 200ms | ease-in |
| List item stagger | 30ms delay | — |
| Form error | 200ms | ease-out |

## Rules

1. **Under 300ms for all micro-interactions.** Instant feedback.
2. **Spring physics for enter animations.** Snap physics for exit.
3. **Never animate layout properties** (width, height, top, left). Use transform.
4. **One interaction per element at a time.** Don't stack animations.
5. **Reduce motion respected.** Skip animations for `prefers-reduced-motion`.
6. **Feedback for every action.** Click → visual press. Submit → spinner. Success → checkmark.

## Related Skills

- framer-motion — Framer Motion patterns
- page-transitions — Page-level animations
- tailwind-animation — CSS animation fallbacks
- ux-writing — Microcopy for interaction feedback

## Follow-up Skills

- ui-review — Review interaction feel
- performance — Ensure animations don't cause jank
