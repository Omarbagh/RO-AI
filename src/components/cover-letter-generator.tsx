"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const tones = ["Professioneel", "Enthousiast", "Beknopt"] as const;
type Tone = (typeof tones)[number];

export function CoverLetterGenerator() {
  const [company, setCompany] = React.useState("");
  const [vacancy, setVacancy] = React.useState("");
  const [selectedTone, setSelectedTone] = React.useState<Tone>("Professioneel");

  return (
    <div className="bg-card border border-border rounded-[16px] shadow-sm overflow-hidden">
      <div className="flex min-h-[540px]">
        {/* LEFT — inputs */}
        <div className="w-[42%] bg-background border-r border-border p-[26px] flex flex-col">
          <h3 className="font-semibold text-[22px] tracking-tight">
            Sollicitatiebrief
          </h3>
          <p className="text-[13px] text-subtle mt-[3px] mb-5">
            AI schrijft op basis van je cv en de vacature.
          </p>

          <label className="text-xs font-semibold text-text-body mb-[7px]">
            Bedrijf &amp; functie
          </label>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Adyen · Product Marketing Lead"
            className="mb-[14px]"
          />

          <label className="text-xs font-semibold text-text-body mb-[7px]">
            Vacaturetekst
          </label>
          <Textarea
            value={vacancy}
            onChange={(e) => setVacancy(e.target.value)}
            placeholder="We zoeken een ervaren product marketeer die complexe betaalproducten kan vertalen naar heldere proposities…"
            className="flex-1 mb-[14px]"
          />

          <label className="text-xs font-semibold text-text-body mb-[9px]">
            Toon
          </label>
          <div className="flex gap-[7px] mb-[18px]">
            {tones.map((tone) => {
              const isSelected = tone === selectedTone;
              return (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setSelectedTone(tone)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs cursor-pointer transition-colors",
                    isSelected
                      ? "bg-accent-soft border border-accent-soft-border text-ink font-semibold"
                      : "border border-border-strong text-muted-foreground",
                  )}
                >
                  {tone}
                </button>
              );
            })}
          </div>

          <Button className="w-full">
            <Sparkles />
            Genereer brief
          </Button>
        </div>

        {/* RIGHT — preview */}
        <div className="flex-1 bg-surface-2 p-[26px] flex flex-col items-center">
          <div className="flex items-center gap-2 mb-[14px] self-start">
            <span className="eyebrow text-[11px] text-subtle">VOORBEELD</span>
            <Badge variant="success">
              <Sparkles />
              AI gegenereerd
            </Badge>
          </div>

          <div className="bg-white rounded-[3px] shadow-[0_12px_36px_-14px_rgba(20,20,30,.28)] p-[34px] w-[420px] max-w-full">
            <div className="font-semibold text-xl">Sanne Bakker</div>
            <div className="eyebrow text-[11px] text-subtle normal-case tracking-normal mb-5">
              Amsterdam · sanne.bakker@email.nl
            </div>
            <div className="text-xs text-foreground mb-[14px]">
              Geachte heer/mevrouw,
            </div>
            <p className="text-xs leading-relaxed text-text-body mb-[11px]">
              Met veel interesse reageer ik op de functie van Product Marketing
              Lead bij Adyen. In mijn rol bij Mollie stuurde ik de go-to-market
              van drie betaalproducten aan en verhoogde de activatie met 40%.
            </p>
            <p className="text-xs leading-relaxed text-text-body mb-[11px]">
              Wat mij aantrekt in Adyen is de schaal en de technische diepgang.
              Ik vertaal complexe producten graag naar heldere, meetbare
              proposities.
            </p>
            <p className="text-xs leading-relaxed text-text-body">
              Graag licht ik mijn motivatie persoonlijk toe.
            </p>
            <div className="text-xs text-foreground mt-4">
              Met vriendelijke groet,
              <br />
              Sanne Bakker
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
