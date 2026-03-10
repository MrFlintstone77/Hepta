import { DocFooter } from '@/components/DocFooter';

export function SpacingDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Spacing</h1>
      <p className="lead text-lg text-muted-foreground">
        A consistent spacing scale from 0 to 10 defines padding, margins, and gaps across the design system.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Spacing scale
      </h2>
      <p>Use spacing tokens instead of hardcoded pixel values:</p>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`padding: var(--hepta-spacing-4);
margin-bottom: var(--hepta-spacing-6);
gap: var(--hepta-spacing-2);`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Scale reference
      </h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>--hepta-spacing-0</code></td><td>0</td></tr>
            <tr><td><code>--hepta-spacing-1</code></td><td>4px</td></tr>
            <tr><td><code>--hepta-spacing-2</code></td><td>8px</td></tr>
            <tr><td><code>--hepta-spacing-3</code></td><td>12px</td></tr>
            <tr><td><code>--hepta-spacing-4</code></td><td>16px</td></tr>
            <tr><td><code>--hepta-spacing-5</code></td><td>20px</td></tr>
            <tr><td><code>--hepta-spacing-6</code></td><td>24px</td></tr>
            <tr><td><code>--hepta-spacing-8</code></td><td>32px</td></tr>
            <tr><td><code>--hepta-spacing-10</code></td><td>40px</td></tr>
          </tbody>
        </table>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Visual scale
      </h2>
      <div className="flex flex-wrap items-end gap-1 rounded-lg border border-border bg-muted/50 p-6">
        {[
          { token: 0, label: '0' },
          { token: 1, label: '1' },
          { token: 2, label: '2' },
          { token: 3, label: '3' },
          { token: 4, label: '4' },
          { token: 5, label: '5' },
          { token: 6, label: '6' },
          { token: 8, label: '8' },
          { token: 10, label: '10' },
        ].map(({ token, label }) => (
          <div key={token} className="flex flex-col items-center gap-1">
            <div
              className="w-6 rounded bg-primary"
              style={{ height: token === 0 ? 2 : `var(--hepta-spacing-${token})` }}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
      <DocFooter
        prev={{ label: 'Typography', href: '/foundations/typography' }}
        next={{ label: 'Themes', href: '/foundations/themes' }}
      />
    </article>
  );
}
