import { DocFooter } from '@/components/DocFooter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Search</h1>
      <p className="lead text-lg text-muted-foreground">
        Search input for filtering content, querying data, or navigating.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Search } from '@hepta/components';

<Search
  placeholder="Search..."
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
/>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="max-w-md py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9"
            aria-label="Search"
          />
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Progress bar', href: '/components/progress-bar' }}
        next={{ label: 'Examples', href: '/examples' }}
      />
    </article>
  );
}
