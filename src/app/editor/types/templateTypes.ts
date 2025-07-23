import { CVData } from "@/types/cv";
import {
  FileText,
  User,
  Target,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";

export interface TemplateType {
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

export interface AllTemplate {
  name: string;
  component: React.ComponentType<{ data: CVData }>;
  category?: string;
  description: string;
  color: string;
}

export const stepIcons = [FileText, User, Target, Briefcase, GraduationCap, Award];
