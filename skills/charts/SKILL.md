---
name: charts
description: Charts and data visualization with shadcn/ui Chart components (recharts). Line, bar, area, pie charts with consistent styling, accessibility, and responsive design.
argument-hint: "[type|data|config]"
---

# Charts

## Purpose

Build accessible, beautifully styled charts using shadcn/ui Chart components (powered by recharts). Every chart has proper labels, tooltips, legends, responsive sizing, dark mode, and keyboard accessibility.

## When to Activate

- User needs data visualization
- User types `/shadcn` or asks about charts
- User is building dashboards or analytics views
- User needs to visualize data trends or distributions

## When NOT to Activate

- User needs a simple stat display (use a Card or Badge)
- User needs complex interactive data exploration (consider a dedicated viz library)
- User is building a simple table (use shadcn/ui Table)

## System Prompt

You are a data visualization designer. You choose the right chart type for the data. Every chart is accessible, responsive, and follows the design system.

## Chart Types

### Line Chart (Trends over time)

```tsx
'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
```

### Bar Chart (Comparisons)

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

// Inside a Card with ChartContainer
<BarChart accessibilityLayer data={chartData}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="name" tickLine={false} axisLine={false} />
  <ChartTooltip content={<ChartTooltipContent />} />
  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
</BarChart>
```

### Area Chart (Volume over time)

```tsx
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

<AreaChart accessibilityLayer data={chartData}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="date" tickLine={false} axisLine={false} />
  <ChartTooltip content={<ChartTooltipContent />} />
  <Area
    dataKey="revenue"
    type="monotone"
    fill="var(--color-revenue)"
    fillOpacity={0.4}
    stroke="var(--color-revenue)"
  />
</AreaChart>
```

### Pie Chart (Proportions)

```tsx
import { Pie, PieChart } from 'recharts';

<PieChart accessibilityLayer>
  <Pie
    data={chartData}
    dataKey="value"
    nameKey="name"
    innerRadius={60}
    outerRadius={120}
    fill="var(--color-value)"
  />
  <ChartTooltip content={<ChartTooltipContent />} />
</PieChart>
```

## Chart Configuration

### Color Tokens

Charts use dedicated color tokens in the design system:

```css
:root {
  --chart-1: 221.2 83.2% 53.3%;   /* blue */
  --chart-2: 142.1 76.2% 36.3%;   /* green */
  --chart-3: 35.5 91.7% 32.9%;   /* amber */
  --chart-4: 280.6 67.2% 44.1%;  /* purple */
  --chart-5: 0 72.2% 50.6%;      /* red */
}
```

In dark mode, adjust lightness while keeping the same hue and saturation.

### Responsive Charts

```tsx
// Charts are responsive by default with ChartContainer
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  {/* Chart */}
</ChartContainer>
```

## Accessibility

```tsx
// Always add:
accessibilityLayer // prop on the chart component

// Charts need:
// - Proper labels via chartConfig
// - Tooltips for data point details
// - Keyboard navigation (tab through data points)
// - Screen reader descriptions
<ChartContainer
  config={chartConfig}
  className="min-h-[200px] w-full"
>
  <LineChart accessibilityLayer data={chartData}>
    {/* ... */}
  </LineChart>
</ChartContainer>
```

## Rules

1. **Always use `accessibilityLayer`.** Every chart must be screen-reader accessible.
2. **Define chartConfig** with labels and colors for each data key.
3. **Use ChartContainer** not recharts' ResponsiveContainer directly.
4. **Color tokens from chart-1 to chart-5.** Not arbitrary colors.
5. **Tooltips on every chart.** Users need to see exact values.
6. **Legend only for multi-series charts.** Single series doesn't need a legend.
7. **CartesianGrid vertical={false}** for cleaner look (horizontal grid only).
8. **rounded bars** `radius={4}` for bar charts.
9. **Dark mode.** Chart colors adjust automatically with CSS variables.
10. **Don't over-animate charts.** A brief initial animation (0.5s) is enough.

## Related Skills

- shadcn — shadcn/ui Chart components
- color-system — Chart color tokens
- responsive — Responsive chart sizing
- accessibility — Chart accessibility

## Follow-up Skills

- design — Dashboard layout with charts
- performance — Chart performance for large datasets
