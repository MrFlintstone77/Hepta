import { DocFooter } from '@/components/DocFooter';

const sampleData = [
  { name: 'Alice', role: 'Developer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Active' },
  { name: 'Carol', role: 'PM', status: 'Away' },
];

export function DataTableDocs() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Data table</h1>
      <p className="lead text-lg text-muted-foreground">
        Structured display of tabular data with optional sorting, filtering, and pagination.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4">
        <code>{`import { DataTable, DataTableColumn } from '@hepta/components';

<DataTable
  data={users}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
  ]}
/>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <div className="overflow-x-auto rounded-lg border border-border py-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.role}</td>
                <td className="px-4 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DocFooter
        prev={{ label: 'Date picker', href: '/components/date-picker' }}
        next={{ label: 'Dropdown', href: '/components/dropdown' }}
      />
    </article>
  );
}
