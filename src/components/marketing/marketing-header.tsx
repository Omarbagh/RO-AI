"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Functies", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Prijzen", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1140px] items-center gap-4 px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <span className="flex size-7 items-center justify-center rounded-[8px] bg-ink text-[15px] font-semibold text-white">
            C
          </span>
          <span className="text-base font-semibold tracking-[-0.01em] text-foreground">
            CVhero
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-[30px] md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="default" className="text-foreground" asChild>
            <Link href="/sign-in">Inloggen</Link>
          </Button>
          <Button variant="ink" size="default" asChild>
            <Link href="/sign-up">Begin gratis</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto flex size-9 items-center justify-center rounded-[9px] border border-border-strong bg-card text-foreground shadow-xs md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "border-t border-border-subtle bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-[1140px] flex-col gap-1 px-5 py-4 sm:px-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[9px] px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="secondary" size="default" asChild>
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                Inloggen
              </Link>
            </Button>
            <Button variant="ink" size="default" asChild>
              <Link href="/sign-up" onClick={() => setOpen(false)}>
                Begin gratis
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
