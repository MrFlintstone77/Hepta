import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';
import { Check } from 'lucide-react';

export function CheckboxDocs() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Checkbox</h1>
      <p className="lead text-lg text-muted-foreground">
        Binary selection control for forms and lists.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Checkbox } from '@hepta/components';

<Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
<label htmlFor="terms">Accept terms</label>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Examples
      </h2>
      <div className="flex flex-col gap-4 py-4">
        <label className="flex cursor-pointer items-center gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => setChecked(!checked)}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-input bg-background"
          >
            {checked && <Check className="h-3 w-3" />}
          </button>
          <span>Accept terms and conditions</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={indeterminate ? 'mixed' : false}
            onClick={() => setIndeterminate(!indeterminate)}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-input bg-background"
          >
            {indeterminate && <span className="h-0.5 w-2.5 bg-current" />}
          </button>
          <span>Indeterminate state</span>
        </label>
      </div>
      <DocFooter
        prev={{ label: 'Breadcrumbs', href: '/components/breadcrumbs' }}
        next={{ label: 'Date picker', href: '/components/date-picker' }}
      />
    </article>
  );
}
