import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useTheme } from '@/context/ThemeContext';
import { docsPages } from '@/lib/docs-nav';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link to="/" className="shrink-0 font-semibold text-foreground hover:text-primary">
        ParioGO
      </Link>
      <div className="flex flex-1 items-end justify-end gap-4 md:justify-start">
        <div className="relative hidden w-full max-w-sm md:block">
          <Button
            variant="outline"
            className={cn(
              'h-9 w-full justify-start gap-2 border-dashed bg-transparent px-3 text-left font-normal text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Search documentation...</span>
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
              {typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent) ? (
                <><span className="text-xs">⌘</span>K</>
              ) : (
                <>Ctrl+K</>
              )}
            </kbd>
          </Button>
        </div>
        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <CommandInput placeholder="Search documentation..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {docsPages.map((page) => (
                <CommandItem
                  key={page.path}
                  value={`${page.label} ${page.path}`}
                  onSelect={() => handleSelect(page.path)}
                >
                  {page.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <div className="flex-1 md:flex-none" />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
    </header>
  );
}
