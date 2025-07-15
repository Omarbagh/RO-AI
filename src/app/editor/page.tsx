"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Zap,
  Palette,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  FileText,
  Star,
  Sparkles,
  Crown,
  Upload,
  User,
  Briefcase,
  GraduationCap,
  Target,
  Eye,
  Loader2,
  Award,
  Rocket,
  TrendingUp,
  Globe,
  Camera,
  Edit3,
  ChevronRight,
  Wand2,
  MessageSquare,
} from "lucide-react";
import { CVData } from "@/types/cv";

import BasicTemplate from "@/components/templates/basicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { SidebarDarkTemplate } from "@/components/templates/SidebarDarkTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";

const templates = [
  {
    id: 1,
    name: "Essential",
    comp: BasicTemplate,
    pro: false,
    category: "Starter",
    description: "Perfect foundation for any professional resume",
    features: ["Clean layout", "ATS-friendly", "Easy to customize"],
    popularity: 95,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Modern Pro",
    comp: ModernTemplate,
    pro: false,
    category: "Popular",
    description: "Contemporary design that stands out professionally",
    features: ["Sidebar layout", "Modern typography", "Color accents"],
    popularity: 98,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 3,
    name: "Creative Studio",
    comp: CreativeTemplate,
    pro: true,
    category: "Premium",
    description: "Bold design for creative professionals and designers",
    features: ["Artistic layout", "Color gradients", "Visual impact"],
    popularity: 87,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    name: "Executive Elite",
    comp: ExecutiveTemplate,
    pro: true,
    category: "Leadership",
    description: "Premium design for C-level executives and leaders",
    features: ["Luxury styling", "Executive summary", "Achievement focus"],
    popularity: 92,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    name: "Minimal Zen",
    comp: MinimalistTemplate,
    pro: true,
    category: "Elegant",
    description: "Ultra-clean design focusing on content clarity",
    features: ["Whitespace design", "Typography focus", "Distraction-free"],
    popularity: 89,
    color: "from-gray-600 to-gray-700",
  },
  {
    id: 6,
    name: "Portfolio Showcase",
    comp: PortfolioTemplate,
    pro: true,
    category: "Creative",
    description: "Perfect for showcasing your work and projects",
    features: ["Project highlights", "Visual portfolio", "Work samples"],
    popularity: 84,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 7,
    name: "Corporate Pro",
    comp: ProfessionalTemplate,
    pro: true,
    category: "Business",
    description: "Traditional corporate styling for any industry",
    features: ["Conservative design", "Industry standard", "Professional"],
    popularity: 91,
    color: "from-blue-600 to-blue-700",
  },
  {
    id: 8,
    name: "Dark Mode Pro",
    comp: SidebarDarkTemplate,
    pro: false,
    category: "Modern",
    description: "Contemporary dark theme with sophisticated appeal",
    features: ["Dark theme", "Modern contrast", "Eye-catching"],
    popularity: 86,
    color: "from-slate-700 to-slate-800",
  },
  {
    id: 9,
    name: "Classic Elite",
    comp: ClassicTemplate,
    pro: false,
    category: "Timeless",
    description: "Timeless design with proven effectiveness",
    features: ["Traditional layout", "Time-tested", "Universally accepted"],
    popularity: 93,
    color: "from-slate-600 to-slate-700",
  },
];

const defaultAccent = "#6366f1";

const dummyPreviewData: CVData = {
  personal: {
    name: "Alexandra Chen",
    title: "Senior Product Designer & UX Strategist",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 123-4567",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  },
  profile:
    "Award-winning product designer with 6+ years of experience creating user-centered digital experiences for Fortune 500 companies. Proven track record in leading design systems, increasing user engagement by 40%, and driving product growth through data-driven design decisions.",
  experience: [
    {
      job: "Senior Product Designer",
      company: "TechFlow Industries",
      description:
        "Led design for flagship mobile app with 2M+ users. Spearheaded design system implementation, resulting in 60% faster development cycles. Mentored junior designers and established design ops workflows.",
      period: "2022-Present",
    },
    {
      job: "UX Designer",
      company: "Digital Innovations Co.",
      description:
        "Designed end-to-end user experiences for B2B SaaS platform serving 10k+ businesses. Collaborated with engineering teams to implement design systems and optimize conversion rates.",
      period: "2020-2022",
    },
  ],
  education: [
    {
      school: "Stanford University",
      degree: "Master of Human-Computer Interaction",
      year: "2020",
    },
    {
      school: "UC Berkeley",
      degree: "Bachelor of Fine Arts in Digital Design",
      year: "2018",
    },
  ],
  skills: [
    "Figma & Sketch",
    "Design Systems",
    "User Research",
    "Prototyping",
    "HTML/CSS/JS",
    "Data Analysis",
  ],
};

const stepIcons = [FileText, User, Target, Briefcase, GraduationCap, Award];

interface TemplateType {
  id: number;
  name: string;
  comp: React.ComponentType<{ data: CVData }>;
  pro: boolean;
  category: string;
  description: string;
  features: string[];
  popularity: number;
  color: string;
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
  isPro,
  index,
}: {
  template: TemplateType;
  isSelected: boolean;
  onSelect: () => void;
  isPro: boolean;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Preview = template.comp;
  const isLocked = template.pro && !isPro;

  return (
    <div
      className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden animate-fade-in-up`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isLocked ? undefined : onSelect}
    >
      <Card
        className={`h-full transition-all duration-300 ${
          isSelected
            ? "ring-2 ring-indigo-500 shadow-2xl border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50"
            : "border-gray-200 hover:border-indigo-300 hover:shadow-xl"
        } ${isLocked ? "opacity-75" : ""}`}
      >
        {/* Premium Badge */}
        {template.pro && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
              <Crown className="w-3 h-3 mr-1" />
              PRO
            </Badge>
          </div>
        )}

        {/* Popularity Badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 shadow-lg"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            {template.popularity}%
          </Badge>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-16 z-20 bg-indigo-500 text-white rounded-full p-1.5 shadow-lg animate-bounce">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-30 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-2xl text-center max-w-48">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Premium Template
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Upgrade to unlock this design
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Template Preview */}
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-t-lg relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-5`}
          ></div>
          <div className="relative z-5 transform scale-[0.28] origin-top-left w-[357%] h-[357%] pointer-events-none">
            <div className="bg-white rounded-lg shadow-sm">
              <Preview data={dummyPreviewData} />
            </div>
          </div>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered && !isLocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl transform scale-110"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Template
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {template.name}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs bg-gradient-to-r ${template.color} text-white border-0`}
              >
                {template.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(template.popularity / 20)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {template.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {template.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button
            size="sm"
            className={`w-full transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                : isLocked
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700"
            }`}
            disabled={isLocked}
          >
            {isSelected ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Selected Template
              </>
            ) : isLocked ? (
              <>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Use
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 mr-2" />
                Select Template
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AnimatedStepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="relative">
      {/* Background Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>

      {/* Progress Line */}
      <div
        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
      ></div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent text-white shadow-lg scale-110"
                    : isCurrent
                      ? "bg-white border-indigo-500 text-indigo-500 shadow-lg scale-110 animate-pulse"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColorPicker({
  color,
  onChange,
  isOpen,
  onToggle,
}: {
  color: string;
  onChange: (color: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const presetColors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ef4444",
    "#6b7280",
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Brand Color</label>
        <button
          className="w-12 h-8 rounded-lg border-2 border-white shadow-lg transition-transform hover:scale-110 relative overflow-hidden"
          style={{ backgroundColor: color }}
          onClick={onToggle}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <Palette className="w-4 h-4 text-white mx-auto" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-72">
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">
                Choose Your Brand Color
              </h4>
              <p className="text-sm text-gray-600">
                This color will be used throughout your resume
              </p>
            </div>

            <div className="flex justify-center">
              <HexColorPicker color={color} onChange={onChange} />
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-medium text-gray-700">
                Quick Select
              </h5>
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-12 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                      color === presetColor
                        ? "border-gray-400 ring-2 ring-gray-300"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hex:</span>
              <Input
                className="text-sm font-mono"
                value={color}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>

            <Button onClick={onToggle} className="w-full">
              Apply Color
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UltraProfessionalEditor() {
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState<CVData>({
    personal: { name: "", title: "", email: "", phone: "", photoUrl: "" },
    profile: "",
    experience: [{ job: "", company: "", description: "", period: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: [""],
  });
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [accent, setAccent] = useState(defaultAccent);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    setAnimateIn(true);
  }, [accent]);

  const steps = [
    "Template",
    "Personal",
    "Profile",
    "Experience",
    "Education",
    "Skills",
  ];

  // Helper functions (same as before but with improved error handling)
  const updatePersonal = (field: keyof CVData["personal"], value: string) => {
    setFormData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
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
  };

  const addEducation = () => {
    setFormData((d) => ({
      ...d,
      education: [...d.education, { school: "", degree: "", year: "" }],
    }));
  };

  const removeEducation = (i: number) => {
    if (formData.education.length > 1) {
      setFormData((d) => ({
        ...d,
        education: d.education.filter((_, idx) => idx !== i),
      }));
    }
  };

  const updateSkill = (i: number, value: string) => {
    setFormData((d) => {
      const skills = [...d.skills];
      skills[i] = value;
      return { ...d, skills };
    });
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
    watermark = false,
  ) => {
    const params = new URLSearchParams({ resumeId: id, format });
    if (watermark) params.set("watermark", "ResumeAI");
    const url = `/api/download?${params.toString()}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume.${format}`;
    link.click();
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>

          <Card className="w-full max-w-md relative overflow-hidden shadow-2xl border-0">
            {/* Card header gradient */}
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

  const TemplateComponent =
    selectedTemplate != null
      ? templates.find((t) => t.id === selectedTemplate)!.comp
      : null;

  // Template Selection Step
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 animate-float-delayed"></div>
          <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-float"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8 shadow-2xl">
              <Rocket className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Choose Your Perfect
              <br />
              Resume Template
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Start with a professionally designed template. Each template is
              crafted by experts to help you make the best first impression with
              employers and pass ATS systems.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">30+</div>
                <div className="text-sm text-gray-600">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">1M+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
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

          {/* Continue Button */}
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

  // Editor Steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl">
          <div className="p-8 h-full flex flex-col">
            {/* Header */}
            <div className="mb-8">
              <AnimatedStepIndicator
                steps={steps.slice(1)}
                currentStep={step - 1}
              />

              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-4 py-2 mb-4">
                  <span className="text-sm font-medium text-indigo-700">
                    Step {step} of {steps.length - 1}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {steps[step]} Information
                </h2>
                <p className="text-gray-600">
                  {step === 1 && "Tell us about yourself"}
                  {step === 2 && "Write a compelling summary"}
                  {step === 3 && "Add your work experience"}
                  {step === 4 && "Include your education"}
                  {step === 5 && "List your key skills"}
                </p>
              </div>
            </div>

            {/* Color Picker */}
            <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
              <ColorPicker
                color={accent}
                onChange={setAccent}
                isOpen={showColorPicker}
                onToggle={() => setShowColorPicker(!showColorPicker)}
              />
            </div>

            {/* Form Content */}
            <div className="flex-1 space-y-6 overflow-y-auto">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Photo Upload */}
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

                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        placeholder="e.g., Alexandra Chen"
                        value={formData.personal.name}
                        onChange={(e) => updatePersonal("name", e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Title *
                      </label>
                      <Input
                        placeholder="e.g., Senior Product Designer"
                        value={formData.personal.title}
                        onChange={(e) =>
                          updatePersonal("title", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        placeholder="your.email@company.com"
                        type="email"
                        value={formData.personal.email}
                        onChange={(e) =>
                          updatePersonal("email", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={formData.personal.phone}
                        onChange={(e) =>
                          updatePersonal("phone", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">
                          Professional Summary Tips
                        </h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Highlight your years of experience</li>
                          <li>• Mention key achievements with numbers</li>
                          <li>• Include relevant skills and expertise</li>
                          <li>• Keep it between 2-4 sentences</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Professional Summary *
                    </label>
                    <Textarea
                      placeholder="Award-winning professional with 6+ years of experience in..."
                      rows={8}
                      value={formData.profile}
                      onChange={(e) => updateProfile(e.target.value)}
                      className="resize-none text-base leading-relaxed"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">
                        Aim for 2-4 compelling sentences
                      </p>
                      <span className="text-xs text-gray-400">
                        {formData.profile.length} characters
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">
                          Work Experience Tips
                        </h3>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Start with your most recent position</li>
                          <li>• Use action verbs and quantify achievements</li>
                          <li>• Focus on results and impact</li>
                          <li>• Keep descriptions concise but impactful</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
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
                                  placeholder="Senior Product Designer"
                                  value={exp.job}
                                  onChange={(e) =>
                                    updateExperienceItem(
                                      i,
                                      "job",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Company *
                                </label>
                                <Input
                                  placeholder="TechFlow Industries"
                                  value={exp.company}
                                  onChange={(e) =>
                                    updateExperienceItem(
                                      i,
                                      "company",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Period
                              </label>
                              <Input
                                placeholder="2022-Present or Jan 2020 - Dec 2023"
                                value={exp.period ?? ""}
                                onChange={(e) =>
                                  updateExperienceItem(
                                    i,
                                    "period",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description & Achievements *
                              </label>
                              <Textarea
                                placeholder="Led design for flagship mobile app with 2M+ users. Increased user engagement by 40% through data-driven design decisions..."
                                rows={4}
                                value={exp.description}
                                onChange={(e) =>
                                  updateExperienceItem(
                                    i,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                className="resize-none"
                              />
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
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-purple-900 mb-2">
                          Education Guidelines
                        </h3>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• List your highest degree first</li>
                          <li>• Include relevant certifications</li>
                          <li>• Add honors or distinctions if applicable</li>
                          <li>• Year format: &quot;2020&quot; or &quot;2018-2020&quot;</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {formData.education.map((edu, i) => (
                      <Card
                        key={i}
                        className="relative border-2 border-gray-100 hover:border-purple-200 transition-colors"
                      >
                        <CardContent className="p-6">
                          {formData.education.length > 1 && (
                            <button
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                              onClick={() => removeEducation(i)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                School/University *
                              </label>
                              <Input
                                placeholder="Stanford University"
                                value={edu.school}
                                onChange={(e) =>
                                  updateEducationItem(
                                    i,
                                    "school",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Degree/Qualification *
                              </label>
                              <Input
                                placeholder="Master of Human-Computer Interaction"
                                value={edu.degree}
                                onChange={(e) =>
                                  updateEducationItem(
                                    i,
                                    "degree",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year of Graduation
                              </label>
                              <Input
                                placeholder="2020"
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
                </div>
              )}

              {step === 5 && (
                <div>
                  <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-orange-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-orange-900 mb-2">
                          Skills Best Practices
                        </h3>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>• Mix technical and soft skills</li>
                          <li>• Include industry-specific tools</li>
                          <li>
                            • Be specific (e.g., &quot;React.js&quot; not just
                            &quot;JavaScript&quot;)
                          </li>
                          <li>
                            • Prioritize skills relevant to your target role
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {formData.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input
                            placeholder="e.g., Figma & Sketch, JavaScript/React, Project Management"
                            value={skill}
                            onChange={(e) => updateSkill(i, e.target.value)}
                            className="h-12"
                          />
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
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                className="flex items-center gap-2 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center gap-2 px-6 py-3"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={loadingSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2 px-8 py-3"
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

            {/* Success State */}
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
            {/* Preview Header */}
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

            {/* Preview Content */}
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

            {/* Tips */}
            <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-600">
                    {step === 1 &&
                      "Add a professional photo to make your resume stand out. Studies show resumes with photos get 38% more callbacks."}
                    {step === 2 &&
                      "Keep your summary concise but impactful. Recruiters spend only 6 seconds scanning each resume."}
                    {step === 3 &&
                      "Use action verbs and quantify your achievements. Numbers make your accomplishments more credible."}
                    {step === 4 &&
                      "List education in reverse chronological order. Include relevant coursework for entry-level positions."}
                    {step === 5 &&
                      "Match skills to the job description. Use keywords from the job posting to pass ATS filters."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
