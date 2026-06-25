import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 cursor-pointer outline-none active:translate-y-[1px] focus-visible:ring-[3px] focus-visible:ring-primary/25 disabled:bg-muted disabled:text-disabled-text disabled:shadow-none disabled:cursor-not-allowed [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_1px_2px_rgba(47,107,255,.4)] hover:bg-accent-hover",
        secondary:
          "bg-card text-foreground border border-border-strong shadow-xs hover:bg-muted",
        outline:
          "bg-card text-foreground border border-border-strong shadow-xs hover:bg-muted",
        ghost: "bg-transparent text-primary hover:bg-accent",
        ink: "bg-ink text-white hover:opacity-90",
        destructive:
          "bg-danger-soft text-danger border border-danger-soft-border hover:bg-danger-soft/70",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "text-xs px-[13px] py-[7px] rounded-[8px]",
        default: "text-sm px-[18px] py-[10px] rounded-[9px]",
        lg: "text-base px-6 py-[13px] rounded-[10px]",
        icon: "size-9 rounded-[9px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
