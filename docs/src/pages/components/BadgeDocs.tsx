import { DocFooter } from '@/components/DocFooter';
import { Badge } from '@/components/ui/badge';

export function BadgeDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Badge</h1>
      <p className="lead text-lg text-muted-foreground">
        Displays a badge or label with optional variant styling.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="flex flex-wrap gap-2 py-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <DocFooter
        prev={{ label: 'Avatar', href: '/components/avatar' }}
        next={{ label: 'Breadcrumbs', href: '/components/breadcrumbs' }}
      />
    </article>
  );
}
