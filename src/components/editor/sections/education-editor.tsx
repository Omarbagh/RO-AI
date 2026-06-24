"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { emptyEducation } from "@/lib/resume/factory";
import type { EducationItem } from "@/lib/resume/schema";
import {
  AddItemButton,
  ItemCard,
  TextAreaField,
  TextField,
} from "@/components/editor/fields";

export function EducationEditor({
  value,
  onChange,
}: {
  value: EducationItem[];
  onChange: (v: EducationItem[]) => void;
}) {
  const update = (id: string, patch: Partial<EducationItem>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const add = () => onChange([...value, emptyEducation()]);

  return (
    <div className="flex flex-col gap-4">
      {value.map((item) => (
        <ItemCard
          key={item.id}
          title={item.degree}
          subtitle={item.institution}
          onRemove={() => remove(item.id)}
        >
          <TextField
            label="Opleiding/instituut"
            value={item.institution}
            onChange={(v) => update(item.id, { institution: v })}
          />
          <TextField
            label="Diploma/graad"
            value={item.degree}
            onChange={(v) => update(item.id, { degree: v })}
          />
          <TextField
            label="Studierichting"
            value={item.field}
            onChange={(v) => update(item.id, { field: v })}
          />
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
            <TextField
              label="Tot"
              value={item.current ? "" : item.endDate}
              onChange={(v) => update(item.id, { endDate: v })}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={`current-${item.id}`}>Nog bezig</Label>
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

          <TextField
            label="Cijfer/onderscheiding"
            value={item.grade}
            onChange={(v) => update(item.id, { grade: v })}
          />

          <TextAreaField
            label="Omschrijving (optioneel)"
            value={item.description}
            onChange={(v) => update(item.id, { description: v })}
          />
        </ItemCard>
      ))}

      <AddItemButton label="Opleiding toevoegen" onClick={add} />
    </div>
  );
}
