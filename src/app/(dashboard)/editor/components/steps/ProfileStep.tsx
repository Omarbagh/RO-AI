// components/steps/ProfileStep.tsx
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { CVData } from "@/types/cv";
import { TouchedType } from "@/types/cv";
import { SummaryAIField } from "../SummaryAIFieldProfile";

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
      <div className="flex items-center gap-1 mb-2">
        <label className="block text-sm font-medium m-0">
          Professional Summary
        </label>
        <p className="text-red-500 text-base leading-none">*</p>
      </div>
      <SummaryAIField
        onFill={(generatedText) => updateProfile(generatedText)}
      />
      <Textarea
        value={formData.profile}
        onChange={(e) => updateProfile(e.target.value)}
        onBlur={() => markTouched("profile")}
        placeholder="Professional Summary"
        className={`${error && touched.profile ? "border-red-500" : ""} h-48 focus:outline-nonefocus:!border-gray-200 focus:!ring-0 ${!formData.profile ? "bg-gray-100" : "bg-white"}`}
      />
      {error && touched.profile && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
}
