/**
 * Template registry. Single place that knows every template's metadata and its
 * HTML renderer. PDF renderers are attached separately (see lib/templates/pdf).
 */
import type { ResumeData } from "@/lib/resume/schema";
import type { TemplateEntry } from "./types";
import ModernTemplate from "@/components/templates/html/modern";
import ClassicTemplate from "@/components/templates/html/classic";
import MinimalistTemplate from "@/components/templates/html/minimalist";
import SidebarTemplate from "@/components/templates/html/sidebar";
import ExecutiveTemplate from "@/components/templates/html/executive";
import TechTemplate from "@/components/templates/html/tech";

export const TEMPLATES: TemplateEntry[] = [
  {
    meta: {
      id: "modern",
      name: "Modern",
      category: "modern",
      isPro: false,
      description: "Strakke ink-header met één helder accent. Veilige keuze.",
      defaultAccent: "#2563eb",
    },
    Html: ModernTemplate,
  },
  {
    meta: {
      id: "classic",
      name: "Classic",
      category: "classic",
      isPro: false,
      description: "Tijdloos en gecentreerd. Vertrouwd voor elke sector.",
      defaultAccent: "#1a1a22",
    },
    Html: ClassicTemplate,
  },
  {
    meta: {
      id: "minimalist",
      name: "Minimalist",
      category: "minimal",
      isPro: false,
      description: "Veel witruimte, fijne typografie. Rustig en modern.",
      defaultAccent: "#2f6bff",
    },
    Html: MinimalistTemplate,
  },
  {
    meta: {
      id: "sidebar",
      name: "Sidebar",
      category: "modern",
      isPro: true,
      description: "Donkere zijbalk met contact en skills. Veel impact.",
      defaultAccent: "#2f6bff",
    },
    Html: SidebarTemplate,
  },
  {
    meta: {
      id: "executive",
      name: "Executive",
      category: "executive",
      isPro: true,
      description: "Verfijnd en senior. Voor leidinggevende rollen.",
      defaultAccent: "#15172b",
    },
    Html: ExecutiveTemplate,
  },
  {
    meta: {
      id: "tech",
      name: "Tech",
      category: "tech",
      isPro: true,
      description: "Compact en skill-gericht. Ideaal voor engineers.",
      defaultAccent: "#2f6bff",
    },
    Html: TechTemplate,
  },
];

export const TEMPLATE_MAP: Record<string, TemplateEntry> = Object.fromEntries(
  TEMPLATES.map((t) => [t.meta.id, t]),
);

export const DEFAULT_TEMPLATE_ID = "modern";

export function getTemplate(id: string): TemplateEntry {
  return TEMPLATE_MAP[id] ?? TEMPLATE_MAP[DEFAULT_TEMPLATE_ID];
}

/** Accent to render with: resume setting wins, else the template default. */
export function resolveAccent(data: ResumeData): string {
  return data.settings.accentColor || getTemplate(data.settings.templateId).meta.defaultAccent;
}
