"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CvData } from "@/components/editor/sample-cv";

type SectionStatus = "complete" | "warning" | "empty";

interface SectionMeta {
  id: string;
  label: string;
  status: SectionStatus;
  count?: number;
}

const SECTIONS: SectionMeta[] = [
  { id: "personal", label: "Persoonsgegevens", status: "complete" },
  { id: "profile", label: "Profiel", status: "complete" },
  { id: "experience", label: "Werkervaring", status: "complete", count: 2 },
  { id: "education", label: "Opleiding", status: "warning" },
  { id: "skills", label: "Vaardigheden", status: "complete" },
  { id: "languages", label: "Talen", status: "empty" },
  { id: "certificates", label: "Certificaten", status: "empty" },
];

function StatusBadge({
  status,
  index,
  active,
}: {
  status: SectionStatus;
  index: number;
  active: boolean;
}) {
  if (active) {
    return (
      <span className="flex size-6 flex-none items-center justify-center rounded-[7px] bg-primary text-xs font-semibold text-white">
        {index + 1}
      </span>
    );
  }
  if (status === "complete") {
    return (
      <span className="flex size-6 flex-none items-center justify-center rounded-[7px] bg-success-soft text-success">
        <Check className="size-3.5" />
      </span>
    );
  }
  if (status === "warning") {
    return (
      <span className="flex size-6 flex-none items-center justify-center rounded-[7px] bg-warning-soft text-[11px] font-semibold text-warning">
        !
      </span>
    );
  }
  return (
    <span className="flex size-6 flex-none items-center justify-center rounded-[7px] bg-surface-2 text-subtle">
      <Plus className="size-3.5" />
    </span>
  );
}

function FieldGroup({
  label,
  defaultValue,
  focused,
}: {
  label: string;
  defaultValue: string;
  focused?: boolean;
}) {
  return (
    <div>
      <Label className="mb-1.5 text-xs text-muted-foreground">{label}</Label>
      <Input
        defaultValue={defaultValue}
        // TODO: bind to CV data model + autosave
        className={cn(focused && "border-primary ring-[3px] ring-primary/18")}
      />
    </div>
  );
}

export function EditorSectionList({ cv }: { cv: CvData }) {
  const [activeSection, setActiveSection] = React.useState("experience");
  const [expanded, setExpanded] = React.useState<string | null>("exp-1");

  return (
    <div className="flex flex-col gap-6">
      {/* ── Section navigator ─────────────────────────────── */}
      <div>
        <div className="eyebrow mb-3 px-1 text-[11px] text-subtle">Secties</div>
        <div className="flex flex-col gap-0.5">
          {SECTIONS.map((section, i) => {
            const active = section.id === activeSection;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "group flex items-center gap-[11px] rounded-[9px] px-[10px] py-[9px] text-left transition-colors",
                  active
                    ? "border border-accent-soft-border bg-accent-soft"
                    : "border border-transparent hover:bg-surface-2",
                )}
              >
                <GripVertical className="size-[15px] flex-none cursor-grab text-disabled-text opacity-0 transition-opacity group-hover:opacity-100" />
                <StatusBadge status={section.status} index={i} active={active} />
                <span
                  className={cn(
                    "flex-1 text-[13.5px]",
                    active
                      ? "font-semibold text-ink"
                      : section.status === "empty"
                        ? "font-medium text-subtle"
                        : "font-medium text-text-body",
                  )}
                >
                  {section.label}
                </span>
                {section.count != null && (
                  <span className="text-[11px] font-semibold text-primary">
                    {section.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="my-4 h-px bg-border-subtle" />

        <Button variant="secondary" className="w-full bg-surface-2">
          <Plus className="size-4 text-primary" />
          Sectie toevoegen
        </Button>
      </div>

      {/* ── Active section editor (Werkervaring) ──────────── */}
      <div>
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground">
              Werkervaring
            </h2>
            <p className="mt-0.5 text-[13px] text-subtle">
              Begin met je meest recente functie.
            </p>
          </div>
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-[7px] bg-accent-soft px-[10px] py-[5px] text-[11px] font-semibold text-primary">
            <Sparkles className="size-3" /> AI vult aan
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {cv.experience.map((exp) => {
            const isOpen = expanded === exp.id;
            return (
              <div
                key={exp.id}
                className="overflow-hidden rounded-[14px] border border-border-strong bg-card shadow-[0_1px_3px_rgba(20,20,30,.04)]"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : exp.id)}
                  className={cn(
                    "flex w-full items-center gap-[10px] px-4 py-[14px] text-left",
                    isOpen && "border-b border-border bg-surface-2",
                  )}
                >
                  <GripVertical className="size-[15px] flex-none cursor-grab text-subtle" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {exp.role} · {exp.company}
                    </div>
                    <div className="text-xs text-subtle">{exp.period}</div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="size-4 text-subtle" />
                  ) : (
                    <ChevronDown className="size-4 text-subtle" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4">
                    <div className="mb-3 grid grid-cols-2 gap-3">
                      <FieldGroup label="Functie" defaultValue={exp.role} />
                      <FieldGroup label="Bedrijf" defaultValue={exp.company} />
                    </div>
                    <div className="mb-3">
                      <FieldGroup label="Periode" defaultValue={exp.period} />
                    </div>

                    <Label className="mb-1.5 text-xs text-muted-foreground">
                      Beschrijving · bullet points
                    </Label>
                    <div className="flex flex-col gap-2">
                      {exp.bullets.map((bullet, bi) => (
                        <div
                          key={bi}
                          className="flex items-start gap-2"
                        >
                          <GripVertical className="mt-2.5 size-[14px] flex-none cursor-grab text-disabled-text" />
                          <Textarea
                            defaultValue={bullet}
                            // TODO: bind bullet to data model + autosave
                            className={cn(
                              "min-h-[56px]",
                              bi === 0 &&
                                "border-primary ring-[3px] ring-primary/14",
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Inline AI suggestion */}
                    <div className="mt-[10px] rounded-[10px] border border-accent-soft-border bg-[#F6F8FF] p-3">
                      <div className="mb-2 flex items-center gap-1.5">
                        <Sparkles className="size-3 text-primary" />
                        <span className="text-[11.5px] font-semibold tracking-[0.02em] text-primary">
                          AI-suggestie · krachtiger
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-text-body">
                        Stuurde de go-to-market van drie betaalproducten aan en
                        gaf leiding aan een team van zes.{" "}
                        <strong className="rounded-[3px] bg-[#E1EAFF] px-0.5 font-semibold text-ink">
                          Verhoogde de activatie met 40% in 12 maanden
                        </strong>{" "}
                        via experimentgedreven campagnes.
                      </p>
                      <div className="mt-[11px] flex gap-2">
                        {/* TODO: wire AI accept/dismiss */}
                        <Button size="sm">Vervang</Button>
                        <Button size="sm" variant="secondary">
                          Negeer
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="link"
                      className="mt-3 h-auto p-0 text-[12.5px]"
                      // TODO: add bullet to data model
                    >
                      <Plus className="size-3.5" />
                      Bullet point toevoegen
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          // TODO: add experience entry to data model
          className="mt-[14px] flex w-full items-center justify-center gap-1.5 rounded-[11px] border-[1.5px] border-dashed border-border-strong bg-card px-3 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-surface-2"
        >
          <Plus className="size-4 text-primary" />
          Werkervaring toevoegen
        </button>
      </div>
    </div>
  );
}
