---
name: component-architecture
description: Component decomposition patterns. Smart vs presentational, composition, compound components, render props vs hooks, and file organization.
argument-hint: "[pattern|split|compose]"
---

# Component Architecture

## Purpose

Design well-structured React components with clear responsibilities. Every component has a reason to exist, a single job, and clean interfaces with other components.

## When to Activate

- User is creating new components or pages
- User types `/react` or `/component-architecture`
- User is refactoring large components
- User asks about component structure or patterns

## When NOT to Activate

- User is writing backend-only code
- User is working with a non-React frontend
- The component is trivially simple (a single element)

## System Prompt

You are a software architect specializing in React component design. You think about composition, responsibility boundaries, and API surfaces before writing any code.

## Component Types

### 1. Page Components

Route-level components. Own data fetching and layout. Compose sections/features.

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const { user, stats } = await getDashboardData();

  return (
    <main className="container py-8">
      <PageHeader user={user} />
      <StatsGrid stats={stats} />
      <RecentActivity />
    </main>
  );
}
```

### 2. Feature Components

Self-contained features. Own state and data dependencies. Reusable across pages.

```tsx
// components/features/stats-grid.tsx
export function StatsGrid({ stats }: { stats: Stats[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
```

### 3. UI Components

Primitive, reusable UI elements. No business logic. Pure presentational.

```tsx
// components/ui/button.tsx
export function Button({ variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
}
```

## Composition Patterns

### 1. Slot Pattern (Children)

```tsx
interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({ icon, title, description, action, children }: CardProps) {
  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
```

### 2. Compound Components

```tsx
// Table compound component
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell><StatusBadge status={item.status} /></TableCell>
        <TableCell><RowActions item={item} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### 3. Data/Display Pattern

```tsx
// Data component (server)
export async function UserList() {
  const users = await getUsers();
  return <UserListDisplay users={users} />;
}

// Display component (client, with interactivity)
'use client';
export function UserListDisplay({ users }: { users: User[] }) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.includes(search));

  return (
    <div>
      <Input value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.map(user => <UserRow key={user.id} user={user} />)}
    </div>
  );
}
```

## Component Boundaries

### When to Split

Split a component when:
1. It renders more than 3 distinct visual sections
2. It has more than 3 useState or useEffect hooks
3. The file exceeds ~150 lines
4. Part of it needs to be a client component while another part can stay server
5. A section is reused elsewhere
6. Testing requires testing sub-sections independently

### When NOT to Split

Don't split when:
1. It adds more files without reducing complexity (premature decomposition)
2. The "split" would require prop drilling through 3+ levels
3. The component is already stable and tested

## File Organization

```
components/
  ui/              — shadcn/ui or custom primitives (Button, Input, Dialog)
  features/        — Feature-specific (UserList, StatsGrid, ActivityFeed)
  layout/          — Layout components (Sidebar, Navbar, Footer)
  shared/          — Shared business components (UserAvatar, StatusBadge)
  
app/
  dashboard/
    page.tsx       — Page component
    loading.tsx    — Loading UI
    error.tsx      — Error UI
    empty.tsx      — Empty state
    components/    — Page-specific components
```

## Rules

1. **One component = one file.** Except for small tightly-coupled groups (compound components).
2. **Components are named after what they render**, not where they're used. `UserTable`, not `DashboardTable`.
3. **Props are explicit and typed.** No spreading unknown props through components.
4. **Default exports for pages.** Named exports for everything else.
5. **Server components by default.** Only add `"use client"` when interactivity is needed.
6. **Compose, don't inherit.** Favor composition over HOCs or inheritance patterns.
7. **Presentational components don't import data.** They receive data via props.
8. **Feature components don't import UI components** from outside the project. They use the local design system.

## Related Skills

- react — React patterns
- hooks — Logic extraction into hooks
- component-splitting — Refactoring large components
- refactor-ui — UI refactoring
- frontend-review — Code review patterns

## Follow-up Skills

- component-splitting — Apply splits to large components
- refactor-ui — Refactor based on architecture review
