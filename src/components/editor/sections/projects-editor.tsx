"use client";

import {
  AddItemButton,
  BulletsEditor,
  ItemCard,
  TagsEditor,
  TextAreaField,
  TextField,
} from "@/components/editor/fields";
import { emptyProject } from "@/lib/resume/factory";
import type { ProjectItem } from "@/lib/resume/schema";

export function ProjectsEditor({
  value,
  onChange,
}: {
  value: ProjectItem[];
  onChange: (v: ProjectItem[]) => void;
}) {
  const update = (id: string, patch: Partial<ProjectItem>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const remove = (id: string) =>
    onChange(value.filter((item) => item.id !== id));

  const add = () => onChange([...value, emptyProject()]);

  return (
    <div className="flex flex-col gap-4">
      {value.map((item) => (
        <ItemCard
          key={item.id}
          title={item.name}
          subtitle={item.role}
          onRemove={() => remove(item.id)}
        >
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Project"
              value={item.name}
              onChange={(v) => update(item.id, { name: v })}
            />
            <TextField
              label="Rol"
              value={item.role}
              onChange={(v) => update(item.id, { role: v })}
            />
          </div>

          <TextField
            label="Link"
            value={item.url}
            onChange={(v) => update(item.id, { url: v })}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Van"
              value={item.startDate}
              onChange={(v) => update(item.id, { startDate: v })}
            />
            <TextField
              label="Tot"
              value={item.endDate}
              onChange={(v) => update(item.id, { endDate: v })}
            />
          </div>

          <TextAreaField
            label="Beschrijving"
            value={item.description}
            onChange={(v) => update(item.id, { description: v })}
          />

          <BulletsEditor
            label="Hoogtepunten"
            value={item.highlights}
            onChange={(v) => update(item.id, { highlights: v })}
          />

          <TagsEditor
            label="Technologieën"
            value={item.technologies}
            onChange={(v) => update(item.id, { technologies: v })}
          />
        </ItemCard>
      ))}

      <AddItemButton label="Project toevoegen" onClick={add} />
    </div>
  );
}
