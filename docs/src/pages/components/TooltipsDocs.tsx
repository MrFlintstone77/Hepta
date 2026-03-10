import { DocFooter } from '@/components/DocFooter';

export function TooltipsDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Tooltips</h1>
      <p className="lead text-lg text-muted-foreground">
        Short contextual hints on hover or focus.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Tooltip, TooltipTrigger, TooltipContent } from '@hepta/components';

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Helpful hint here</TooltipContent>
</Tooltip>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="py-4">
        <button
          type="button"
          title="This is a tooltip using the native title attribute"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted"
        >
          Hover for tooltip
        </button>
      </div>
      <DocFooter
        prev={{ label: 'Tabs', href: '/components/tabs' }}
        next={{ label: 'Progress bar', href: '/components/progress-bar' }}
      />
    </article>
  );
}
