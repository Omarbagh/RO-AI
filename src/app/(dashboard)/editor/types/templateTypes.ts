import { CVData } from "@/types/cv";

export interface TemplateType {
  id: string;
  name: string;
  comp: React.ComponentType<{ data: CVData }>;
  pro: boolean;
  category: string;
  description: string;
  features: string[];
  popularity: number;
  color: string;
  fileName: string;
}

export interface AllTemplate {
  id: string;
  name: string;
  component: React.ComponentType<{ data: CVData }>;
  category?: string;
  description: string;
  color: string;
  fileName: string;
}
