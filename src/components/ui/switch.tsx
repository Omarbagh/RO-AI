"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center w-[40px] h-[23px] rounded-full transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-primary/25 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border-strong cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-[18px] bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-transform data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-[2px]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
