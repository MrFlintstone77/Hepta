import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FinanceAppShell } from '@/components/FinanceAppShell';

interface Payment {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  status: 'upcoming' | 'due' | 'paid';
}

const MOCK_PAYMENTS: Payment[] = [
  { id: '1', name: 'Mortgage', amount: 1850, dueDate: new Date(2024, 2, 1), status: 'paid' },
  { id: '2', name: 'Electric bill', amount: 127, dueDate: new Date(2024, 2, 15), status: 'upcoming' },
  { id: '3', name: 'Credit card', amount: 450, dueDate: new Date(2024, 2, 20), status: 'upcoming' },
  { id: '4', name: 'Internet', amount: 65, dueDate: new Date(2024, 2, 22), status: 'upcoming' },
  { id: '5', name: 'Car insurance', amount: 195, dueDate: new Date(2024, 2, 25), status: 'upcoming' },
  { id: '6', name: 'Student loan', amount: 320, dueDate: new Date(2024, 3, 5), status: 'upcoming' },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

function getPaymentsForDate(date: Date) {
  return MOCK_PAYMENTS.filter(
    (p) =>
      p.dueDate.getDate() === date.getDate() &&
      p.dueDate.getMonth() === date.getMonth() &&
      p.dueDate.getFullYear() === date.getFullYear()
  );
}

export function PaymentCalendarFullPageDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const paymentsForSelected = selectedDate ? getPaymentsForDate(selectedDate) : [];

  const modifiers = {
    hasPayment: MOCK_PAYMENTS.map((p) => p.dueDate),
  };

  const modifiersClassNames = {
    hasPayment: 'bg-primary/10 font-semibold',
  };

  return (
    <FinanceAppShell
      title="Payment calendar"
      subtitle="View and manage upcoming bill due dates"
      activeNavId="calendar"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Due dates</CardTitle>
            <CardDescription>Click a date to see payments due</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="lg:w-[320px]">
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Select a date'}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? paymentsForSelected.length > 0
                  ? `${paymentsForSelected.length} payment(s) due`
                  : 'No payments due'
                : 'Choose a date from the calendar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate && paymentsForSelected.length > 0 ? (
              <ul className="space-y-3">
                {paymentsForSelected.map((payment) => (
                  <li
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(payment.amount)}</p>
                    </div>
                    <Badge variant={payment.status === 'paid' ? 'secondary' : 'default'}>
                      {payment.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : selectedDate ? (
              <p className="text-sm text-muted-foreground">No payments due on this date.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </FinanceAppShell>
  );
}
