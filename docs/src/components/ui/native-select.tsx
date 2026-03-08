import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select"> & {
    size?: "sm" | "default"
  }
>(({ className, size = "default", children, ...props }, ref) => (
  <div
    className="relative"
    data-slot="native-select-wrapper"
  >
    <select
      ref={ref}
      data-slot="native-select"
      className={cn(
        "flex h-9 w-full appearance-none items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-popover [&>option]:text-popover-foreground",
        size === "sm" && "h-8 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <span className="pointer-events-none absolute right-3 flex h-4 w-4 items-center justify-center opacity-50">
      <ChevronDown className="h-4 w-4" />
    </span>
  </div>
))
NativeSelect.displayName = "NativeSelect"

const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentProps<"option">
>(({ className, ...props }, ref) => (
  <option
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
NativeSelectOption.displayName = "NativeSelectOption"

const NativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.ComponentProps<"optgroup">
>(({ className, ...props }, ref) => (
  <optgroup
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
NativeSelectOptGroup.displayName = "NativeSelectOptGroup"

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup }
