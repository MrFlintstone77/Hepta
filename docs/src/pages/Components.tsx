import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Components() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Components</h1>
      <p className="lead text-lg text-muted-foreground">
        Reusable React components built with design tokens. All components support light and dark
        themes.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Available components
      </h2>
      <ul>
        <li>
          <Link to="/components/button">Button</Link> – primary actions
        </li>
        <li>
          <Link to="/components/input">Input</Link> – text input fields
        </li>
        <li>
          <Link to="/components/card">Card</Link> – content containers
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <p>Import components from the main package:</p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import { Button, Input, Card } from '@pariogo/components';`}</code></pre>
      <DocFooter prev={{ label: 'Colors', href: '/foundations/colors' }} next={{ label: 'Button', href: '/components/button' }} />
    </article>
  );
}
