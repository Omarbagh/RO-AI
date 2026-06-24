"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { emptyExperience } from "@/lib/resume/factory";
import type { ExperienceItem } from "@/lib/resume/schema";
import {
  AddItemButton,
  BulletsEditor,
  ItemCard,
  TextAreaField,
  TextField,
} from "@/components/editor/fields";

export function ExperienceEditor({
  value,
  onChange,
}: {
  value: ExperienceItem[];
  onChange: (v: ExperienceItem[]) => void;
}) {
  const update = (id: string, patch: Partial<ExperienceItem>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const add = () => onChange([...value, emptyExperience()]);

  return (
    <div className="flex flex-col gap-3">
      {value.map((item) => (
        <ItemCard
          key={item.id}
          title={item.role}
          subtitle={item.company}
          onRemove={() => remove(item.id)}
        >
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Functie"
              value={item.role}
              onChange={(v) => update(item.id, { role: v })}
            />
            <TextField
              label="Bedrijf"
              value={item.company}
              onChange={(v) => update(item.id, { company: v })}
            />
          </div>

          <TextField
            label="Locatie"
            value={item.location}
            onChange={(v) => update(item.id, { location: v })}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Van"
              value={item.startDate}
              onChange={(v) => update(item.id, { startDate: v })}
            />
            {!item.current ? (
              <TextField
                label="Tot"
                value={item.endDate}
                onChange={(v) => update(item.id, { endDate: v })}
              />
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor={`current-${item.id}`}>Ik werk hier nog</Label>
            <Switch
              id={`current-${item.id}`}
              checked={item.current}
              onCheckedChange={(checked) =>
                update(item.id, {
                  current: checked,
                  ...(checked ? { endDate: "" } : {}),
                })
              }
            />
          </div>

          <TextAreaField
            label="Korte omschrijving (optioneel)"
            value={item.summary}
            onChange={(v) => update(item.id, { summary: v })}
          />

          <BulletsEditor
            label="Hoogtepunten"
            value={item.highlights}
            onChange={(v) => update(item.id, { highlights: v })}
          />
        </ItemCard>
      ))}

      <AddItemButton label="Werkervaring toevoegen" onClick={add} />
    </div>
  );
}
