import { Card } from '@hepta/components';
import { DocFooter } from '@/components/DocFooter';

export function CardDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Card</h1>
      <p className="lead text-lg text-muted-foreground">
        Container for grouped content with optional header.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import { Card } from '@hepta/components';

<Card title="Settings">Content here</Card>
<Card variant="elevated">Elevated card</Card>`}</code></pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Variants
      </h2>
      <div className="flex flex-wrap gap-4 py-4">
        <div className="min-w-[200px] flex-1">
          <Card title="Default card">Default variant with border.</Card>
        </div>
        <div className="min-w-[200px] flex-1">
          <Card title="Elevated card" variant="elevated">Elevated variant with shadow.</Card>
        </div>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Without title
      </h2>
      <div className="max-w-md py-4">
        <Card>Card content without a header.</Card>
      </div>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
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
              <td className="px-4 py-2">title</td>
              <td className="px-4 py-2">string</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">Optional card title in header</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2">variant</td>
              <td className="px-4 py-2">default | elevated</td>
              <td className="px-4 py-2">default</td>
              <td className="px-4 py-2">Visual variant - elevated adds shadow</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DocFooter prev={{ label: 'Input', href: '/components/input' }} next={{ label: 'Calendar', href: '/components/calendar' }} />
    </article>
  );
}
