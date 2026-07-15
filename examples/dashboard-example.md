# Dashboard Command Example

```
/dashboard analytics
```

The plugin loads: design, react, nextjs, tailwind, shadcn, component-architecture.

## Generated Files

```
app/dashboard/
  page.tsx          — Main dashboard page
  loading.tsx       — Skeleton loader
  error.tsx         — Error boundary
  layout.tsx        — Dashboard layout
  components/
    stats-grid.tsx  — 4 stat cards
    revenue-chart.tsx — Line chart
    recent-orders.tsx  — Data table
    sidebar.tsx     — Navigation sidebar
    header.tsx      — Top header with user menu
```

## Features

- Sidebar with navigation (responsive: collapsible on mobile)
- Stats cards with Framer Motion count-up animation
- Revenue chart using shadcn/ui Chart (recharts)
- Recent orders table with TanStack Table
- All components have loading, empty, error states
- Dark mode support
- Fully responsive (320px - 2560px)
