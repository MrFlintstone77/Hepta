import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Foundations() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Foundations</h1>
      <p>
        Design tokens define the visual language of the system. Use tokens instead of hardcoded
        values for consistency.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">Token categories</h2>
      <ul>
        <li>
          <Link to="/foundations/colors">Colors</Link> – primitives and semantic colors
        </li>
        <li>Typography – font families, sizes, weights</li>
        <li>Spacing – scale from 0 to 10</li>
        <li>Radius – border radius values</li>
        <li>Shadow – elevation levels</li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">Using tokens</h2>
      <p>
        Tokens are available as CSS custom properties. Use them in your styles:
      </p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`color: var(--pario-color-text-primary);
padding: var(--pario-spacing-4);
border-radius: var(--pario-radius-md);`}</code></pre>
      <DocFooter prev={{ label: 'Get started', href: '/get-started' }} next={{ label: 'Colors', href: '/foundations/colors' }} />
    </article>
  );
}
