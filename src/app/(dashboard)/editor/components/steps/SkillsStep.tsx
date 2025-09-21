// components/steps/SkillsStep.tsx
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React, { useState, KeyboardEvent } from "react";

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
  const [newSkill, setNewSkill] = useState("");

  // Handle Enter key to add non-empty skill
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!newSkill.trim()) {
        markTouched("skills", 0, "skill");
        return;
      }
      const index = skills.length;
      addSkill();
      updateSkill(index, newSkill.trim());
      markTouched("skills", index, "skill");
      setNewSkill("");
    }
  };

  // Handle removing skill and mark touched for last removal
  const handleRemove = (i: number) => {
    const isLast = skills.length === 1;
    removeSkill(i);
    if (isLast) {
      markTouched("skills", 0, "skill");
    }
  };

  // Determine global error when no skills
  const showGlobalError = skills.length === 0 && touched.skills?.[0]?.skill;

  return (
    <div className="space-y-4">
      {/* Input to add new skill */}
      <Input
        placeholder="Type a skill and press Enter"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() =>
          newSkill.trim() === "" && markTouched("skills", 0, "skill")
        }
        className={`rounded-full focus:outline-none focus:!border-gray-200 focus:!ring-0 ${skills.length === 0 ? "bg-gray-100" : "bg-white"}`}
      />
      {showGlobalError && (
        <div className="text-red-500 text-xs">
          Please add at least one skill.
        </div>
      )}

      {/* Display added skills as tags with delete button and validation */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const showError = errors[i] && touched.skills?.[i]?.skill;
            return (
              <div key={i} className="flex flex-col">
                <div
                  className={`flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 gap-2 ${
                    showError ? "ring-1 ring-red-500" : ""
                  }`}
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    onClick={() => handleRemove(i)}
                    className="hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {showError && (
                  <div className="text-red-500 text-xs mt-1">{errors[i]}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
