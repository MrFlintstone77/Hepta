import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';

export function RadioButtonDocs() {
  const [value, setValue] = useState('a');

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Radio button</h1>
      <p className="lead text-lg text-muted-foreground">
        Single selection from a group of mutually exclusive options.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { RadioGroup, RadioItem } from '@hepta/components';

<RadioGroup value={value} onValueChange={setValue}>
  <RadioItem value="option1">Option 1</RadioItem>
  <RadioItem value="option2">Option 2</RadioItem>
</RadioGroup>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <fieldset className="space-y-3 py-4">
        <legend className="sr-only">Choose one</legend>
        {['a', 'b', 'c'].map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="demo"
              value={opt}
              checked={value === opt}
              onChange={() => setValue(opt)}
              className="h-4 w-4 border-input"
            />
            <span>Option {opt.toUpperCase()}</span>
          </label>
        ))}
      </fieldset>
      <DocFooter
        prev={{ label: 'Pagination', href: '/components/pagination' }}
        next={{ label: 'Tabs', href: '/components/tabs' }}
      />
    </article>
  );
}
