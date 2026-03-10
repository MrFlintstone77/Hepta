import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function LinkDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Link</h1>
      <p className="lead text-lg text-muted-foreground">
        Text links for navigation within and outside the app.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Link } from '@hepta/components';

<Link href="/docs">Documentation</Link>
<Link href="https://example.com" external>External site</Link>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Examples
      </h2>
      <div className="space-y-2 py-4">
        <p>
          <Link to="/components" className="text-primary underline hover:no-underline">
            Internal link to Components
          </Link>
        </p>
        <p>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            External link (opens in new tab)
          </a>
        </p>
      </div>
      <DocFooter
        prev={{ label: 'Dropdown', href: '/components/dropdown' }}
        next={{ label: 'Pagination', href: '/components/pagination' }}
      />
    </article>
  );
}
