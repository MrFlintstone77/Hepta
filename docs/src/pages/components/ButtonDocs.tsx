import { useState } from 'react';
import { Button } from '@pariogo/components';
import { DocFooter } from '@/components/DocFooter';

export function ButtonDocs() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Button</h1>
      <p className="lead text-lg text-muted-foreground">
        Primary action component for forms and UI flows.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" id="usage">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import { Button } from '@pariogo/components';

<Button variant="primary" onClick={handleClick}>Save</Button>`}</code></pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" id="variants">
        Variants
      </h2>
      <div className="flex flex-wrap gap-3 py-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" id="sizes">
        Sizes
      </h2>
      <div className="flex flex-wrap items-center gap-3 py-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" id="states">
        States
      </h2>
      <div className="flex flex-wrap gap-3 py-4">
        <Button disabled>Disabled</Button>
        <Button variant="primary" onClick={() => setClickCount((c) => c + 1)}>
          Clicked {clickCount} times
        </Button>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" id="props">
        Props
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left">Prop</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Default</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2">variant</td>
              <td className="px-4 py-2">primary | secondary | outline | ghost</td>
              <td className="px-4 py-2">primary</td>
              <td className="px-4 py-2">Visual style variant</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2">size</td>
              <td className="px-4 py-2">sm | md | lg</td>
              <td className="px-4 py-2">md</td>
              <td className="px-4 py-2">Size of the button</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2">disabled</td>
              <td className="px-4 py-2">boolean</td>
              <td className="px-4 py-2">false</td>
              <td className="px-4 py-2">Disables the button</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DocFooter prev={{ label: 'Components', href: '/components' }} next={{ label: 'Input', href: '/components/input' }} />
    </article>
  );
}
