import { DocFooter } from '@/components/DocFooter';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function AccordionDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Accordion</h1>
      <p className="lead text-lg text-muted-foreground">
        Expandable sections for revealing content on demand.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@hepta/components';

<Accordion>
  <AccordionItem value="1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1.</AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="max-w-md space-y-1 rounded-lg border border-border py-2">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-4">
              What is Hepta?
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-3 text-sm text-muted-foreground">
            Hepta is a design system for building consistent frontends.
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-4">
              How do I get started?
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-3 text-sm text-muted-foreground">
            Install the packages and import the styles. See the Get started page.
          </CollapsibleContent>
        </Collapsible>
      </div>
      <DocFooter
        prev={{ label: 'Components', href: '/components' }}
        next={{ label: 'Alert dialog', href: '/components/alert-dialog' }}
      />
    </article>
  );
}
