import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function PageNav() {
  const location = useLocation();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const content = document.querySelector('.docs-content');
    if (!content) return;

    const elements = content.querySelectorAll('h2, h3');
    const items: Heading[] = [];
    elements.forEach((el, i) => {
      const id = el.id || `heading-${i}`;
      if (!el.id) el.id = id;
      items.push({
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1), 10),
      });
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </div>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && 'pl-4')}>
            <a
              href={`#${h.id}`}
              className={cn(
                'text-sm text-muted-foreground transition-colors hover:text-foreground',
                activeId === h.id && 'font-medium text-primary'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
