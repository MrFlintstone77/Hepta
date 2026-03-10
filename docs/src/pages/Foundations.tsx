import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Foundations() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Foundations</h1>
      <p className="lead text-lg text-muted-foreground">
        Design tokens define the visual language of the system. Use tokens instead of hardcoded
        values for consistency.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">Token categories</h2>
      <ul>
        <li>
          <Link to="/foundations/colors">Colors</Link> – primitives and semantic colors
        </li>
        <li>
          <Link to="/foundations/icons">Icons</Link> – Lucide icon library and usage
        </li>
        <li>
          <Link to="/foundations/typography">Typography</Link> – font families, sizes, weights
        </li>
        <li>
          <Link to="/foundations/spacing">Spacing</Link> – scale from 0 to 10
        </li>
        <li>
          <Link to="/foundations/themes">Themes</Link> – light and dark mode
        </li>
        <li>
          <Link to="/foundations/elevation">Elevation</Link> – shadow and depth levels
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">Using tokens</h2>
      <p>
        Tokens are available as CSS custom properties. Use them in your styles:
      </p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`color: var(--hepta-color-text-primary);
padding: var(--hepta-spacing-4);
border-radius: var(--hepta-radius-md);`}</code></pre>
      <DocFooter prev={{ label: 'Get started', href: '/get-started' }} next={{ label: 'Colors', href: '/foundations/colors' }} />
    </article>
  );
}
