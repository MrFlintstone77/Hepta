import { DocFooter } from '@/components/DocFooter';

export function ColorsDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Colors</h1>
      <p className="lead text-lg text-muted-foreground">
        The color palette includes neutral grays, primary blues, and semantic colors for states like
        error.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Semantic colors
      </h2>
      <p>Use semantic tokens for consistent theming across light and dark mode:</p>
      <ul>
        <li>
          <code>--hepta-color-background-primary</code> – page background
        </li>
        <li>
          <code>--hepta-color-text-primary</code> – primary text
        </li>
        <li>
          <code>--hepta-color-button-primary-background</code> – primary button background
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Primitive colors
      </h2>
      <p>
        Neutral scale: <code>--hepta-color-neutral-0</code> through{' '}
        <code>--hepta-color-neutral-950</code>
      </p>
      <p>
        Primary: <code>--hepta-color-primary-50</code>, <code>--hepta-color-primary-500</code>, etc.
      </p>
      <DocFooter prev={{ label: 'Foundations', href: '/foundations' }} next={{ label: 'Icons', href: '/foundations/icons' }} />
    </article>
  );
}
