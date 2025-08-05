"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, Loader2, Wand2, Sparkles, Edit3, CheckCircle, Eye } from "lucide-react";
import { templates } from "./utils/templateMap";
import { TemplateCard } from "./components/TemplateCard";
import { AnimatedStepIndicator } from "./components/AnimatedStepIndicator";
import { ColorPicker } from "./components/ColorPicker";
import { CVData } from "@/types/cv";
import templateFields from "../../../scripts/template-fields.json";
import { usePathname } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { PersonalStep } from "./components/steps/PersonalStep";
import { ProfileStep } from "./components/steps/ProfileStep";
import { ExperienceStep } from "./components/steps/ExperienceStep";
import { EducationStep } from "./components/steps/EducationStep";
import { SkillsStep } from "./components/steps/SkillsStep";
import FinalPageStep from "./components/steps/FinalPageStep";

const printHideStyle = `
@media print {
  .no-print { display: none !important; }
}
`;

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

function validateEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}
function isEmpty(val: string | undefined) {
  return !val || val.trim() === "";
}

type TouchedType = {
  [key: string]: boolean | { [idx: number]: { [subKey: string]: boolean } };
};

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
    settings: { accent: "#1E40AF" },
  });
  const [touched, setTouched] = useState<TouchedType>({});
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showPrintNotification, setShowPrintNotification] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => { setSaveSuccess(false); }, [pathname]);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: formData.personal.name
      ? `${formData.personal.name}-CV`
      : "Resume",
    onAfterPrint: () => {
      setShowPrintNotification(true);
      setTimeout(() => setShowPrintNotification(false), 5000);
    }
  });

  

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      formData.settings?.accent || defaultAccent
    );
  }, [formData.settings?.accent]);

  const currentTemplateMeta = useMemo(
    () => templates.find((t) => t.id === selectedTemplate),
    [selectedTemplate]
  );

  const fieldUsage = useMemo(() => {
    if (!currentTemplateMeta) return {};
    return (templateFields as Record<string, Record<string, boolean>>)[currentTemplateMeta.fileName] || {};
  }, [currentTemplateMeta]);

  const usedSteps: string[] = useMemo(() => {
    const steps = ["Template"];
    FIELD_STEP_MAP.forEach((f) => {
      if (fieldUsage[f.field]) {
        if (!steps.includes(f.step)) steps.push(f.step);
      }
    });
    steps.push("Final");
    return steps;
  }, [fieldUsage]);

  function getPersonalErrors() {
  return {
    name: isEmpty(formData.personal.name) ? "Name is required" : undefined,
    title: isEmpty(formData.personal.title) ? "Title is required" : undefined,
    email: isEmpty(formData.personal.email)
      ? "Email is required"
      : !validateEmail(formData.personal.email)
      ? "Invalid email address"
      : undefined,
    phone: undefined, // geen fout, dus altijd undefined
    photoUrl: undefined,
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

  // Update/handlers voor alle stappen:
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

  const currentStep = usedSteps[step];

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

  const TemplateComponent =
    selectedTemplate != null
      ? templates.find((t) => t.id === selectedTemplate)?.comp
      : null;

  const personalErrors = getPersonalErrors();
  const experienceErrors = getExperienceErrors();
  const educationErrors = getEducationErrors();
  const skillsErrors = getSkillsErrors();
  const profileError = getProfileError();

  // --- SIDEBAR/FORM AREA met steps ---
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 font-sans">
    <style>{printHideStyle}</style>
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl flex flex-col min-h-screen">
        <div className="p-8 h-full flex flex-col">
          {/* Top Bar met back button en logo */}
          <div className="relative flex items-center justify-center mb-8 min-h-[38px]">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors w-9 h-9 flex items-center justify-center"
                aria-label="Back"
                type="button"
                style={{ zIndex: 2 }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto mx-auto"
              style={{ maxWidth: 140 }}
            />
          </div>
          {/* Steps indicator en titel */}
          <div className="mb-5">
            <AnimatedStepIndicator
              steps={usedSteps.slice(1)}
              currentStep={step - 1}
            />
            <div className="text-left mt-8">
              {currentStep === "Personal" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
                  <p className="text-[#64748B] text-sm">Provide your full name, professional title, contact details, and optionally upload a photo.</p>
                </>
              )}
              {currentStep === "Profile" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Summary</h2>
                  <p className="text-[#64748B] text-sm">Write a short professional summary that highlights your experience, strengths, and goals.</p>
                </>
              )}
              {currentStep === "Experience" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience Information</h2>
                  <p className="text-[#64748B] text-sm">List your previous roles, including job titles, companies, dates, and a brief description of your responsibilities or achievements.</p>
                </>
              )}
              {currentStep === "Education" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Education Information</h2>
                  <p className="text-[#64748B] text-sm">Include your educational background with degrees, schools, and graduation years.</p>
                </>
              )}
              {currentStep === "Skills" && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills Information</h2>
                  <p className="text-[#64748B] text-sm">Add relevant skills that showcase your expertise and match the jobs you are targeting.</p>
                </>
              )}
              {currentStep === "Final" && (
                <FinalPageStep
                  handlePrint={handlePrint}
                  showPrintNotification={showPrintNotification}
                />
              )}
            </div>
          </div>
          {/* Kleurenkiezer */}
          <div className="mb-4">
            <ColorPicker
              color={formData.settings?.accent || "#1E40AF"}
              onChange={kleur =>
                setFormData(f => ({
                  ...f,
                  settings: {
                    ...f.settings,
                    accent: kleur
                  }
                }))
              }
              isOpen={showColorPicker}
              onToggle={() => setShowColorPicker(!showColorPicker)}
            />
          </div>
          {/* Steps form */}
          <div className="flex-1 space-y-6 overflow-y-auto">
            {currentStep === "Personal" && (
              <PersonalStep
                formData={formData}
                updatePersonal={updatePersonal}
                handlePhotoUpload={handlePhotoUpload}
                markTouched={markTouched}
                errors={personalErrors}
                touched={touched}
                fieldUsage={fieldUsage}
              />
            )}
            {currentStep === "Profile" && fieldUsage["data.profile"] && (
              <ProfileStep
                formData={formData}
                updateProfile={updateProfile}
                markTouched={markTouched}
                error={profileError}
                touched={touched}
              />
            )}
            {currentStep === "Experience" && fieldUsage["data.experience"] && (
              <ExperienceStep
                experience={formData.experience}
                updateExperienceItem={updateExperienceItem}
                addExperience={addExperience}
                removeExperience={removeExperience}
                markTouched={markTouched}
                errors={experienceErrors}
                touched={touched}
              />
            )}
            {currentStep === "Education" && fieldUsage["data.education"] && (
              <EducationStep
                education={formData.education}
                updateEducationItem={updateEducationItem}
                addEducation={addEducation}
                markTouched={markTouched}
                errors={educationErrors}
                touched={touched}
              />
            )}
            {currentStep === "Skills" && fieldUsage["data.skills"] && (
              <SkillsStep
                skills={formData.skills}
                updateSkill={updateSkill}
                addSkill={addSkill}
                removeSkill={removeSkill}
                markTouched={markTouched}
                errors={skillsErrors}
                touched={touched}
              />
            )}
          </div>
          {/* Sticky Navigation buttons */}
          <div className="sticky bottom-0 bg-white/95 pt-6 pb-6 border-t border-gray-200 z-10">
            <div className="flex justify-end">
              {/* Hide navigation entirely on the Final step */}
              {step === usedSteps.length - 1 ? null : (
                <Button
                  onClick={async () => {
                    // If we're on the step before Final (Skills), save before moving on
                    if (step === usedSteps.length - 2) {
                      await handleFinish();
                    }
                    setStep((s) => s + 1);
                  }}
                  disabled={
                    // Disable while saving on the Finish action, or if validation fails on other steps
                    (step === usedSteps.length - 2 && loadingSave) ||
                    !validateStep(currentStep)
                  }
                  className={
                    // Green “Finish Resume” on Skills step, blue “Continue” on all others
                    step === usedSteps.length - 2
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center gap-2 px-8 py-3"
                      : "bg-[#4F46E5] text-white flex items-center gap-2 px-6 py-3"
                  }
                >
                  {step === usedSteps.length - 2 ? (
                    loadingSave ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Making Resume...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Finish Resume
                      </>
                    )
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="w-full lg:w-3/5 bg-[#faf8ff] min-h-screen flex flex-col items-center justify-start p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Live Preview</h3>
              <p className="text-[#7883a1] text-base">See the changes in real-time</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5142ea] hover:bg-gray-800 text-white font-medium shadow transition-all text-sm"
              onClick={handlePrint}
            >
              <Eye />
              Download Preview
            </button>
          </div>
          {/* Preview canvas */}
          <div
            className="bg-white rounded-2xl shadow-lg mx-auto transition-all"
            style={{ minHeight: 650 }}
            ref={contentRef}
          >
            {TemplateComponent ? (
              <div className="p-0 sm:p-4">
                <div className="flex justify-center items-start">
                  <div className="w-full max-w-[600px]">
                    <TemplateComponent data={formData} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
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