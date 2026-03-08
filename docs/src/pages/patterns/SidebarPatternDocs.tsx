import { useState } from 'react';
import { DocFooter } from '@/components/DocFooter';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  PanelLeft,
  Home,
  Settings,
  ChevronUp,
  LifeBuoy,
  Cloud,
} from 'lucide-react';

export function SidebarPatternDocs() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <article className="prose prose-neutral dark:prose-invert w-full max-w-none">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Sidebar</h1>
      <p className="lead text-lg text-muted-foreground">
        A collapsible sidebar pattern for application navigation. Supports expanded/collapsed states, responsive behavior on mobile, and keyboard shortcuts (⌘B / Ctrl+B).
      </p>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="rounded-lg border border-border bg-muted p-4 overflow-x-auto">
        <code>{`import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>App</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home className="h-4 w-4" />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer</SidebarFooter>
  </Sidebar>
  <main>
    <SidebarTrigger />
    Page content
  </main>
</SidebarProvider>`}</code>
      </pre>
      <h2 className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Example
      </h2>
      <p className="text-muted-foreground mt-2">
        Click the button below to open the sidebar pattern demo.
      </p>
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Pattern Demo</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] w-full max-h-[85vh] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>Sidebar pattern demo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <SidebarProvider className="!min-h-0 h-full flex-1 min-w-0">
              <Sidebar>
                <SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg" asChild>
                        <a href="#">
                          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <PanelLeft className="size-4" />
                          </div>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Acme Inc</span>
                            <span className="truncate text-xs">Dashboard</span>
                          </div>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive>
                            <Home className="h-4 w-4" />
                            Home
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <Settings className="h-4 w-4" />
                            Settings
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <LifeBuoy className="h-4 w-4" />
                            Help
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <Cloud className="h-4 w-4" />
                            API
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                              <ChevronUp className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-semibold">Account</span>
                              <span className="truncate text-xs">user@acme.com</span>
                            </div>
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" className="w-[--radix-dropdown-menu-trigger-width]">
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
              <main className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="h-6" />
                  <span className="font-medium">Pattern demo</span>
                </header>
                <div className="flex-1 p-4 overflow-auto">
                  <p className="text-sm text-muted-foreground">
                    Click the trigger to collapse/expand the sidebar. Use ⌘B (Mac) or Ctrl+B (Windows) for keyboard shortcut.
                  </p>
                </div>
              </main>
            </SidebarProvider>
          </div>
        </DialogContent>
      </Dialog>
      <DocFooter
        prev={{ label: 'Patterns', href: '/patterns' }}
        next={{ label: 'Command', href: '/patterns/command' }}
      />
    </article>
  );
}
