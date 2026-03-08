import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';
import { ChevronRight } from 'lucide-react';

export function BreadcrumbsDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Breadcrumbs</h1>
      <p className="lead text-lg text-muted-foreground">
        Navigation path showing the user&apos;s location in a hierarchy.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from '@pariogo/components';

<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <nav className="flex items-center gap-1 text-sm">
        <Link to="/components" className="text-muted-foreground hover:text-foreground">
          Components
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground">Breadcrumbs</span>
      </nav>
      <DocFooter
        prev={{ label: 'Avatar', href: '/components/avatar' }}
        next={{ label: 'Button', href: '/components/button' }}
      />
    </article>
  );
}
