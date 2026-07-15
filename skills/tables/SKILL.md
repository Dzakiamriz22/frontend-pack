---
name: tables
description: Data table patterns with shadcn/ui Table and TanStack Table. Sorting, filtering, pagination, row selection, inline editing, and responsive tables.
argument-hint: "[column|custom|responsive]"
---

# Tables

## Purpose

Build powerful data tables using shadcn/ui Table components and TanStack Table (formerly React Table). Every table supports sorting, filtering, pagination, loading states, empty states, error states, and responsive mobile layouts.

## When to Activate

- User types `/table` or `/table <resource>`
- Auto-loaded when generating data-heavy pages
- User asks for table, data grid, or list view
- User needs sortable, filterable, paginated data display

## When NOT to Activate

- User needs a simple list with no interactivity (use a Card list)
- User is displaying hierarchical data (use a Tree)

## System Prompt

You are a data table specialist. You use TanStack Table for table logic and shadcn/ui Table for presentation. Every table is sortable, searchable, paginated, responsive, and has loading/empty/error states.

## Tech Stack

- **Table logic:** TanStack Table (`@tanstack/react-table`)
- **Table UI:** shadcn/ui Table components
- **Data fetching:** TanStack Query
- **Pagination client or server:** TanStack Table pagination

## Basic Table Pattern

```tsx
'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(row.original)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
  onRetry,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: { columnFilters, sorting },
  });

  if (isLoading) return <TableSkeleton />;
  if (error) return <TableError onRetry={onRetry} />;
  if (data.length === 0) return <TableEmpty />;

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer select-none flex items-center gap-1' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```

## States

### Loading State

```tsx
function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-[250px]" />
      <div className="rounded-md border">
        <div className="space-y-2 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Empty State

```tsx
function TableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <InboxIcon className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No data yet</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Get started by creating your first entry.
      </p>
      <Button className="mt-4">Create</Button>
    </div>
  );
}
```

### Error State

```tsx
function TableError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircleIcon className="h-12 w-12 text-destructive" />
      <h3 className="mt-4 text-lg font-semibold">Failed to load data</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Something went wrong. Please try again.
      </p>
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
```

## Responsive Table (Mobile Card View)

```tsx
export function ResponsiveTable<TData extends { id: string }>({
  data,
  columns,
  renderCard,
}: Props<TData>) {
  return (
    <>
      {/* Desktop: traditional table */}
      <div className="hidden md:block rounded-md border">
        <Table>
          {/* ... standard table */}
        </Table>
      </div>

      {/* Mobile: card layout */}
      <div className="md:hidden space-y-4">
        {data.map((item) => renderCard(item))}
      </div>
    </>
  );
}
```

## Related Skills

- shadcn — shadcn/ui Table components
- forms — Inline editing in tables
- performance — Virtualized tables for large datasets
- responsive — Responsive table patterns

## Follow-up Skills

- performance — Add virtualization for 1000+ rows
- forms — Add inline editing
