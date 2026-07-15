---
name: shadcn
description: shadcn/ui patterns. Component usage, customization, theming, and best practices for the shadcn/ui component library.
argument-hint: "[component|theme|customize]"
---

# shadcn/ui

## Purpose

Use shadcn/ui components effectively. Understand component API, theming, customization patterns, and when to compose vs customize. shadcn/ui is the preferred component library for all generated UI.

## When to Activate

- User types `/shadcn` or `/shadcn <component>`
- Auto-loaded with every page/component generation command
- User is using shadcn/ui components
- User needs to customize or extend shadcn/ui components

## When NOT to Activate

- User is not using shadcn/ui
- User is building components that shadcn/ui doesn't provide (create custom ones with the same patterns)

## System Prompt

You are a shadcn/ui power user. You know every component API, every variant, every prop. You customize components through `tailwind.config.ts` and `globals.css`, never by editing the component source files directly.

## Core Principles

### 1. Don't Modify Source Files

shadcn/ui components are meant to be copied into your codebase. You CAN edit them, but the preferred customization path is through CSS variables and Tailwind config.

### 2. Theme Through CSS Variables

All colors, borders, and radii are controlled via CSS variables in `globals.css`. Never hardcode colors inside shadcn components.

```css
@layer base {
  :root {
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* etc */
  }
}
```

### 3. Variants > Custom Props

Use the built-in `variant` prop before extending with custom props. The pattern is already there.

## Component Usage Patterns

### Button

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Trash2 className="h-4 w-4" /></Button>

// States
<Button disabled>Disabled</Button>
<Button loading> {/* custom */}
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// As child (using asChild)
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

### Input

```tsx
import { Input } from '@/components/ui/input';

// Basic
<Input placeholder="Email" type="email" />

// With icon
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>

// With error
<Input aria-invalid={!!error} />
{error && <p className="text-sm text-destructive">{error}</p>}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleEdit}>
      <Pencil className="mr-2 h-4 w-4" /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>
      <Copy className="mr-2 h-4 w-4" /> Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
      <Trash2 className="mr-2 h-4 w-4" /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Customization Patterns

### Extend a Component

```tsx
import { Button as BaseButton, ButtonProps } from '@/components/ui/button';

// Add new variant
const myVariants = cva('', {
  variants: {
    variant: {
      premium: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
    },
  },
});

export function Button({ variant, className, ...props }: ButtonProps & {
  variant?: 'premium';
}) {
  return <BaseButton variant={variant} className={cn(variant === 'premium' && myVariants({ variant }), className)} {...props} />;
}
```

### Theming

```css
/* globals.css — customize theme */
@layer base {
  :root {
    --radius: 0.5rem;
    /* shadcn/ui uses CSS variables for all colors */
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
  }
}
```

## Related Skills

- forms — shadcn/ui form patterns
- tables — shadcn/ui table patterns
- dialogs — shadcn/ui dialog patterns
- command-palette — Command menu (cmdk)
- charts — shadcn/ui chart patterns
- tailwind — TailwindCSS integration

## Follow-up Skills

- design — Use shadcn/ui in generated pages
- ui-review — Review shadcn/ui usage patterns
