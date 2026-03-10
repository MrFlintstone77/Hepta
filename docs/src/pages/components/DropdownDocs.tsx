import { DocFooter } from '@/components/DocFooter';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function DropdownDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Dropdown</h1>
      <p className="lead text-lg text-muted-foreground">
        Menu that opens on trigger click for actions or selections.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@hepta/components';

<Dropdown>
  <DropdownTrigger asChild>
    <Button>Options</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownItem>Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="relative inline-block py-4">
        <Button variant="outline">
          Options
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <div className="absolute left-0 top-full z-10 mt-1 min-w-[8rem] rounded-md border border-border bg-popover p-1 shadow-md">
          <button type="button" className="block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground">
            Edit
          </button>
          <button type="button" className="block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground">
            Duplicate
          </button>
          <button type="button" className="block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground">
            Delete
          </button>
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Data table', href: '/components/data-table' }}
        next={{ label: 'Link', href: '/components/link' }}
      />
    </article>
  );
}
