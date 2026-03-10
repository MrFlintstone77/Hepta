import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionListFullPageDemo } from './examples/TransactionListExample';
import { DebtListFullPageDemo } from './examples/DebtListExample';
import { SpendingInsightsFullPageDemo } from './examples/SpendingInsightsExample';
import { PaymentCalendarFullPageDemo } from './examples/PaymentCalendarExample';
import { TransferMoneyFullPageDemo } from './examples/TransferMoneyExample';
import { BillPayFullPageDemo } from './examples/BillPayExample';
import { SavingsGoalsFullPageDemo } from './examples/SavingsGoalsExample';
import { BudgetTrackerFullPageDemo } from './examples/BudgetTrackerExample';
import { FinancialDashboardFullPageDemo } from './examples/FinancialDashboardExample';

const DEMOS = [
  { id: 'financial-dashboard', label: 'Financial dashboard', description: 'Overview with balance cards, spending chart, and quick actions.', Component: FinancialDashboardFullPageDemo },
  { id: 'budget-tracker', label: 'Budget tracker', description: 'Track spending against category budgets with progress bars.', Component: BudgetTrackerFullPageDemo },
  { id: 'savings-goals', label: 'Savings goals', description: 'Set and track progress toward financial goals with contributions.', Component: SavingsGoalsFullPageDemo },
  { id: 'bill-pay', label: 'Bill pay', description: 'Manage recurring payments with autopay toggles and due dates.', Component: BillPayFullPageDemo },
  { id: 'transfer', label: 'Transfer / send money', description: 'Move money between accounts with a confirmation flow.', Component: TransferMoneyFullPageDemo },
  { id: 'payment-calendar', label: 'Payment calendar', description: 'Calendar view of bill due dates with payment details.', Component: PaymentCalendarFullPageDemo },
  { id: 'spending-insights', label: 'Spending insights', description: 'Charts and breakdowns by category and time period.', Component: SpendingInsightsFullPageDemo },
  { id: 'transaction-list', label: 'Transaction list', description: 'Transaction table with filtering, search, and pagination.', Component: TransactionListFullPageDemo },
  { id: 'debt-list', label: 'Debt list', description: 'Track outstanding debts with name, date, and amount owed.', Component: DebtListFullPageDemo },
] as const;

export function Examples() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const demo = searchParams.get('demo');

  useEffect(() => {
    const match = DEMOS.find((d) => d.id === demo);
    if (match) setOpenDemo(match.id);
  }, [demo]);

  const handleOpenChange = (id: string) => (open: boolean) => {
    if (open) {
      setOpenDemo(id);
      setSearchParams({ demo: id }, { replace: true });
    } else {
      setOpenDemo(null);
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Examples</h1>
      <p className="lead text-lg text-muted-foreground">
        Example patterns and compositions using the design system components.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example patterns
      </h2>
      <ul className="mt-4 space-y-2">
        {DEMOS.map(({ id, label, description, Component }) => (
          <li key={id}>
            <Dialog open={openDemo === id} onOpenChange={handleOpenChange(id)}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  {label}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] w-full max-h-[85vh] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
                <DialogHeader className="sr-only">
                  <DialogTitle>{label} demo</DialogTitle>
                </DialogHeader>
                <div className="flex flex-1 min-h-0 overflow-hidden">
                  <Component />
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </li>
        ))}
      </ul>
      <DocFooter
        prev={{ label: 'Sheet', href: '/patterns/sheet' }}
        next={{ label: 'Get started', href: '/get-started' }}
      />
    </article>
  );
}
