---
name: dialogs
description: Dialog and modal patterns with shadcn/ui Dialog, Sheet, AlertDialog. Focus management, keyboard handling, animations, and confirmation dialogs.
argument-hint: "[modal|sheet|alert|confirm]"
---

# Dialogs

## Purpose

Build accessible, well-designed dialogs and modals using shadcn/ui Dialog, Sheet (slide-in panel), and AlertDialog. Every dialog manages focus, handles keyboard events (Escape to close), and has proper animations.

## When to Activate

- Auto-loaded when generating UI that needs modals, sheets, or confirmation dialogs
- User asks for dialog, modal, sheet, or popover
- User needs confirmation dialogs for destructive actions

## When NOT to Activate

- User needs a tooltip or hover card (use shadcn/ui Tooltip/HoverCard)
- User needs a dropdown menu (use DropdownMenu)
- User needs a context menu (use ContextMenu)

## System Prompt

You are a dialog accessibility expert. Every dialog you build manages focus correctly, traps focus inside the dialog, returns focus on close, handles Escape key, and animates smoothly.

## Dialog Types

### 1. Dialog (Centered Modal)

```tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function EditDialog({ item, onSave }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {item.name}</DialogTitle>
          <DialogDescription>
            Make changes to the item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={item.name} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### 2. Sheet (Slide-in Panel)

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function SidePanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Panel Title</SheetTitle>
          <SheetDescription>
            This panel slides in from the right.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {/* Panel content */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

Sheet sides: `top`, `right` (default), `bottom`, `left`.

### 3. AlertDialog (Confirmation)

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function DeleteConfirmDialog({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Accessibility Patterns

### Focus Management

shadcn/ui dialogs handle this automatically:
- Focus is trapped inside the dialog when open
- Tab order cycles within the dialog
- Escape key closes the dialog
- Focus returns to trigger element on close

### ARIA Attributes

```tsx
// Dialog handles these automatically:
role="dialog"
aria-modal="true"
aria-labelledby="dialog-title"
aria-describedby="dialog-description"
```

## Animation Customization

```tsx
// Dialog with custom animation
<DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
```

## Dialog Content Sizes

```tsx
// Default
<DialogContent>
  // ~425px max-width

// Small form
<DialogContent className="sm:max-w-[425px]">

// Medium
<DialogContent className="sm:max-w-lg">

// Large
<DialogContent className="sm:max-w-2xl">

// Full screen (mobile)
<DialogContent className="sm:max-w-[425px]">

// Sheet sizes
<SheetContent side="right" className="sm:max-w-md">
<SheetContent side="right" className="sm:max-w-lg">
```

## Rules

1. **Use AlertDialog for destructive confirmations.** Not a regular Dialog.
2. **Use Sheet for side panels and settings.** Not a Dialog.
3. **Dialog for centered modals.** Forms, editing, detail views.
4. **Always include title and description** for screen readers.
5. **`<DialogTrigger asChild>`** to wrap the trigger element.
6. **Don't nest dialogs.** One dialog at a time.
7. **Close button is automatic** in shadcn/ui dialogs.
8. **Sheet overlay closes on click outside** — use `SheetClose` or `onOpenChange` for custom close.

## Related Skills

- shadcn — shadcn/ui components
- accessibility — Dialog focus management
- forms — Form dialogs
- command-palette — Command dialog

## Follow-up Skills

- ui-review — Review dialog accessibility
- animation — Add custom dialog animations
