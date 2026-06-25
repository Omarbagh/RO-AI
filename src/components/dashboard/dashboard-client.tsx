"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
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
import {
  deleteResumeAction,
  duplicateResumeAction,
  renameResumeAction,
} from "@/lib/resume/actions";

export interface DashboardResume {
  id: string;
  title: string;
  template: string;
  editedAgo: string;
  ats: number | null;
}

export interface DashboardStats {
  active: string;
  atsAvg: string;
  downloads: string;
}

const SORT_OPTIONS = [
  { value: "recent", label: "Recent" },
  { value: "name", label: "Naam" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function initialsOf(title: string): string {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "CV";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function DashboardClient({
  resumes,
  userName,
  stats,
  canPersist,
}: {
  resumes: DashboardResume[];
  userName: string;
  stats: DashboardStats;
  canPersist: boolean;
}) {
  const [sort, setSort] = React.useState<SortValue>("recent");
  const router = useRouter();

  const sorted = React.useMemo(() => {
    const list = [...resumes];
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title, "nl"));
    return list;
  }, [resumes, sort]);

  const isEmpty = resumes.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1000px] px-6 py-10 sm:px-10 sm:pb-20">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[36px]">
            Welkom terug, {userName}
          </h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            Je hebt {resumes.length} cv{resumes.length === 1 ? "" : "'s"}.
          </p>
        </div>
        <Button asChild size="lg" className="self-start sm:self-auto">
          <Link href="/editor/new">
            <Plus className="size-4" /> Nieuw cv
          </Link>
        </Button>
      </header>

      <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Actieve cv's" value={stats.active} />
        <StatCard
          label="Gem. ATS-score"
          value={stats.atsAvg}
          trend={
            stats.atsAvg !== "—" ? (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
                <ArrowUpRight className="size-3.5" />6
              </span>
            ) : undefined
          }
        />
        <StatCard label="Downloads" value={stats.downloads} />
      </section>

      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Mijn cv&apos;s</h2>
        <Segmented<SortValue> options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      {isEmpty ? (
        <div className="rounded-[16px] border border-border bg-card shadow-xs">
          <EmptyState
            title="Nog geen cv's"
            description="Maak je eerste cv om aan de slag te gaan. Begin vanaf nul of upload een bestaand cv."
            actionLabel="Nieuw cv maken"
            onAction={() => router.push("/editor/new")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/editor/new"
            className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-[16px] border-[1.5px] border-dashed border-border-strong bg-card text-center transition-all duration-200 hover:-translate-y-[3px] hover:border-primary/50 hover:shadow-md"
          >
            <span className="flex size-12 items-center justify-center rounded-[12px] bg-accent-soft text-primary transition-colors group-hover:bg-accent">
              <Plus className="size-6" />
            </span>
            <span className="text-sm font-semibold text-foreground">Nieuw cv maken</span>
            <span className="text-xs text-subtle">Scratch · upload · LinkedIn</span>
          </Link>

          {sorted.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              canPersist={canPersist}
              onChanged={() => router.refresh()}
            />
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

function ResumeCard({
  resume,
  canPersist,
  onChanged,
}: {
  resume: DashboardResume;
  canPersist: boolean;
  onChanged: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  const variant =
    resume.ats === null ? "neutral" : resume.ats >= 85 ? "success" : "warning";
  const label = resume.ats === null ? "Concept" : `ATS ${resume.ats}`;

  async function run(action: () => Promise<{ ok: boolean; error?: string }>, ok: string) {
    if (!canPersist) {
      toast.message("Demo-modus", { description: "Acties worden bewaard zodra Supabase is gekoppeld." });
      return;
    }
    setBusy(true);
    const res = await action();
    setBusy(false);
    if (res.ok) {
      toast.success(ok);
      onChanged();
    } else {
      toast.error(res.error ?? "Mislukt.");
    }
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[16px] border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md",
        busy && "pointer-events-none opacity-60",
      )}
    >
      <Link
        href={`/editor/${resume.id}`}
        className="relative flex aspect-[4/3] items-center justify-center bg-surface-2 p-[18px]"
      >
        <div className="flex size-16 items-center justify-center rounded-[14px] bg-ink text-lg font-semibold text-white shadow-md">
          {initialsOf(resume.title)}
        </div>
        <span className="absolute right-2.5 top-2.5">
          <Badge variant={variant} className="shadow-xs">
            {label}
          </Badge>
        </span>
      </Link>

      <div className="flex items-center justify-between gap-2 border-t border-border-subtle p-3.5">
        <Link href={`/editor/${resume.id}`} className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{resume.title}</div>
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
            <DropdownMenuItem
              onSelect={() => run(() => duplicateResumeAction(resume.id), "Gedupliceerd")}
            >
              Dupliceren
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                const title = window.prompt("Nieuwe naam", resume.title);
                if (title && title.trim()) {
                  void run(() => renameResumeAction(resume.id, title), "Hernoemd");
                }
              }}
            >
              Hernoemen
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push(`/editor/${resume.id}`)}>
              Exporteren
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => {
                if (window.confirm(`"${resume.title}" verwijderen?`)) {
                  void run(() => deleteResumeAction(resume.id), "Verwijderd");
                }
              }}
            >
              Verwijderen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
