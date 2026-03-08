import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Mail,
  Smile,
  Settings,
  Search,
  Rocket,
} from 'lucide-react';

export function CommandPatternDocs() {
  const [open, setOpen] = useState(false);

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Command</h1>
      <p className="lead text-lg text-muted-foreground">
        Command palette for quick actions and search. Built on cmdk, it provides keyboard-driven navigation, filtering, and can be used as a modal dialog for app-wide commands.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4 overflow-x-auto">
        <code>{`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

// As a dialog (command palette)
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="py-4">
        <Button onClick={() => setOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          Open command palette...
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Or use ⌘K (Mac) / Ctrl+K (Windows) when implemented with a keyboard shortcut.
        </p>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              Search Emoji
            </CommandItem>
            <CommandItem>
              <Rocket className="mr-2 h-4 w-4" />
              Launch
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              Profile
            </CommandItem>
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              Mail
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">Inline usage</h3>
      <p className="text-muted-foreground">
        The Command component can also be used inline (e.g., inside a popover) for combobox-style search and selection.
      </p>
      <div className="rounded-md border border-border p-2 max-w-sm mt-4">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Fruits">
              <CommandItem>Apple</CommandItem>
              <CommandItem>Banana</CommandItem>
              <CommandItem>Orange</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <DocFooter
        prev={{ label: 'Sidebar', href: '/patterns/sidebar' }}
        next={{ label: 'Sheet', href: '/patterns/sheet' }}
      />
    </article>
  );
}
