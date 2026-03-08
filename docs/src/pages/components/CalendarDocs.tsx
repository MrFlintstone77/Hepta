import { DocFooter } from '@/components/DocFooter';
import { Calendar } from '@/components/ui/calendar';

export function CalendarDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Calendar</h1>
      <p className="lead text-lg text-muted-foreground">
        A date picker component built with react-day-picker for selecting dates.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Calendar } from '@/components/ui/calendar';

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="flex justify-center py-4">
        <Calendar
          mode="single"
          className="rounded-md border"
        />
      </div>
      <DocFooter
        prev={{ label: 'Card', href: '/components/card' }}
        next={{ label: 'Chart', href: '/components/chart' }}
      />
    </article>
  );
}
