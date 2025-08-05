// components/steps/EducationStep.tsx
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { TouchedType } from "@/types/cv";
import { Education } from "@/types/cv";

type EducationItem = {
  school: string;
  degree: string;
  year: string;
};

type EducationError = {
  school?: string;
  degree?: string;
  year?: string;
};


type Props = {
  education: EducationItem[];
  updateEducationItem: (i: number, field: keyof Education, value: string) => void
  addEducation: () => void;
  markTouched: (key: string, idx?: number, subKey?: string) => void;
  errors: EducationError[];
  touched: TouchedType;
};

export function EducationStep({
  education,
  updateEducationItem,
  addEducation,
  markTouched,
  errors,
  touched,
}: Props) {
  return (
    <div>
      {education.map((edu, i) => (
        <Card
          key={i}
          className="relative border-2 border-gray-100 hover:border-purple-200 transition-colors"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School/University *
                </label>
                <Input
                  value={edu.school}
                  onChange={(e) =>
                    updateEducationItem(i, "school", e.target.value)
                  }
                  onBlur={() =>
                    markTouched("education", i, "school")
                  }
                  className={
                    errors[i]?.school &&
                    typeof touched.education === "object" &&
                    (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.school
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors[i]?.school &&
                  typeof touched.education === "object" &&
                  (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.school && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors[i].school}
                    </div>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree/Qualification *
                </label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducationItem(i, "degree", e.target.value)
                  }
                  onBlur={() =>
                    markTouched("education", i, "degree")
                  }
                  className={
                    errors[i]?.degree &&
                    typeof touched.education === "object" &&
                    (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.degree
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors[i]?.degree &&
                  typeof touched.education === "object" &&
                  (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.degree && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors[i].degree}
                    </div>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Graduation
                </label>
                <Input
                  value={edu.year}
                  onChange={(e) =>
                    updateEducationItem(i, "year", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <button
        type="button"
        className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 h-12 flex items-center justify-center gap-2 rounded-md mt-3"
        onClick={addEducation}
      >
        <Plus className="w-5 h-5" />
        Add Another Education
      </button>
    </div>
  );
}
