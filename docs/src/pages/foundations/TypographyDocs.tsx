import { DocFooter } from '@/components/DocFooter';
import { ExternalLink } from 'lucide-react';

export function TypographyDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Typography</h1>
      <p className="lead text-lg text-muted-foreground">
        Font families, sizes, and weights define the reading experience across the design system.
      </p>

      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Resources
      </h2>
      <p className="text-muted-foreground">
        Download fonts from Google Fonts for design tools (Figma, Sketch) or local use:
      </p>
      <ul className="not-prose mt-4 flex flex-wrap gap-4">
        <li>
          <a
            href="https://github.com/lauridskern/open-runde"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Open Runde
            <ExternalLink className="h-4 w-4" />
          </a>
        </li>
        <li>
          <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-medium">
            Menlo (system font – macOS)
          </span>
        </li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font families
      </h2>
      <p>Use typography tokens for consistent font stacks:</p>
      <ul>
        <li>
          <code>--hepta-typography-font-family-sans</code> – primary UI and body text (Open Runde, system-ui)
        </li>
        <li>
          <code>--hepta-typography-font-family-mono</code> – code and technical content (Menlo)
        </li>
      </ul>
      <h3 className="mt-6 text-lg font-semibold">Sans (Open Runde)</h3>
      <div className="mt-2 rounded-lg border border-border bg-muted/30 p-6">
        <p style={{ fontFamily: 'var(--hepta-typography-font-family-sans)' }} className="text-lg">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p style={{ fontFamily: 'var(--hepta-typography-font-family-sans)' }} className="mt-2 text-sm text-muted-foreground">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789
        </p>
      </div>
      <h3 className="mt-6 text-lg font-semibold">Mono (Menlo)</h3>
      <div className="mt-2 rounded-lg border border-border bg-muted/30 p-6">
        <p style={{ fontFamily: 'var(--hepta-typography-font-family-mono)' }} className="font-mono text-lg">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p style={{ fontFamily: 'var(--hepta-typography-font-family-mono)' }} className="font-mono mt-2 text-sm text-muted-foreground">
          const greet = () =&gt; &quot;Hello, world!&quot;;
        </p>
        <p style={{ fontFamily: 'var(--hepta-typography-font-family-mono)' }} className="font-mono mt-1 text-sm text-muted-foreground">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ · 0123456789
        </p>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font sizes
      </h2>
      <p>Scale from xs to xl for hierarchy:</p>
      <ul>
        <li>
          <code>--hepta-typography-font-size-xs</code> – 12px (captions, labels)
        </li>
        <li>
          <code>--hepta-typography-font-size-sm</code> – 14px (secondary text)
        </li>
        <li>
          <code>--hepta-typography-font-size-base</code> – 15px (body default)
        </li>
        <li>
          <code>--hepta-typography-font-size-lg</code> – 18px (lead text)
        </li>
        <li>
          <code>--hepta-typography-font-size-xl</code> – 20px (headings)
        </li>
      </ul>
      <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-6">
        <p style={{ fontSize: 'var(--hepta-typography-font-size-xs)' }}>Extra small (12px)</p>
        <p style={{ fontSize: 'var(--hepta-typography-font-size-sm)' }}>Small (14px)</p>
        <p style={{ fontSize: 'var(--hepta-typography-font-size-base)' }}>Base (15px)</p>
        <p style={{ fontSize: 'var(--hepta-typography-font-size-lg)' }}>Large (18px)</p>
        <p style={{ fontSize: 'var(--hepta-typography-font-size-xl)' }}>Extra large (20px)</p>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Font weights
      </h2>
      <ul>
        <li>
          <code>--hepta-typography-font-weight-normal</code> – 400
        </li>
        <li>
          <code>--hepta-typography-font-weight-medium</code> – 500
        </li>
        <li>
          <code>--hepta-typography-font-weight-semibold</code> – 600
        </li>
        <li>
          <code>--hepta-typography-font-weight-bold</code> – 700
        </li>
      </ul>
      <DocFooter
        prev={{ label: 'Icons', href: '/foundations/icons' }}
        next={{ label: 'Spacing', href: '/foundations/spacing' }}
      />
    </article>
  );
}
