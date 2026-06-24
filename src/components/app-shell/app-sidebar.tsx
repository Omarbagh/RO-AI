"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Mail,
  Settings,
  Plus,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** Optional trailing pill (e.g. cv count). */
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mijn cv's", href: "/dashboard", icon: FileText, badge: "4" },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "Cover letters", href: "/dashboard", icon: Mail },
  { label: "Instellingen", href: "/settings", icon: Settings },
];

// TODO: wire to Supabase (current user + plan + cv count)
const USER = {
  name: "Sanne Bakker",
  initials: "SB",
  plan: "Free plan",
  isPro: false,
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-border bg-sidebar px-[14px] py-[18px]">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="mb-6 flex items-center gap-[10px] px-2 py-1"
      >
        <span className="flex size-7 items-center justify-center rounded-[8px] bg-ink text-[15px] font-semibold text-white">
          C
        </span>
        <span className="text-base font-semibold tracking-[-0.01em] text-foreground">
          CVhero
        </span>
      </Link>

      {/* Primary CTA */}
      <Button asChild size="sm" className="mb-4 w-full justify-center py-[9px]">
        <Link href="/editor/new">
          <Plus className="size-4" />
          Nieuw cv
        </Link>
      </Button>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive =
            // first matching path; "Dashboard" owns /dashboard exactly,
            // duplicate /dashboard entries highlight only the first.
            pathname === item.href &&
            NAV_ITEMS.findIndex((n) => n.href === item.href) === i;

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={cn(
                "flex items-center gap-[11px] rounded-[9px] px-[11px] py-[9px] text-[13.5px] transition-colors",
                isActive
                  ? "bg-surface-2 font-medium text-ink"
                  : "text-muted-foreground hover:bg-surface-2/60",
              )}
            >
              <Icon
                className={cn(
                  "size-[18px]",
                  isActive ? "text-primary" : "text-subtle",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="rounded-[10px] bg-surface-2 px-[7px] py-px text-[11px] text-subtle">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Upgrade card — only for non-Pro users */}
      {!USER.isPro ? (
        <div className="relative mb-3 overflow-hidden rounded-[14px] bg-[linear-gradient(160deg,#1B1E38,#15172B)] p-4">
          <div className="pointer-events-none absolute -right-8 -top-8 size-[120px] rounded-full bg-[radial-gradient(circle,#2F6BFF44,transparent_70%)]" />
          <div className="relative">
            <div className="mb-1 text-[13px] font-semibold text-white">
              Upgrade naar Pro
            </div>
            <p className="mb-3 text-[11.5px] leading-[1.45] text-[#A4A6BC]">
              Onbeperkte cv&apos;s, alle templates en AI.
            </p>
            <Button
              asChild
              size="sm"
              className="w-full justify-center py-2 text-[12.5px]"
            >
              {/* TODO: wire to Mollie checkout */}
              <Link href="/settings">Word Pro · €9/mnd</Link>
            </Button>
          </div>
        </div>
      ) : null}

      {/* User / plan area */}
      <Link
        href="/settings"
        className="flex items-center gap-[10px] rounded-[9px] p-2 transition-colors hover:bg-surface-2/60"
      >
        <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-accent-soft text-[12px] font-semibold text-primary">
          {USER.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-foreground">
            {USER.name}
          </span>
          <span className="block text-[11px] text-subtle">{USER.plan}</span>
        </span>
        <MoreHorizontal className="size-4 text-subtle" />
      </Link>
    </aside>
  );
}
