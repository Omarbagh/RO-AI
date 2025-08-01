// components/steps/ProfileStep.tsx
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { CVData } from "@/types/cv";
import { TouchedType } from "@/types/cv";

type ProfileStepProps = {
  formData: CVData;
  updateProfile: (value: string) => void;
  markTouched: (key: string) => void;
  error: string | undefined;
  touched: TouchedType;
};

export function ProfileStep({
  formData,
  updateProfile,
  markTouched,
  error,
  touched,
}: ProfileStepProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Professional Summary *
      </label>
      <Textarea
        value={formData.profile}
        onChange={(e) => updateProfile(e.target.value)}
        onBlur={() => markTouched("profile")}
        className={error && touched.profile ? "border-red-500" : ""}
      />
      {error && touched.profile && (
        <div className="text-red-500 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
