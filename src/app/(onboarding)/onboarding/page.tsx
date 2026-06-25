"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PenLine, Upload } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  { n: 1, label: "Start" },
  { n: 2, label: "Gegevens" },
  { n: 3, label: "Template" },
] as const;

function LinkedInMark() {
  return (
    <span className="flex size-6 items-center justify-center rounded-[6px] bg-[#0A66C2] text-[13px] font-bold leading-none text-white">
      in
    </span>
  );
}

export default function OnboardingPage() {
  const router = useRouter();

  function choose(path: "scratch" | "upload" | "linkedin") {
    // TODO: wire to onboarding flow (create draft cv from chosen source, then route to editor)
    void path;
    router.push("/editor/new");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar with step indicator */}
      <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-[8px] bg-ink text-[15px] font-semibold text-white">
            C
          </span>
          <span className="text-[15px] font-semibold text-foreground">
            CVhero
          </span>
        </Link>

        <div className="flex-1" />

        <nav
          aria-label="Onboarding stappen"
          className="hidden items-center gap-1.5 text-xs text-subtle sm:flex"
        >
          {steps.map((step, i) => {
            const active = step.n === 1;
            return (
              <div key={step.n} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-[22px] items-center justify-center rounded-full text-[11px] font-semibold",
                    active
                      ? "bg-primary text-white"
                      : "bg-border-subtle text-subtle",
                  )}
                >
                  {step.n}
                </span>
                <span
                  className={cn(
                    active ? "font-medium text-foreground" : "text-subtle",
                  )}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 ? (
                  <span className="mx-1.5 h-px w-6 bg-border-strong" />
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex-1" />

        <Link
          href="/dashboard"
          className="text-[13px] text-subtle transition-colors hover:text-foreground"
        >
          Overslaan
        </Link>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center px-6 py-12 text-center sm:py-14">
        <h1 className="text-[clamp(28px,5vw,36px)] font-medium tracking-[-0.02em] text-foreground">
          Hoe wil je beginnen?
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Kies een startpunt — je kunt later altijd alles aanpassen.
        </p>

        <div className="mt-10 grid w-full max-w-[860px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Scratch */}
          <button
            type="button"
            onClick={() => choose("scratch")}
            className="group flex flex-col rounded-[16px] border border-border bg-card p-7 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <span className="mb-[18px] flex size-12 items-center justify-center rounded-[13px] bg-accent-soft text-primary">
              <PenLine className="size-5" />
            </span>
            <h3 className="mb-[7px] text-[17px] font-semibold text-foreground">
              Begin opnieuw
            </h3>
            <p className="text-[13.5px] leading-[1.5] text-muted-foreground">
              Bouw je cv stap voor stap op met AI die meeschrijft.
            </p>
            <span className="mt-[18px] flex items-center gap-1.5 text-[13px] font-semibold text-primary">
              Start leeg
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>

          {/* Upload (recommended) */}
          <button
            type="button"
            onClick={() => choose("upload")}
            className="group relative flex flex-col rounded-[16px] border-2 border-primary bg-card p-7 text-left shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <span className="absolute -top-[11px] left-[22px] rounded-[6px] bg-primary px-2.5 py-[3px] text-[11px] font-semibold text-white">
              Snelst
            </span>
            <span className="mb-[18px] flex size-12 items-center justify-center rounded-[13px] bg-ink text-white">
              <Upload className="size-5" />
            </span>
            <h3 className="mb-[7px] text-[17px] font-semibold text-foreground">
              Upload bestaande cv
            </h3>
            <p className="text-[13.5px] leading-[1.5] text-muted-foreground">
              PDF of Word — wij lezen het in en zetten het meteen om.
            </p>
            <span className="mt-[18px] rounded-[10px] border-[1.5px] border-dashed border-accent-soft-border bg-accent-soft/60 p-3.5 text-center">
              <span className="block text-[12.5px] font-semibold text-primary">
                Sleep je bestand hierheen
              </span>
              <span className="mt-0.5 block text-[11px] text-subtle">
                PDF, DOCX · max 5MB
              </span>
            </span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => choose("linkedin")}
            className="group flex flex-col rounded-[16px] border border-border bg-card p-7 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <span className="mb-[18px] flex size-12 items-center justify-center rounded-[13px] bg-success-soft">
              <LinkedInMark />
            </span>
            <h3 className="mb-[7px] text-[17px] font-semibold text-foreground">
              Importeer LinkedIn
            </h3>
            <p className="text-[13.5px] leading-[1.5] text-muted-foreground">
              Koppel je profiel en haal je ervaring automatisch op.
            </p>
            <span className="mt-[18px] flex items-center gap-1.5 text-[13px] font-semibold text-primary">
              Koppel profiel
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
