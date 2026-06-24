"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// TODO: wire to template registry + selection

type Category = "Modern" | "Klassiek" | "Creatief" | "Tech" | "Executive";

type Template = {
  id: string;
  name: string;
  category: Category;
  pro: boolean;
  ats: boolean;
  thumb: "modern" | "classic" | "sidebar" | "minimalist" | "executive" | "timeline" | "creative" | "professional";
};

const TEMPLATES: Template[] = [
  { id: "modern", name: "Modern", category: "Modern", pro: false, ats: true, thumb: "modern" },
  { id: "classic", name: "Classic", category: "Klassiek", pro: false, ats: true, thumb: "classic" },
  { id: "sidebar", name: "Sidebar", category: "Modern", pro: false, ats: true, thumb: "sidebar" },
  { id: "minimalist", name: "Minimalist", category: "Klassiek", pro: false, ats: true, thumb: "minimalist" },
  { id: "executive", name: "Executive", category: "Executive", pro: true, ats: false, thumb: "executive" },
  { id: "timeline", name: "Timeline", category: "Creatief", pro: false, ats: true, thumb: "timeline" },
  { id: "creative", name: "Creative", category: "Creatief", pro: true, ats: false, thumb: "creative" },
  { id: "professional", name: "Professional", category: "Klassiek", pro: false, ats: true, thumb: "professional" },
  { id: "devfolio", name: "Devfolio", category: "Tech", pro: false, ats: true, thumb: "sidebar" },
  { id: "stack", name: "Stack", category: "Tech", pro: true, ats: true, thumb: "minimalist" },
  { id: "aurora", name: "Aurora", category: "Creatief", pro: true, ats: false, thumb: "creative" },
  { id: "boardroom", name: "Boardroom", category: "Executive", pro: true, ats: false, thumb: "executive" },
];

const CATEGORIES: { label: string; value: Category | "Alle" }[] = [
  { label: "Alle", value: "Alle" },
  { label: "Modern", value: "Modern" },
  { label: "Klassiek", value: "Klassiek" },
  { label: "Creatief", value: "Creatief" },
  { label: "Tech", value: "Tech" },
  { label: "Executive", value: "Executive" },
];

const ACTIVE_TEMPLATE_ID = "modern";

export default function TemplatesPage() {
  const [active, setActive] = useState<Category | "Alle">("Alle");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("Alle", TEMPLATES.length);
    for (const t of TEMPLATES) {
      map.set(t.category, (map.get(t.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (active === "Alle" ? TEMPLATES : TEMPLATES.filter((t) => t.category === active)),
    [active],
  );

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.015em] text-foreground md:text-[30px]">
            Kies een template
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {TEMPLATES.length} professionele ontwerpen · wissel zonder data te verliezen
          </p>
        </div>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-[9px] border border-border-strong bg-card px-3 py-2 text-[13px] text-muted-foreground shadow-xs transition-colors hover:bg-muted"
        >
          Sorteer: Populair
          <ChevronDown className="size-3.5 text-subtle" />
        </button>
      </div>

      {/* Category filter chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat.value === active;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActive(cat.value)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-[14px] py-[7px] text-[13px] font-medium transition-colors",
                isActive
                  ? "border-accent-soft-border bg-accent-soft font-semibold text-ink"
                  : "border-border bg-card text-text-body hover:bg-muted",
              )}
            >
              {cat.label}
              <span className={cn("text-xs", isActive ? "text-primary" : "text-subtle")}>
                {counts.get(cat.value) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((t) => (
          <TemplateCard key={t.id} template={t} isCurrent={t.id === ACTIVE_TEMPLATE_ID} />
        ))}
      </div>
    </main>
  );
}

function TemplateCard({ template, isCurrent }: { template: Template; isCurrent: boolean }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[16px] bg-card transition-all duration-200 hover:-translate-y-[3px]",
        isCurrent
          ? "border-2 border-primary shadow-[0_8px_28px_-12px_rgba(47,107,255,.4)]"
          : "border border-border shadow-sm hover:shadow-lg",
      )}
    >
      {isCurrent && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">
          In gebruik
        </span>
      )}

      {/* Thumbnail */}
      <Thumbnail kind={template.thumb} />

      {/* Hover actions (not shown on current/in-use card, matching design) */}
      {!isCurrent && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {/* TODO: wire to template registry + selection */}
          <Button variant="secondary" size="sm" className="border-0">
            Voorbeeld
          </Button>
          <Button asChild size="sm">
            <Link href="/editor/new">Gebruik</Link>
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border-subtle px-3.5 py-3">
        <span className="text-[13px] font-semibold text-foreground">{template.name}</span>
        {template.pro ? (
          <Badge className="px-1.5 py-0.5 text-[11px]">Pro</Badge>
        ) : template.ats ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
            ATS <Check className="size-3" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* CSS placeholder thumbnails — recreate the design's blocky previews. */
function Thumbnail({ kind }: { kind: Template["thumb"] }) {
  switch (kind) {
    case "modern":
      return (
        <div className="aspect-[3/4] bg-card p-4">
          <div className="-mx-4 -mt-4 mb-3 rounded-[3px] bg-ink px-4 py-3">
            <div className="mb-1 h-2 w-[74px] rounded-[3px] bg-white" />
            <div className="h-[5px] w-[54px] rounded-[3px] bg-[#9DB6FF]" />
          </div>
          <div className="mb-1.5 h-[5px] w-[42px] rounded-[2px] bg-primary" />
          <div className="mb-1 h-[5px] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-3 h-[5px] w-[85%] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-1.5 h-[5px] w-[52px] rounded-[2px] bg-primary" />
          <div className="mb-1 h-[5px] rounded-[2px] bg-[#EFEDE7]" />
          <div className="h-[5px] w-[75%] rounded-[2px] bg-[#EFEDE7]" />
        </div>
      );
    case "classic":
      return (
        <div className="aspect-[3/4] bg-card p-4 text-center">
          <div className="mx-auto mb-1 h-[9px] w-[90px] rounded-[3px] bg-foreground" />
          <div className="mx-auto mb-3 h-[5px] w-[60px] rounded-[2px] bg-subtle" />
          <div className="mb-3 h-px bg-border-strong" />
          <div className="mb-1 h-[5px] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-1 h-[5px] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mx-auto mb-3 h-[5px] w-[80%] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mx-auto mb-1.5 h-[5px] w-[50px] rounded-[2px] bg-foreground" />
          <div className="mx-auto h-[5px] w-[70%] rounded-[2px] bg-[#EFEDE7]" />
        </div>
      );
    case "sidebar":
      return (
        <div className="flex aspect-[3/4] bg-card">
          <div className="w-[38%] bg-ink p-2.5">
            <div className="mx-auto mb-3 size-7 rounded-full bg-[#5C86FF]" />
            <div className="mb-1 h-1 rounded-[2px] bg-white/20" />
            <div className="mb-3 h-1 w-[70%] rounded-[2px] bg-white/20" />
            <div className="mb-1.5 h-1 w-[55%] rounded-[2px] bg-[#5C86FF]" />
            <div className="mb-[3px] h-1 rounded-[2px] bg-white/15" />
            <div className="h-1 w-[80%] rounded-[2px] bg-white/15" />
          </div>
          <div className="flex-1 p-3">
            <div className="mb-1.5 h-[5px] w-[50px] rounded-[2px] bg-primary" />
            <div className="mb-[3px] h-1 rounded-[2px] bg-[#EFEDE7]" />
            <div className="mb-3 h-1 w-[85%] rounded-[2px] bg-[#EFEDE7]" />
            <div className="mb-1.5 h-[5px] w-[50px] rounded-[2px] bg-primary" />
            <div className="h-1 w-[70%] rounded-[2px] bg-[#EFEDE7]" />
          </div>
        </div>
      );
    case "minimalist":
      return (
        <div className="aspect-[3/4] bg-card p-[18px]">
          <div className="mb-[3px] h-2.5 w-[80px] rounded-[3px] bg-foreground" />
          <div className="mb-[18px] h-[5px] w-[55px] rounded-[2px] bg-subtle" />
          <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-foreground" />
          <div className="mb-1 h-1 rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-[15px] h-1 w-[90%] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-foreground" />
          <div className="h-1 w-[75%] rounded-[2px] bg-[#EFEDE7]" />
        </div>
      );
    case "executive":
      return (
        <div className="aspect-[3/4] bg-ink p-4">
          <div className="mb-1 h-[9px] w-[84px] rounded-[3px] bg-white" />
          <div className="mb-3.5 h-[5px] w-[56px] rounded-[2px] bg-[#9DB6FF]" />
          <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-[#5C86FF]" />
          <div className="mb-1 h-1 rounded-[2px] bg-white/15" />
          <div className="mb-3.5 h-1 w-[85%] rounded-[2px] bg-white/15" />
          <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-[#5C86FF]" />
          <div className="h-1 w-[70%] rounded-[2px] bg-white/15" />
        </div>
      );
    case "timeline":
      return (
        <div className="aspect-[3/4] bg-card p-4">
          <div className="mb-[3px] h-[9px] w-[80px] rounded-[3px] bg-foreground" />
          <div className="mb-3.5 h-[5px] w-[50px] rounded-[2px] bg-subtle" />
          {[
            { dot: "bg-primary", w: "80%" },
            { dot: "bg-[#CFCBC2]", w: "65%" },
            { dot: "bg-[#CFCBC2]", w: "70%", last: true },
          ].map((row, i) => (
            <div key={i} className={cn("flex gap-2.5", !row.last && "mb-2")}>
              <div className={cn("mt-px size-2 shrink-0 rounded-full", row.dot)} />
              <div className="flex-1">
                {!row.last && <div className="mb-[3px] h-1 rounded-[2px] bg-[#EFEDE7]" />}
                <div className="h-1 rounded-[2px] bg-[#EFEDE7]" style={{ width: row.w }} />
              </div>
            </div>
          ))}
        </div>
      );
    case "creative":
      return (
        <div className="aspect-[3/4] bg-card">
          <div className="flex h-[46%] flex-col justify-end bg-gradient-to-br from-primary to-[#5C86FF] p-4">
            <div className="mb-2 size-[30px] rounded-full bg-white" />
            <div className="mb-1 h-2 w-[74px] rounded-[3px] bg-white" />
            <div className="h-[5px] w-[50px] rounded-[2px] bg-white/65" />
          </div>
          <div className="p-4">
            <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-primary" />
            <div className="mb-1 h-1 rounded-[2px] bg-[#EFEDE7]" />
            <div className="mb-3 h-1 w-[80%] rounded-[2px] bg-[#EFEDE7]" />
            <div className="mb-1.5 h-1 w-[42px] rounded-[2px] bg-primary" />
            <div className="h-1 w-[70%] rounded-[2px] bg-[#EFEDE7]" />
          </div>
        </div>
      );
    case "professional":
      return (
        <div className="aspect-[3/4] bg-card p-4">
          <div className="mb-3 flex items-start justify-between border-b-2 border-foreground pb-2">
            <div>
              <div className="mb-1 h-[9px] w-[80px] rounded-[3px] bg-foreground" />
              <div className="h-[5px] w-[54px] rounded-[2px] bg-subtle" />
            </div>
          </div>
          <div className="mb-1.5 h-[5px] w-[46px] rounded-[2px] bg-foreground" />
          <div className="mb-1 h-1 rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-3 h-1 w-[85%] rounded-[2px] bg-[#EFEDE7]" />
          <div className="mb-1.5 h-[5px] w-[46px] rounded-[2px] bg-foreground" />
          <div className="h-1 w-[75%] rounded-[2px] bg-[#EFEDE7]" />
        </div>
      );
  }
}
