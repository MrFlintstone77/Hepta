import { DocFooter } from '@/components/DocFooter';

export function TypographyDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Typography</h1>
      <p className="lead text-lg text-muted-foreground">
        Font families, sizes, and weights define the reading experience across the design system.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font families
      </h2>
      <p>Use typography tokens for consistent font stacks:</p>
      <ul>
        <li>
          <code>--pario-typography-font-family-sans</code> – primary UI and body text (Geist, system-ui)
        </li>
        <li>
          <code>--pario-typography-font-family-mono</code> – code and technical content
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font sizes
      </h2>
      <p>Scale from xs to xl for hierarchy:</p>
      <ul>
        <li>
          <code>--pario-typography-font-size-xs</code> – 12px (captions, labels)
        </li>
        <li>
          <code>--pario-typography-font-size-sm</code> – 14px (secondary text)
        </li>
        <li>
          <code>--pario-typography-font-size-base</code> – 15px (body default)
        </li>
        <li>
          <code>--pario-typography-font-size-lg</code> – 18px (lead text)
        </li>
        <li>
          <code>--pario-typography-font-size-xl</code> – 20px (headings)
        </li>
      </ul>
      <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-6">
        <p style={{ fontSize: 'var(--pario-typography-font-size-xs)' }}>Extra small (12px)</p>
        <p style={{ fontSize: 'var(--pario-typography-font-size-sm)' }}>Small (14px)</p>
        <p style={{ fontSize: 'var(--pario-typography-font-size-base)' }}>Base (15px)</p>
        <p style={{ fontSize: 'var(--pario-typography-font-size-lg)' }}>Large (18px)</p>
        <p style={{ fontSize: 'var(--pario-typography-font-size-xl)' }}>Extra large (20px)</p>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font weights
      </h2>
      <ul>
        <li>
          <code>--pario-typography-font-weight-normal</code> – 400
        </li>
        <li>
          <code>--pario-typography-font-weight-medium</code> – 500
        </li>
        <li>
          <code>--pario-typography-font-weight-semibold</code> – 600
        </li>
        <li>
          <code>--pario-typography-font-weight-bold</code> – 700
        </li>
      </ul>
      <DocFooter
        prev={{ label: 'Icons', href: '/foundations/icons' }}
        next={{ label: 'Spacing', href: '/foundations/spacing' }}
      />
    </article>
  );
}
