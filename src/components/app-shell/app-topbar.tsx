import { Search, Bell } from "lucide-react";

import { Input } from "@/components/ui/input";

// TODO: wire to Supabase (current user) + global search + notifications
const USER = { initials: "SB" };

export function AppTopbar() {
  return (
    <header className="flex h-14 flex-none items-center gap-4 border-b border-border bg-card px-8">
      {/* Search */}
      <div className="relative w-full max-w-[360px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <Input
          type="search"
          placeholder="Zoek in je cv's…"
          aria-label="Zoeken"
          className="h-9 pl-9"
        />
      </div>

      <div className="flex-1" />

      {/* Account actions */}
      <button
        type="button"
        aria-label="Notificaties"
        className="flex size-9 items-center justify-center rounded-[9px] text-muted-foreground transition-colors hover:bg-surface-2"
      >
        <Bell className="size-[18px]" />
      </button>
      <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-primary">
        {USER.initials}
      </span>
    </header>
  );
}
