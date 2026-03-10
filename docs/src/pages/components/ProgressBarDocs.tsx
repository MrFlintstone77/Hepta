import { DocFooter } from '@/components/DocFooter';

export function ProgressBarDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Progress bar</h1>
      <p className="lead text-lg text-muted-foreground">
        Visual indicator of completion or loading state.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Progress } from '@hepta/components';

<Progress value={60} max={100} />
<Progress value={null} /> {/* Indeterminate */}`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Examples
      </h2>
      <div className="space-y-4 py-4">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Determinate (60%)</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: '60%' }}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Indeterminate</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Tooltips', href: '/components/tooltips' }}
        next={{ label: 'Search', href: '/components/search' }}
      />
    </article>
  );
}
