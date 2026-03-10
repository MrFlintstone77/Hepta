import * as React from 'react';
import { useRef, useState, useMemo } from 'react';
import { DocFooter } from '@/components/DocFooter';
import { icons as lucideIcons, Search, Moon, ChevronDown, AlertCircle } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Input } from '@/components/ui/input';

type IconEntry = [string, React.ComponentType<{ className?: string }>];

const COLS = 4;

const ICON_ENTRIES: IconEntry[] = Object.entries(lucideIcons || {})
  .filter(
    ([key, value]) =>
      value != null &&
      key !== 'default' &&
      key !== '__esModule' &&
      (typeof value === 'function' || typeof value === 'object')
  )
  .sort(([a], [b]) => a.localeCompare(b)) as IconEntry[];

function IconCell({ name, IconComponent }: { name: string; IconComponent: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex min-h-[72px] min-w-0 flex-col items-center justify-center gap-1.5 overflow-visible rounded-lg border border-border bg-muted/30 p-2 transition-colors hover:bg-muted/60 sm:p-3 sm:gap-2">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-visible text-foreground">
        <IconErrorBoundary name={name}>
          <IconComponent className="h-5 w-5 shrink-0 flex-shrink-0 text-current" />
        </IconErrorBoundary>
      </div>
      <span
        className="min-w-0 max-w-full truncate text-center text-[10px] text-muted-foreground"
        title={name}
      >
        {name.length > 6 ? `${name.slice(0, 6)}…` : name}
      </span>
    </div>
  );
}

class IconErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <span className="text-[10px] text-muted-foreground" title={this.props.name}>—</span>;
    }
    return this.props.children;
  }
}
const ROW_HEIGHT = 88;
const OVERSCAN = 3;

function VirtualizedIconGrid({
  parentRef,
  rows,
}: {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rows: IconEntry[][];
}) {
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const rowIcons = rows[virtualRow.index];
        return (
          <div
            key={virtualRow.key}
            className="grid gap-2 sm:gap-3"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            }}
          >
            {rowIcons.map(([name, IconComponent]) => (
              <IconCell key={name} name={name} IconComponent={IconComponent} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function IconsDocs() {
  const [search, setSearch] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredIcons = useMemo(
    () =>
      ICON_ENTRIES.filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const rows = useMemo(
    () => chunk(filteredIcons, COLS),
    [filteredIcons]
  );
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Icons</h1>
      <p className="lead text-lg text-muted-foreground">
        Hepta uses Lucide React for consistent, accessible icons throughout the design system.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Installation
      </h2>
      <p>Icons are included via the docs package. Add Lucide React to your project:</p>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`npm install lucide-react`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <p>Import icons by name and use them like any React component:</p>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Search, Moon, ChevronDown } from 'lucide-react';

<Search className="h-4 w-4" />
<Moon className="h-5 w-5 text-muted-foreground" />`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Sizing
      </h2>
      <p>
        Use consistent sizes with Tailwind or token-based values. Common sizes: <code>h-4 w-4</code> (16px)
        for inline with text, <code>h-5 w-5</code> (20px) for buttons, <code>h-6 w-6</code> (24px) for headings.
      </p>
      <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-muted/50 p-6">
        <div className="flex flex-col items-center gap-2">
          <Search className="h-4 w-4" />
          <span className="text-xs text-muted-foreground">16px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Moon className="h-5 w-5" />
          <span className="text-xs text-muted-foreground">20px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="h-6 w-6" />
          <span className="text-xs text-muted-foreground">24px</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8" />
          <span className="text-xs text-muted-foreground">32px</span>
        </div>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Icon library
      </h2>
      <p className="mb-4">
        All {ICON_ENTRIES.length} Lucide icons. Search by name or browse the grid. Use <code>currentColor</code> or semantic color tokens so icons inherit text color.
      </p>
      <div className="mb-6 flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">{filteredIcons.length} icons</span>
      </div>
      <div
        ref={parentRef}
        className="h-[480px] min-h-0 overflow-auto rounded-lg border border-border"
      >
        {filteredIcons.length > 0 ? (
          <VirtualizedIconGrid parentRef={parentRef} rows={rows} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No icons match &quot;{search}&quot;
          </div>
        )}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Browse the full library at{' '}
        <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          lucide.dev/icons
        </a>
      </p>
      <DocFooter
        prev={{ label: 'Colors', href: '/foundations/colors' }}
        next={{ label: 'Typography', href: '/foundations/typography' }}
      />
    </article>
  );
}
