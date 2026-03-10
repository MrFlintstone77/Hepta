import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Components() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Components</h1>
      <p className="lead text-lg text-muted-foreground">
        Reusable React components built with design tokens. All components support light and dark
        themes.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Available components
      </h2>
      <ul>
        <li>
          <Link to="/components/button">Button</Link> – primary actions
        </li>
        <li>
          <Link to="/components/input">Input</Link> – text input fields
        </li>
        <li>
          <Link to="/components/card">Card</Link> – content containers
        </li>
        <li>
          <Link to="/components/accordion">Accordion</Link> – expandable sections
        </li>
        <li>
          <Link to="/components/breadcrumbs">Breadcrumbs</Link> – navigation path
        </li>
        <li>
          <Link to="/components/checkbox">Checkbox</Link> – binary selection
        </li>
        <li>
          <Link to="/components/date-picker">Date picker</Link> – date selection
        </li>
        <li>
          <Link to="/components/data-table">Data table</Link> – tabular data
        </li>
        <li>
          <Link to="/components/dropdown">Dropdown</Link> – action menus
        </li>
        <li>
          <Link to="/components/link">Link</Link> – text navigation
        </li>
        <li>
          <Link to="/components/pagination">Pagination</Link> – paged navigation
        </li>
        <li>
          <Link to="/components/radio-button">Radio button</Link> – single selection
        </li>
        <li>
          <Link to="/components/tabs">Tabs</Link> – content panels
        </li>
        <li>
          <Link to="/components/tooltips">Tooltips</Link> – contextual hints
        </li>
        <li>
          <Link to="/components/progress-bar">Progress bar</Link> – completion indicator
        </li>
        <li>
          <Link to="/components/search">Search</Link> – search input
        </li>
      </ul>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <p>Import components from the main package:</p>
      <pre className="rounded-lg border border-border bg-muted p-4"><code>{`import { Button, Input, Card, Accordion, Breadcrumbs, Checkbox, DatePicker, DataTable, Dropdown, Link, Pagination, RadioGroup, Tabs, Tooltip, Progress, Search } from '@hepta/components';`}</code></pre>
      <DocFooter prev={{ label: 'Elevation', href: '/foundations/elevation' }} next={{ label: 'Button', href: '/components/button' }} />
    </article>
  );
}
