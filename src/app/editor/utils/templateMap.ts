// utils/templateMap.ts
import { allTemplates } from "@/lib/allTemplates";
import { TemplateType, AllTemplate } from "../types/templateTypes";

export const templates: TemplateType[] = allTemplates.map(
  (template: AllTemplate): TemplateType => {
    const category = template.category ?? "general";
    return {
      id: template.id, // <-- string!
      name: template.name,
      comp: template.component,
      pro: false,
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
      fileName: template.fileName,
    };
  }
);
