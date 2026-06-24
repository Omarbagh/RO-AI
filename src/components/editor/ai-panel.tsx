"use client";

import * as React from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AtsMeter } from "@/components/ats-meter";

interface Recommendation {
  id: string;
  tone: "ai" | "warning";
  text: React.ReactNode;
  action: string;
  primary?: boolean;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-1",
    tone: "ai",
    text: (
      <>
        Voeg meetbare resultaten toe aan je rol bij <strong>Bol</strong>.
      </>
    ),
    action: "Genereer met AI",
    primary: true,
  },
  {
    id: "rec-2",
    tone: "warning",
    text: "Je opleiding ontbreekt — ATS-systemen verwachten dit veld.",
    action: "Naar sectie",
  },
  {
    id: "rec-3",
    tone: "ai",
    text: "Je profieltekst kan korter en krachtiger.",
    action: "Herschrijf",
    primary: true,
  },
];

export function AiPanel() {
  return (
    <div className="flex flex-col gap-[18px]">
      {/* Heading */}
      <div className="flex items-center gap-[9px]">
        <span className="flex size-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-primary to-[#5C86FF] text-white">
          <Sparkles className="size-3.5" />
        </span>
        <span className="text-[15px] font-semibold text-foreground">
          AI-assistent
        </span>
      </div>

      {/* ATS score chip */}
      <div className="flex items-center gap-4 rounded-[13px] border border-border bg-card p-4">
        <AtsMeter score={92} size={64} />
        <div>
          <div className="text-[13px] font-semibold text-ink">
            ATS-score: sterk
          </div>
          <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
            Goed leesbaar voor scanners. Nog 8 punten te winnen.
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="eyebrow mb-3 text-[11px] text-subtle">
          3 aanbevelingen
        </div>
        <div className="flex flex-col gap-[10px]">
          {RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="rounded-[11px] border border-border p-[13px]"
            >
              <div className="mb-[9px] flex items-start gap-[9px]">
                {rec.tone === "ai" ? (
                  <span className="flex size-5 flex-none items-center justify-center rounded-[6px] bg-accent-soft text-primary">
                    <Sparkles className="size-3" />
                  </span>
                ) : (
                  <span className="flex size-5 flex-none items-center justify-center rounded-[6px] bg-warning-soft text-warning">
                    <AlertTriangle className="size-3" />
                  </span>
                )}
                <p className="text-[12.5px] leading-snug text-text-body">
                  {rec.text}
                </p>
              </div>
              {/* TODO: wire recommendation action to AI / navigation */}
              <Button
                size="sm"
                variant={rec.primary ? "ghost" : "secondary"}
                className={rec.primary ? "bg-accent-soft" : undefined}
              >
                {rec.action}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Tailor to vacancy */}
      <div className="rounded-[13px] border border-accent-soft-border bg-[#F6F8FF] p-[15px]">
        <div className="text-[13px] font-semibold text-ink">
          Tailor naar vacature
        </div>
        <p className="mb-[11px] mt-1 text-xs leading-snug text-muted-foreground">
          Plak een vacaturetekst — AI stemt je cv erop af.
        </p>
        <Textarea
          placeholder="Plak hier de vacature…"
          className="min-h-[54px] bg-card text-xs"
          // TODO: capture job posting + send to AI tailoring
        />
        <Button className="mt-[10px] w-full">
          <Sparkles className="size-3.5" />
          Stem cv af
        </Button>
      </div>
    </div>
  );
}
