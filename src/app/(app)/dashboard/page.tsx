"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/states";
import { cn } from "@/lib/utils";

// TODO: wire to Supabase resumes CRUD

type ResumeStatus = "ready" | "needs-work" | "draft";

interface Resume {
  id: string;
  title: string;
  initials: string;
  template: string;
  editedAgo: string;
  ats: number | null;
  status: ResumeStatus;
}

const RESUMES: Resume[] = [
  {
    id: "1",
    title: "Senior Product Marketeer",
    initials: "PM",
    template: "Modern",
    editedAgo: "2 uur geleden",
    ats: 92,
    status: "ready",
  },
  {
    id: "2",
    title: "Marketing Manager",
    initials: "MM",
    template: "Classic",
    editedAgo: "gisteren",
    ats: 74,
    status: "needs-work",
  },
  {
    id: "3",
    title: "Growth Lead (EN)",
    initials: "GL",
    template: "Sidebar",
    editedAgo: "3 dagen geleden",
    ats: 89,
    status: "ready",
  },
  {
    id: "4",
    title: "Naamloos cv",
    initials: "NC",
    template: "Minimalist",
    editedAgo: "1 week geleden",
    ats: null,
    status: "draft",
  },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Recent" },
  { value: "name", label: "Naam" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function atsBadgeVariant(resume: Resume) {
  if (resume.status === "draft") return "neutral" as const;
  if (resume.ats !== null && resume.ats >= 85) return "success" as const;
  return "warning" as const;
}

function atsBadgeLabel(resume: Resume) {
  if (resume.status === "draft" || resume.ats === null) return "Concept";
  return `ATS ${resume.ats}`;
}

export default function DashboardPage() {
  const [sort, setSort] = React.useState<SortValue>("recent");

  // Toggle this to preview the empty state. Default: populated grid.
  const resumes = RESUMES;
  const isEmpty = resumes.length === 0;

  const sorted = React.useMemo(() => {
    const list = [...resumes];
    if (sort === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title, "nl"));
    }
    return list;
  }, [resumes, sort]);

  return (
    <div className="mx-auto w-full max-w-[1000px] px-6 py-10 sm:px-10 sm:pb-20">
      {/* Greeting */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[36px]">
            Goedemiddag, Sanne
          </h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            Je hebt {resumes.length} cv&apos;s. Eén staat klaar om af te ronden.
          </p>
        </div>
        <Button asChild size="lg" className="self-start sm:self-auto">
          <Link href="/editor/new">
            <Plus className="size-4" />
            Nieuw cv
          </Link>
        </Button>
      </header>

      {/* Stat row */}
      <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Actieve cv's" value="4" />
        <StatCard
          label="Gem. ATS-score"
          value="88"
          trend={
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
              <ArrowUpRight className="size-3.5" />6
            </span>
          }
        />
        <StatCard label="Downloads" value="12" />
      </section>

      {/* Recent header */}
      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Mijn cv&apos;s</h2>
        <Segmented<SortValue>
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
        />
      </div>

      {/* Grid */}
      {isEmpty ? (
        <div className="rounded-[16px] border border-border bg-card shadow-xs">
          <EmptyState
            title="Nog geen cv's"
            description="Maak je eerste cv om aan de slag te gaan. Begin vanaf nul of upload een bestaand cv."
            actionLabel="Nieuw cv maken"
            onAction={() => {
              // TODO: wire to Supabase resumes CRUD
              window.location.href = "/editor/new";
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {/* New cv card */}
          <Link
            href="/editor/new"
            className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-[16px] border-[1.5px] border-dashed border-border-strong bg-card text-center transition-all duration-200 hover:-translate-y-[3px] hover:border-primary/50 hover:shadow-md"
          >
            <span className="flex size-12 items-center justify-center rounded-[12px] bg-accent-soft text-primary transition-colors group-hover:bg-accent">
              <Plus className="size-6" />
            </span>
            <span className="text-sm font-semibold text-foreground">
              Nieuw cv maken
            </span>
            <span className="text-xs text-subtle">
              Scratch · upload · LinkedIn
            </span>
          </Link>

          {sorted.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: React.ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-border bg-card p-[18px] shadow-xs">
      <div className="mb-1.5 text-[13px] text-subtle">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-foreground">{value}</span>
        {trend}
      </div>
    </div>
  );
}

function ResumeCard({ resume }: { resume: Resume }) {
  const handleAction = (action: string) => {
    // TODO: wire to Supabase resumes CRUD
    toast(`${action} — ${resume.title}`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[16px] border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md">
      <Link
        href={`/editor/${resume.id}`}
        className="relative flex aspect-[4/3] items-center justify-center bg-surface-2 p-[18px]"
      >
        {/* Preview tile with initials */}
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-[14px] bg-ink text-lg font-semibold text-white shadow-md",
            resume.status === "draft" && "opacity-60",
          )}
        >
          {resume.initials}
        </div>
        <span className="absolute right-2.5 top-2.5">
          <Badge variant={atsBadgeVariant(resume)} className="shadow-xs">
            {atsBadgeLabel(resume)}
          </Badge>
        </span>
      </Link>

      <div className="flex items-center justify-between gap-2 border-t border-border-subtle p-3.5">
        <Link
          href={`/editor/${resume.id}`}
          className="min-w-0 flex-1"
        >
          <div className="truncate text-sm font-semibold text-foreground">
            {resume.title}
          </div>
          <div className="mt-0.5 truncate text-xs text-subtle">
            {resume.template} · Bewerkt {resume.editedAgo}
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Meer acties"
              className="flex size-8 shrink-0 items-center justify-center rounded-[9px] text-subtle transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => handleAction("Dupliceren")}>
              Dupliceren
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleAction("Hernoemen")}>
              Hernoemen
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleAction("Exporteren")}>
              Exporteren
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => handleAction("Verwijderen")}
            >
              Verwijderen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
