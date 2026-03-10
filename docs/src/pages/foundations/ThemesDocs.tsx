import { DocFooter } from '@/components/DocFooter';

export function ThemesDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Themes</h1>
      <p className="lead text-lg text-muted-foreground">
        Hepta supports light and dark themes. Semantic tokens automatically adapt to the active theme.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Setting the theme
      </h2>
      <p>Apply a theme by setting <code>data-theme</code> on <code>document.documentElement</code>:</p>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`// Light mode (default)
document.documentElement.setAttribute('data-theme', 'light');

// Dark mode
document.documentElement.setAttribute('data-theme', 'dark');`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Semantic tokens
      </h2>
      <p>
        Use semantic color tokens (e.g. <code>--hepta-color-background-primary</code>,{' '}
        <code>--hepta-color-text-primary</code>) so components automatically respond to theme changes.
        Avoid primitive colors for UI surfaces and text.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Theme-aware CSS
      </h2>
      <p>Tokens emit different values based on the active theme. Your styles stay the same:</p>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`/* These automatically switch with theme */
.card {
  background: var(--hepta-color-card-background);
  color: var(--hepta-color-text-primary);
}`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Toggle in docs
      </h2>
      <p>
        Use the theme toggle in the header to switch between light and dark mode. The design system
        documentation site includes a built-in theme switcher.
      </p>
      <DocFooter
        prev={{ label: 'Spacing', href: '/foundations/spacing' }}
        next={{ label: 'Elevation', href: '/foundations/elevation' }}
      />
    </article>
  );
}
