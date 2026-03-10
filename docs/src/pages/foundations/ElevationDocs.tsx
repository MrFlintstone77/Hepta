import { DocFooter } from '@/components/DocFooter';

export function ElevationDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Elevation</h1>
      <p className="lead text-lg text-muted-foreground">
        Shadow tokens create depth and hierarchy. Use elevation to distinguish surfaces and interactive states.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Elevation levels
      </h2>
      <p>Three shadow levels map to common UI patterns:</p>
      <ul>
        <li>
          <code>--hepta-shadow-sm</code> – subtle lift (cards at rest, dropdowns)
        </li>
        <li>
          <code>--hepta-shadow-md</code> – medium elevation (modals, popovers)
        </li>
        <li>
          <code>--hepta-shadow-lg</code> – prominent depth (dialogs, overlays)
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`box-shadow: var(--hepta-shadow-sm);
/* or */
box-shadow: var(--hepta-shadow-md);
box-shadow: var(--hepta-shadow-lg);`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Visual preview
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        <div
          className="rounded-lg border border-border bg-card p-6"
          style={{ boxShadow: 'var(--hepta-shadow-sm)' }}
        >
          <p className="font-medium">Small</p>
          <p className="text-sm text-muted-foreground">--hepta-shadow-sm</p>
        </div>
        <div
          className="rounded-lg border border-border bg-card p-6"
          style={{ boxShadow: 'var(--hepta-shadow-md)' }}
        >
          <p className="font-medium">Medium</p>
          <p className="text-sm text-muted-foreground">--hepta-shadow-md</p>
        </div>
        <div
          className="rounded-lg border border-border bg-card p-6"
          style={{ boxShadow: 'var(--hepta-shadow-lg)' }}
        >
          <p className="font-medium">Large</p>
          <p className="text-sm text-muted-foreground">--hepta-shadow-lg</p>
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Themes', href: '/foundations/themes' }}
        next={{ label: 'Components', href: '/components' }}
      />
    </article>
  );
}
