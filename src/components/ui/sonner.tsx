"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      richColors={false}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group bg-card text-foreground border border-border rounded-[11px] shadow-md px-[15px] py-[13px] text-[13px] font-medium gap-3",
          description: "text-[12px] text-subtle font-normal",
          actionButton: "bg-primary text-white rounded-md text-xs px-2 py-1",
          cancelButton: "text-subtle",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
