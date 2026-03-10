import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { FinanceAppShell } from '@/components/FinanceAppShell';

const WEEKLY_DATA = [
  { day: 'Mon', amount: 420 },
  { day: 'Tue', amount: 380 },
  { day: 'Wed', amount: 510 },
  { day: 'Thu', amount: 290 },
  { day: 'Fri', amount: 640 },
  { day: 'Sat', amount: 520 },
  { day: 'Sun', amount: 310 },
];

const MONTHLY_DATA = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 3850 },
  { month: 'Mar', amount: 4500 },
  { month: 'Apr', amount: 3980 },
  { month: 'May', amount: 4120 },
  { month: 'Jun', amount: 4350 },
];

const CATEGORY_DATA = [
  { name: 'Food & Dining', value: 1240, color: 'hsl(var(--chart-1))' },
  { name: 'Shopping', value: 890, color: 'hsl(var(--chart-2))' },
  { name: 'Transportation', value: 620, color: 'hsl(var(--chart-3))' },
  { name: 'Utilities', value: 450, color: 'hsl(var(--chart-4))' },
  { name: 'Entertainment', value: 380, color: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  amount: { label: 'Spending', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function SpendingInsightsFullPageDemo() {
  const [search, setSearch] = useState('');

  return (
    <FinanceAppShell
      title="Spending insights"
      subtitle="Analyze your spending by category and time period"
      activeNavId="insights"
    >
      <div className="space-y-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by merchant or category..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs defaultValue="weekly">
          <TabsList>
            <TabsTrigger value="weekly">This week</TabsTrigger>
            <TabsTrigger value="monthly">Last 6 months</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily spending</CardTitle>
                <CardDescription>Your spending over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart data={WEEKLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} />} />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly spending</CardTitle>
                <CardDescription>Your spending over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart data={MONTHLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} />} />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Spending by category</CardTitle>
            <CardDescription>Breakdown of your spending this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="h-[200px] w-full max-w-[200px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DATA}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {CATEGORY_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-1 space-y-2">
                {CATEGORY_DATA.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <span className="text-sm">{cat.name}</span>
                    <span className="font-medium tabular-nums">{formatCurrency(cat.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceAppShell>
  );
}
