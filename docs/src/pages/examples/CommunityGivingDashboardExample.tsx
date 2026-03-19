import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Activity, Bell, HelpCircle, Home, Plus, Share2, Users } from 'lucide-react';

type Role = 'Admin' | 'Member';
type MemberStatus = 'Active' | 'Invited';

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
};

type GiveRequestStatus = 'Pending' | 'Fulfilled';

type GiveRequest = {
  id: string;
  fromMemberId: string;
  toMemberId: string;
  amount: number;
  message: string;
  status: GiveRequestStatus;
  createdAt: number;
  fulfilledAt?: number;
};

type ActivityItem = {
  id: string;
  kind: 'Request' | 'Fulfillment';
  createdAt: number;
  title: string;
  detail: string;
};

type Community = {
  id: string;
  name: string;
  description: string;
  members: Member[];
  requests: GiveRequest[];
  activity: ActivityItem[];
};

type NavSection = 'home' | 'communities' | 'requests';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateTime(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const CURRENT_USER_ID = 'm_you';

const seedCommunities: Community[] = [
  {
    id: 'c_neighborhood',
    name: 'Neighborhood Fund',
    description: 'Support community needs, one give at a time.',
    members: [
      {
        id: CURRENT_USER_ID,
        name: 'Avery',
        email: 'avery@example.com',
        role: 'Admin',
        status: 'Active',
      },
      {
        id: 'm_jordan',
        name: 'Jordan',
        email: 'jordan@example.com',
        role: 'Member',
        status: 'Active',
      },
      {
        id: 'm_sam',
        name: 'Sam (pending)',
        email: 'sam@example.com',
        role: 'Member',
        status: 'Invited',
      },
    ],
    requests: [
      {
        id: 'r_groceries',
        fromMemberId: 'm_jordan',
        toMemberId: CURRENT_USER_ID,
        amount: 25,
        message: 'Could use a hand with groceries this week.',
        status: 'Pending',
        createdAt: Date.now() - 1000 * 60 * 80,
      },
      {
        id: 'r_school',
        fromMemberId: CURRENT_USER_ID,
        toMemberId: 'm_jordan',
        amount: 10,
        message: 'Thanks for helping earlier. Passing it forward!',
        status: 'Fulfilled',
        createdAt: Date.now() - 1000 * 60 * 240,
        fulfilledAt: Date.now() - 1000 * 60 * 200,
      },
    ],
    activity: [],
  },
];

export function CommunityGivingDashboardFullPageDemo() {
  const [communities, setCommunities] = useState<Community[]>(seedCommunities);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>(seedCommunities[0]?.id ?? '');
  const selectedCommunity = useMemo(
    () => communities.find((c) => c.id === selectedCommunityId) ?? null,
    [communities, selectedCommunityId],
  );
  const [activeSection, setActiveSection] = useState<NavSection>('home');

  const [createCommunityOpen, setCreateCommunityOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDescription, setCreateDescription] = useState('');

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Member');

  const [giveToMemberId, setGiveToMemberId] = useState<string>('');
  const [giveAmount, setGiveAmount] = useState('');
  const [giveMessage, setGiveMessage] = useState('');

  const members = selectedCommunity?.members ?? [];
  const activeMembers = members.filter((m) => m.status === 'Active' && m.id !== CURRENT_USER_ID);

  const pendingRequests = selectedCommunity?.requests.filter((r) => r.status === 'Pending') ?? [];
  const fulfilledRequests = selectedCommunity?.requests.filter((r) => r.status === 'Fulfilled') ?? [];

  const activityItems: ActivityItem[] = useMemo(() => {
    if (!selectedCommunity) return [];

    // Derive activity from requests for the seed state and future demo edits.
    return selectedCommunity.requests
      .map((r) => {
        const from = selectedCommunity.members.find((m) => m.id === r.fromMemberId);
        const to = selectedCommunity.members.find((m) => m.id === r.toMemberId);
        const isFulfilled = r.status === 'Fulfilled';
        const createdAt = isFulfilled && r.fulfilledAt ? r.fulfilledAt : r.createdAt;

        return {
          id: `derived_${r.id}`,
          kind: isFulfilled ? ('Fulfillment' as const) : ('Request' as const),
          createdAt,
          title: isFulfilled
            ? `${formatCurrency(r.amount)} fulfilled`
            : `Give requested to ${to?.name ?? 'member'}`,
          detail: isFulfilled
            ? `${from?.name ?? 'Member'} gave to ${to?.name ?? 'Member'}${
                r.message ? ` — ${r.message}` : ''
              }`
            : `${formatCurrency(r.amount)}${r.message ? ` — ${r.message}` : ''}`,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [selectedCommunity]);

  const giveAmountNumber = Number(giveAmount);
  const canSendGive =
    selectedCommunity &&
    giveToMemberId &&
    giveAmount.trim().length > 0 &&
    Number.isFinite(giveAmountNumber) &&
    giveAmountNumber > 0 &&
    giveAmountNumber <= 10000;

  const canInvite = selectedCommunity && inviteEmail.trim().length > 3;

  const canFulfillAny = selectedCommunity && selectedCommunity.requests.some((r) => r.status === 'Pending');

  const handleCreateCommunity = () => {
    const name = createName.trim();
    if (!name) return;

    const newCommunity: Community = {
      id: uid('c'),
      name,
      description: createDescription.trim(),
      members: [
        {
          id: CURRENT_USER_ID,
          name: 'Avery',
          email: 'avery@example.com',
          role: 'Admin',
          status: 'Active',
        },
      ],
      requests: [],
      activity: [],
    };

    setCommunities((prev) => [newCommunity, ...prev]);
    setSelectedCommunityId(newCommunity.id);
    setCreateCommunityOpen(false);
    setCreateName('');
    setCreateDescription('');
  };

  const handleInvite = () => {
    if (!selectedCommunity) return;
    const email = inviteEmail.trim().toLowerCase();
    if (!email || email.length < 4) return;

    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCommunity.id) return c;

        const alreadyExists = c.members.some((m) => m.email.toLowerCase() === email);
        if (alreadyExists) return c;

        const invited: Member = {
          id: uid('m'),
          name: email.split('@')[0] || 'New member',
          email,
          role: inviteRole,
          status: 'Invited',
        };

        return { ...c, members: [...c.members, invited] };
      }),
    );

    setInviteEmail('');
    setInviteRole('Member');
    setInviteOpen(false);
  };

  const handleSendGiveRequest = () => {
    if (!selectedCommunity) return;
    if (!canSendGive) return;

    const to = giveToMemberId;
    const amount = giveAmountNumber;
    const message = giveMessage.trim();

    const newRequest: GiveRequest = {
      id: uid('r'),
      fromMemberId: CURRENT_USER_ID,
      toMemberId: to,
      amount,
      message,
      status: 'Pending',
      createdAt: Date.now(),
    };

    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCommunity.id) return c;

        const toMember = c.members.find((m) => m.id === to);
        const activity: ActivityItem = {
          id: uid('a'),
          kind: 'Request',
          createdAt: Date.now(),
          title: `Give requested to ${toMember?.name ?? 'member'}`,
          detail: `${formatCurrency(amount)}${message ? ` — ${message}` : ''}`,
        };

        return {
          ...c,
          requests: [newRequest, ...c.requests],
          activity: [activity, ...c.activity],
        };
      }),
    );

    setGiveToMemberId('');
    setGiveAmount('');
    setGiveMessage('');
  };

  const handleFulfill = (requestId: string) => {
    if (!selectedCommunity) return;

    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCommunity.id) return c;

        const req = c.requests.find((r) => r.id === requestId);
        if (!req || req.status !== 'Pending') return c;

        const nextRequests = c.requests.map((r) =>
          r.id === requestId ? { ...r, status: 'Fulfilled', fulfilledAt: Date.now() } : r,
        );

        const from = c.members.find((m) => m.id === req.fromMemberId);
        const to = c.members.find((m) => m.id === req.toMemberId);
        const nextActivity: ActivityItem = {
          id: uid('a'),
          kind: 'Fulfillment',
          createdAt: Date.now(),
          title: `${formatCurrency(req.amount)} fulfilled`,
          detail: `${from?.name ?? 'Member'} gave to ${to?.name ?? 'Member'}${
            req.message ? ` — ${req.message}` : ''
          }`,
        };

        return {
          ...c,
          requests: nextRequests,
          activity: [nextActivity, ...c.activity],
        };
      }),
    );
  };

  const headerTitle = selectedCommunity?.name ?? 'Community giving';

  return (
    <div className="flex h-[768px] min-h-0 flex-col bg-background">
      {/* Top header */}
      <header className="flex w-full shrink-0 items-center justify-between gap-4 border-b px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Community giving</p>
          <h2 className="truncate text-lg font-semibold">{headerTitle}</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Profile completion */}
          <div className="hidden sm:flex items-center gap-3 rounded-lg border bg-muted/20 px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground leading-tight">Profile</p>
              <p className="text-sm font-semibold leading-tight tabular-nums">72%</p>
            </div>
            <div className="w-28">
              <Progress value={72} />
            </div>
          </div>

          {/* Invite CTA */}
          <Button
            variant="outline"
            size="sm"
            disabled={!selectedCommunity}
            onClick={() => setInviteOpen(true)}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Invite members
          </Button>

          {/* Header icons */}
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Help">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="Open profile menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs font-semibold">AV</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>Signed in as Avery</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Fixed sidebar (reference-style) */}
        <aside className="absolute inset-y-0 left-0 z-20 w-60 border-r bg-background">
          <div className="flex h-full flex-col px-3 py-4">
            <nav className="mt-4 space-y-1">
              {[
                { id: 'home' as const, label: 'Home', icon: Home },
                { id: 'communities' as const, label: 'Communities', icon: Users },
                { id: 'requests' as const, label: 'Requests', icon: Share2 },
              ].map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      'group relative flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors',
                      active
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full transition-colors',
                        active ? 'bg-primary' : 'bg-transparent group-hover:bg-muted',
                      )}
                    />
                    <item.icon className={cn('h-4 w-4', active ? 'text-primary' : '')} />
                    <span className={cn('font-medium', active ? 'font-semibold' : '')}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto px-2">
              <div className="rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground">
                Tip: Invite members to start giving.
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 pl-64">
          {!selectedCommunity ? (
            <div className="flex flex-1 items-center justify-center">
              <Card className="w-full max-w-2xl">
                <CardHeader>
                  <CardTitle>Choose a community</CardTitle>
                  <CardDescription>Select one from the sidebar to manage invites and giving.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCreateCommunityOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create community
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex min-h-0 flex-col overflow-hidden">
              {activeSection === 'communities' ? (
                <Card className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between gap-3">
                    <div>
                      <CardTitle>Communities</CardTitle>
                      <CardDescription>Select a community to manage invites and giving.</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCreateCommunityOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Create
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {communities.map((c) => {
                        const active = c.id === selectedCommunityId;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCommunityId(c.id)}
                            className={cn(
                              'rounded-lg border p-3 text-left transition-colors',
                              active
                                ? 'border-primary/40 bg-primary/5'
                                : 'hover:border-border hover:bg-muted/20',
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate font-medium">{c.name}</p>
                              <span className="text-xs text-muted-foreground">{c.members.length}</span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <div className="mt-4 grid min-h-0 flex-1 gap-4 overflow-auto lg:grid-cols-2">
                {/* Left column: requests + give form */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Give requests</CardTitle>
                      <CardDescription>
                        Pending requests can be fulfilled by members.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {pendingRequests.length === 0 ? (
                        <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                          <p className="font-medium">No pending requests</p>
                          <p className="mt-1 text-xs text-muted-foreground">Send a give request below.</p>
                        </div>
                      ) : (
                        pendingRequests.slice(0, 6).map((r) => {
                          const from = selectedCommunity.members.find((m) => m.id === r.fromMemberId);
                          const to = selectedCommunity.members.find((m) => m.id === r.toMemberId);
                          return (
                            <div
                              key={r.id}
                              className="rounded-lg border bg-background p-3"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">
                                    {from?.name ?? 'Member'} → {to?.name ?? 'Member'}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Requested {formatDateTime(r.createdAt)}
                                  </p>
                                </div>
                                <Badge variant="secondary">{formatCurrency(r.amount)}</Badge>
                              </div>
                              {r.message ? (
                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.message}</p>
                              ) : null}
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <Badge variant="outline">Pending</Badge>
                                <Button size="sm" onClick={() => handleFulfill(r.id)} className="gap-2">
                                  <Share2 className="h-4 w-4" />
                                  Fulfill
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Send a give request</CardTitle>
                      <CardDescription>Ask a member for support or coordinate a give.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Recipient</p>
                        <Select value={giveToMemberId} onValueChange={setGiveToMemberId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeMembers.length === 0 ? (
                              <SelectItem value="" disabled>
                                No active members
                              </SelectItem>
                            ) : (
                              activeMembers.map((m) => (
                                <SelectItem key={m.id} value={m.id}>
                                  {m.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <Input
                        label="Amount"
                        placeholder="e.g. 25"
                        value={giveAmount}
                        onChange={(e) => setGiveAmount(e.target.value)}
                        inputMode="numeric"
                      />

                      <Textarea
                        placeholder="Message (optional)"
                        value={giveMessage}
                        onChange={(e) => setGiveMessage(e.target.value)}
                      />

                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline">Max $10,000</Badge>
                        <Button onClick={handleSendGiveRequest} disabled={!canSendGive} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Send request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {activeSection !== 'requests' ? (
                  <div className="space-y-4">
                    {/* Right column: activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Giving feed
                        </CardTitle>
                        <CardDescription>Requests and fulfillments across the community.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {activityItems.length === 0 ? (
                          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                            <p className="font-medium">No activity yet</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Your first give request will appear here.
                            </p>
                          </div>
                        ) : (
                          activityItems.slice(0, 10).map((a) => (
                            <div key={a.id} className="rounded-lg border bg-background p-3">
                              <div className="flex items-center justify-between gap-3">
                                <p className="truncate text-sm font-semibold">{a.title}</p>
                                <Badge variant={a.kind === 'Fulfillment' ? 'default' : 'secondary'}>
                                  {a.kind === 'Fulfillment' ? 'Fulfilled' : 'Requested'}
                                </Badge>
                              </div>
                              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.detail}</p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {formatDateTime(a.createdAt)}
                              </p>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>

                    {/* Fulfilled requests preview */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recently fulfilled</CardTitle>
                        <CardDescription>Keep the community momentum going.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {fulfilledRequests.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No fulfilled gifts yet.</p>
                        ) : (
                          fulfilledRequests.slice(0, 4).map((r) => {
                            const from = selectedCommunity.members.find((m) => m.id === r.fromMemberId);
                            const to = selectedCommunity.members.find((m) => m.id === r.toMemberId);
                            return (
                              <div
                                key={r.id}
                                className="flex items-start justify-between gap-3 rounded-lg border p-3"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">
                                    {from?.name ?? 'Member'} → {to?.name ?? 'Member'}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Fulfilled {r.fulfilledAt ? formatDateTime(r.fulfilledAt) : ''}
                                  </p>
                                </div>
                                <Badge>{formatCurrency(r.amount)}</Badge>
                              </div>
                            );
                          })
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create community dialog */}
      <Dialog open={createCommunityOpen} onOpenChange={setCreateCommunityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create community</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              label="Community name"
              placeholder="e.g. Back-to-school helpers"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
            <Textarea
              label="Description"
              placeholder="What does this community help with?"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
            />

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateCommunityOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCommunity} disabled={!createName.trim()}>
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite members dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite members</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              label="Email"
              placeholder="member@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <div className="space-y-2">
              <p className="text-sm font-medium">Role</p>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!canInvite}>
                Send invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

