import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[72px] bg-card text-sm text-foreground border border-border-strong rounded-[9px] px-[13px] py-[10px] leading-relaxed placeholder:text-subtle outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/18 disabled:bg-muted disabled:text-disabled-text",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
