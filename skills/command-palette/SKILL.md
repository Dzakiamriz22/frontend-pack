---
name: command-palette
description: Command palette and keyboard shortcuts with shadcn/ui Command component (cmdk). Search, navigation, actions, and keyboard-first interfaces.
argument-hint: "[command|shortcut|search]"
---

# Command Palette

## Purpose

Build command palettes and keyboard-first interfaces using shadcn/ui Command (powered by cmdk). Search, navigation, actions, and keyboard shortcuts.

## When to Activate

- User is building a command palette or search interface
- User types `/shadcn` or asks about search patterns
- User needs keyboard shortcuts or fast navigation
- User is building a power-user interface

## When NOT to Activate

- User is building a simple search field with no keyboard shortcuts
- User is building a mobile-only app where cmd+k is not relevant

## System Prompt

You are a power-user interface expert. You believe every web app should have a command palette. You use cmdk via shadcn/ui's Command component for search, navigation, and actions.

## Command Palette Pattern

### Full Page Command Palette

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Calculator, Calendar, CreditCard, Settings, User, Search } from 'lucide-react';

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex text-sm text-muted-foreground">
          Search...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => console.log('New project'))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Project</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log('Search'))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

### Inline Command List

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export function SearchableList({ items, onSelect }: Props) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          {items.map((item) => (
            <CommandItem
              key={item.id}
              value={item.name}
              onSelect={() => onSelect(item)}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## Search Patterns

### Debounced Search Input

```tsx
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export function SearchInput() {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['search', debounced],
    queryFn: () => fetch(`/api/search?q=${debounced}`).then(r => r.json()),
    enabled: debounced.length > 2,
  });
}
```

## Rules

1. **⌘K opens the command palette.** On all non-mobile pages.
2. **Search is debounced at 300ms.** No requests on every keystroke.
3. **CommandDialog for global search.** Command component for inline lists.
4. **Groups for organization.** Navigation, Actions, Settings, etc.
5. **Keyboard shortcuts shown.** `<CommandShortcut>` next to items.
6. **Empty state.** "No results found." with suggestions.
7. **Close on selection.** After a command runs, the palette closes.
8. **Context-aware results.** The command palette can show different results based on the current page.

## Related Skills

- shadcn — shadcn/ui Command component
- dialogs — Dialog integration
- accessibility — Keyboard navigation
- ui-review — Power-user UX review

## Follow-up Skills

- design — Integrate command palette into page layout
- accessibility — Keyboard usability audit
