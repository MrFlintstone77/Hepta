import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Get started',
    path: '/get-started',
    children: [{ label: 'Introduction', path: '/get-started' }],
  },
  {
    label: 'Foundations',
    path: '/foundations',
    children: [
      { label: 'Overview', path: '/foundations' },
      { label: 'Colors', path: '/foundations/colors' },
      { label: 'Icons', path: '/foundations/icons' },
      { label: 'Typography', path: '/foundations/typography' },
      { label: 'Spacing', path: '/foundations/spacing' },
      { label: 'Themes', path: '/foundations/themes' },
      { label: 'Elevation', path: '/foundations/elevation' },
    ],
  },
  {
    label: 'Components',
    path: '/components',
    children: [
      { label: 'Overview', path: '/components' },
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Alert dialog', path: '/components/alert-dialog' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Breadcrumbs', path: '/components/breadcrumbs' },
      { label: 'Button', path: '/components/button' },
      { label: 'Input', path: '/components/input' },
      { label: 'Calendar', path: '/components/calendar' },
      { label: 'Card', path: '/components/card' },
      { label: 'Chart', path: '/components/chart' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Date picker', path: '/components/date-picker' },
      { label: 'Data table', path: '/components/data-table' },
      { label: 'Dropdown', path: '/components/dropdown' },
      { label: 'Link', path: '/components/link' },
      { label: 'Menu bar', path: '/components/menubar' },
      { label: 'Pagination', path: '/components/pagination' },
      { label: 'Progress bar', path: '/components/progress-bar' },
      { label: 'Radio button', path: '/components/radio-button' },
      { label: 'Search', path: '/components/search' },
      { label: 'Select', path: '/components/select' },
      { label: 'Tabs', path: '/components/tabs' },
      { label: 'Toast', path: '/components/toast' },
      { label: 'Tooltips', path: '/components/tooltips' },
    ],
  },
  {
    label: 'Patterns',
    path: '/patterns',
    children: [
      { label: 'Overview', path: '/patterns' },
      { label: 'Sidebar', path: '/patterns/sidebar' },
      { label: 'Command', path: '/patterns/command' },
      { label: 'Sheet', path: '/patterns/sheet' },
    ],
  },
  {
    label: 'Examples',
    path: '/examples',
    children: [
      { label: 'Financial dashboard', path: '/examples?demo=financial-dashboard' },
      { label: 'Budget tracker', path: '/examples?demo=budget-tracker' },
      { label: 'Savings goals', path: '/examples?demo=savings-goals' },
      { label: 'Bill pay', path: '/examples?demo=bill-pay' },
      { label: 'Transfer / send money', path: '/examples?demo=transfer' },
      { label: 'Payment calendar', path: '/examples?demo=payment-calendar' },
      { label: 'Spending insights', path: '/examples?demo=spending-insights' },
      { label: 'Transaction list', path: '/examples?demo=transaction-list' },
      { label: 'Debt list', path: '/examples?demo=debt-list' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="flex h-full flex-col">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.children.some((c) => c.path === location.pathname);
            return (
              <Collapsible key={item.label} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'group w-full justify-between font-medium',
                      isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border py-1 pl-3">
                    {item.children.map((child) => {
                      const fullPath = location.pathname + (location.search || '');
                      const isActive = fullPath === child.path || location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            'rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                            isActive ? 'font-medium text-primary' : 'text-muted-foreground'
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
