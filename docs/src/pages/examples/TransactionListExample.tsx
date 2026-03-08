import { Fragment, useState } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, LayoutDashboard, Receipt, Settings, PanelLeft, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type TransactionStatus = 'completed' | 'pending' | 'failed';
type TransactionType = 'credit' | 'debit';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-03-07', description: 'Salary deposit', category: 'Income', amount: 4250.0, type: 'credit', status: 'completed' },
  { id: '2', date: '2024-03-06', description: 'Acme Corp - Invoice #2847', category: 'Income', amount: 1200.0, type: 'credit', status: 'completed' },
  { id: '3', date: '2024-03-06', description: 'Office supplies - Staples', category: 'Business', amount: -89.45, type: 'debit', status: 'completed' },
  { id: '4', date: '2024-03-05', description: 'Cloud hosting - AWS', category: 'Technology', amount: -312.0, type: 'debit', status: 'completed' },
  { id: '5', date: '2024-03-05', description: 'Wire transfer to vendor', category: 'Payments', amount: -5000.0, type: 'debit', status: 'pending' },
  { id: '6', date: '2024-03-04', description: 'Client refund - Project X', category: 'Refunds', amount: 450.0, type: 'credit', status: 'completed' },
  { id: '7', date: '2024-03-04', description: 'Subscription - Adobe CC', category: 'Technology', amount: -54.99, type: 'debit', status: 'completed' },
  { id: '8', date: '2024-03-03', description: 'Consulting fee - Smith & Co', category: 'Income', amount: 2500.0, type: 'credit', status: 'completed' },
  { id: '9', date: '2024-03-03', description: 'Payment declined', category: 'Other', amount: -150.0, type: 'debit', status: 'failed' },
  { id: '10', date: '2024-03-02', description: 'Bank fee - Monthly', category: 'Fees', amount: -15.0, type: 'debit', status: 'completed' },
  { id: '11', date: '2024-03-02', description: 'Freelance - Website redesign', category: 'Income', amount: 1800.0, type: 'credit', status: 'pending' },
  { id: '12', date: '2024-03-01', description: 'Rent payment', category: 'Payments', amount: -1850.0, type: 'debit', status: 'completed' },
  { id: '13', date: '2024-03-01', description: 'Interest earned', category: 'Income', amount: 12.34, type: 'credit', status: 'completed' },
  { id: '14', date: '2024-02-29', description: 'Utility bill - Electric', category: 'Utilities', amount: -127.5, type: 'debit', status: 'completed' },
  { id: '15', date: '2024-02-28', description: 'Stock dividend', category: 'Investments', amount: 85.2, type: 'credit', status: 'completed' },
];

const ITEMS_PER_PAGE = 8;
const STATUS_VARIANTS: Record<TransactionStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  completed: 'default',
  pending: 'secondary',
  failed: 'destructive',
};

function formatAmount(amount: number, type: TransactionType) {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(abs);
  return type === 'credit' ? `+${formatted}` : `-${formatted}`;
}

const DEMO_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Transactions', icon: Receipt },
  { label: 'Settings', icon: Settings },
];

function TransactionListContent() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = MOCK_TRANSACTIONS.filter((t) => {
    const matchesSearch =
      !search ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent transactions</CardTitle>
        <CardDescription>View and filter your account activity</CardDescription>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by description or category..."
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      {tx.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.category}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium tabular-nums',
                      tx.type === 'credit' ? 'text-green-600 dark:text-green-500' : 'text-foreground'
                    )}
                  >
                    {formatAmount(tx.amount, tx.type)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANTS[tx.status]} className="capitalize">
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {filtered.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} transactions
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 5) return true;
                    return Math.abs(p - currentPage) <= 1 || p === 1 || p === totalPages;
                  })
                  .map((p, idx, arr) => (
                    <Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <PaginationItem key={`ellipsis-${p}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(p);
                          }}
                          isActive={p === currentPage}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    </Fragment>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TransactionListFullPageDemo() {
  return (
    <SidebarProvider className="!min-h-0 h-full flex-1 min-w-0">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <PanelLeft className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Finance App</span>
                    <span className="truncate text-xs">Transactions</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Receipt className="h-4 w-4" />
                    Transactions
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="h-4 w-4" />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <ChevronUp className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Account</span>
                      <span className="truncate text-xs">user@example.com</span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-dropdown-menu-trigger-width]">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <span className="font-medium">Transactions</span>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            <p className="text-sm text-muted-foreground">View and manage your account activity</p>
          </div>
          <TransactionListContent />
        </div>
      </main>
    </SidebarProvider>
  );
}
