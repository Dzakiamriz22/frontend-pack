---
name: component-splitting
description: Component splitting patterns. Decomposing large components into smaller, focused pieces. Server/client boundary splitting, and extracting hooks.
argument-hint: "[component|pattern|boundary]"
---

# Component Splitting

## Purpose

Decompose large components into smaller, focused pieces. Improve code maintainability, reusability, and performance by splitting components at natural boundaries.

## When to Activate

- User types `/component-splitting` or `/refactor-ui`
- User has a component that is > 150 lines
- User has a component with multiple responsibilities
- User needs to split a component at server/client boundaries

## When NOT to Activate

- The component is already small and focused
- User is writing new code from scratch (use component-architecture)
- Premature splitting would add complexity without benefit

## System Prompt

You are a component architecture specialist. You know when a component is too big. You split at natural boundaries — rendering, data, interactivity, layout — not arbitrarily.

## When to Split

Split when:

1. **File exceeds 150 lines** — or 200 lines max
2. **Component has 4+ states** (loading, error, empty, success, editing, etc.)
3. **Component mixes server + client concerns** — the server part doesn't need `"use client"`
4. **Section can be extracted** — a visual section that makes sense independently
5. **Component is reused** — if you find yourself copying the same pattern
6. **Props interface has 8+ required props** — too many responsibilities
7. **Multiple hooks** — 3+ useState/useEffect pairs suggests separate concerns

## Splitting Patterns

### 1. Data/Display Split

Separate data fetching from rendering. The outer component fetches; the inner component renders.

```tsx
// BEFORE: Mixed concerns
export default async function UserList() {
  const users = await getUsers();
  const [search, setSearch] = useState(''); // Can't use hooks in server component!

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {users.filter(u => u.name.includes(search)).map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// AFTER: Separated
// UserList.server.tsx (Server Component)
export default async function UserList() {
  const users = await getUsers();
  return <UserListClient users={users} />;
}

// UserListClient.tsx (Client Component)
'use client';
export function UserListClient({ users }: { users: User[] }) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.includes(search));

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.map(user => <UserRow key={user.id} user={user} />)}
    </div>
  );
}
```

### 2. Section Extraction

Extract visual sections into their own components.

```tsx
// BEFORE
function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Stats section: 30 lines */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Chart section: 40 lines */}
      <div className="rounded-lg border p-6">
        <h2>Revenue</h2>
        <Chart data={revenueData} />
      </div>

      {/* Table section: 60 lines */}
      <Table data={recentOrders} />
    </div>
  );
}

// AFTER
function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      <StatsGrid stats={stats} />
      <RevenueChart data={revenueData} />
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}
```

### 3. Compound Component Split

Split into a parent with sub-components.

```tsx
// AFTER: Compound component
function Tabs({ defaultValue, children }: TabsProps) {
  // State management
  return <div>{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = TabButton;
Tabs.Panel = TabPanel;

// Usage
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">...</Tabs.Panel>
  <Tabs.Panel value="details">...</Tabs.Panel>
</Tabs>
```

### 4. Hook Extraction

Extract logic into custom hooks.

```tsx
// BEFORE: Logic in component
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser).catch(setError).finally(() => setLoading(false));
  }, [userId]);

  const { data: posts } = useQuery({ queryKey: ['posts', userId], queryFn: () => fetchPosts(userId) });

  // ...render
}

// AFTER: Hook extracted
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser).catch(setError).finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);
  const { data: posts } = usePosts(userId);

  // ...render
}
```

## Splitting Rules

1. **One file = one component.** Unless compound component pattern.
2. **Don't split prematurely.** Wait until the component feels unwieldy.
3. **Split at server/client boundaries.** The most impactful split in Next.js.
4. **Named exports for extracted components.** Default export for the main one.
5. **Props should be smaller after split.** If props explode, you split at the wrong boundary.
6. **Each extracted piece has a single responsibility.**
7. **Don't split into files that are only used once** — unless the parent is too long.

## Related Skills

- component-architecture — Component design principles
- refactor-ui — Apply splits as part of refactoring
- hooks — Extract logic into hooks
- react — React patterns for composition

## Follow-up Skills

- refactor-ui — Apply splitting in refactoring pass
- cleanup — Clean up after splitting
- frontend-review — Review split quality
