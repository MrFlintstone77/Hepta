import { Fragment, useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
import { FinanceAppShell } from '@/components/FinanceAppShell';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  autopay: boolean;
  status: 'upcoming' | 'due' | 'paid';
}

const MOCK_BILLS: Bill[] = [
  { id: '1', name: 'Mortgage', amount: 1850, dueDate: '2024-04-01', autopay: true, status: 'upcoming' },
  { id: '2', name: 'Electric', amount: 127, dueDate: '2024-03-15', autopay: false, status: 'upcoming' },
  { id: '3', name: 'Credit card', amount: 450, dueDate: '2024-03-20', autopay: true, status: 'upcoming' },
  { id: '4', name: 'Internet', amount: 65, dueDate: '2024-03-22', autopay: true, status: 'upcoming' },
  { id: '5', name: 'Car insurance', amount: 195, dueDate: '2024-03-25', autopay: false, status: 'upcoming' },
  { id: '6', name: 'Student loan', amount: 320, dueDate: '2024-04-05', autopay: true, status: 'upcoming' },
  { id: '7', name: 'Water', amount: 45, dueDate: '2024-03-28', autopay: false, status: 'upcoming' },
];

const ITEMS_PER_PAGE = 5;
const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  upcoming: 'secondary',
  due: 'destructive',
  paid: 'default',
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function BillPayFullPageDemo() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bills, setBills] = useState(MOCK_BILLS);

  const filtered = bills.filter(
    (b) => !search || b.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBills = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const toggleAutopay = (id: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, autopay: !b.autopay } : b))
    );
  };

  return (
    <FinanceAppShell
      title="Bill pay"
      subtitle="Manage recurring payments and autopay"
      activeNavId="bills"
    >
      <Card>
        <CardHeader>
          <CardTitle>Recurring bills</CardTitle>
          <CardDescription>View and manage your bill payments</CardDescription>
          <div className="pt-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bills..."
                className="pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due date</TableHead>
                <TableHead>Autopay</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell className="tabular-nums">{formatCurrency(bill.amount)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(bill.dueDate).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={bill.autopay}
                      onCheckedChange={() => toggleAutopay(bill.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANTS[bill.status]} className="capitalize">
                      {bill.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of{' '}
                {filtered.length} bills
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
                      className={
                        currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
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
                      className={
                        currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </FinanceAppShell>
  );
}
