"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Download,
  LayoutTemplate,
  Pencil,
  Redo2,
  Sparkles,
  Undo2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EditorTopbarProps {
  title: string;
  onTitleChange: (value: string) => void;
  onExport: () => void;
  onOpenAi: () => void;
}

export function EditorTopbar({
  title,
  onTitleChange,
  onExport,
  onOpenAi,
}: EditorTopbarProps) {
  const [editingTitle, setEditingTitle] = React.useState(false);

  return (
    <header className="z-20 flex h-14 flex-none items-center gap-[14px] border-b border-border bg-card px-4">
      {/* Logo */}
      <Link
        href="/dashboard"
        aria-label="Naar dashboard"
        className="flex size-7 items-center justify-center rounded-[8px] bg-ink text-[15px] font-semibold text-white"
      >
        C
      </Link>

      <span className="h-6 w-px bg-border" aria-hidden />

      {/* Breadcrumb + editable title */}
      <div className="flex min-w-0 items-center gap-2 text-[13px] text-subtle">
        <Link
          href="/dashboard"
          className="rounded-[6px] px-2 py-1 transition-colors hover:bg-surface-2"
        >
          Dashboard
        </Link>
        <span className="text-disabled-text">/</span>
        {editingTitle ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditingTitle(false);
            }}
            // TODO: persist title rename to backend
            className="min-w-0 max-w-[260px] rounded-[6px] border border-primary bg-card px-2 py-1 text-sm font-semibold text-foreground outline-none ring-[3px] ring-primary/18"
            aria-label="cv-titel"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className="group flex min-w-0 items-center gap-1.5"
          >
            <span className="truncate text-sm font-semibold text-foreground">
              {title}
            </span>
            <Pencil className="size-3 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}
      </div>

      {/* Autosave indicator */}
      <div className="ml-1 flex items-center gap-1.5 text-xs font-medium text-success">
        <Check className="size-3.5" />
        Opgeslagen
      </div>

      <div className="flex-1" />

      {/* Undo / redo */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <button
          type="button"
          aria-label="Ongedaan maken"
          // TODO: wire to undo history
          className="flex size-8 items-center justify-center rounded-[8px] transition-colors hover:bg-surface-2"
        >
          <Undo2 className="size-[15px]" />
        </button>
        <button
          type="button"
          aria-label="Opnieuw"
          // TODO: wire to redo history
          className="flex size-8 items-center justify-center rounded-[8px] transition-colors hover:bg-surface-2"
        >
          <Redo2 className="size-[15px]" />
        </button>
      </div>

      {/* AI action */}
      <Button variant="secondary" size="sm" onClick={onOpenAi}>
        <Sparkles className="size-3.5 text-primary" />
        <span className="hidden sm:inline">AI</span>
      </Button>

      {/* Template switch */}
      <Button
        variant="secondary"
        size="sm"
        // TODO: open template switcher
      >
        <LayoutTemplate className="size-3.5" />
        <span className="hidden sm:inline">Template</span>
      </Button>

      {/* Export */}
      <Button variant="ink" size="sm" onClick={onExport}>
        <Download className="size-3.5" />
        Exporteer
      </Button>

      <span className="mx-0.5 h-6 w-px bg-border" aria-hidden />

      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-primary",
        )}
      >
        SB
      </span>
    </header>
  );
}
