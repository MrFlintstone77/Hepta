import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Examples() {
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
        <li>
          <Link
            to="/examples/transaction-list"
            className="text-primary hover:underline font-medium"
          >
            Transaction list
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            A financial software transaction table with filtering, search, and pagination.
          </p>
        </li>
      </ul>
      <DocFooter
        prev={{ label: 'Sheet', href: '/patterns/sheet' }}
        next={{ label: 'Transaction list', href: '/examples/transaction-list' }}
      />
    </article>
  );
}
