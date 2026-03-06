import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DocFooterProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export function DocFooter({ prev, next }: DocFooterProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
      {prev ? (
        <Link
          to={prev.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {prev.label}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {next.label}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
