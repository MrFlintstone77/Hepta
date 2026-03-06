import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    ],
  },
  {
    label: 'Components',
    path: '/components',
    children: [
      { label: 'Overview', path: '/components' },
      { label: 'Button', path: '/components/button' },
      { label: 'Input', path: '/components/input' },
      { label: 'Card', path: '/components/card' },
    ],
  },
  {
    label: 'Examples',
    path: '/examples',
    children: [{ label: 'Overview', path: '/examples' }],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="flex h-full flex-col">
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <span className="px-3 text-xs font-medium text-muted-foreground">Search</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 pl-9"
              disabled
            />
          </div>
        </div>
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
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          'rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          location.pathname === child.path
                            ? 'font-medium text-primary'
                            : 'text-muted-foreground'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
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
