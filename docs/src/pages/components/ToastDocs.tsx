import { DocFooter } from '@/components/DocFooter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ToastDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Toast</h1>
      <p className="lead text-lg text-muted-foreground">
        A lightweight notification that appears temporarily to provide feedback. Uses Sonner for toasts.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

// Add Toaster to your app root (e.g. App.tsx)
<Toaster />

// Show a toast
toast('Event has been created');
toast.success('Successfully saved!');
toast.error('Something went wrong');`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="flex flex-wrap gap-2 py-4">
        <Button
          variant="outline"
          onClick={() => toast('This is a default toast notification.')}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success('Your changes have been saved.')}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error('Something went wrong. Please try again.')}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Event created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
          }
        >
          With description
        </Button>
      </div>
      <DocFooter
        prev={{ label: 'Tabs', href: '/components/tabs' }}
        next={{ label: 'Tooltips', href: '/components/tooltips' }}
      />
    </article>
  );
}
