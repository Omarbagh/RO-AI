"use client";

import { TextAreaField } from "@/components/editor/fields";

export function SummaryEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <TextAreaField
        label="Professionele samenvatting"
        value={value}
        onChange={onChange}
        rows={6}
        placeholder="Bijv. Resultaatgerichte marketeer met 5+ jaar ervaring in B2B-campagnes. Verhoogde leads met 40% en leidde een team van 6…"
      />
      <p className="text-xs text-subtle">
        Tip: 2–4 zinnen, resultaatgericht.
      </p>
    </div>
  );
}
