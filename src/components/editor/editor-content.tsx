"use client";

import * as React from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SECTION_KEYS,
  type ResumeData,
  type SectionKey,
} from "@/lib/resume/schema";
import { SECTION_LABELS } from "@/lib/resume/sections";
import { PersonalEditor } from "@/components/editor/sections/personal-editor";
import { SummaryEditor } from "@/components/editor/sections/summary-editor";
import { ExperienceEditor } from "@/components/editor/sections/experience-editor";
import { EducationEditor } from "@/components/editor/sections/education-editor";
import { SkillsEditor } from "@/components/editor/sections/skills-editor";
import { ProjectsEditor } from "@/components/editor/sections/projects-editor";
import { CertificationsEditor } from "@/components/editor/sections/certifications-editor";
import { LanguagesEditor } from "@/components/editor/sections/languages-editor";
import { CustomSectionsEditor } from "@/components/editor/sections/custom-sections-editor";

function SectionBody({
  token,
  data,
  onChange,
}: {
  token: SectionKey;
  data: ResumeData;
  onChange: (next: ResumeData) => void;
}) {
  switch (token) {
    case "summary":
      return (
        <SummaryEditor
          value={data.summary}
          onChange={(v) => onChange({ ...data, summary: v })}
        />
      );
    case "experience":
      return (
        <ExperienceEditor
          value={data.experience}
          onChange={(v) => onChange({ ...data, experience: v })}
        />
      );
    case "education":
      return (
        <EducationEditor
          value={data.education}
          onChange={(v) => onChange({ ...data, education: v })}
        />
      );
    case "skills":
      return (
        <SkillsEditor
          value={data.skills}
          onChange={(v) => onChange({ ...data, skills: v })}
        />
      );
    case "projects":
      return (
        <ProjectsEditor
          value={data.projects}
          onChange={(v) => onChange({ ...data, projects: v })}
        />
      );
    case "certifications":
      return (
        <CertificationsEditor
          value={data.certifications}
          onChange={(v) => onChange({ ...data, certifications: v })}
        />
      );
    case "languages":
      return (
        <LanguagesEditor
          value={data.languages}
          onChange={(v) => onChange({ ...data, languages: v })}
        />
      );
  }
}

function SortableSection({
  token,
  hidden,
  data,
  onChange,
  onToggleHidden,
}: {
  token: SectionKey;
  hidden: boolean;
  data: ResumeData;
  onChange: (next: ResumeData) => void;
  onToggleHidden: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: token });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "rounded-[12px] border border-border bg-card shadow-xs",
        isDragging && "z-10 opacity-80 shadow-md",
      )}
    >
      <div className="flex items-center gap-1 px-2 py-2">
        <button
          type="button"
          className="cursor-grab touch-none rounded-md p-1.5 text-subtle hover:bg-surface-2 active:cursor-grabbing"
          aria-label="Versleep sectie"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center justify-between rounded-md px-1.5 py-1 text-left"
        >
          <span
            className={cn(
              "text-sm font-semibold",
              hidden && "text-subtle line-through",
            )}
          >
            {SECTION_LABELS[token]}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-subtle transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <button
          type="button"
          onClick={onToggleHidden}
          className="rounded-md p-1.5 text-subtle hover:bg-surface-2"
          aria-label={hidden ? "Toon sectie" : "Verberg sectie"}
        >
          {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border-subtle p-4">
          <SectionBody token={token} data={data} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}

export function EditorContent({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (next: ResumeData) => void;
}) {
  const [personalOpen, setPersonalOpen] = React.useState(true);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Built-in section order (custom sections are managed in their own block).
  const orderedKeys: SectionKey[] = React.useMemo(() => {
    const inOrder = data.settings.sectionOrder.filter((t): t is SectionKey =>
      (SECTION_KEYS as readonly string[]).includes(t),
    );
    const missing = SECTION_KEYS.filter((k) => !inOrder.includes(k));
    return [...inOrder, ...missing];
  }, [data.settings.sectionOrder]);

  const hidden = new Set(data.settings.hiddenSections);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = orderedKeys.indexOf(active.id as SectionKey);
    const to = orderedKeys.indexOf(over.id as SectionKey);
    if (from < 0 || to < 0) return;
    const next = arrayMove(orderedKeys, from, to);
    onChange({ ...data, settings: { ...data.settings, sectionOrder: next } });
  };

  const toggleHidden = (token: string) => {
    const set = new Set(data.settings.hiddenSections);
    if (set.has(token)) set.delete(token);
    else set.add(token);
    onChange({
      ...data,
      settings: { ...data.settings, hiddenSections: [...set] },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Personal (fixed top) */}
      <div className="rounded-[12px] border border-border bg-card shadow-xs">
        <button
          type="button"
          onClick={() => setPersonalOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-3 py-3 text-left"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-surface-2 text-subtle">
            <User className="size-4" />
          </span>
          <span className="flex-1 text-sm font-semibold">Persoonsgegevens</span>
          <ChevronDown
            className={cn(
              "size-4 text-subtle transition-transform",
              personalOpen && "rotate-180",
            )}
          />
        </button>
        {personalOpen ? (
          <div className="border-t border-border-subtle p-4">
            <PersonalEditor
              value={data.personal}
              onChange={(v) => onChange({ ...data, personal: v })}
            />
          </div>
        ) : null}
      </div>

      {/* Sortable sections */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={orderedKeys} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {orderedKeys.map((token) => (
              <SortableSection
                key={token}
                token={token}
                hidden={hidden.has(token)}
                data={data}
                onChange={onChange}
                onToggleHidden={() => toggleHidden(token)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Custom sections */}
      <div className="rounded-[12px] border border-border bg-card p-4 shadow-xs">
        <div className="mb-3 text-sm font-semibold">Eigen secties</div>
        <CustomSectionsEditor
          value={data.customSections}
          onChange={(v) => onChange({ ...data, customSections: v })}
        />
      </div>
    </div>
  );
}
