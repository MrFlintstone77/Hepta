import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { FinanceAppShell } from '@/components/FinanceAppShell';

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

const MOCK_GOALS: SavingsGoal[] = [
  { id: '1', name: 'Emergency fund', target: 10000, current: 7500, deadline: '2024-12-31' },
  { id: '2', name: 'Vacation', target: 3000, current: 1800, deadline: '2024-08-15' },
  { id: '3', name: 'New laptop', target: 1500, current: 450, deadline: '2024-06-01' },
  { id: '4', name: 'Home down payment', target: 50000, current: 12500, deadline: '2026-06-30' },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SavingsGoalsFullPageDemo() {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [contributionByGoal, setContributionByGoal] = useState<Record<string, string>>({});

  const addContribution = (goalId: string) => {
    const amount = parseFloat(contributionByGoal[goalId] || '0') || 0;
    if (amount <= 0) return;
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, current: Math.min(g.current + amount, g.target) } : g
      )
    );
    setContributionByGoal((prev) => ({ ...prev, [goalId]: '' }));
  };

  return (
    <FinanceAppShell
      title="Savings goals"
      subtitle="Track progress toward your financial goals"
      activeNavId="savings"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const progress = Math.min(100, (goal.current / goal.target) * 100);
          const isComplete = goal.current >= goal.target;

          return (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{goal.name}</CardTitle>
                <CardDescription>
                  Target: {formatCurrency(goal.target)} · Due {new Date(goal.deadline).toLocaleDateString('en-US')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {!isComplete && (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      min="1"
                      step="1"
                      value={contributionByGoal[goal.id] ?? ''}
                      onChange={(e) =>
                        setContributionByGoal((prev) => ({
                          ...prev,
                          [goal.id]: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={() => addContribution(goal.id)}
                      disabled={!(parseFloat(contributionByGoal[goal.id] || '0') > 0)}
                    >
                      Add
                    </Button>
                  </div>
                )}

                {isComplete && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-500">
                    Goal reached!
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </FinanceAppShell>
  );
}
