import { CVTemplateProps } from "./cv";

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category?: "professional" | "creative" | "modern";
  color: string;
  preview: string;
  component: React.ComponentType<CVTemplateProps>;
}

export interface TemplateCategory {
  name: string;
  description: string;
  templates: TemplateInfo[];
}
