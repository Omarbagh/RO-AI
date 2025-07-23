import { allTemplates } from "@/lib/allTemplates";
import { TemplateType, AllTemplate } from "../types/templateTypes";

export const templates: TemplateType[] = allTemplates.map(
  (template: AllTemplate, index: number): TemplateType => {
    const category = template.category ?? "general";
    return {
      id: index + 1,
      name: template.name,
      comp: template.component,
      pro: template.name !== "Free Template",
      category: category.charAt(0).toUpperCase() + category.slice(1),
      description: template.description,
      features: [
        "Professional design",
        "ATS-friendly",
        "Easy to customize",
        category === "professional"
          ? "Corporate styling"
          : category === "creative"
            ? "Visual impact"
            : "Modern layout",
      ],
      popularity: 75 + Math.floor(Math.random() * 25),
      color: template.color,
    };
  }
);
