import { useState } from 'react';
import { Input } from '@hepta/components';
import { DocFooter } from '@/components/DocFooter';

export function InputDocs() {
  const [value, setValue] = useState('');

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Input</h1>
      <p className="lead text-lg text-muted-foreground">
        Text input for forms with optional label and error state.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import { Input } from '@hepta/components';

<Input label="Email" placeholder="you@example.com" />
<Input label="Name" error="Name is required" />`}</code></pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Examples
      </h2>
      <div className="flex max-w-md flex-col gap-4 py-4">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Controlled" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type here..." />
        <Input label="With error" error="This field is required" placeholder="Required field" />
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Props
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left">Prop</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2">label</td>
              <td className="px-4 py-2">string</td>
              <td className="px-4 py-2">Label displayed above the input</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2">error</td>
              <td className="px-4 py-2">string</td>
              <td className="px-4 py-2">Error message - shows error state when present</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DocFooter prev={{ label: 'Button', href: '/components/button' }} next={{ label: 'Card', href: '/components/card' }} />
    </article>
  );
}
