"use client";

import * as React from "react";
import { AlertTriangle, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { AtsMeter } from "@/components/ats-meter";
import type { AtsResult, TailorResult } from "@/lib/ai/schemas";
import type { ResumeData } from "@/lib/resume/schema";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(err?.error ?? "AI-verzoek mislukt.");
  }
  return (await res.json()) as T;
}

export function AiPanel({
  data,
  onApplySummary,
}: {
  data: ResumeData;
  onApplySummary?: (summary: string) => void;
}) {
  const [ats, setAts] = React.useState<AtsResult | null>(null);
  const [atsLoading, setAtsLoading] = React.useState(false);
  const [jobText, setJobText] = React.useState("");
  const [tailor, setTailor] = React.useState<TailorResult | null>(null);
  const [tailorLoading, setTailorLoading] = React.useState(false);

  async function runAts() {
    setAtsLoading(true);
    try {
      setAts(await postJson<AtsResult>("/api/ai/ats", { data }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ATS-analyse mislukt.");
    } finally {
      setAtsLoading(false);
    }
  }

  async function runTailor() {
    if (jobText.trim().length < 20) {
      toast.error("Plak eerst een vacaturetekst.");
      return;
    }
    setTailorLoading(true);
    try {
      setTailor(await postJson<TailorResult>("/api/ai/tailor", { data, jobText }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Afstemmen mislukt.");
    } finally {
      setTailorLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-center gap-[9px]">
        <span className="flex size-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-primary to-[#5C86FF] text-white">
          <Sparkles className="size-3.5" />
        </span>
        <span className="text-[15px] font-semibold text-foreground">AI-assistent</span>
      </div>

      {/* ATS score */}
      <div className="rounded-[13px] border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <AtsMeter score={ats?.score ?? 0} size={64} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-ink">
              {ats ? `ATS-score: ${ats.score}` : "ATS-score"}
            </div>
            <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {ats?.summary ?? "Analyseer je cv op leesbaarheid voor scanners."}
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="mt-3 w-full"
          onClick={runAts}
          disabled={atsLoading}
        >
          {atsLoading ? <Spinner size={14} /> : <Sparkles className="size-3.5" />}
          {ats ? "Opnieuw analyseren" : "Analyseer ATS-score"}
        </Button>
      </div>

      {/* Improvements from ATS */}
      {ats ? (
        <div>
          <div className="eyebrow mb-3 text-[11px] text-subtle">
            {ats.improvements.length} aanbevelingen
          </div>
          <div className="flex flex-col gap-[10px]">
            {ats.improvements.map((tip, i) => (
              <div key={i} className="flex items-start gap-[9px] rounded-[11px] border border-border p-[13px]">
                <span className="flex size-5 flex-none items-center justify-center rounded-[6px] bg-accent-soft text-primary">
                  <Sparkles className="size-3" />
                </span>
                <p className="text-[12.5px] leading-snug text-text-body">{tip}</p>
              </div>
            ))}
            {ats.missingKeywords.length ? (
              <div className="flex items-start gap-[9px] rounded-[11px] border border-warning-soft-border/0 border-border bg-warning-soft/40 p-[13px]">
                <span className="flex size-5 flex-none items-center justify-center rounded-[6px] bg-warning-soft text-warning">
                  <AlertTriangle className="size-3" />
                </span>
                <p className="text-[12.5px] leading-snug text-text-body">
                  Ontbrekende trefwoorden: {ats.missingKeywords.join(", ")}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Tailor to vacancy */}
      <div className="rounded-[13px] border border-accent-soft-border bg-accent-soft/40 p-[15px]">
        <div className="text-[13px] font-semibold text-ink">Tailor naar vacature</div>
        <p className="mb-[11px] mt-1 text-xs leading-snug text-muted-foreground">
          Plak een vacaturetekst — AI stemt je cv erop af.
        </p>
        <Textarea
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Plak hier de vacature…"
          className="min-h-[54px] bg-card text-xs"
        />
        <Button className="mt-[10px] w-full" onClick={runTailor} disabled={tailorLoading}>
          {tailorLoading ? <Spinner size={14} /> : <Sparkles className="size-3.5" />}
          Stem cv af
        </Button>

        {tailor ? (
          <div className="mt-3 flex flex-col gap-2 border-t border-accent-soft-border pt-3">
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="success">Match {tailor.matchScore}</Badge>
              <span className="text-muted-foreground">
                {tailor.matchedKeywords.length} match · {tailor.missingKeywords.length} ontbreekt
              </span>
            </div>
            {tailor.missingKeywords.length ? (
              <div className="flex flex-wrap gap-1.5">
                {tailor.missingKeywords.map((k) => (
                  <span key={k} className="rounded-md bg-card px-2 py-0.5 text-[11px] text-muted-foreground">
                    {k}
                  </span>
                ))}
              </div>
            ) : null}
            {tailor.summarySuggestion ? (
              <div className="rounded-[10px] bg-card p-3">
                <div className="eyebrow mb-1 text-[10px] text-subtle">Voorgestelde samenvatting</div>
                <p className="text-[12px] leading-snug text-text-body">{tailor.summarySuggestion}</p>
                {onApplySummary ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 bg-accent-soft"
                    onClick={() => {
                      onApplySummary(tailor.summarySuggestion);
                      toast.success("Samenvatting toegepast.");
                    }}
                  >
                    <Check className="size-3.5" /> Gebruik
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
