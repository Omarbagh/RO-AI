// components/steps/SkillsStep.tsx
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import React from "react";

type SkillsTouched = Record<number, { skill?: boolean }>;

type SkillsStepProps = {
  skills: string[];
  updateSkill: (i: number, value: string) => void;
  addSkill: () => void;
  removeSkill: (i: number) => void;
  markTouched: (key: string, idx?: number, subKey?: string) => void;
  errors: (string | undefined)[];
  touched: { skills?: SkillsTouched };
};
export function SkillsStep({
  skills,
  updateSkill,
  addSkill,
  removeSkill,
  markTouched,
  errors,
  touched,
}: SkillsStepProps) {
  return (
    <div>
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              value={skill}
              onChange={(e) => updateSkill(i, e.target.value)}
              onBlur={() => markTouched("skills", i, "skill")}
              className={
                errors[i] &&
                typeof touched.skills === "object" &&
                (touched.skills as { [idx: number]: { [subKey: string]: boolean } })[i]?.skill
                  ? "border-red-500"
                  : ""
              }
            />
            {errors[i] &&
              typeof touched.skills === "object" &&
              (touched.skills as { [idx: number]: { [subKey: string]: boolean } })[i]?.skill && (
              <div className="text-red-500 text-xs mt-1">
                {errors[i]}
              </div>
            )}
          </div>
          {skills.length > 1 && (
            <button
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
              onClick={() => removeSkill(i)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="w-full border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 h-12 flex items-center justify-center gap-2 rounded-md mt-3"
        onClick={addSkill}
      >
        <Plus className="w-5 h-5" />
        Add Another Skill
      </button>
    </div>
  );
}
