import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionListFullPageDemo } from './examples/TransactionListExample';

export function Examples() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const demo = searchParams.get('demo');

  useEffect(() => {
    if (demo === 'transaction-list') {
      setModalOpen(true);
    }
  }, [demo]);

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Examples</h1>
      <p className="lead text-lg text-muted-foreground">
        Example patterns and compositions using the design system components.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example patterns
      </h2>
      <ul className="mt-4 space-y-2">
        <li>
          <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Transaction list
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full max-h-[85vh] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
              <DialogHeader className="sr-only">
                <DialogTitle>Transaction list demo</DialogTitle>
              </DialogHeader>
              <div className="flex flex-1 min-h-0 overflow-hidden">
                <TransactionListFullPageDemo />
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-sm text-muted-foreground mt-1">
            A financial software transaction table with filtering, search, and pagination. Full page sample with sidebar and header.
          </p>
        </li>
      </ul>
      <DocFooter
        prev={{ label: 'Sheet', href: '/patterns/sheet' }}
        next={{ label: 'Get started', href: '/get-started' }}
      />
    </article>
  );
}
