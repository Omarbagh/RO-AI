"use client";

import { X } from "lucide-react";
import {
  LANGUAGE_PROFICIENCIES,
  type LanguageItem,
  type LanguageProficiency,
} from "@/lib/resume/schema";
import { emptyLanguage } from "@/lib/resume/factory";
import { AddItemButton, TextField } from "@/components/editor/fields";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROFICIENCY_LABELS: Record<LanguageProficiency, string> = {
  elementary: "Basis",
  limited_working: "Redelijk",
  professional_working: "Goed",
  full_professional: "Vloeiend",
  native: "Moedertaal",
};

export function LanguagesEditor({
  value,
  onChange,
}: {
  value: LanguageItem[];
  onChange: (v: LanguageItem[]) => void;
}) {
  const update = (id: string, patch: Partial<LanguageItem>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const add = () => onChange([...value, emptyLanguage()]);

  return (
    <div className="flex flex-col gap-3">
      {value.map((item) => (
        <div key={item.id} className="flex items-end gap-3">
          <TextField
            label="Taal"
            value={item.name}
            onChange={(name) => update(item.id, { name })}
            placeholder="Nederlands"
            className="flex-1"
          />
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label>Niveau</Label>
            <Select
              value={item.proficiency}
              onValueChange={(proficiency) =>
                update(item.id, {
                  proficiency: proficiency as LanguageProficiency,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_PROFICIENCIES.map((proficiency) => (
                  <SelectItem key={proficiency} value={proficiency}>
                    {PROFICIENCY_LABELS[proficiency]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="mb-1.5 shrink-0 rounded-md p-1.5 text-subtle transition-colors hover:bg-danger-soft hover:text-danger"
            aria-label="Verwijder taal"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
      <AddItemButton label="Taal toevoegen" onClick={add} />
    </div>
  );
}
