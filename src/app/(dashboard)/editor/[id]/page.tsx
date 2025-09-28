"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowRight,
  Loader2,
  Wand2,
  CheckCircle,
  Eye,
  Save,
  Crown,
  Lock,
  Zap,
} from "lucide-react";
import { templates } from "../utils/templateMap";
import { AnimatedStepIndicator } from "../components/AnimatedStepIndicator";
import { ColorPicker } from "../components/ColorPicker";
import { CVData } from "@/types/cv";
import templateFields from "../../../../../scripts/template-fields.json";
import { usePathname, useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { PersonalStep } from "../components/steps/PersonalStep";
import { ProfileStep } from "../components/steps/ProfileStep";
import { ExperienceStep } from "../components/steps/ExperienceStep";
import { EducationStep } from "../components/steps/EducationStep";
import { SkillsStep } from "../components/steps/SkillsStep";
import FinalPageStep from "../components/steps/FinalPageStep";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const printHideStyle = `
@media print {
  .no-print { display: none !important; }
  
  /* Watermark for free users */
  .watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 9999;
    white-space: nowrap;
    font-weight: bold;
  }
}
`;

type Resume = {
  id: string;
  data: any;
  template_id: string;
  user_id: string;
  created_at: string;
};

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

function EditorContent() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { has } = useAuth();
  const searchParams = useSearchParams();
  const templateIdFromQuery = searchParams.get("templateId");
  const params = useParams();
  const resumeIdForParams = params.id as string;
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
  const [existingResume, setExistingResume] = useState<Resume | null>(null);
  const [loadingResume, setLoadingResume] = useState(!!resumeIdForParams);
  const [isProUser, setIsProUser] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [showPrintNotification, setShowPrintNotification] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hasValidTemplate, setHasValidTemplate] = useState(false);
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const [loadingProCheck, setLoadingProCheck] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { getToken } = useAuth();

  // Check if user has pro plan
  useEffect(() => {
    const checkProStatus = async () => {
      if (!user) {
        setLoadingProCheck(false);
        return;
      }

      try {
        const hasProPlan = await has({ plan: "pro" });
        setIsProUser(hasProPlan);

        // Check AI usage for free users
        if (!hasProPlan) {
          const savedAiUsage = localStorage.getItem("ai_usage_count");
          setAiUsageCount(parseInt(savedAiUsage || "0"));
        }
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      } finally {
        setLoadingProCheck(false);
      }
    };

    checkProStatus();
  }, [user, has]);

  // Fix: Check for valid template/resume before redirecting
  useEffect(() => {
    // If we have a resume ID, we're editing an existing resume - don't redirect
    if (resumeIdForParams) {
      setHasValidTemplate(true);
      return;
    }

    // If we have a template ID from query, it's valid
    if (templateIdFromQuery) {
      setHasValidTemplate(true);
      return;
    }

    // If no valid template or resume ID, redirect to template selection
    if (!templateIdFromQuery && !resumeIdForParams) {
      router.replace("/select-template");
    }
  }, [templateIdFromQuery, resumeIdForParams, router]);

  useEffect(() => {
    if (resumeIdForParams) {
      const fetchResume = async () => {
        try {
          setLoadingResume(true);
          const response = await fetch(
            `/api/get-resume?id=${resumeIdForParams}`,
          );
          if (response.ok) {
            const resumeData = await response.json();
            setExistingResume(resumeData);

            // Vul formulier in met bestaande data
            if (resumeData.data) {
              setFormData(resumeData.data);
            }
            if (resumeData.template_id) {
              setSelectedTemplate(resumeData.template_id);
              setStep(1);
            }
          }
        } catch (error) {
          console.error("Error loading resume:", error);
        } finally {
          setLoadingResume(false);
        }
      };

      fetchResume();
    }
  }, [resumeIdForParams]);

  useEffect(() => {
    setSaveSuccess(false);
  }, [pathname]);

  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    templateIdFromQuery,
  );

  // Handle AI feature usage for free users
  const handleAiUsage = () => {
    if (!isProUser) {
      if (aiUsageCount >= 1) {
        alert(
          "Free users can only use AI features once. Upgrade to Pro for unlimited AI usage! 🚀",
        );
        return false;
      }
      setAiUsageCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("ai_usage_count", newCount.toString());
        return newCount;
      });
    }
    return true;
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: formData.personal.name
      ? `${formData.personal.name}-CV`
      : "Resume",
    onAfterPrint: () => {
      setShowPrintNotification(true);
      setTimeout(() => setShowPrintNotification(false), 5000);
    },
    pageStyle: isProUser
      ? ``
      : `
      @page { 
        margin: 0; 
        size: auto;
      }
      body { 
        -webkit-print-color-adjust: exact; 
        print-color-adjust: exact;
      }
      ${
        !isProUser
          ? `
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            color: rgba(0, 0, 0, 0.1);
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
            font-weight: bold;
          }
        `
          : ""
      }
    `,
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      formData.settings?.accent || defaultAccent,
    );
  }, [formData.settings?.accent]);

  const currentTemplateMeta = useMemo(
    () => templates.find((t) => t.id === selectedTemplate),
    [selectedTemplate],
  );

  const fieldUsage = useMemo(() => {
    if (!currentTemplateMeta) return {};
    return (
      (templateFields as Record<string, Record<string, boolean>>)[
        currentTemplateMeta.fileName
      ] || {}
    );
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
      isEmpty(s) ? "Skill cannot be empty" : undefined,
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
          (e) => !e.job && !e.company && !e.description,
        );
      case "Education":
        return getEducationErrors().every((e) => !e.school && !e.degree);
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
            ...((t[key] as { [idx: number]: { [subKey: string]: boolean } }) ||
              {}),
            [idx]: {
              ...((
                t[key] as { [idx: number]: { [subKey: string]: boolean } }
              )?.[idx] || {}),
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
    value: string,
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
    value: string,
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
    if (formData.skills.length > 0) {
      setFormData((d) => ({
        ...d,
        skills: d.skills.filter((_, idx) => idx !== i),
      }));
    }
  };

  // Save as draft function
  const saveDraft = async () => {
    if (!selectedTemplate) {
      alert("Please select a template first");
      return;
    }

    setSavingDraft(true);
    try {
      // 1. Get the auth token from Clerk, not Supabase
      const token = await getToken({ template: "supabase" });

      if (!token) {
        alert("Authentication error. Please log in again.");
        setSavingDraft(false);
        return;
      }

      const url = resumeIdForParams ? "/api/update-resume" : "/api/save-resume";
      const method = resumeIdForParams ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // 2. Send the Clerk token to the backend
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          formData,
          ...(resumeIdForParams && { id: resumeIdForParams }),
        }),
      });

      console.log("Response status:", res.status);

      if (res.ok) {
        // ... (The rest of your success/error handling logic remains the same)
        const result = await res.json();
        if (result.success) {
          console.log("Draft saved/updated successfully");
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
          // etc...
        } else {
          alert(result.error || "Failed to save draft.");
        }
      } else {
        const errorData = await res.json();
        alert(errorData.error || `Error ${res.status}: Failed to save draft.`);
      }
    } catch (error) {
      console.error("Save draft failed with an exception:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setSavingDraft(false);
    }
    router.push("/dashboard");
  };

  const handleFinish = async () => {
    if (!selectedTemplate) return;
    setLoadingSave(true);
    try {
      const token = await getToken();
      console.log("token", token);
      const url = resumeIdForParams ? "/api/update-resume" : "/api/save-resume";
      const method = resumeIdForParams ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          formData,
          ...(resumeIdForParams && { id: resumeIdForParams }),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (!resumeIdForParams) {
          setResumeId(result.resumeId);
        }
        setSaveSuccess(true);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setLoadingSave(false);
    }
  };

  const currentStep = usedSteps[step];

  if (loadingResume || loadingProCheck) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
      </div>
    );
  }

  // Don't render anything if we're redirecting
  if (!hasValidTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
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

  if (step === 0) {
    router.replace("/select-template");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 font-sans">
      <style>{printHideStyle}</style>

      {/* Watermark for free users in print */}
      {!isProUser && (
        <div className="watermark no-print" style={{ display: "none" }}>
          CVHero Free Version
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl flex flex-col min-h-screen">
          <div className="p-8 h-full flex flex-col">
            {/* Top Bar met back button en logo */}
            <div className="relative flex items-center justify-center mb-8 min-h-[38px]">
              {step > 0 && (
                <>
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors w-9 h-9 flex items-center justify-center"
                    aria-label="Back"
                    type="button"
                    style={{ zIndex: 2 }}
                  >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base select-none">
                    Back
                  </span>
                </>
              )}
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto mx-auto"
                style={{ maxWidth: 140 }}
              />

              {/* Pro Badge */}
              {!isProUser && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <Badge className="bg-gradient-to-r from-gray-600 to-blue-600 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Free Plan
                  </Badge>
                </div>
              )}
            </div>

            {/* Save Draft Button */}
            {resumeIdForParams && (
              <div className="mb-4">
                <Button
                  onClick={saveDraft}
                  disabled={savingDraft}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {savingDraft ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </>
                  )}
                </Button>
                {saveSuccess && (
                  <div className="mt-2 text-green-600 text-sm text-center">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Draft saved successfully!
                  </div>
                )}
              </div>
            )}

            {/* Steps indicator en titel */}
            <div className="mb-5">
              <AnimatedStepIndicator
                steps={usedSteps.slice(1)}
                currentStep={step - 1}
              />
              <div className="text-left mt-8">
                {currentStep === "Personal" && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Personal Details
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      Provide your full name, professional title, contact
                      details, and optionally upload a photo.
                    </p>
                  </>
                )}
                {currentStep === "Profile" && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Profile Summary
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      Write a short professional summary that highlights your
                      experience, strengths, and goals.
                    </p>
                    {!isProUser && aiUsageCount >= 1 && (
                      <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-xs text-orange-800">
                          <Lock className="h-3 w-3 inline mr-1" />
                          AI feature used ({aiUsageCount}/1). Upgrade for
                          unlimited AI usage.
                        </p>
                      </div>
                    )}
                  </>
                )}
                {currentStep === "Experience" && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Experience Information
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      List your previous roles, including job titles, companies,
                      dates, and a brief description of your responsibilities or
                      achievements.
                    </p>
                  </>
                )}
                {currentStep === "Education" && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Education Information
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      Include your educational background with degrees, schools,
                      and graduation years.
                    </p>
                  </>
                )}
                {currentStep === "Skills" && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Skills Information
                    </h2>
                    <p className="text-[#64748B] text-sm">
                      Add relevant skills that showcase your expertise and match
                      the jobs you are targeting.
                    </p>
                  </>
                )}
                {currentStep === "Final" && (
                  <FinalPageStep handlePrint={handlePrint} />
                )}
              </div>
            </div>

            {/* Kleurenkiezer - Alleen voor Pro users */}
            {currentStep !== "Final" && isProUser && (
              <div className="mb-4">
                <ColorPicker
                  color={formData.settings?.accent || "#1E40AF"}
                  onChange={(kleur) =>
                    setFormData((f) => ({
                      ...f,
                      settings: {
                        ...f.settings,
                        accent: kleur,
                      },
                    }))
                  }
                  isOpen={showColorPicker}
                  onToggle={() => setShowColorPicker(!showColorPicker)}
                />
              </div>
            )}

            {/* Color info for free users */}
            {currentStep !== "Final" && !isProUser && (
              <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    Color customization is a{" "}
                    <span className="font-semibold">Pro feature</span>
                  </p>
                </div>
              </div>
            )}

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
                  onAiGenerate={handleAiUsage}
                  isProUser={isProUser}
                  aiUsageCount={aiUsageCount}
                />
              )}
              {currentStep === "Experience" &&
                fieldUsage["data.experience"] && (
                  <ExperienceStep
                    experience={formData.experience}
                    updateExperienceItem={updateExperienceItem}
                    addExperience={addExperience}
                    removeExperience={removeExperience}
                    markTouched={markTouched}
                    errors={experienceErrors}
                    touched={touched}
                    onAiGenerate={handleAiUsage}
                    isProUser={isProUser}
                    aiUsageCount={aiUsageCount}
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
                {step === usedSteps.length - 1 ? null : (
                  <Button
                    onClick={async () => {
                      if (step === usedSteps.length - 2) {
                        await handleFinish();
                      }
                      setStep((s) => s + 1);
                    }}
                    disabled={
                      (step === usedSteps.length - 2 &&
                        (loadingSave || formData.skills.length < 1)) ||
                      !validateStep(currentStep)
                    }
                    className={
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
                <h3 className="text-2xl font-semibold text-gray-900">
                  Live Preview
                </h3>
                <p className="text-[#7883a1] text-base">
                  See the changes in real-time
                  {!isProUser && (
                    <span className="text-orange-600 ml-2">
                      • Watermark will appear in download
                    </span>
                  )}
                </p>
              </div>
            </div>
            {/* Preview canvas */}
            <div
              className="bg-white rounded-2xl shadow-lg mx-auto transition-all"
              style={{ minHeight: 650 }}
              ref={contentRef}
            >
              {TemplateComponent ? (
                <div className="p-0 sm:p-4 relative">
                  <div className="flex justify-center items-start">
                    <div className="w-full max-w-[600px] relative">
                      <TemplateComponent data={formData} />
                      {/* Watermark for free users - shown in both preview and print */}
                      {!isProUser && (
                        <div className="absolute inset-0 pointer-events-none z-50 print:block hidden">
                          <div
                            className="watermark-print"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%) rotate(-45deg)",
                              fontSize: "80px",
                              color: "rgba(0, 0, 0, 0.1)",
                              pointerEvents: "none",
                              zIndex: 9999,
                              whiteSpace: "nowrap",
                              fontWeight: "bold",
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            CVHero Free Version
                          </div>
                        </div>
                      )}
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

// Helper component for Badge (add this if not already imported)
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading editor...</p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
