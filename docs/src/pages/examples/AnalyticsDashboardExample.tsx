import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import {
  Home,
  Database,
  Calendar,
  Users,
  BookOpen,
  Play,
  Search,
  Plus,
  ChevronDown,
  Star,
  Gem,
  LayoutGrid,
  Settings,
  HelpCircle,
  ChevronLeft,
  Share2,
  BarChart3,
  TrendingUp,
  ScatterChart,
  Square,
  MoreVertical,
  Hexagon,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CHART_DATA = [
  { date: 'Jan 16', metricA: 12, metricB: 8 },
  { date: 'Jan 17', metricA: 18, metricB: 14 },
  { date: 'Jan 18', metricA: 22, metricB: 20 },
  { date: 'Jan 19', metricA: 28, metricB: 24 },
  { date: 'Jan 20', metricA: 35, metricB: 30 },
  { date: 'Jan 21', metricA: 42, metricB: 38 },
];

const chartConfig = {
  metricA: { label: 'Uniques of All Events', color: 'hsl(var(--chart-1))' },
  metricB: { label: 'Total Events', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const TABLE_DATA = [
  {
    metric: 'A. Uniques of All Events',
    rows: [
      { device: 'Desktop', cohort: 'All User Profiles', dot: 'purple', value: 16.2 },
      { device: 'Desktop', cohort: 'view only users', dot: 'red', value: 14.5 },
      { device: 'Desktop', cohort: 'Not In view only users', dot: 'teal', value: 1.7 },
      { device: 'Mobile', cohort: 'view only users', dot: 'orange', value: 0.5 },
      { device: 'Mobile', cohort: 'All User Profiles', dot: 'maroon', value: 0.5 },
    ],
  },
  {
    metric: 'B. Total Events of meaning...',
    rows: [{ device: 'Desktop', cohort: 'Not In view only users', dot: 'blue', value: 6.7 }],
  },
];

const DOT_COLORS: Record<string, string> = {
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  teal: 'bg-teal-500',
  orange: 'bg-orange-500',
  maroon: 'bg-rose-700',
  blue: 'bg-blue-500',
};

export function AnalyticsDashboardFullPageDemo() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('query');

  return (
    <div className="flex h-[768px] min-h-0 flex-col bg-background">
      {/* Top header */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3">
        <p className="text-sm text-muted-foreground">SLMobbin / Untitled</p>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            Jan 16, 2026 12:00 am - Jan 22, 2026 11:59 pm
          </Button>
          {['Today', 'Yesterday', '7D', '30D', '3M', '6M', '12M'].map((label) => (
            <Button key={label} variant="ghost" size="sm">
              {label}
            </Button>
          ))}
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Exclude" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Compare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 border-l pl-2">
            <Select>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ScatterChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={activeHeaderTab} onValueChange={setActiveHeaderTab}>
            <TabsList className="h-8">
              <TabsTrigger value="query" className="px-3 text-xs">
                Query
              </TabsTrigger>
              <TabsTrigger value="chart" className="px-3 text-xs">
                Chart
              </TabsTrigger>
              <TabsTrigger value="annotations" className="px-3 text-xs">
                Annotations
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" className="bg-primary">
            Save
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left sidebar */}
        <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/50 p-4">
          <div className="mb-4">
            <p className="font-semibold">SLMobbin</p>
            <p className="text-xs text-muted-foreground">All Project Data</p>
          </div>
          <Button className="mb-4 w-full gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <nav className="space-y-0.5">
            {[
              { icon: Home, label: 'Home' },
              { icon: Database, label: 'Data', hasArrow: true },
              { icon: Calendar, label: 'Events' },
              { icon: Users, label: 'Users' },
              { icon: BookOpen, label: 'Lexicon' },
              { icon: Play, label: 'Session Replay' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </span>
                {item.hasArrow && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
            ))}
          </nav>
          <div className="mt-6">
            <button className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pinned
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
              <Star className="h-4 w-4 text-muted-foreground" />
              Starter Board
            </button>
          </div>
          <div className="mt-auto pt-6">
            <Button variant="outline" className="w-full gap-2 border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-600 dark:bg-amber-950/50 dark:text-amber-200 dark:hover:bg-amber-900/50">
              <Gem className="h-4 w-4" />
              Upgrade Plan
            </Button>
            <div className="mt-4 flex justify-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Chart */}
            <Card>
              <CardContent className="pt-6">
                <ChartContainer config={chartConfig} className="h-[240px] w-full">
                  <LineChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="metricA"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="metricB"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
                <div className="mt-2 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted">
                    <Square className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ScatterChart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardContent className="p-4">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Metric 2 (Top 12)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top12">Top 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="device type 2 (Top 12)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top12">Top 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Cohort 3 (Top 12)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top12">Top 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-1">
                    Dynamic Segments
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className="text-right">Average</TableHead>
                      <TableHead className="text-right">Jan 16</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TABLE_DATA.flatMap((group, gi) => [
                      <TableRow key={`${gi}-header`}>
                        <TableCell className="font-medium">{group.metric}</TableCell>
                        <TableCell className="text-right">—</TableCell>
                        <TableCell className="text-right">—</TableCell>
                      </TableRow>,
                      ...group.rows.map((row, ri) => (
                        <TableRow key={`${gi}-${ri}`}>
                          <TableCell>
                            <div className="flex items-center gap-2 pl-6">
                              <span className={cn('h-2 w-2 shrink-0 rounded-full', DOT_COLORS[row.dot] || 'bg-muted')} />
                              {row.device} · {row.cohort}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{row.value}</TableCell>
                          <TableCell className="text-right">0</TableCell>
                        </TableRow>
                      )),
                    ])}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l bg-muted/20 p-4 lg:block">
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Metrics</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium">Uniques of All Events</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 rounded border bg-background px-2 py-1.5 text-xs">
                      <Hexagon className="h-3.5 w-3.5 text-primary" />
                      All Events
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 text-xs">
                      <Plus className="h-3 w-3" />
                      Add Event
                    </Button>
                    <div className="mt-2 flex items-center gap-1 rounded border px-2 py-1 text-xs">
                      # User - Uniques - Cumulative Users
                      <ChevronDown className="h-3 w-3" />
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      Cumulative Sum
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium">Total Events of meaningful interact...</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 rounded border bg-background px-2 py-1.5 text-xs">
                      <Hexagon className="h-3.5 w-3.5 text-primary" />
                      meaningful interaction
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 text-xs">
                      <Plus className="h-3 w-3" />
                      Add Event
                    </Button>
                    <div className="mt-2 flex items-center gap-1 rounded border px-2 py-1 text-xs">
                      # User - Total Events
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
                <Button variant="outline" size="sm" className="w-full gap-1 border-dashed text-muted-foreground">
                  <Plus className="h-4 w-4" />
                  Add Metric
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Filter</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Country</span>
                      <span className="text-muted-foreground">Is Singapore or United States</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Breakdown</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-2">
                <Card>
                  <CardContent className="flex items-center justify-between p-2">
                    <span className="text-sm">device type*</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center justify-between p-2">
                    <span className="text-sm">1 cohort*</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
