import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';

export function TabsDocs() {
  const [active, setActive] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Tabs</h1>
      <p className="lead text-lg text-muted-foreground">
        Switch between multiple panels of content in the same space.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hepta/components';

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="py-4">
        <div className="border-b border-border">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                  active === tab.id
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm">
          {active === 'overview' && <p>Overview content goes here.</p>}
          {active === 'details' && <p>Details content goes here.</p>}
          {active === 'settings' && <p>Settings content goes here.</p>}
        </div>
      </div>
      <DocFooter
        prev={{ label: 'Radio button', href: '/components/radio-button' }}
        next={{ label: 'Tooltips', href: '/components/tooltips' }}
      />
    </article>
  );
}
