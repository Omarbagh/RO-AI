"use client";

import { X } from "lucide-react";
import { AddItemButton } from "@/components/editor/fields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emptySkill } from "@/lib/resume/factory";
import { SKILL_LEVELS, type SkillItem, type SkillLevel } from "@/lib/resume/schema";

const LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Gevorderd",
  advanced: "Vergevorderd",
  expert: "Expert",
};

/** Sentinel for "no level chosen" — Radix Select forbids an empty-string value. */
const NO_LEVEL = "none";

export function SkillsEditor({
  value,
  onChange,
}: {
  value: SkillItem[];
  onChange: (v: SkillItem[]) => void;
}) {
  const update = (id: string, patch: Partial<SkillItem>) =>
    onChange(value.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id: string) => onChange(value.filter((s) => s.id !== id));
  const add = () => onChange([...value, emptySkill()]);

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 ? (
        <div className="flex flex-col gap-2">
          {value.map((skill) => (
            <div
              key={skill.id}
              className="flex items-end gap-2 rounded-[10px] border border-border bg-card p-2.5 shadow-xs"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
                <Label>Vaardigheid</Label>
                <Input
                  value={skill.name}
                  placeholder="bv. TypeScript"
                  onChange={(e) => update(skill.id, { name: e.target.value })}
                />
              </div>

              <div className="flex w-[28%] min-w-0 flex-col gap-[7px]">
                <Label>Categorie</Label>
                <Input
                  value={skill.category}
                  placeholder="bv. Talen"
                  onChange={(e) => update(skill.id, { category: e.target.value })}
                />
              </div>

              <div className="flex w-[26%] min-w-0 flex-col gap-[7px]">
                <Label>Niveau</Label>
                <Select
                  value={skill.level ?? NO_LEVEL}
                  onValueChange={(v) =>
                    update(skill.id, {
                      level: v === NO_LEVEL ? undefined : (v as SkillLevel),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_LEVEL}>Geen niveau</SelectItem>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {LEVEL_LABELS[level]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                type="button"
                onClick={() => remove(skill.id)}
                className="mb-[1px] shrink-0 rounded-md p-2 text-subtle transition-colors hover:bg-danger-soft hover:text-danger"
                aria-label="Verwijder vaardigheid"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <AddItemButton label="Vaardigheid toevoegen" onClick={add} />
    </div>
  );
}
