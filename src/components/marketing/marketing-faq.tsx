"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is mijn cv echt ATS-proof?",
    answer:
      "Ja. Elke template is getest tegen de meest gebruikte ATS-systemen. De live score laat zien waar je staat en hoe je verbetert.",
  },
  {
    question: "Kan ik mijn LinkedIn importeren?",
    answer:
      "Zeker. Importeer je profiel in één klik en CVhero vult automatisch je werkervaring, opleiding en vaardigheden in.",
  },
  {
    question: "Wat kost Pro en kan ik opzeggen?",
    answer:
      "Pro kost €9 per maand en is maandelijks opzegbaar. Geen verborgen kosten, geen lange contracten.",
  },
  {
    question: "In welke talen werkt CVhero?",
    answer:
      "CVhero werkt in het Nederlands en Engels, met meer talen onderweg. De AI schrijft mee in de taal van jouw cv.",
  },
];

export function MarketingFaq() {
  const [openIndex, setOpenIndex] = React.useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[13px] border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left"
            >
              <span className="text-[15px] font-semibold text-foreground">
                {item.question}
              </span>
              {isOpen ? (
                <Minus className="size-[18px] shrink-0 text-primary" />
              ) : (
                <Plus className="size-[18px] shrink-0 text-subtle" />
              )}
            </button>
            <div
              className={cn(
                "px-5 transition-all",
                isOpen ? "pb-[18px]" : "hidden",
              )}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
