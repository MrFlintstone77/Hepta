import { DocFooter } from '@/components/DocFooter';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

export function DatePickerDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Date picker</h1>
      <p className="lead text-lg text-muted-foreground">
        Calendar-based date selection for forms.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { DatePicker } from '@hepta/components';

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="max-w-xs py-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            placeholder="Select date"
            className="pl-9"
          />
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Checkbox', href: '/components/checkbox' }}
        next={{ label: 'Data table', href: '/components/data-table' }}
      />
    </article>
  );
}
