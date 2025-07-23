"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download, FileText, ArrowRight, ArrowLeft, Loader2, Wand2, Sparkles,
  Edit3, CheckCircle, Zap, Globe, Trash2, Camera, Upload, Plus,
} from "lucide-react";
import { templates } from "./utils/templateMap";
import { TemplateCard } from "./components/TemplateCard";
import { AnimatedStepIndicator } from "./components/AnimatedStepIndicator";
import { ColorPicker } from "./components/ColorPicker";
import { CVData } from "@/types/cv";
import templateFields from "../../../scripts/template-fields.json"; 

const defaultAccent = "#6366f1";

const FIELD_STEP_MAP = [
  { field: "data.personal.photoUrl", step: "Personal", label: "Photo" },
  { field: "data.personal.name", step: "Personal", label: "Full Name" },
  { field: "data.personal.title", step: "Personal", label: "Title" },
  { field: "data.personal.email", step: "Personal", label: "Email" },
  { field: "data.personal.phone", step: "Personal", label: "Phone" },
  { field: "data.profile", step: "Profile", label: "Profile" },
  { field: "data.experience", step: "Experience", label: "Experience" },
  { field: "data.education", step: "Education", label: "Education" },
  { field: "data.skills", step: "Skills", label: "Skills" },
];

const STEP_LABELS: Record<string, string> = {
  Template: "Template",
  Personal: "Personal Info",
  Profile: "Profile",
  Experience: "Experience",
  Education: "Education",
  Skills: "Skills",
};

// ------ VALIDATIE HELPERS ------
function validateEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}
function isEmpty(val: string | undefined) {
  return !val || val.trim() === "";
}

export default function EditorPage() {
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState<CVData>({
    personal: { name: "", title: "", email: "", phone: "", photoUrl: "" },
    profile: "",
    experience: [{ job: "", company: "", description: "", period: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: [""],
  });
  const [touched, setTouched] = useState<TouchedType>({});
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [accent, setAccent] = useState(defaultAccent);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  // ------- DYNAMISCHE FIELDS PER TEMPLATE --------
  const currentTemplateMeta = useMemo(
    () => templates.find((t) => t.id === selectedTemplate),
    [selectedTemplate]
  );

  const fieldUsage = useMemo(() => {
    if (!currentTemplateMeta) return {};
    return (templateFields as Record<string, Record<string, boolean>>)[currentTemplateMeta.fileName] || {};
  }, [currentTemplateMeta]);

  // ------- DYNAMISCHE STEPS --------
  const usedSteps: string[] = useMemo(() => {
    const steps = ["Template"];
    FIELD_STEP_MAP.forEach((f) => {
      if (fieldUsage[f.field]) {
        if (!steps.includes(f.step)) steps.push(f.step);
      }
    });
    return steps;
  }, [fieldUsage]);

  // ------- VALIDATIE EN ERROR MESSAGES PER VELD --------
  function getPersonalErrors() {
    return {
      name:
        fieldUsage["data.personal.name"] &&
        (isEmpty(formData.personal.name)
          ? "Name is required"
          : undefined),
      title:
        fieldUsage["data.personal.title"] &&
        (isEmpty(formData.personal.title)
          ? "Title is required"
          : undefined),
      email:
        fieldUsage["data.personal.email"] &&
        (isEmpty(formData.personal.email)
          ? "Email is required"
          : !validateEmail(formData.personal.email)
          ? "Invalid email address"
          : undefined),
      phone: undefined, // optional
      photoUrl: undefined, // optional
    };
  }
  function getProfileError() {
    return fieldUsage["data.profile"] && isEmpty(formData.profile)
      ? "Profile is required"
      : undefined;
  }
  function getExperienceErrors() {
    if (!fieldUsage["data.experience"]) return [];
    return formData.experience.map((exp) => ({
      job: isEmpty(exp.job) ? "Job title is required" : undefined,
      company: isEmpty(exp.company) ? "Company is required" : undefined,
      description: isEmpty(exp.description)
        ? "Description is required"
        : undefined,
    }));
  }
  function getEducationErrors() {
    if (!fieldUsage["data.education"]) return [];
    return formData.education.map((edu) => ({
      school: isEmpty(edu.school) ? "School is required" : undefined,
      degree: isEmpty(edu.degree) ? "Degree is required" : undefined,
      year: undefined,
    }));
  }
  function getSkillsErrors() {
    if (!fieldUsage["data.skills"]) return [];
    return formData.skills.map((s) =>
      isEmpty(s) ? "Skill cannot be empty" : undefined
    );
  }

  function validateStep(stepName: string) {
    switch (stepName) {
      case "Personal":
        return Object.values(getPersonalErrors()).every((e) => !e);
      case "Profile":
        return !getProfileError();
      case "Experience":
        return getExperienceErrors().every(
          (e) => !e.job && !e.company && !e.description
        );
      case "Education":
        return getEducationErrors().every(
          (e) => !e.school && !e.degree
        );
      case "Skills":
        return getSkillsErrors().every((e) => !e);
      default:
        return true;
    }
  }

  // ------- FORM HELPERS --------
  type TouchedType = {
    [key: string]: boolean | { [idx: number]: { [subKey: string]: boolean } };
  };

  const markTouched = (key: string, idx?: number, subKey?: string) => {
    setTouched((t: TouchedType) => {
      if (typeof idx === "number" && subKey) {
        return {
          ...t,
          [key]: {
            ...(t[key] as { [idx: number]: { [subKey: string]: boolean } } || {}),
            [idx]: {
              ...((t[key] as { [idx: number]: { [subKey: string]: boolean } })?.[idx] || {}),
              [subKey]: true,
            },
          },
        };
      }
      return { ...t, [key]: true };
    });
  };

  const updatePersonal = (field: keyof CVData["personal"], value: string) => {
    setFormData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
    markTouched("personal." + field);
  };
  const handlePhotoUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      updatePersonal("photoUrl", e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  const updateProfile = (value: string) => {
    setFormData((d) => ({ ...d, profile: value }));
    markTouched("profile");
  };
  const updateExperienceItem = (
    i: number,
    field: keyof CVData["experience"][0],
    value: string
  ) => {
    setFormData((d) => {
      const exp = [...d.experience];
      exp[i] = { ...exp[i], [field]: value };
      return { ...d, experience: exp };
    });
    markTouched("experience", i, field);
  };
  const addExperience = () => {
    setFormData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { job: "", company: "", description: "", period: "" },
      ],
    }));
  };
  const removeExperience = (i: number) => {
    if (formData.experience.length > 1) {
      setFormData((d) => ({
        ...d,
        experience: d.experience.filter((_, idx) => idx !== i),
      }));
    }
  };
  const updateEducationItem = (
    i: number,
    field: keyof CVData["education"][0],
    value: string
  ) => {
    setFormData((d) => {
      const edu = [...d.education];
      edu[i] = { ...edu[i], [field]: value };
      return { ...d, education: edu };
    });
    markTouched("education", i, field);
  };
  const addEducation = () => {
    setFormData((d) => ({
      ...d,
      education: [...d.education, { school: "", degree: "", year: "" }],
    }));
  };
  // const removeEducation = (i: number) => {
  //   if (formData.education.length > 1) {
  //     setFormData((d) => ({
  //       ...d,
  //       education: d.education.filter((_, idx) => idx !== i),
  //     }));
  //   }
  // };
  const updateSkill = (i: number, value: string) => {
    setFormData((d) => {
      const skills = [...d.skills];
      skills[i] = value;
      return { ...d, skills };
    });
    markTouched("skills", i, "skill");
  };
  const addSkill = () => {
    setFormData((d) => ({ ...d, skills: [...d.skills, ""] }));
  };
  const removeSkill = (i: number) => {
    if (formData.skills.length > 1) {
      setFormData((d) => ({
        ...d,
        skills: d.skills.filter((_, idx) => idx !== i),
      }));
    }
  };
  const handleFinish = async () => {
    if (!selectedTemplate) return;
    setLoadingSave(true);
    try {
      const res = await fetch("/api/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate, formData }),
      });
      if (res.ok) {
        const { resumeId } = await res.json();
        setResumeId(resumeId);
        const proRes = await fetch("/api/check-pro");
        const { isPro } = await proRes.json();
        setIsPro(isPro);
        setSaveSuccess(true);
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoadingSave(false);
    }
  };
  const downloadResume = (
    id: string,
    format: "pdf" | "docx",
    watermark = false
  ) => {
    const params = new URLSearchParams({ resumeId: id, format });
    if (watermark) params.set("watermark", "ResumeAI");
    const url = `/api/download?${params.toString()}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume.${format}`;
    link.click();
  };

  // ------- STEP LOGICA --------
  const currentStep = usedSteps[step];
  const canGoNext = step < usedSteps.length - 1 && validateStep(currentStep);
  const canGoPrev = step > 0;

  // --- Onboarding ---
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
          <Card className="w-full max-w-md relative overflow-hidden shadow-2xl border-0">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <CardHeader className="text-center pb-6 pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Edit3 className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Welcome to ResumeAI
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Create stunning, professional resumes in minutes
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>30+ Professional Templates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>ATS-Optimized Designs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Instant PDF Download</span>
                </div>
              </div>
              <SignInButton>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-xl">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Your Resume
                </Button>
              </SignInButton>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free account • No credit card required
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --------- STAP 0: TEMPLATE SELECTIE ----------
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="relative container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {templates.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={() => setSelectedTemplate(template.id)}
                isPro={isPro}
                index={index}
              />
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className={`px-16 py-6 text-xl font-bold rounded-2xl transition-all duration-500 transform ${
                selectedTemplate
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-2xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedTemplate}
              onClick={() => setStep(1)}
            >
              {selectedTemplate ? (
                <>
                  Continue to Editor
                  <ArrowRight className="w-6 h-6 ml-3" />
                </>
              ) : (
                "Select a Template to Continue"
              )}
            </Button>
            {selectedTemplate && (
              <p className="text-sm text-gray-600 mt-4">
                You can change colors and customize everything in the next steps
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --------- MAIN EDITOR / DYNAMISCHE STEPS ----------
  const TemplateComponent =
    selectedTemplate != null
      ? templates.find((t) => t.id === selectedTemplate)?.comp
      : null;

  const personalErrors = getPersonalErrors();
  const experienceErrors = getExperienceErrors();
  const educationErrors = getEducationErrors();
  const skillsErrors = getSkillsErrors();
  const profileError = getProfileError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl">
          <div className="p-8 h-full flex flex-col">
            {/* Steps */}
            <div className="mb-8">
              <AnimatedStepIndicator
                steps={usedSteps.slice(1)}
                currentStep={step - 1}
              />
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-4 py-2 mb-4">
                  <span className="text-sm font-medium text-indigo-700">
                    Step {step} of {usedSteps.length - 1}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {STEP_LABELS[currentStep] || currentStep} Information
                </h2>
              </div>
            </div>
            <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
              <ColorPicker
                color={accent}
                onChange={setAccent}
                isOpen={showColorPicker}
                onToggle={() => setShowColorPicker(!showColorPicker)}
              />
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto">
              {/* --- FIELDS PER STEP --- */}
              {currentStep === "Personal" && (
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
                            personalErrors.name && touched["personal.name"]
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {personalErrors.name && touched["personal.name"] && (
                          <div className="text-red-500 text-xs mt-1">
                            {personalErrors.name}
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
                            personalErrors.title && touched["personal.title"]
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {personalErrors.title && touched["personal.title"] && (
                          <div className="text-red-500 text-xs mt-1">
                            {personalErrors.title}
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
                            personalErrors.email && touched["personal.email"]
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {personalErrors.email && touched["personal.email"] && (
                          <div className="text-red-500 text-xs mt-1">
                            {personalErrors.email}
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
              )}

              {currentStep === "Profile" && fieldUsage["data.profile"] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Professional Summary *
                  </label>
                  <Textarea
                    value={formData.profile}
                    onChange={(e) => updateProfile(e.target.value)}
                    onBlur={() => markTouched("profile")}
                    className={
                      profileError && touched.profile ? "border-red-500" : ""
                    }
                  />
                  {profileError && touched.profile && (
                    <div className="text-red-500 text-xs mt-1">
                      {profileError}
                    </div>
                  )}
                </div>
              )}

              {currentStep === "Experience" && fieldUsage["data.experience"] && (
                <div>
                  {formData.experience.map((exp, i) => (
                    <Card
                      key={i}
                      className="relative border-2 border-gray-100 hover:border-indigo-200 transition-colors"
                    >
                      <CardContent className="p-6">
                        {formData.experience.length > 1 && (
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
                                onBlur={() =>
                                  markTouched("experience", i, "job")
                                }
                                className={
                                  experienceErrors[i]?.job &&
                                  typeof touched.experience === "object" &&
                                  (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.job
                                    ? "border-red-500"
                                    : ""
                                }
                              />
                              {experienceErrors[i]?.job &&
                                typeof touched.experience === "object" &&
                                (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.job && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {experienceErrors[i].job}
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
                                onBlur={() =>
                                  markTouched("experience", i, "company")
                                }
                                className={
                                  experienceErrors[i]?.company &&
                                  typeof touched.experience === "object" &&
                                  (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.company
                                    ? "border-red-500"
                                    : ""
                                }
                              />
                              {experienceErrors[i]?.company &&
                                typeof touched.experience === "object" &&
                                touched.experience?.[i]?.company && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {experienceErrors[i].company}
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
                            <Textarea
                              value={exp.description}
                              onChange={(e) =>
                                updateExperienceItem(i, "description", e.target.value)
                              }
                              onBlur={() =>
                                markTouched("experience", i, "description")
                              }
                              className={
                                experienceErrors[i]?.description &&
                                typeof touched.experience === "object" &&
                                (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.description
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {experienceErrors[i]?.description &&
                              typeof touched.experience === "object" &&
                              (touched.experience as { [idx: number]: { [subKey: string]: boolean } })[i]?.description && (
                                <div className="text-red-500 text-xs mt-1">
                                  {experienceErrors[i].description}
                                </div>
                              )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 h-12"
                    onClick={addExperience}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Experience
                  </Button>
                </div>
              )}

              {currentStep === "Education" && fieldUsage["data.education"] && (
                <div>
                  {formData.education.map((edu, i) => (
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
                                educationErrors[i]?.school &&
                                typeof touched.education === "object" &&
                                (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.school
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {educationErrors[i]?.school &&
                              typeof touched.education === "object" &&
                              (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.school && (
                                <div className="text-red-500 text-xs mt-1">
                                  {educationErrors[i].school}
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
                                educationErrors[i]?.degree &&
                                typeof touched.education === "object" &&
                                (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.degree
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {educationErrors[i]?.degree &&
                              typeof touched.education === "object" &&
                              (touched.education as { [idx: number]: { [subKey: string]: boolean } })[i]?.degree && (
                                <div className="text-red-500 text-xs mt-1">
                                  {educationErrors[i].degree}
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
                  <Button
                    variant="outline"
                    className="w-full border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 h-12"
                    onClick={addEducation}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Education
                  </Button>
                </div>
              )}

              {currentStep === "Skills" && fieldUsage["data.skills"] && (
                <div>
                  {formData.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1">
                        <Input
                          value={skill}
                          onChange={(e) => updateSkill(i, e.target.value)}
                          onBlur={() => markTouched("skills", i, "skill")}
                          className={
                            skillsErrors[i] &&
                            typeof touched.skills === "object" &&
                            (touched.skills as { [idx: number]: { [subKey: string]: boolean } })[i]?.skill
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {skillsErrors[i] &&
                          typeof touched.skills === "object" &&
                          (touched.skills as { [idx: number]: { [subKey: string]: boolean } })[i]?.skill && (
                          <div className="text-red-500 text-xs mt-1">
                            {skillsErrors[i]}
                          </div>
                        )}
                      </div>
                      {formData.skills.length > 1 && (
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          onClick={() => removeSkill(i)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 h-12"
                    onClick={addSkill}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Skill
                  </Button>
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={!canGoPrev}
                className="flex items-center gap-2 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              {step < usedSteps.length - 1 ? (
                <Button
                  onClick={() => {
                    // Markeer alle relevante velden als touched bij proberen volgende stap
                    if (currentStep === "Personal") {
                      Object.keys(personalErrors).forEach((k) =>
                        markTouched("personal", undefined, k)
                      );
                    }
                    if (currentStep === "Profile") {
                      markTouched("profile");
                    }
                    if (currentStep === "Experience") {
                      experienceErrors.forEach((_, i) => {
                        markTouched("experience", i, "job");
                        markTouched("experience", i, "company");
                        markTouched("experience", i, "description");
                      });
                    }
                    if (currentStep === "Education") {
                      educationErrors.forEach((_, i) => {
                        markTouched("education", i, "school");
                        markTouched("education", i, "degree");
                      });
                    }
                    if (currentStep === "Skills") {
                      skillsErrors.forEach((_, i) => {
                        markTouched("skills", i, "skill");
                      });
                    }
                    if (canGoNext) setStep((s) => s + 1);
                  }}
                  disabled={!canGoNext}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center gap-2 px-6 py-3"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={loadingSave || !validateStep(currentStep)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center gap-2 px-8 py-3"
                >
                  {loadingSave ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Resume...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Complete Resume
                    </>
                  )}
                </Button>
              )}
            </div>
            {saveSuccess && resumeId && (
              <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 text-lg">
                        Resume Created Successfully!
                      </h3>
                      <p className="text-green-700 text-sm">
                        Your professional resume is ready to download
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={() => downloadResume(resumeId, "pdf", !isPro)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF {!isPro && "(with watermark)"}
                    </Button>
                    <Button
                      onClick={() => downloadResume(resumeId, "docx", false)}
                      disabled={!isPro}
                      variant={isPro ? "default" : "outline"}
                      className="w-full h-12"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Download DOCX {!isPro && "(Pro Feature)"}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => alert("AI Summary feature coming soon!")}
                        variant="outline"
                        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        AI Enhance
                      </Button>
                      <Button
                        onClick={() => alert("Share feature coming soon!")}
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Share Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Preview */}
        <div className="w-full lg:w-3/5 bg-gradient-to-br from-gray-50 to-indigo-50 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Live Preview
                </h3>
                <p className="text-gray-600">See your changes in real-time</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Quick Print
                </Button>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: accent }}
                ></div>
              </div>
            </div>
            <div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden relative"
              style={{ borderTop: `6px solid ${accent}` }}
            >
              {TemplateComponent ? (
                <div className="p-8">
                  <TemplateComponent data={formData} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-12 h-12 text-gray-300" />
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-700 mb-2">
                      Preview Loading...
                    </h4>
                    <p className="text-gray-500">
                      Your resume will appear here as you fill in the details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
