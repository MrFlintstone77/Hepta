import { DocFooter } from '@/components/DocFooter';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 273 },
  { month: 'May', desktop: 398 },
  { month: 'Jun', desktop: 404 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ChartDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Chart</h1>
      <p className="lead text-lg text-muted-foreground">
        Data visualization components built with Recharts, styled for the design system.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area type="monotone" dataKey="desktop" stroke="var(--color-desktop)" fill="var(--color-desktop)" />
  </AreaChart>
</ChartContainer>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="h-[200px] w-full max-w-md py-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="desktop"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <DocFooter
        prev={{ label: 'Card', href: '/components/card' }}
        next={{ label: 'Checkbox', href: '/components/checkbox' }}
      />
    </article>
  );
}
