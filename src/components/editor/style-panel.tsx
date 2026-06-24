"use client";

import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Segmented } from "@/components/ui/segmented";
import { TEMPLATES } from "@/lib/templates/registry";
import type { ResumeData, ResumeSettings } from "@/lib/resume/schema";

const ACCENTS = [
  "#2f6bff",
  "#2563eb",
  "#15172b",
  "#1e9e6a",
  "#d98a1e",
  "#dc4b3e",
  "#7c3aed",
  "#0ea5e9",
];

const FONT_SCALES = [
  { value: "0.92", label: "Compact" },
  { value: "1", label: "Standaard" },
  { value: "1.08", label: "Ruim" },
] as const;

const PAGE_SIZES = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter" },
] as const;

export function StylePanel({
  data,
  onSettings,
  isPro = false,
}: {
  data: ResumeData;
  onSettings: (patch: Partial<ResumeSettings>) => void;
  isPro?: boolean;
}) {
  const { settings } = data;
  const scaleValue = String(settings.fontScale);

  return (
    <div className="flex flex-col gap-7">
      {/* Templates */}
      <section>
        <Label className="mb-3 block">Template</Label>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map(({ meta }) => {
            const active = settings.templateId === meta.id;
            const locked = meta.isPro && !isPro;
            return (
              <button
                key={meta.id}
                type="button"
                onClick={() => onSettings({ templateId: meta.id })}
                className={cn(
                  "group relative flex flex-col items-start gap-2 rounded-[12px] border bg-card p-3 text-left transition-all",
                  active
                    ? "border-primary ring-[3px] ring-primary/15"
                    : "border-border hover:border-border-strong",
                )}
              >
                <span
                  className="h-10 w-full rounded-[6px]"
                  style={{
                    background: `linear-gradient(135deg, ${meta.defaultAccent}, ${meta.defaultAccent}22)`,
                  }}
                />
                <span className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-semibold">{meta.name}</span>
                  {active ? (
                    <Check className="size-4 text-primary" />
                  ) : locked ? (
                    <Lock className="size-3.5 text-subtle" />
                  ) : null}
                </span>
                {meta.isPro ? (
                  <Badge className="absolute right-2 top-2" variant="default">
                    Pro
                  </Badge>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      {/* Accent */}
      <section>
        <Label className="mb-3 block">Accentkleur</Label>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Accent ${c}`}
              onClick={() => onSettings({ accentColor: c })}
              className={cn(
                "size-7 rounded-full border transition-transform hover:scale-110",
                settings.accentColor.toLowerCase() === c
                  ? "ring-2 ring-foreground ring-offset-2"
                  : "border-border",
              )}
              style={{ background: c }}
            />
          ))}
          <label className="ml-1 inline-flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-border-strong text-subtle">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => onSettings({ accentColor: e.target.value })}
              className="size-0 opacity-0"
            />
            +
          </label>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <Label className="mb-3 block">Dichtheid</Label>
        <Segmented
          options={FONT_SCALES}
          value={scaleValue}
          onChange={(v) => onSettings({ fontScale: Number(v) })}
        />
      </section>

      {/* Page size */}
      <section>
        <Label className="mb-3 block">Paginaformaat</Label>
        <Segmented
          options={PAGE_SIZES}
          value={settings.pageSize}
          onChange={(v) => onSettings({ pageSize: v as ResumeSettings["pageSize"] })}
        />
      </section>
    </div>
  );
}
