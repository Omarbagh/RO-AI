"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResumePreview } from "@/components/resume-preview";
import { TEMPLATES } from "@/lib/templates/registry";
import { SAMPLE_RESUME } from "@/lib/resume/sample";
import { createResumeAction } from "@/lib/resume/actions";
import type { ResumeData } from "@/lib/resume/schema";
import type { TemplateCategory } from "@/lib/templates/types";

const CATEGORY_LABELS: Record<TemplateCategory | "all", string> = {
  all: "Alle",
  modern: "Modern",
  classic: "Klassiek",
  creative: "Creatief",
  tech: "Tech",
  executive: "Executive",
  minimal: "Minimal",
};

/** Sample data re-themed for a given template, for the preview thumbnail. */
function previewData(templateId: string, accent: string): ResumeData {
  return {
    ...SAMPLE_RESUME,
    settings: { ...SAMPLE_RESUME.settings, templateId, accentColor: accent },
  };
}

export default function TemplatesPage() {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<TemplateCategory>();
    TEMPLATES.forEach((t) => set.add(t.meta.category));
    return ["all", ...Array.from(set)] as (TemplateCategory | "all")[];
  }, []);

  const visible = TEMPLATES.filter(
    (t) => category === "all" || t.meta.category === category,
  );

  return (
    <div>
      <header className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">Kies een template</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {TEMPLATES.length} professionele ontwerpen · wissel zonder data te verliezen
        </p>
      </header>

      {/* Category chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => {
          const count =
            c === "all"
              ? TEMPLATES.length
              : TEMPLATES.filter((t) => t.meta.category === c).length;
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                active
                  ? "border-accent-soft-border bg-accent-soft text-ink"
                  : "border-border-strong text-muted-foreground hover:bg-surface-2",
              )}
            >
              {CATEGORY_LABELS[c]}
              <span className={cn("text-xs", active ? "text-primary" : "text-subtle")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map(({ meta }) => (
          <div
            key={meta.id}
            className="group overflow-hidden rounded-[16px] border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Live preview thumbnail (top-cropped) */}
            <div className="relative h-[340px] overflow-hidden border-b border-border bg-surface-2">
              <div className="pointer-events-none absolute inset-x-0 top-0 p-3">
                <ResumePreview data={previewData(meta.id, meta.defaultAccent)} />
              </div>
              {meta.isPro ? (
                <Badge className="absolute right-3 top-3" variant="default">
                  Pro
                </Badge>
              ) : (
                <Badge className="absolute right-3 top-3" variant="success">
                  ATS ✓
                </Badge>
              )}
              {/* Hover action */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <form action={createResumeAction.bind(null, meta.id)}>
                  <Button type="submit" size="sm">
                    Gebruik template <ArrowRight className="size-4" />
                  </Button>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-semibold">{meta.name}</div>
                <div className="text-xs text-subtle">{CATEGORY_LABELS[meta.category]}</div>
              </div>
              <span
                className="size-4 rounded-full"
                style={{ background: meta.defaultAccent }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
