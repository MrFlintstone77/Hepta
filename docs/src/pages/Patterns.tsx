import { Link } from 'react-router-dom';
import { DocFooter } from '@/components/DocFooter';

export function Patterns() {
  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Patterns</h1>
      <p className="lead text-lg text-muted-foreground">
        Reusable UI patterns built from shadcn components for common application layouts and interactions.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Available patterns
      </h2>
      <ul className="mt-4 space-y-4">
        <li>
          <Link
            to="/patterns/sidebar"
            className="text-primary hover:underline font-medium"
          >
            Sidebar
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            A collapsible application sidebar with navigation, responsive behavior, and keyboard shortcuts.
          </p>
        </li>
        <li>
          <Link
            to="/patterns/command"
            className="text-primary hover:underline font-medium"
          >
            Command
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            Command palette for quick actions, search, and keyboard-driven navigation. Often used as a command dialog.
          </p>
        </li>
        <li>
          <Link
            to="/patterns/sheet"
            className="text-primary hover:underline font-medium"
          >
            Sheet
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            An extended panel that slides in from the edge of the screen for secondary content or actions.
          </p>
        </li>
      </ul>
      <DocFooter
        prev={{ label: 'Tooltips', href: '/components/tooltips' }}
        next={{ label: 'Sidebar', href: '/patterns/sidebar' }}
      />
    </article>
  );
}
