import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PaginationDocs() {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Pagination</h1>
      <p className="lead text-lg text-muted-foreground">
        Navigate through paged content like lists, tables, or search results.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Pagination } from '@hepta/components';

<Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <nav className="flex items-center gap-2 py-4" aria-label="Pagination">
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-4 text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
      <DocFooter
        prev={{ label: 'Link', href: '/components/link' }}
        next={{ label: 'Radio button', href: '/components/radio-button' }}
      />
    </article>
  );
}
