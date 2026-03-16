import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  User,
  Plane,
  Briefcase,
  Calendar,
  TrendingUp,
  Shield,
  Minus,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const KIWI_GREEN = '#00A991';

const DATE_OPTIONS = [
  { range: '5 Mar - 9 Mar', price: 115 },
  { range: '6 Mar - 10 Mar', price: 114 },
  { range: '7 Mar - 11 Mar', price: 63, selected: true },
  { range: '8 Mar - 12 Mar', price: 103 },
  { range: '9 Mar - 13 Mar', price: 88 },
];

const FLIGHTS = [
  {
    outbound: { dep: '20:15', airport: 'SFO', duration: '1h 30m', stops: 'Direct', arr: '21:45', arrAirport: 'LAX', airline: 'F' },
    inbound: { dep: '20:01', airport: 'LAX', duration: '1h 37m', stops: 'Direct', arr: '21:38', arrAirport: 'SFO', airline: 'F' },
    cabinBags: 1,
    checkedBags: 1,
    guarantee: 10,
    price: 63,
  },
  {
    outbound: { dep: '20:15', airport: 'SFO', duration: '1h 30m', stops: 'Direct', arr: '21:45', arrAirport: 'LAX', airline: 'F' },
    inbound: { dep: '06:00', airport: 'LAX', duration: '1h 31m', stops: 'Direct', arr: '07:31', arrAirport: 'SFO', airline: 'P' },
    cabinBags: 1,
    checkedBags: 0,
    guarantee: 13,
    price: 91,
  },
];

function FlightLeg({
  leg,
  airlineColor = 'green',
}: {
  leg: (typeof FLIGHTS)[0]['outbound'];
  airlineColor?: 'green' | 'purple';
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="font-semibold">{leg.dep}</p>
        <p className="text-sm text-muted-foreground">{leg.airport}</p>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="h-px flex-1 min-w-[60px] bg-muted" />
        <span className="text-xs text-muted-foreground">{leg.duration}</span>
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white',
              airlineColor === 'purple' ? 'bg-purple-500' : 'bg-[#00A991]'
            )}
          >
            {leg.airline}
          </span>
          <span className="text-xs text-muted-foreground">{leg.stops}</span>
        </div>
      </div>
      <div className="text-left">
        <p className="font-semibold">{leg.arr}</p>
        <p className="text-sm text-muted-foreground">{leg.arrAirport}</p>
      </div>
    </div>
  );
}

export function KiwiFlightSearchFullPageDemo() {
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [cabinBags, setCabinBags] = useState(0);
  const [checkedBags, setCheckedBags] = useState(0);
  const [stops, setStops] = useState('any');
  const [overnightStopovers, setOvernightStopovers] = useState(true);
  const [selfTransfer, setSelfTransfer] = useState(true);
  const [returnDifferentStation, setReturnDifferentStation] = useState(true);
  const [returnToDifferentStation, setReturnToDifferentStation] = useState(true);
  const [activeTab, setActiveTab] = useState('best');

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Set up price alerts</p>
        <p className="mb-3 text-sm text-muted-foreground">
          Receive alerts when the prices for this route change.
        </p>
        <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
      </div>
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
          Bags
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Cabin baggage</Label>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCabinBags((c) => Math.max(0, c - 1))}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{cabinBags}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCabinBags((c) => c + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Checked baggage</Label>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCheckedBags((c) => Math.max(0, c - 1))}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{checkedBags}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCheckedBags((c) => c + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
          Stops
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-3">
          <RadioGroup value={stops} onValueChange={setStops} className="space-y-2">
            {[
              { value: 'any', label: 'Any' },
              { value: 'direct', label: 'Direct' },
              { value: '1stop', label: 'Up to 1 stop' },
              { value: '2stops', label: 'Up to 2 stops' },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="cursor-pointer text-sm font-normal">{label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex items-center space-x-2">
            <Checkbox id="overnight" checked={overnightStopovers} onCheckedChange={(c) => setOvernightStopovers(!!c)} />
            <Label htmlFor="overnight" className="cursor-pointer text-sm font-normal">Allow overnight stopovers</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
          Connections
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="self" checked={selfTransfer} onCheckedChange={(c) => setSelfTransfer(!!c)} />
            <Label htmlFor="self" className="cursor-pointer text-sm font-normal">Self-transfer to different station/airport</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="returnDiff" checked={returnDifferentStation} onCheckedChange={(c) => setReturnDifferentStation(!!c)} />
            <Label htmlFor="returnDiff" className="cursor-pointer text-sm font-normal">Allow return from a different station/airport</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="returnTo" checked={returnToDifferentStation} onCheckedChange={(c) => setReturnToDifferentStation(!!c)} />
            <Label htmlFor="returnTo" className="cursor-pointer text-sm font-normal">Allow return to a different station/airport</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      {/* Header */}
      <header className="shrink-0 border-b">
        <div className="flex items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold" style={{ color: KIWI_GREEN }}>
              KIWI.COM
            </span>
            <nav className="hidden gap-4 sm:flex">
              <a href="#" className="font-medium" style={{ color: KIWI_GREEN }}>
                Flights
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Cars
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Stays
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Magazine
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Marketplace
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Deals
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              USD
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Help & support
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="border-t px-6 py-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Button variant="secondary" size="sm" style={{ backgroundColor: 'rgba(0,169,145,0.15)', color: KIWI_GREEN }}>
                Return
              </Button>
              <Button variant="outline" size="sm">
                Economy
              </Button>
              <Button variant="outline" size="sm">
                1 Passenger
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {cabinBags}
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Plane className="h-3.5 w-3.5" />
                {checkedBags}
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-muted-foreground">
                Add more
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-1 min-w-[140px] items-center gap-2 rounded-lg border bg-background px-3 py-2">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="font-medium">San Francisco</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex flex-1 min-w-[140px] items-center gap-2 rounded-lg border bg-background px-3 py-2">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="font-medium">Los Angeles</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Departure Sat 7 Mar</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Return Wed 11 Mar</span>
              </div>
            </div>
            {/* Date/price selector */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex flex-1 gap-2 overflow-x-auto py-1 scrollbar-none">
                {DATE_OPTIONS.map((opt) => (
                  <Button
                    key={opt.range}
                    variant="outline"
                    size="sm"
                    className={cn(
                      'shrink-0',
                      opt.selected && 'border-2 border-[#00A991] bg-[#00A991]/5 font-semibold'
                    )}
                    style={opt.selected ? { borderColor: KIWI_GREEN, color: KIWI_GREEN } : undefined}
                  >
                    {opt.range} ${opt.price}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="shrink-0 gap-1">
                <TrendingUp className="h-4 w-4" />
                Pricing table
              </Button>
              <Button variant="outline" size="sm" className="shrink-0">
                Price trends
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Three-column layout: Filters | Results | Promo */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left sidebar - Filters (desktop) */}
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r bg-muted/30 p-4 sm:block">
          <FiltersContent />
        </aside>

        {/* Center - Flight results */}
        <main className="flex-1 overflow-auto p-6">
          {/* Mobile filters */}
          <div className="mb-4 sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Comparison tabs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 border-b pb-4">
            {[
              { id: 'best', label: 'Best', meta: '$63 - 3h 07m' },
              { id: 'cheapest', label: 'Cheapest', meta: '$63 - 3h 07m' },
              { id: 'fastest', label: 'Fastest', meta: '$103 - 2h 58m' },
              { id: 'other', label: 'Other options', meta: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-[#00A991] text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {tab.label}
                {tab.meta && <span className="opacity-90">· {tab.meta}</span>}
                {tab.id === 'other' && <ChevronDown className="h-4 w-4" />}
              </button>
            ))}
          </div>

          {/* Flight cards */}
          <div className="space-y-4">
            {FLIGHTS.map((flight, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-6">
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Outbound</p>
                        <FlightLeg leg={flight.outbound} />
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Inbound</p>
                        <FlightLeg
                          leg={flight.inbound}
                          airlineColor={flight.inbound.airline === 'P' ? 'purple' : 'green'}
                        />
                      </div>
                      <div className="flex gap-6 text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-sm">
                          <Briefcase className="h-4 w-4" />
                          {flight.cabinBags}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm">
                          <Plane className="h-4 w-4" />
                          {flight.checkedBags}
                        </span>
                        <span className="text-sm">1 passenger</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-3 border-t pt-6 lg:border-t-0 lg:border-l lg:items-end lg:pl-6 lg:pt-0">
                      <p className="text-sm font-medium" style={{ color: KIWI_GREEN }}>
                        +${flight.guarantee} Guarantee available
                      </p>
                      <p className="text-2xl font-bold">${flight.price}</p>
                      <Button
                        className="font-medium hover:opacity-90"
                        style={{ backgroundColor: KIWI_GREEN }}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Right sidebar - Promo */}
        <aside className="hidden w-80 shrink-0 overflow-y-auto border-l bg-muted/20 p-4 lg:block">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-[#00A991]/20 to-slate-200 dark:to-slate-800">
              <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl font-bold text-white" style={{ backgroundColor: KIWI_GREEN }}>
                g
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-16 w-16 text-[#00A991]/40" />
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold">The ultimate travel package</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The Kiwi.com Guarantee provides instant solutions to disruptions, continuous support, and automated travel services.
              </p>
              <Button
                className="mt-4 w-full font-medium"
                style={{ backgroundColor: KIWI_GREEN }}
              >
                Discover more
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
