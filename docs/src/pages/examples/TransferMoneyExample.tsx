import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FinanceAppShell } from '@/components/FinanceAppShell';

const ACCOUNTS = [
  { id: 'checking', name: 'Checking (...4521)', balance: 12450 },
  { id: 'savings', name: 'Savings (...7832)', balance: 28500 },
  { id: 'credit', name: 'Credit Card (...9012)', balance: -1200 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function TransferMoneyFullPageDemo() {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const fromAcc = ACCOUNTS.find((a) => a.id === fromAccount);
  const toAcc = ACCOUNTS.find((a) => a.id === toAccount);
  const isValid = fromAccount && toAccount && fromAccount !== toAccount && amountNum > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setMemo('');
  };

  return (
    <FinanceAppShell
      title="Transfer money"
      subtitle="Move money between your accounts"
      activeNavId="transfer"
    >
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New transfer</CardTitle>
          <CardDescription>Enter the transfer details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from">From account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNTS.filter((a) => a.id !== toAccount).map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To account</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger id="to">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNTS.filter((a) => a.id !== fromAccount).map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memo">Memo (optional)</Label>
              <Input
                id="memo"
                placeholder="e.g., Rent payment"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={!isValid} className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">From</span>
              <span>{fromAcc?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">To</span>
              <span>{toAcc?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">{formatCurrency(amountNum)}</span>
            </div>
            {memo && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Memo</span>
                <span>{memo}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FinanceAppShell>
  );
}
