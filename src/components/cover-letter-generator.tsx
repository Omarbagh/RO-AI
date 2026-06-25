"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { SAMPLE_RESUME } from "@/lib/resume/sample";
import { contactLine } from "@/lib/templates/format";
import type { ResumeData } from "@/lib/resume/schema";

const tones = ["Professioneel", "Enthousiast", "Beknopt"] as const;
type Tone = (typeof tones)[number];

const SAMPLE_LETTER = `Geachte heer/mevrouw,

Met veel interesse reageer ik op de functie van Product Marketing Lead bij Adyen. In mijn rol bij Mollie stuurde ik de go-to-market van drie betaalproducten aan en verhoogde de activatie met 40%.

Wat mij aantrekt in Adyen is de schaal en de technische diepgang. Ik vertaal complexe producten graag naar heldere, meetbare proposities.

Graag licht ik mijn motivatie persoonlijk toe.

Met vriendelijke groet,
Sanne Bakker`;

export function CoverLetterGenerator({
  data = SAMPLE_RESUME,
}: {
  data?: ResumeData;
}) {
  const [company, setCompany] = React.useState("");
  const [vacancy, setVacancy] = React.useState("");
  const [selectedTone, setSelectedTone] = React.useState<Tone>("Professioneel");
  const [letter, setLetter] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleGenerate() {
    if (loading) return;
    const [companyPart, rolePart] = company.split("·").map((s) => s.trim());
    setLoading(true);
    setLetter("");
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          company: companyPart ?? "",
          role: rolePart ?? companyPart ?? "",
          jobText: vacancy,
          tone: selectedTone,
        }),
      });

      if (!res.ok || !res.body) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(err?.error ?? "Genereren mislukt.");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLetter(acc);
      }
      toast.success("Sollicitatiebrief gegenereerd.");
    } catch {
      toast.error("Er ging iets mis. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  const display = letter || SAMPLE_LETTER;
  const isSample = !letter;
  const contact = contactLine(data).slice(0, 2).join(" · ");

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-sm">
      <div className="flex min-h-[540px] flex-col lg:flex-row">
        {/* LEFT — inputs */}
        <div className="flex w-full flex-col border-b border-border bg-background p-[26px] lg:w-[42%] lg:border-b-0 lg:border-r">
          <h3 className="text-[22px] font-semibold tracking-tight">Sollicitatiebrief</h3>
          <p className="mb-5 mt-[3px] text-[13px] text-subtle">
            AI schrijft op basis van je cv en de vacature.
          </p>

          <label className="mb-[7px] text-xs font-semibold text-text-body">
            Bedrijf &amp; functie
          </label>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Adyen · Product Marketing Lead"
            className="mb-[14px]"
          />

          <label className="mb-[7px] text-xs font-semibold text-text-body">
            Vacaturetekst
          </label>
          <Textarea
            value={vacancy}
            onChange={(e) => setVacancy(e.target.value)}
            placeholder="We zoeken een ervaren product marketeer die complexe betaalproducten kan vertalen naar heldere proposities…"
            className="mb-[14px] flex-1"
          />

          <label className="mb-[9px] text-xs font-semibold text-text-body">Toon</label>
          <div className="mb-[18px] flex gap-[7px]">
            {tones.map((tone) => {
              const isSelected = tone === selectedTone;
              return (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setSelectedTone(tone)}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors",
                    isSelected
                      ? "border border-accent-soft-border bg-accent-soft font-semibold text-ink"
                      : "border border-border-strong text-muted-foreground",
                  )}
                >
                  {tone}
                </button>
              );
            })}
          </div>

          <Button className="w-full" onClick={handleGenerate} disabled={loading}>
            {loading ? <Spinner size={16} /> : <Sparkles />}
            {loading ? "AI schrijft…" : "Genereer brief"}
          </Button>
        </div>

        {/* RIGHT — preview */}
        <div className="flex flex-1 flex-col items-center bg-surface-2 p-[26px]">
          <div className="mb-[14px] flex items-center gap-2 self-start">
            <span className="eyebrow text-[11px] text-subtle">VOORBEELD</span>
            {isSample ? null : (
              <Badge variant="success">
                <Sparkles />
                AI gegenereerd
              </Badge>
            )}
          </div>

          <div className="w-[420px] max-w-full rounded-[3px] bg-white p-[34px] shadow-[0_12px_36px_-14px_rgba(20,20,30,.28)]">
            <div className="text-xl font-semibold">{data.personal.fullName || "Jouw naam"}</div>
            <div className="eyebrow mb-5 text-[11px] normal-case tracking-normal text-subtle">
              {contact || "Locatie · e-mail"}
            </div>
            <p
              className={cn(
                "whitespace-pre-wrap text-xs leading-relaxed text-text-body",
                isSample && "opacity-70",
              )}
            >
              {display}
              {loading ? <span className="ml-0.5 animate-pulse">▍</span> : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
