"use client";

import * as React from "react";
import { AlertTriangle, FileText, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FileText,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-7 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-[15px] bg-surface-2 text-disabled-text">
        <Icon size={24} />
      </div>
      <div className="mb-1.5 text-[15px] font-semibold text-foreground">
        {title}
      </div>
      <div className="text-[13px] leading-relaxed text-subtle max-w-[240px]">
        {description}
      </div>
      {actionLabel ? (
        <Button size="sm" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title = "Er ging iets mis",
  description = "We konden je cv's niet laden. Controleer je verbinding en probeer opnieuw.",
  onRetry,
  onSupport,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onSupport?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-7 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-[15px] bg-danger-soft text-danger">
        <AlertTriangle size={24} />
      </div>
      <div className="mb-1.5 text-[15px] font-semibold text-foreground">
        {title}
      </div>
      <div className="mb-4 text-[13px] leading-relaxed text-subtle max-w-[240px]">
        {description}
      </div>
      <div className="flex gap-2.5">
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Opnieuw
        </Button>
        <Button variant="ink" size="sm" onClick={onSupport}>
          Support
        </Button>
      </div>
    </div>
  );
}

export function LoadingState({
  label = "Cv's laden…",
  rows = 3,
}: {
  label?: string;
  rows?: number;
}) {
  return (
    <div className="p-[22px]">
      <div className="mb-[18px] flex items-center gap-2.5">
        <Spinner />
        <span className="text-[13px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn("flex gap-3", i < rows - 1 && "mb-[14px]")}
        >
          <div className="skel size-12 rounded-[11px]" />
          <div className="flex-1">
            <div className="skel mb-2 h-[11px] w-[70%]" />
            <div className="skel h-[10px] w-[45%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
