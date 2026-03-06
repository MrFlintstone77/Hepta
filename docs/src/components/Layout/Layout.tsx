import { type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { PageNav } from './PageNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-sidebar-border md:block">
          <Sidebar />
        </aside>
        <main className="flex min-w-0 flex-1">
          <div className="docs-content w-full max-w-3xl flex-1 px-6 py-8 md:px-8">{children}</div>
          <aside className="hidden w-56 shrink-0 border-l border-border xl:block">
            <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-auto px-6 py-8">
              <PageNav />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
