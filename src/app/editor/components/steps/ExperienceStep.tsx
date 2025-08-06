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
  touched
}: ExperienceStepProps) {
  return (
    <div>
      {experience.map((exp, i) => (
        <Card
          key={i}
          className="relative border-1 border-gray-100 hover:border-indigo-200 transition-colors"
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
                  <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-medium m-0">Job Title</label>
                    <p className="text-red-500 text-base leading-none">*</p>
                  </div>
                    <Input
                      value={exp.job}
                      onChange={(e) =>
                        updateExperienceItem(i, "job", e.target.value)
                      }
                      onBlur={() => markTouched("experience", i, "job")}
                      placeholder="Job Title"
                      className={
                        `rounded-full focus:outline-none focus:!border-grey-200 focus:!ring-0 ${
                          !exp.job ? "bg-gray-100" : "bg-white"
                        } ` +
                        (
                          errors[i]?.job &&
                          typeof touched.experience === "object" &&
                          (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.job
                            ? "border-red-500"
                            : ""
                        )
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
                  <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-medium m-0">Company</label>
                    <p className="text-red-500 text-base leading-none">*</p>
                  </div>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperienceItem(i, "company", e.target.value)
                    }
                    onBlur={() => markTouched("experience", i, "company")}
                    placeholder="Company"
                    className={
                      `rounded-full focus:outline-none focus:!border-grey-200 focus:!ring-0 ${
                          !exp.company ? "bg-gray-100" : "bg-white"
                        } `  +
                      (errors[i]?.company &&
                      typeof touched.experience === "object" &&
                      (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.company
                        ? "border-red-500"
                        : "")
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
                <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-medium m-0">Period</label>
                    <p className="text-red-500 text-base leading-none">*</p>
                  </div>
                <Input
                  value={exp.period ?? ""}
                  onChange={(e) =>
                    updateExperienceItem(i, "period", e.target.value)
                  }
                  className={`rounded-full focus:outline-none focus:!border-grey-200 focus:!ring-0 ${!exp.period? "bg-gray-100" : "bg-white"}`}
                  placeholder="Period"
                />
              </div>
              <div>
                  <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-medium m-0">Description & Achievements</label>
                    <p className="text-red-500 text-base leading-none">*</p>
                  </div>
                <SummaryAIField onFill={(generatedText) => updateExperienceItem(i, "description", generatedText)} />
                <Textarea
                  value={exp.description}
                  onChange={e => updateExperienceItem(i, "description", e.target.value)}
                  onBlur={() => markTouched("experience", i, "description")}
                  placeholder="Description & Achievements"
                  className={
                    `rounded-2xl h-32  focus:outline-none focus:!border-grey-200 focus:!ring-0 ${
                          !exp.description ? "bg-gray-100" : "bg-white"
                        } ` +
                    (errors[i]?.description &&
                    typeof touched.experience === "object" &&
                    (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.description
                      ? "border-red-500"
                      : "")
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
