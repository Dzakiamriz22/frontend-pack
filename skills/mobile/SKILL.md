---
name: mobile
description: Mobile-first design patterns. Touch optimization, responsive layouts, mobile navigation, gesture handling, and performance for mobile devices.
argument-hint: "[component|page|audit]"
---

# Mobile

## Purpose

Generate interfaces that work beautifully on mobile devices. Every layout starts from the smallest viewport and scales up. Touch interactions are intuitive. Performance is optimized for mobile networks and hardware.

## When to Activate

- User types `/mobile` or `/mobile <component>`
- Auto-loaded when generating pages that end users access on phones
- User asks to mobile-optimize a view
- User is building a mobile-first layout

## When NOT to Activate

- User is building an internal dashboard unlikely to be used on mobile
- User is building a design system component library (not user-facing pages)
- Mobile optimization is already done

## System Prompt

You are a mobile UX specialist who has designed apps used by millions. You understand touch targets, thumb zones, mobile viewport constraints, network conditions, and gesture patterns. You never treat mobile as "desktop but smaller."

## Mobile Design Principles

### 1. Mobile-First

Design for 320px width first. Add complexity as viewport grows. Every layout must work at 320px without horizontal scroll.

### 2. Thumb Zones

Primary interactions in the bottom third of the screen (for mobile holding). Navigation at bottom (tab bar), not top. Critical actions within thumb reach.

### 3. Touch Targets

Minimum 44x44px for all interactive elements. 48x48px preferred. Links in text: minimum 44px height with adequate padding.

### 4. No Hover Dependency

Hover is not a thing on mobile. Never rely on hover for critical functionality. Use tap/focus instead.

### 5. Reduced Content

Mobile screens show less. Prioritize ruthlessly. Show only what the user needs at this moment. Progressive disclosure for secondary content.

### 6. Fast Load

Mobile users have less patience. Optimize for 3G/4G. Lazy load images. Minimize JS. Skeleton loaders for every view.

## Mobile Layout Patterns

### Navigation

```tsx
// Bottom tab bar for primary navigation
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
  <div className="flex items-center justify-around h-16">
    {tabs.map((tab) => (
      <button key={tab.href} className="flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium">
        <tab.icon className="h-5 w-5" />
        <span>{tab.label}</span>
      </button>
    ))}
  </div>
</nav>

// Sidebar for desktop
<aside className="hidden md:block w-64 border-r min-h-screen">
```

### Cards

```tsx
// Mobile: full-width cards
// Tablet: 2-column grid
// Desktop: 3-column grid
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
```

### Tables

```tsx
// Mobile: card layout instead of table
{isMobile ? (
  <div className="space-y-4">
    {items.map((item) => (
      <MobileCard key={item.id} item={item} />
    ))}
  </div>
) : (
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
  </Table>
)}
```

### Forms

```tsx
// Full-width inputs on mobile
// Single column, no side-by-side
<form className="space-y-6">
  <div className="space-y-2">
    <Label>Field</Label>
    <Input className="w-full" />
  </div>
</form>
```

## Touch Gesture Patterns

```tsx
// Swipe to dismiss/delete (mobile)
const { x } = useDrag(gestureHandlers, { axis: 'x' });

// Pull to refresh
// Use native overscroll-behavior or a pull-to-refresh library
```

## Mobile Performance

- **Images:** Use `<Image>` with `sizes` attribute. Never serve desktop images to mobile.
- **Fonts:** Subset fonts. Use `font-display: swap`.
- **Animations:** Reduce motion on mobile. Use `will-change` sparingly (memory).
- **Bundle:** Code-split aggressively. Less than 100KB JS for first view.
- **Network:** Show cached/offline content first. Optimistic updates.

## Rules

1. **320px minimum.** Layout must work without horizontal scroll at 320px width.
2. **Touch targets >= 44px.** No exceptions.
3. **No hover-revealed content.** All interactive content must be visible or tap-revealed.
4. **Bottom navigation for primary routes.** Only on mobile. Desktop uses sidebar/top nav.
5. **Forms are single column.** Never put form fields side by side on mobile.
6. **Full-width inputs.** Inputs and buttons span the full container width on mobile.
7. **Sticky headers are compact.** Max 56px height on mobile.
8. **Search is prominent.** Search bar or search icon at top of list views.
9. **Sheets > modals on mobile.** Bottom sheets feel more native than centered modals.
10. **Safe areas.** Respect `env(safe-area-inset-bottom)` for notched devices.

## Output Format

```tsx
// Mobile-first page with proper responsive behavior
export default function Page() {
  return (
    <>
      {/* Mobile nav */}
      <BottomNav />

      <main className="pb-20 md:pb-0 px-4 md:px-6 lg:px-8">
        {/* Content */}
      </main>
    </>
  );
}
```

## Related Skills

- responsive — Responsive breakpoints and grid
- design — Premium UI generation
- accessibility — Touch target sizes
- performance — Mobile performance optimization

## Follow-up Skills

- responsive — Verify all breakpoints work
- ui-review — Mobile UX review
- performance — Mobile bundle audit
