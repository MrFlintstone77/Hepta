import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const itemVariants = cva(
  "flex w-full items-start gap-3 rounded-lg text-left [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4",
        sm: "p-3",
        xs: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    VariantProps<typeof itemVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      data-slot="item"
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
})
Item.displayName = "Item"

const ItemMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    variant?: "icon" | "image" | "avatar"
  }
>(({ className, variant = "icon", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-media"
    className={cn(
      "flex shrink-0 items-center justify-center",
      variant === "icon" && "[&_svg]:size-5",
      variant === "image" && "aspect-square overflow-hidden rounded-md",
      variant === "avatar" && "overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
ItemMedia.displayName = "ItemMedia"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-content"
    className={cn("min-w-0 flex-1 space-y-1", className)}
    {...props}
  />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-title"
    className={cn("font-medium leading-none", className)}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-actions"
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
))
ItemActions.displayName = "ItemActions"

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-group"
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
ItemGroup.displayName = "ItemGroup"

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
}
