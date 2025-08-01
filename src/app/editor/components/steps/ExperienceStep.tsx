// components/steps/ExperienceStep.tsx
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { SummaryAIField } from "../SummaryAIField";
import React from "react";

type ExperienceItem = {
  job: string;
  company: string;
  period?: string;
  description: string;
};

type ExperienceTouched = Record<number, Partial<Record<"job" | "company" | "description" | "period", boolean>>>;

type ExperienceStepProps = {
  experience: ExperienceItem[];
  updateExperienceItem: (i: number, field: keyof ExperienceItem, value: string) => void;
  addExperience: () => void;
  removeExperience: (i: number) => void;
  markTouched: (key: string, idx?: number, subKey?: string) => void;
  errors: Array<Partial<Record<keyof ExperienceItem, string | undefined>>>;
  touched: { experience?: ExperienceTouched };
};


export function ExperienceStep({
  experience,
  updateExperienceItem,
  addExperience,
  removeExperience,
  markTouched,
  errors,
  touched,
}: ExperienceStepProps) {
  return (
    <div>
      {experience.map((exp, i) => (
        <Card
          key={i}
          className="relative border-2 border-gray-100 hover:border-indigo-200 transition-colors"
        >
          <CardContent className="p-6">
            {experience.length > 1 && (
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                onClick={() => removeExperience(i)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <Input
                    value={exp.job}
                    onChange={(e) =>
                      updateExperienceItem(i, "job", e.target.value)
                    }
                    onBlur={() => markTouched("experience", i, "job")}
                    className={
                      errors[i]?.job &&
                      typeof touched.experience === "object" &&
                      (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.job
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors[i]?.job &&
                    typeof touched.experience === "object" &&
                    (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.job && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors[i].job}
                      </div>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperienceItem(i, "company", e.target.value)
                    }
                    onBlur={() => markTouched("experience", i, "company")}
                    className={
                      errors[i]?.company &&
                      typeof touched.experience === "object" &&
                      (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.company
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors[i]?.company &&
                    typeof touched.experience === "object" &&
                    (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.company && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors[i].company}
                      </div>
                    )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <Input
                  value={exp.period ?? ""}
                  onChange={(e) =>
                    updateExperienceItem(i, "period", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description & Achievements *
                </label>
                <SummaryAIField onFill={(generatedText) => updateExperienceItem(i, "description", generatedText)} />
                <Textarea
                  value={exp.description}
                  onChange={e => updateExperienceItem(i, "description", e.target.value)}
                  onBlur={() => markTouched("experience", i, "description")}
                  className={
                    errors[i]?.description &&
                    typeof touched.experience === "object" &&
                    (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.description
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors[i]?.description &&
                  typeof touched.experience === "object" &&
                  (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.description && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors[i].description}
                    </div>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <button
        type="button"
        className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 h-12 flex items-center justify-center gap-2 rounded-md mt-3"
        onClick={addExperience}
      >
        <Plus className="w-5 h-5" />
        Add Another Experience
      </button>
    </div>
  );
}
