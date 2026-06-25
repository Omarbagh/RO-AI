import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full bg-card text-sm text-foreground border border-border-strong rounded-[9px] px-[13px] py-[10px] placeholder:text-subtle transition-shadow outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/18 disabled:bg-muted disabled:text-disabled-text aria-invalid:border-danger aria-invalid:ring-danger/15",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
