/**
 * Factories for building empty, schema-valid resume content and section items.
 * All ids are generated with crypto.randomUUID() so they are stable across
 * renders and safe as React keys / drag-reorder handles.
 */
import {
  RESUME_SCHEMA_VERSION,
  SECTION_KEYS,
  type CertificationItem,
  type CustomEntry,
  type CustomSection,
  type EducationItem,
  type ExperienceItem,
  type LanguageItem,
  type ProjectItem,
  type ResumeData,
  type SkillItem,
} from "./schema";

export function newId(): string {
  return crypto.randomUUID();
}

export function emptyExperience(): ExperienceItem {
  return {
    id: newId(),
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    summary: "",
    highlights: [],
  };
}

export function emptyEducation(): EducationItem {
  return {
    id: newId(),
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    grade: "",
    description: "",
  };
}

export function emptySkill(): SkillItem {
  return { id: newId(), name: "", category: "", level: undefined };
}

export function emptyProject(): ProjectItem {
  return {
    id: newId(),
    name: "",
    role: "",
    url: "",
    startDate: "",
    endDate: "",
    description: "",
    highlights: [],
    technologies: [],
  };
}

export function emptyCertification(): CertificationItem {
  return { id: newId(), name: "", issuer: "", date: "", url: "", credentialId: "" };
}

export function emptyLanguage(): LanguageItem {
  return { id: newId(), name: "", proficiency: "professional_working" };
}

export function emptyCustomEntry(): CustomEntry {
  return { id: newId(), title: "", subtitle: "", date: "", description: "", bullets: [] };
}

export function emptyCustomSection(title = "Custom section"): CustomSection {
  return { id: newId(), title, entries: [emptyCustomEntry()] };
}

/** A blank but valid resume document for a brand-new resume. */
export function createEmptyResume(overrides?: Partial<ResumeData>): ResumeData {
  return {
    version: RESUME_SCHEMA_VERSION,
    personal: {
      fullName: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      photoUrl: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    customSections: [],
    settings: {
      templateId: "modern",
      accentColor: "#2563eb",
      fontFamily: "Inter",
      fontScale: 1,
      pageSize: "a4",
      sectionOrder: [...SECTION_KEYS],
      hiddenSections: [],
    },
    ...overrides,
  };
}
