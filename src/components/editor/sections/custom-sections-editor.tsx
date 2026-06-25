"use client";

import { emptyCustomEntry, emptyCustomSection } from "@/lib/resume/factory";
import type { CustomEntry, CustomSection } from "@/lib/resume/schema";
import {
  AddItemButton,
  BulletsEditor,
  ItemCard,
  TextAreaField,
  TextField,
} from "@/components/editor/fields";

export function CustomSectionsEditor({
  value,
  onChange,
}: {
  value: CustomSection[];
  onChange: (v: CustomSection[]) => void;
}) {
  const updateSection = (id: string, patch: Partial<CustomSection>) =>
    onChange(value.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const removeSection = (id: string) =>
    onChange(value.filter((s) => s.id !== id));

  const addSection = () => onChange([...value, emptyCustomSection()]);

  const updateEntry = (
    sectionId: string,
    entryId: string,
    patch: Partial<CustomEntry>,
  ) =>
    onChange(
      value.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              entries: s.entries.map((e) =>
                e.id === entryId ? { ...e, ...patch } : e,
              ),
            }
          : s,
      ),
    );

  const removeEntry = (sectionId: string, entryId: string) =>
    onChange(
      value.map((s) =>
        s.id === sectionId
          ? { ...s, entries: s.entries.filter((e) => e.id !== entryId) }
          : s,
      ),
    );

  const addEntry = (sectionId: string) =>
    onChange(
      value.map((s) =>
        s.id === sectionId
          ? { ...s, entries: [...s.entries, emptyCustomEntry()] }
          : s,
      ),
    );

  return (
    <div className="flex flex-col gap-3">
      {value.map((section) => (
        <ItemCard
          key={section.id}
          title={section.title}
          subtitle={`${section.entries.length} item(s)`}
          onRemove={() => removeSection(section.id)}
        >
          <TextField
            label="Sectietitel"
            value={section.title}
            onChange={(v) => updateSection(section.id, { title: v })}
            placeholder="Bijv. Vrijwilligerswerk"
          />

          <div className="flex flex-col gap-3">
            {section.entries.map((entry) => (
              <ItemCard
                key={entry.id}
                title={entry.title}
                subtitle={entry.subtitle}
                onRemove={() => removeEntry(section.id, entry.id)}
              >
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Titel"
                    value={entry.title}
                    onChange={(v) =>
                      updateEntry(section.id, entry.id, { title: v })
                    }
                  />
                  <TextField
                    label="Subtitel"
                    value={entry.subtitle}
                    onChange={(v) =>
                      updateEntry(section.id, entry.id, { subtitle: v })
                    }
                  />
                </div>

                <TextField
                  label="Datum"
                  value={entry.date}
                  onChange={(v) =>
                    updateEntry(section.id, entry.id, { date: v })
                  }
                  placeholder="Bijv. 2022 - 2024"
                />

                <TextAreaField
                  label="Beschrijving"
                  value={entry.description}
                  onChange={(v) =>
                    updateEntry(section.id, entry.id, { description: v })
                  }
                />

                <BulletsEditor
                  label="Punten"
                  value={entry.bullets}
                  onChange={(v) =>
                    updateEntry(section.id, entry.id, { bullets: v })
                  }
                />
              </ItemCard>
            ))}

            <AddItemButton
              label="Item toevoegen"
              onClick={() => addEntry(section.id)}
            />
          </div>
        </ItemCard>
      ))}

      <AddItemButton label="Eigen sectie toevoegen" onClick={addSection} />
    </div>
  );
}
