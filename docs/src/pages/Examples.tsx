import { DocFooter } from '@/components/DocFooter';

export function Examples() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Examples</h1>
      <p className="lead text-lg text-muted-foreground">
        Example patterns and compositions using the design system components.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Coming soon
      </h2>
      <p>
        This section will include form layouts, dashboard cards, and other common UI patterns.
      </p>
      <DocFooter prev={{ label: 'Card', href: '/components/card' }} />
    </article>
  );
}
