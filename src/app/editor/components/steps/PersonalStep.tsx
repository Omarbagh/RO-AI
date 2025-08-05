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
        <div className="text-left">
          <div className="flex items-center gap-5 mb-6">
            {/* Foto of camera */}
            {formData.personal.photoUrl ? (
              <div className="relative group">
                <img
                  src={formData.personal.photoUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200 shadow-xl"
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
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
            {/* Button en uitleg */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1 bg-[#4F46E5] text-white px-4 py-2 rounded-full cursor-pointer shadow text-xs hover:bg-gray-800">
                  <Upload className="w-4 h-4" />
                  {formData.personal.photoUrl ? "Change" : "Upload"}
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
                <p className="text-xs text-gray-500">
                  Optional • Max 5MB (JPG, PNG, or WebP)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-6 flex-wrap">
        {fieldUsage["data.personal.name"] && (
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-1 mb-2">
              <label className="block text-sm font-medium m-0">Full Name</label>
              <p className="text-red-500 text-base leading-none">*</p>
            </div>
            <Input
              value={formData.personal.name}
              onChange={(e) => updatePersonal("name", e.target.value)}
              onBlur={() => markTouched("personal", undefined, "name")}
              placeholder="Full Name"
              className={`
                w-full
                h-[40px]
                p-0
                border
                rounded-full
                pl-3
                flex-none
                order-1
                self-stretch
                grow-0
                focus:outline-none
                focus:!border-gray-200
                focus:!ring-0
                ${!formData.personal.name ? "bg-gray-100" : "bg-white"}
                ${errors.name && touched.personal?.name ? "border-red-500" : ""}
              `}
            />
            {errors.name && touched.personal?.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>
        )}
        {fieldUsage["data.personal.title"] && (
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-1 mb-2">
              <label className="block text-sm font-medium text-gray-700 m-0">
                Professional Title
              </label>
              <p className="text-red-500 text-base leading-none">*</p>
            </div>
            <Input
              value={formData.personal.title}
              onChange={(e) => updatePersonal("title", e.target.value)}
              onBlur={() => markTouched("personal", undefined, "title")}
              placeholder="Professional Title"
              className={`
                w-full
                h-[40px]
                p-0
                border
                ${errors.title && touched.personal?.title ? "border-red-500" : ""}
                flex-none
                order-1
                self-stretch
                grow-0
                rounded-full
                pl-3
                focus:outline-none
                focus:!border-grey-200
                focus:!ring-0
                ${!formData.personal.title ? "bg-gray-100" : "bg-white"}
              `}
            />
            {errors.title && touched.personal?.title && (
              <div className="text-red-500 text-xs mt-1">{errors.title}</div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-6 flex-wrap">
        {fieldUsage["data.personal.email"] && (
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-1 mb-2">
              <label className="block text-sm font-medium text-gray-700 m-0">
                Email Address
              </label>
              <p className="text-red-500 text-base leading-none">*</p>
            </div>
            <Input
              type="email"
              value={formData.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
              onBlur={() => markTouched("personal", undefined, "email")}
              placeholder="Email Address"
              className={`
            w-full
            h-[40px]
            p-0
            border
            ${errors.email && touched.personal?.email ? "border-red-500" : ""}
            flex-none
            order-1
            self-stretch
            grow-0
            rounded-full
            pl-3
            focus:outline-none
            focus:!border-grey-200
            focus:!ring-0
            ${!formData.personal.email ? "bg-gray-100" : "bg-white"}
          `}
            />
            {errors.email && touched.personal?.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
        )}
        {fieldUsage["data.personal.phone"] && (
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-1 mb-2">
              <label className="block text-sm font-medium text-gray-700 m-0">
                Phone Number
              </label>
            </div>
            <Input
              value={formData.personal.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
              onBlur={() => markTouched("personal", undefined, "phone")}
              placeholder="Phone Number"
              className={`
            w-full
            h-[40px]
            p-0
            border
            flex-none
            order-1
            self-stretch
            grow-0
            rounded-full
            pl-3
            focus:outline-none
            focus:!border-grey-200
            focus:!ring-0
            ${!formData.personal.phone ? "bg-gray-100" : "bg-white"}
          `}
            />
          </div>
        )}
      </div>
    </div>
  );
}
