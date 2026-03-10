import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  PiggyBank,
  TrendingUp,
} from 'lucide-react';
import { FinanceAppShell } from '@/components/FinanceAppShell';

const SPENDING_DATA = [
  { month: 'Jan', amount: 3200 },
  { month: 'Feb', amount: 2850 },
  { month: 'Mar', amount: 3400 },
  { month: 'Apr', amount: 2980 },
  { month: 'May', amount: 3650 },
  { month: 'Jun', amount: 4120 },
];

const chartConfig = {
  amount: { label: 'Spending', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function FinancialDashboardFullPageDemo() {
  return (
    <FinanceAppShell
      title="Financial dashboard"
      subtitle="Your financial overview at a glance"
      activeNavId="dashboard"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(45230)}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly income</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(6500)}</p>
              <p className="text-xs text-muted-foreground">Net after taxes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly spending</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(4120)}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                8% under budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Savings rate</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24%</p>
              <Progress value={24} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Spending trend</CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <AreaChart data={SPENDING_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <ChartTooltip content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v))} />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-amount)"
                    fill="var(--color-amount)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                <Button variant="outline" className="h-auto flex-col items-start gap-1 py-3">
                  <ArrowDownLeft className="h-4 w-4" />
                  <span>Transfer money</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 py-3">
                  <CreditCard className="h-4 w-4" />
                  <span>Pay bills</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 py-3">
                  <PiggyBank className="h-4 w-4" />
                  <span>Add to savings</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 py-3">
                  <TrendingUp className="h-4 w-4" />
                  <span>View insights</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming bills</CardTitle>
            <CardDescription>Next 5 payments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Electric bill', amount: 127, due: 'Mar 15' },
                { name: 'Credit card', amount: 450, due: 'Mar 20' },
                { name: 'Internet', amount: 65, due: 'Mar 22' },
                { name: 'Car insurance', amount: 195, due: 'Mar 25' },
                { name: 'Mortgage', amount: 1850, due: 'Apr 1' },
              ].map((bill) => (
                <li
                  key={bill.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{bill.name}</p>
                    <p className="text-sm text-muted-foreground">Due {bill.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold tabular-nums">{formatCurrency(bill.amount)}</span>
                    <Badge variant="secondary">Autopay</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </FinanceAppShell>
  );
}
