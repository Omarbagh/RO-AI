"use client";

import TypewriterTexts from "@/components/TypewriterTexts";
import { Button } from "@/components/ui/button";
import {
  Award,
  DownloadCloud,
  FileCheck2,
  Palette,
  Shield,
  Sparkles,
  User,
  Wand2,
  FileText,
  TrendingUp,
  Activity,
  Plus,
  Star,
  CheckCircle,
  Eye,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PricingTable, SignUpButton } from "@clerk/nextjs";
import LandingFooter from "@/components/LandingFooter";
import { templates } from "./(dashboard)/editor/utils/templateMap";

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

// Sample resume data for preview
const sampleResumeData = {
  personal: {
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@email.com",
    phone: "(123) 456-7890",
    photoUrl: "/person-dummy.jpg",
    address: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
  },
  profile:
    "Experienced software engineer with 5+ years in full-stack development. Passionate about creating scalable solutions and mentoring team members. Strong background in JavaScript, React, Node.js, and cloud technologies.",
  experience: [
    {
      job: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description:
        "Led development of customer-facing web applications serving 50k+ daily users. Improved system performance by 40% through optimization techniques. Mentored 3 junior developers and improved team productivity by 25%.",
      year: "2020",
    },
    {
      job: "Software Engineer",
      company: "Startup Solutions",
      period: "2018 - 2020",
      description:
        "Developed RESTful APIs handling 1M+ requests daily. Implemented CI/CD pipeline reducing deployment time by 60%. Collaborated with product team to deliver features on schedule.",
      year: "2018",
    },
  ],
  education: [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2014 - 2018",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Python",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Leadership",
  ],
  settings: {
    accent: "#4F46E5",
  },
};

// Template Preview Component that uses the actual template component
function TemplatePreview({ template }: { template: any }) {
  const TemplateComponent = template.comp;

  if (!TemplateComponent) {
    return (
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <div className="text-center text-gray-500">
          <p>Template preview not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="template-preview bg-white rounded-lg shadow-lg overflow-hidden">
      <TemplateComponent data={sampleResumeData} isPreview={true} />
    </div>
  );
}

// Template Preview Modal Component
function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
}: {
  template: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative bg-white rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              {template.name}
            </h2>
            <p className="text-sm text-gray-600 truncate">
              {template.category} Template
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100 flex-shrink-0 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 md:p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <TemplatePreview template={template} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 sm:p-6 border-t bg-white sticky bottom-0">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 truncate">
              Previewing: <strong className="truncate">{template.name}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
              This is how your resume will look with this template
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Close
            </Button>
            <SignUpButton>
              <Button className="flex-1 sm:flex-none bg-[#4F46E5] hover:bg-[#5B51E8] text-white">
                Use Template
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Navigation Component
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "#templates", label: "Templates" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden h-10 w-10"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Navigation</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg hover:bg-gray-100 text-lg font-medium"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t">
                <SignUpButton>
                  <Button className="w-full bg-[#4F46E5] hover:bg-[#5B51E8] text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Index() {
  const howRef = useReveal();
  const featuresRef = useReveal();
  const pricingRef = useReveal();
  const templatesRef = useReveal();
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [displayTemplates, setDisplayTemplates] = useState<any[]>([]);

  // Move template filtering logic to useEffect
  useEffect(() => {
    // Filter templates to show only bold template and two random ones
    const boldTemplates = templates.filter((template) =>
      template.name.toLowerCase().includes("bold impact"),
    );

    const finalTemplates = [...boldTemplates];

    // If we don't have enough templates, add random ones
    if (finalTemplates.length < 3) {
      const remainingTemplates = templates.filter(
        (template) => !finalTemplates.includes(template),
      );

      // Add random templates until we have 3
      while (finalTemplates.length < 3 && remainingTemplates.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * remainingTemplates.length,
        );
        const randomTemplate = remainingTemplates[randomIndex];
        finalTemplates.push(randomTemplate);
        // Remove the selected template from remaining templates
        remainingTemplates.splice(randomIndex, 1);
      }
    }

    // Take only first 3 templates
    setDisplayTemplates(finalTemplates.slice(0, 3));
  }, []);

  const handlePreview = (template: any) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClosePreview();
      }
    };

    if (isPreviewOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPreviewOpen]);

  return (
    <div className="bg-gradient-to-b from-background via-background to-background min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden aurora pt-16">
        {/* Background decorations - Mobile optimized */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dot-grid absolute inset-0 opacity-[0.15] sm:opacity-[0.35]" />

          {/* Main gradient - smaller and less intense on mobile */}
          <div className="absolute -top-20 sm:-top-40 left-1/2 h-[300px] w-[400px] sm:h-[600px] sm:w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/20 via-primary/20 to-fuchsia-500/20 sm:from-indigo-600/30 sm:via-primary/30 sm:to-fuchsia-500/30 blur-xl sm:blur-3xl" />

          {/* Bottom left blob - smaller on mobile */}
          <div className="absolute bottom-0 left-10 sm:left-1/4 h-32 w-32 sm:h-56 sm:w-56 rounded-full bg-primary/5 sm:bg-primary/10 blur-xl sm:blur-2xl" />

          {/* Top right blob - smaller and less intense on mobile */}
          <div className="absolute -right-8 top-8 sm:-right-10 sm:top-10 h-40 w-40 sm:h-72 sm:w-72 rounded-full bg-indigo-400/10 sm:bg-indigo-400/20 blur-xl sm:blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pb-16 pt-8 md:pt-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              #1 AI Resume Builder
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Sparkles className="h-3 w-3" /> AI-powered
              </span>
            </div>

            {/* Heading - Responsive text sizing */}
            <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Create a{" "}
                <span className="relative inline-block">
                  <TypewriterTexts
                    texts={[
                      "job‑winning",
                      "ATS‑friendly",
                      "modern",
                      "AI‑optimized",
                    ]}
                    className="bg-gradient-to-r from-[#4F46E5] to-indigo-400 bg-clip-text text-transparent"
                  />
                </span>
                resume in under{" "}
                <span className="underline decoration-[#4F46E5]/50 decoration-3 sm:decoration-4 underline-offset-3 sm:underline-offset-4">
                  5 minutes
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Create a standout resume in minutes with the power of AI,
              beautifully designed, fully tailored to your experience and
              optimized to help you land your next big opportunity with
              confidence.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <SignUpButton>
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
                >
                  Get Started Today
                </Button>
              </SignUpButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <a href="#templates">View Templates</a>
              </Button>
            </div>
          </div>

          {/* Real Dashboard Preview */}
          <div className="relative mx-auto mt-8 sm:mt-12 md:mt-14 max-w-6xl rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#4F46E5]/30 via-indigo-400/30 to-fuchsia-400/30 p-[1px] shadow-xl sm:shadow-2xl ring-1 ring-black/5">
            <div className="rounded-[calc(theme(borderRadius.xl)+2px)] sm:rounded-[calc(theme(borderRadius.2xl)+2px)] bg-white/90 backdrop-blur-md p-4 sm:p-6">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    Resume Dashboard
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[#4F46E5]" />
                    AI-powered resume management
                  </p>
                </div>
                <div className="bg-[#4F46E5] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto text-center">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                  Create New
                </div>
              </div>

              {/* Resume Cards Preview */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        Software Engineer
                      </h4>
                      <p className="text-xs text-gray-500">
                        Updated 2 hours ago
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2">
                      Active
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div className="h-full bg-[#4F46E5] rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-600">Completion: 75%</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        Product Manager
                      </h4>
                      <p className="text-xs text-gray-500">Created yesterday</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2">
                      Draft
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div className="h-full bg-[#4F46E5] rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-gray-600">Completion: 50%</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-lg p-3 sm:p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-[#4F46E5]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Total Resumes</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        3
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-green-50/50 rounded-lg p-3 sm:p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-100">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Last Activity</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        Today
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-lg p-3 sm:p-4 border border-gray-200/50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Recent Actions</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        5
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="mt-3 sm:mt-4 bg-gradient-to-r from-[#4F46E5]/5 to-indigo-400/5 rounded-lg p-3 sm:p-4 border border-[#4F46E5]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#4F46E5]" />
                  <span className="text-xs sm:text-sm font-medium text-[#4F46E5]">
                    AI Tips & Best Practices
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Keep your resume to 1-2 pages for optimal readability
                </p>
              </div>
            </div>

            {/* Clouds - Mobile optimized */}
            <div aria-hidden className="pointer-events-none">
              <div className="absolute -left-6 -top-4 h-16 w-16 sm:-left-10 sm:-top-6 sm:h-24 sm:w-24 rounded-full bg-[#4F46E5]/5 sm:bg-[#4F46E5]/10 blur-lg sm:blur-2xl" />
              <div className="absolute -bottom-4 right-12 h-20 w-20 sm:-bottom-8 sm:right-20 sm:h-28 sm:w-28 rounded-full bg-indigo-400/5 sm:bg-indigo-400/20 blur-lg sm:blur-2xl" />
            </div>
          </div>

          {/* Premium Templates Section */}
          <section
            id="templates"
            ref={templatesRef as any}
            className="mt-12 sm:mt-16 md:mt-20"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Featured Templates
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Click on any template to see a real preview with sample content.
                See exactly how your resume will look!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
              {displayTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Template Preview */}
                  <div
                    className={`h-24 sm:h-32 bg-gradient-to-r ${template.color} relative overflow-hidden cursor-pointer`}
                    onClick={() => handlePreview(template)}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold text-gray-700">
                        {template.popularity}%
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-black/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {template.category}
                      </span>
                    </div>
                    {/* Preview Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="flex items-center gap-2 text-white bg-black/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm font-medium">
                          Preview
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate flex-1">
                        {template.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-gray-500 truncate">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Preview
                      </Button>
                      <SignUpButton>
                        <Button className="flex-1 bg-[#4F46E5] hover:bg-[#5B51E8] text-white text-xs sm:text-sm h-9 sm:h-10">
                          Use Template
                        </Button>
                      </SignUpButton>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#4F46E5]/20 rounded-lg sm:rounded-xl pointer-events-none transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-6 sm:mt-8 px-4">
              <SignUpButton>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white px-6 sm:px-8"
                >
                  Explore All {templates.length}+ Templates
                </Button>
              </SignUpButton>
            </div>
          </section>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        ref={howRef as any}
        className="relative container mx-auto px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Background decorations - Mobile optimized */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-4 top-4 h-24 w-24 sm:left-10 sm:top-10 sm:h-40 sm:w-40 rounded-full bg-[#4F46E5]/5 sm:bg-[#4F46E5]/10 blur-lg sm:blur-2xl" />
          <div className="absolute right-4 bottom-0 h-28 w-28 sm:right-16 sm:bottom-6 sm:h-48 sm:w-48 rounded-full bg-indigo-400/5 sm:bg-indigo-400/10 blur-lg sm:blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
            Choose a template, enter your details and let AI optimize it.
            Download and apply with confidence!
          </p>
        </div>
        <div className="relative mt-8 sm:mt-12">
          <div className="hidden lg:block absolute left-0 right-0 top-14 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/30 to-transparent" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {[
              {
                icon: Palette,
                title: "Pick Your Template",
                desc: "Select one of our professionally designed resume templates.",
              },
              {
                icon: User,
                title: "Add Your Details",
                desc: "Fill in your personal information, experience, skills and achievements.",
              },
              {
                icon: Sparkles,
                title: "AI Optimization",
                desc: "Let AI enhance your resume for maximum impact.",
              },
              {
                icon: DownloadCloud,
                title: "Download & Apply",
                desc: "Export your resume instantly and start applying.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px] transition-shadow hover:shadow-lg sm:hover:shadow-xl"
              >
                <div className="rounded-[11px] sm:rounded-[15px] border border-border bg-card p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#4F46E5]/20 blur-sm" />
                      <div className="relative inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5] ring-1 ring-[#4F46E5]/30">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                    {desc}
                  </p>
                </div>
                <div className="hidden lg:block absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#4F46E5]/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 sm:mt-12 flex items-center justify-center px-4">
          <SignUpButton>
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
            >
              Begin Your AI Resume Journey
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        ref={featuresRef as any}
        className="relative container mx-auto px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Background decorations - Mobile optimized */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-32 w-32 sm:left-1/3 sm:top-0 sm:h-56 sm:w-56 rounded-full bg-[#4F46E5]/5 sm:bg-[#4F46E5]/10 blur-lg sm:blur-3xl" />
          <div className="absolute right-1/4 bottom-4 h-36 w-36 sm:right-1/4 sm:bottom-6 sm:h-48 sm:w-48 rounded-full bg-indigo-400/5 sm:bg-indigo-400/10 blur-lg sm:blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Key Features
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
            Effortlessly create professional resumes with AI-driven content
            suggestions, customizable templates and one-click downloads. Stand
            out with tailored achievements, modern design, and seamless editing,
            all in one place.
          </p>
        </div>
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {[
            {
              icon: FileCheck2,
              title: "Dashboard Overview",
              desc: "Manage all your resumes in one place.",
            },
            {
              icon: Sparkles,
              title: "AI Integration",
              desc: "Generated, quantified, and tailored.",
            },
            {
              icon: Palette,
              title: "Modern Templates",
              desc: "Professional designs that recruiters love.",
            },
            {
              icon: DownloadCloud,
              title: "One‑Click Export",
              desc: "Easily download your resume in PDF or DOCX format.",
            },
            {
              icon: Wand2,
              title: "Instant Personalization",
              desc: "Customize your resume style and content in seconds.",
            },
            {
              icon: Wand2,
              title: "Cover Letter Generator",
              desc: "Generate tailored cover letters for every job application.",
              comingSoon: true,
            },
          ].map(({ icon: Icon, title, desc, comingSoon }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-indigo-400/20 p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:hover:shadow-2xl"
            >
              <div className="relative rounded-[11px] sm:rounded-[15px] border border-border bg-card p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#4F46E5]/10 text-[#4F46E5]">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                  {desc}
                </p>
                {comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-700 border border-yellow-300">
                    Coming Soon
                  </span>
                )}
                {i === 1 && !comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#4F46E5]/10 px-2 py-0.5 text-[10px] font-semibold text-[#4F46E5]">
                    New
                  </span>
                )}
              </div>
              <div
                className="pointer-events-none absolute -inset-16 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,50%), hsl(var(--primary)/.35), transparent 40%)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section with Clerk PricingTable */}
      <section
        id="pricing"
        ref={pricingRef as any}
        className="relative container mx-auto px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Background decorations - Mobile optimized */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-4 h-32 w-32 sm:left-1/4 sm:top-10 sm:h-48 sm:w-48 rounded-full bg-[#4F46E5]/5 sm:bg-[#4F46E5]/10 blur-lg sm:blur-3xl" />
          <div className="absolute right-1/4 bottom-4 h-36 w-36 sm:right-1/4 sm:bottom-10 sm:h-56 sm:w-56 rounded-full bg-indigo-400/5 sm:bg-indigo-400/10 blur-lg sm:blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-muted-foreground">
            Choose the plan that works best for you. All plans include our core
            AI features.
          </p>
        </div>

        {/* Clerk PricingTable Component */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center px-4">
          <div className="w-full max-w-6xl">
            <PricingTable />
          </div>
        </div>

        {/* Additional Pricing Info */}
        <div className="mt-8 sm:mt-12 flex justify-center px-4">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 max-w-2xl w-full">
            <div className="rounded-lg bg-gradient-to-br from-[#4F46E5]/5 to-indigo-400/5 p-4 sm:p-6 text-center">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#4F46E5] mx-auto mb-3 sm:mb-4" />
              <h4 className="font-semibold text-sm sm:text-base">No Risk</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                Cancel anytime, no hidden fees
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-[#4F46E5]/5 to-indigo-400/5 p-4 sm:p-6 text-center">
              <DownloadCloud className="h-6 w-6 sm:h-8 sm:w-8 text-[#4F46E5] mx-auto mb-3 sm:mb-4" />
              <h4 className="font-semibold text-sm sm:text-base">
                Instant Access
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                Get started immediately after signup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-16 sm:pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#4F46E5]/15 via-indigo-400/15 to-fuchsia-400/15 p-[1px]">
          <div className="rounded-[21px] sm:rounded-[22px] border border-border/60 bg-card/70 px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14 backdrop-blur">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                Ready to land your next big opportunity?
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
                Build a polished, AI‑optimized resume in minutes.
              </p>
              <div className="mt-4 sm:mt-6 flex items-center justify-center">
                <SignUpButton>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-6 sm:px-8 bg-gradient-to-r from-[#4F46E5] to-[#7E22CE] hover:from-[#5B51E8] hover:to-[#8B5CF6] text-white"
                  >
                    Get Started Today
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 sm:-right-6 -top-4 sm:-top-6 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[#4F46E5]/10 sm:bg-[#4F46E5]/20 blur-lg sm:blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-4 sm:-left-6 -bottom-4 sm:-bottom-6 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-indigo-400/10 sm:bg-indigo-400/20 blur-lg sm:blur-2xl"
          />
        </div>
      </section>

      {/* Landing Footer */}
      <LandingFooter />

      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />

      {/* Global Styles */}
      <style jsx global>{`
        .bg-dot-grid {
          background-image: radial-gradient(
            circle,
            currentColor 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          color: hsl(var(--muted) / 0.2);
        }

        /* Template Preview Styles */
        .template-preview {
          font-family: "Inter", sans-serif;
        }

        /* Scroll animations */
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Clerk Pricing Table Custom Styles */
        .cl-pricing-table {
          border: none !important;
          background: transparent !important;
        }

        .cl-card {
          background: linear-gradient(
            135deg,
            rgba(79, 70, 229, 0.05) 0%,
            rgba(99, 102, 241, 0.05) 100%
          ) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(79, 70, 229, 0.2) !important;
        }

        /* Modal animations */
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fixed.inset-0 {
          animation: modalFadeIn 0.2s ease-out;
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Improve touch targets on mobile */
        @media (max-width: 640px) {
          button,
          a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}