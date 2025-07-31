import { TemplateInfo } from "@/types/templates";

// Import all template components
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import TechTemplate from "@/components/templates/TechTemplate";
import ModernCardTemplate from "@/components/templates/ModernCardTemplate";
import TimelineTemplate from "@/components/templates/TimelineTemplate";
import BoldTemplate from "@/components/templates/BoldTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";

// Import individual templates
import { MagazineTemplate } from "@/components/templates/MagazineTemplate";
import { GeometricTemplate } from "@/components/templates/GeometricTemplate";
import { CorporateBlueTemplate } from "@/components/templates/CorporateTemplate";
import { NewspaperTemplate } from "@/components/templates/NewspaperTemplate";
import { GamingTemplate } from "@/components/templates/gamingTemplate";
import { MedicalTemplate } from "@/components/templates/MedicalTemplate";
import { ArchitectTemplate } from "@/components/templates/architectTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { MarketingTemplate } from "@/components/templates/MarketingTemplate";
import { InfluencerTemplate } from "@/components/templates/InfluencerTemplate";
import { SalesTemplate } from "@/components/templates/SalesTemplate";
import { ConsultingTemplate } from "@/components/templates/ConsultingTemplate";
import { FashionTemplate } from "@/components/templates/FashionTemplate";
import { FinanceTemplate } from "@/components/templates/FinanceTemplate";
import { NonProfitTemplate } from "@/components/templates/Non-profitTemplate";
import { SportsTemplate } from "@/components/templates/SportTemplate";
import BasicTemplate from "@/components/templates/basicTemplate";
export const allTemplates: TemplateInfo[] = [
  {
    id: "basic",
    name: "Free Template",
    description: "Elegant sidebar layout with gradient design",
    color: "from-slate-800 to-slate-900",
    preview: "Basic template for free users",
    component: BasicTemplate,
    fileName: "BasicTemplate.tsx",
  },
  {
    id: "modern",
    name: "Modern Professional",
    description: "Elegant sidebar layout with gradient design",
    category: "professional",
    color: "from-slate-800 to-slate-900",
    preview: "Modern sidebar with dark gradient and clean typography",
    component: ModernTemplate,
    fileName: "ModernTemplate.tsx",
  },
  {
    id: "classic",
    name: "Classic Corporate",
    description: "Traditional professional layout with navy header",
    category: "professional",
    color: "from-blue-900 to-blue-800",
    preview: "Navy header with structured content sections",
    component: ClassicTemplate,
    fileName: "ClassicTemplate.tsx",
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Premium design for senior executives",
    category: "professional",
    color: "from-gray-900 to-gray-800",
    preview: "Gold accents with executive summary focus",
    component: ExecutiveTemplate,
    fileName: "ExecutiveTemplate.tsx",
  },
  {
    id: "minimal",
    name: "Minimal Professional",
    description: "Clean, minimalist design with subtle borders",
    category: "professional",
    color: "from-gray-50 to-white",
    preview: "Ultra-clean layout with excellent typography",
    component: MinimalistTemplate,
    fileName: "MinimalistTemplate.tsx",
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Traditional corporate styling in blue",
    category: "professional",
    color: "from-blue-900 to-blue-700",
    preview: "Classic blue corporate design",
    component: CorporateBlueTemplate,
    fileName: "CorporateTemplate.tsx",
  },
  {
    id: "consulting",
    name: "Management Consulting",
    description: "Structured layout for consultants",
    category: "professional",
    color: "from-blue-600 to-blue-500",
    preview: "Executive summary focused design",
    component: ConsultingTemplate,
    fileName: "ConsultingTemplate.tsx",
  },
  {
    id: "finance",
    name: "Finance & Banking",
    description: "Professional design for financial sector",
    category: "professional",
    color: "from-gray-900 to-yellow-500",
    preview: "Financial professional layout with credentials",
    component: FinanceTemplate,
    fileName: "FinanceTemplate.tsx",
  },
  {
    id: "medical",
    name: "Healthcare Professional",
    description: "Clean medical professional layout",
    category: "professional",
    color: "from-blue-600 to-teal-600",
    preview: "Medical-themed with color coding",
    component: MedicalTemplate,
    fileName: "MedicalTemplate.tsx",
  },
  {
    id: "sales",
    name: "Sales Professional",
    description: "Results-focused design for sales roles",
    category: "professional",
    color: "from-green-600 to-blue-600",
    preview: "Achievement-focused sales layout",
    component: SalesTemplate,
    fileName: "SalesTemplate.tsx",
  },

  // Creative Templates (11-20)
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Vibrant gradient design for creative professionals",
    category: "creative",
    color: "from-purple-600 to-pink-600",
    preview: "Artistic layout with gradient backgrounds",
    component: CreativeTemplate,
    fileName: "CreativeTemplate.tsx",
  },
  {
    id: "magazine",
    name: "Magazine Style",
    description: "Editorial layout inspired by magazines",
    category: "creative",
    color: "from-red-600 to-red-500",
    preview: "Magazine-inspired column layout",
    component: MagazineTemplate,
    fileName: "MagazineTemplate.tsx",
  },
  {
    id: "geometric",
    name: "Geometric Modern",
    description: "Contemporary design with geometric elements",
    category: "creative",
    color: "from-blue-500 to-yellow-400",
    preview: "Modern geometric shapes and colors",
    component: GeometricTemplate,
    fileName: "GeometricTemplate.tsx",
  },
  {
    id: "architect",
    name: "Architecture Portfolio",
    description: "Minimalist design for architects",
    category: "creative",
    color: "from-gray-900 to-gray-600",
    preview: "Architectural portfolio layout",
    component: ArchitectTemplate,
    fileName: "architectTemplate.tsx",
  },
  {
    id: "fashion",
    name: "Fashion & Retail",
    description: "Stylish design for fashion industry",
    category: "creative",
    color: "from-rose-600 to-pink-600",
    preview: "Fashion-forward elegant design",
    component: FashionTemplate,
    fileName: "FashionTemplate.tsx",
  },
  {
    id: "marketing",
    name: "Marketing & Advertising",
    description: "Bold design for marketing professionals",
    category: "creative",
    color: "from-orange-500 to-red-500",
    preview: "Marketing-focused bold layout",
    component: MarketingTemplate,
    fileName: "MarketingTemplate.tsx",
  },
  {
    id: "influencer",
    name: "Social Influencer",
    description: "Trendy design for social media influencers",
    category: "creative",
    color: "from-pink-400 to-purple-500",
    preview: "Influencer-style modern design",
    component: InfluencerTemplate,
    fileName: "InfluencerTemplate.tsx",
  },
  {
    id: "nonprofit",
    name: "Non-Profit & NGO",
    description: "Mission-focused design for non-profits",
    category: "creative",
    color: "from-green-500 to-teal-500",
    preview: "Mission-driven design with heart",
    component: NonProfitTemplate,
    fileName: "Non-profitTemplate.tsx",
  },

  // Modern/Tech Templates (21-30)
  {
    id: "tech",
    name: "Tech Developer",
    description: "Terminal-inspired design for developers",
    category: "modern",
    color: "from-gray-900 to-green-400",
    preview: "Code terminal aesthetic",
    component: TechTemplate,
    fileName: "TechTemplate.tsx",
  },
  {
    id: "modern-card",
    name: "Modern Cards",
    description: "Card-based layout with modern styling",
    category: "modern",
    color: "from-blue-600 to-indigo-600",
    preview: "Modern card-based design",
    component: ModernCardTemplate,
    fileName: "ModernCardTemplate.tsx",
  },
  {
    id: "timeline",
    name: "Career Timeline",
    description: "Timeline-based career progression",
    category: "modern",
    color: "from-slate-600 to-slate-500",
    preview: "Visual timeline layout",
    component: TimelineTemplate,
    fileName: "TimelineTemplate.tsx",
  },
  {
    id: "bold",
    name: "Bold Impact",
    description: "High-impact design with bold typography",
    category: "modern",
    color: "from-black to-red-600",
    preview: "Bold typography with impact",
    component: BoldTemplate,
    fileName: "BoldTemplate.tsx",
  },
  {
    id: "elegant",
    name: "Elegant Serif",
    description: "Sophisticated serif typography design",
    category: "modern",
    color: "from-amber-600 to-amber-500",
    preview: "Elegant serif fonts with gold accents",
    component: ElegantTemplate,
    fileName: "ElegantTemplate.tsx",
  },
  {
    id: "newspaper",
    name: "Newspaper Editorial",
    description: "Newspaper-style layout with columns",
    category: "modern",
    color: "from-black to-gray-800",
    preview: "Editorial newspaper design",
    component: NewspaperTemplate,
    fileName: "NewspaperTemplate.tsx",
  },
  {
    id: "gaming",
    name: "Gaming & Tech",
    description: "Retro gaming terminal interface",
    category: "modern",
    color: "from-gray-900 to-green-400",
    preview: "Gaming console aesthetic",
    component: GamingTemplate,
    fileName: "gamingTemplate.tsx",
  },
  {
    id: "academic",
    name: "Academic Research",
    description: "Scholarly design for academics",
    category: "modern",
    color: "from-blue-800 to-blue-600",
    preview: "Academic publication style",
    component: AcademicTemplate,
    fileName: "AcademicTemplate.tsx",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Athletic design with energy",
    category: "modern",
    color: "from-orange-500 to-red-500",
    preview: "Athletic and energetic design",
    component: SportsTemplate,
    fileName: "SportTemplate.tsx",
  },
];


export const templatesByCategory = {
  professional: allTemplates.filter((t) => t.category === "professional"),
  creative: allTemplates.filter((t) => t.category === "creative"),
  modern: allTemplates.filter((t) => t.category === "modern"),
};

export const getTemplateById = (id: string) =>
  allTemplates.find((template) => template.id === id);
