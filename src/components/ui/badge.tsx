import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-[10px] py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-primary bg-accent-soft",
        success: "text-success bg-success-soft",
        warning: "text-warning bg-warning-soft",
        destructive: "text-danger bg-danger-soft",
        neutral: "text-muted-foreground bg-surface-2",
        secondary: "text-muted-foreground bg-surface-2",
        outline: "border border-border text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
