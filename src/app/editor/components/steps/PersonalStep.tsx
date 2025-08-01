// components/steps/PersonalStep.tsx
import { Input } from "@/components/ui/input";
import { Trash2, Camera, Upload } from "lucide-react";
import React from "react";
import { CVData } from "@/types/cv";
import { TouchedType } from "@/types/cv";

type PersonalStepProps = {
  formData: CVData;
  updatePersonal: (field: keyof CVData["personal"], value: string) => void;
  handlePhotoUpload: (file: File) => void;
  markTouched: (key: string, idx?: number, subKey?: string) => void;
  errors: Partial<Record<keyof CVData["personal"], string | undefined>>;
  touched: TouchedType;
  fieldUsage: Record<string, boolean>;
};


export function PersonalStep({
  formData,
  updatePersonal,
  handlePhotoUpload,
  markTouched,
  errors,
  touched,
  fieldUsage,
}: PersonalStepProps) {
  return (
    <div className="space-y-6">
      {fieldUsage["data.personal.photoUrl"] && (
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            {formData.personal.photoUrl ? (
              <div className="relative group">
                <img
                  src={formData.personal.photoUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-xl"
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => updatePersonal("photoUrl", "")}
                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
            <Upload className="w-5 h-5" />
            {formData.personal.photoUrl
              ? "Change Photo"
              : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handlePhotoUpload(e.target.files[0]);
                }
              }}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Optional • Max 5MB • JPG, PNG, or WebP
          </p>
        </div>
      )}
      <div className="grid gap-4">
        {fieldUsage["data.personal.name"] && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              value={formData.personal.name}
              onChange={(e) =>
                updatePersonal("name", e.target.value)
              }
              onBlur={() => markTouched("personal", undefined, "name")}
              className={
                errors.name && touched.personal?.name
                  ? "border-red-500"
                  : ""
              }
            />
            {errors.name && touched.personal?.name && (
              <div className="text-red-500 text-xs mt-1">
                {errors.name}
              </div>
            )}
          </div>
        )}
        {fieldUsage["data.personal.title"] && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Title *
            </label>
            <Input
              value={formData.personal.title}
              onChange={(e) =>
                updatePersonal("title", e.target.value)
              }
              onBlur={() => markTouched("personal", undefined, "title")}
              className={
                errors.title && touched.personal?.title
                  ? "border-red-500"
                  : ""
              }
            />
            {errors.title && touched.personal?.title && (
              <div className="text-red-500 text-xs mt-1">
                {errors.title}
              </div>
            )}
          </div>
        )}
        {fieldUsage["data.personal.email"] && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.personal.email}
              onChange={(e) =>
                updatePersonal("email", e.target.value)
              }
              onBlur={() => markTouched("personal", undefined, "email")}
              className={
                errors.email && touched.personal?.email
                  ? "border-red-500"
                  : ""
              }
            />
            {errors.email && touched.personal?.email && (
              <div className="text-red-500 text-xs mt-1">
                {errors.email}
              </div>
            )}
          </div>
        )}
        {fieldUsage["data.personal.phone"] && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              value={formData.personal.phone}
              onChange={(e) =>
                updatePersonal("phone", e.target.value)
              }
              onBlur={() => markTouched("personal", undefined, "phone")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
