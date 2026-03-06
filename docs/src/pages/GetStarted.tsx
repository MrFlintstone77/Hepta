import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DocFooter } from '@/components/DocFooter';
import { AlertCircle } from 'lucide-react';

export function GetStarted() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Get started</h1>
      <p className="lead text-lg text-muted-foreground">
        Welcome to the ParioGO Design System. This design system serves as the source of truth for
        building frontends, including AI-assisted development.
      </p>
      <Alert variant="info" className="my-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI Source of Truth</AlertTitle>
        <AlertDescription>
          The design system includes machine-readable manifests and Cursor rules to help AI assistants
          build frontends consistently. See <code>.cursorrules</code> and the manifest files for details.
        </AlertDescription>
      </Alert>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Installation
      </h2>
      <p>Install the design system packages in your React project:</p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`npm install @pariogo/components @pariogo/tokens`}</code></pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Setup
      </h2>
      <p>Import the token styles and component styles in your app entry point:</p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import '@pariogo/tokens/css';
import '@pariogo/components/styles.css';`}</code></pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Theme
      </h2>
      <p>
        The design system supports light and dark modes. Set <code>data-theme</code> on your root
        element:
      </p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`document.documentElement.setAttribute('data-theme', 'dark');`}</code></pre>
      <DocFooter next={{ label: 'Foundations', href: '/foundations' }} />
    </article>
  );
}
