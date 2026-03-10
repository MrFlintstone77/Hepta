import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FinanceAppShell } from '@/components/FinanceAppShell';

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
}

const MOCK_CATEGORIES: BudgetCategory[] = [
  { id: '1', name: 'Food & Dining', budgeted: 800, spent: 520 },
  { id: '2', name: 'Shopping', budgeted: 400, spent: 380 },
  { id: '3', name: 'Transportation', budgeted: 350, spent: 310 },
  { id: '4', name: 'Utilities', budgeted: 200, spent: 195 },
  { id: '5', name: 'Entertainment', budgeted: 300, spent: 145 },
  { id: '6', name: 'Health', budgeted: 150, spent: 85 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function BudgetTrackerFullPageDemo() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);

  const totalBudgeted = categories.reduce((sum, c) => sum + c.budgeted, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  const updateBudget = (id: string, value: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, budgeted: Math.max(0, value) } : c))
    );
  };

  return (
    <FinanceAppShell
      title="Budget tracker"
      subtitle="Monitor spending against your budget"
      activeNavId="budget"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly overview</CardTitle>
            <CardDescription>March 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Budgeted</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p
                  className={`text-2xl font-bold ${
                    remaining >= 0
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-destructive'
                  }`}
                >
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>
            <Progress
              value={totalBudgeted > 0 ? Math.min(100, (totalSpent / totalBudgeted) * 100) : 0}
              className="mt-4 h-3"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By category</CardTitle>
            <CardDescription>Track spending in each category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((cat) => {
                const progress = cat.budgeted > 0 ? Math.min(100, (cat.spent / cat.budgeted) * 100) : 0;
                const isOver = cat.spent > cat.budgeted;

                return (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{cat.name}</span>
                        {isOver && (
                          <Badge variant="destructive" className="text-xs">
                            Over budget
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(cat.spent)} / {formatCurrency(cat.budgeted)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress
                        value={progress}
                        className={`flex-1 h-2 ${isOver ? '[&>span]:bg-destructive' : ''}`}
                      />
                      <div className="w-24">
                        <Label htmlFor={`budget-${cat.id}`} className="sr-only">
                          Budget for {cat.name}
                        </Label>
                        <Input
                          id={`budget-${cat.id}`}
                          type="number"
                          min="0"
                          value={cat.budgeted}
                          onChange={(e) => updateBudget(cat.id, parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceAppShell>
  );
}
