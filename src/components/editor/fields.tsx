"use client";

import * as React from "react";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[7px]", className)}>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[7px]", className)}>
      <Label>{label}</Label>
      <Textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/** Edit a list of bullet strings (e.g. experience highlights). */
export function BulletsEditor({
  label,
  value,
  onChange,
  placeholder = "Beschrijf een resultaat met een werkwoord…",
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, text: string) =>
    onChange(value.map((b, idx) => (idx === i ? text : b)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, ""]);

  return (
    <div className="flex flex-col gap-[7px]">
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        {value.map((bullet, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-[14px] size-1.5 shrink-0 rounded-full bg-primary" />
            <Textarea
              value={bullet}
              rows={2}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
              className="min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-2 rounded-md p-1.5 text-subtle transition-colors hover:bg-danger-soft hover:text-danger"
              aria-label="Verwijder bullet"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={add} className="self-start">
          <Plus className="size-4" /> Bullet toevoegen
        </Button>
      </div>
    </div>
  );
}

/** Edit a list of short string tags (skills technologies, etc.). */
export function TagsEditor({
  label,
  value,
  onChange,
  placeholder = "Voeg toe en druk op Enter",
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");
  const commit = () => {
    const t = draft.trim();
    if (t) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div className="flex flex-col gap-[7px]">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              aria-label={`Verwijder ${tag}`}
            >
              <X className="size-3 text-subtle hover:text-danger" />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
      />
    </div>
  );
}

/** A removable card wrapper for an item in a repeatable list. */
export function ItemCard({
  title,
  subtitle,
  onRemove,
  children,
}: {
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-border bg-card p-4 shadow-xs">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">
            {title || "Nieuw item"}
          </div>
          {subtitle ? (
            <div className="truncate text-xs text-subtle">{subtitle}</div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded-md p-1.5 text-subtle transition-colors hover:bg-danger-soft hover:text-danger"
          aria-label="Verwijder item"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export function AddItemButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button variant="secondary" onClick={onClick} className="w-full">
      <Plus className="size-4" /> {label}
    </Button>
  );
}
