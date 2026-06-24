/**
 * Canonical CV data model.
 *
 * This is the single source of truth for a resume's *content* — deliberately
 * decoupled from presentation. The editor edits it, the render engine and PDF
 * exporter consume it, and the AI endpoints read/return slices of it as
 * structured JSON. Keep this file presentation-free: no colors, no templates.
 *
 * Persistence: the inferred `ResumeData` is stored verbatim as the `data` jsonb
 * column of `resume_content` (see supabase/migrations/0001_init.sql).
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** Stable id for list items — used as React keys and for drag-reorder. */
const id = z.string().min(1);

/** Free-form date string ("Jan 2020", "2020-01", "2020"). Empty = unset. */
const dateString = z.string().max(40).default("");

export const SKILL_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
export const skillLevelSchema = z.enum(SKILL_LEVELS);
export type SkillLevel = z.infer<typeof skillLevelSchema>;

export const LANGUAGE_PROFICIENCIES = [
  "elementary",
  "limited_working",
  "professional_working",
  "full_professional",
  "native",
] as const;
export const languageProficiencySchema = z.enum(LANGUAGE_PROFICIENCIES);
export type LanguageProficiency = z.infer<typeof languageProficiencySchema>;

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const personalSchema = z.object({
  fullName: z.string().max(120).default(""),
  headline: z.string().max(160).default(""), // e.g. "Senior Frontend Engineer"
  email: z.string().max(160).default(""),
  phone: z.string().max(60).default(""),
  location: z.string().max(160).default(""),
  website: z.string().max(200).default(""),
  linkedin: z.string().max(200).default(""),
  github: z.string().max(200).default(""),
  photoUrl: z.string().max(2000).default(""),
});
export type Personal = z.infer<typeof personalSchema>;

export const experienceItemSchema = z.object({
  id,
  role: z.string().max(160).default(""),
  company: z.string().max(160).default(""),
  location: z.string().max(160).default(""),
  startDate: dateString,
  endDate: dateString,
  current: z.boolean().default(false),
  /** Optional prose intro; bullet points carry the impact. */
  summary: z.string().max(2000).default(""),
  highlights: z.array(z.string().max(500)).default([]),
});
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const educationItemSchema = z.object({
  id,
  institution: z.string().max(160).default(""),
  degree: z.string().max(160).default(""),
  field: z.string().max(160).default(""),
  location: z.string().max(160).default(""),
  startDate: dateString,
  endDate: dateString,
  current: z.boolean().default(false),
  grade: z.string().max(80).default(""),
  description: z.string().max(1000).default(""),
});
export type EducationItem = z.infer<typeof educationItemSchema>;

export const skillItemSchema = z.object({
  id,
  name: z.string().max(80).default(""),
  /** Optional grouping label, e.g. "Languages", "Tools". */
  category: z.string().max(80).default(""),
  level: skillLevelSchema.optional(),
});
export type SkillItem = z.infer<typeof skillItemSchema>;

export const projectItemSchema = z.object({
  id,
  name: z.string().max(160).default(""),
  role: z.string().max(160).default(""),
  url: z.string().max(200).default(""),
  startDate: dateString,
  endDate: dateString,
  description: z.string().max(2000).default(""),
  highlights: z.array(z.string().max(500)).default([]),
  technologies: z.array(z.string().max(60)).default([]),
});
export type ProjectItem = z.infer<typeof projectItemSchema>;

export const certificationItemSchema = z.object({
  id,
  name: z.string().max(200).default(""),
  issuer: z.string().max(160).default(""),
  date: dateString,
  url: z.string().max(200).default(""),
  credentialId: z.string().max(120).default(""),
});
export type CertificationItem = z.infer<typeof certificationItemSchema>;

export const languageItemSchema = z.object({
  id,
  name: z.string().max(80).default(""),
  proficiency: languageProficiencySchema.default("professional_working"),
});
export type LanguageItem = z.infer<typeof languageItemSchema>;

/** A free-form item inside a custom section. */
export const customEntrySchema = z.object({
  id,
  title: z.string().max(200).default(""),
  subtitle: z.string().max(200).default(""),
  date: dateString,
  description: z.string().max(2000).default(""),
  bullets: z.array(z.string().max(500)).default([]),
});
export type CustomEntry = z.infer<typeof customEntrySchema>;

export const customSectionSchema = z.object({
  id,
  title: z.string().max(120).default("Custom section"),
  entries: z.array(customEntrySchema).default([]),
});
export type CustomSection = z.infer<typeof customSectionSchema>;

// ---------------------------------------------------------------------------
// Section identity & ordering (drives drag-to-reorder + visibility)
// ---------------------------------------------------------------------------

export const SECTION_KEYS = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

/** Custom sections are referenced as `custom:<id>` in the order array. */
export const orderTokenSchema = z.string().min(1);

// ---------------------------------------------------------------------------
// Document settings (presentation-adjacent but data-resident config)
// ---------------------------------------------------------------------------

export const PAGE_SIZES = ["a4", "letter"] as const;
export const pageSizeSchema = z.enum(PAGE_SIZES);
export type PageSize = z.infer<typeof pageSizeSchema>;

export const settingsSchema = z.object({
  templateId: z.string().min(1).default("modern"),
  accentColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{6})$/)
    .default("#2563eb"),
  fontFamily: z.string().min(1).default("Inter"),
  /** 0.9–1.15 typographic scale for fitting content. */
  fontScale: z.number().min(0.8).max(1.3).default(1),
  pageSize: pageSizeSchema.default("a4"),
  /** Ordered list of section tokens: SectionKey or `custom:<id>`. */
  sectionOrder: z.array(orderTokenSchema).default([...SECTION_KEYS]),
  /** Per-section visibility; missing key = visible. */
  hiddenSections: z.array(orderTokenSchema).default([]),
});
export type ResumeSettings = z.infer<typeof settingsSchema>;

// ---------------------------------------------------------------------------
// Root document
// ---------------------------------------------------------------------------

export const RESUME_SCHEMA_VERSION = 1;

export const resumeDataSchema = z.object({
  version: z.literal(RESUME_SCHEMA_VERSION).default(RESUME_SCHEMA_VERSION),
  // prefault (not default): run `{}` through the schema so each field's own
  // default is applied, rather than requiring a fully-formed object literal.
  personal: personalSchema.prefault({}),
  summary: z.string().max(4000).default(""),
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  skills: z.array(skillItemSchema).default([]),
  projects: z.array(projectItemSchema).default([]),
  certifications: z.array(certificationItemSchema).default([]),
  languages: z.array(languageItemSchema).default([]),
  customSections: z.array(customSectionSchema).default([]),
  settings: settingsSchema.prefault({}),
});
export type ResumeData = z.infer<typeof resumeDataSchema>;

/**
 * Parse unknown JSON (e.g. from the DB) into a fully-defaulted ResumeData.
 * Always returns a valid document — unknown/legacy shapes are coerced as far as
 * possible and missing fields are filled with defaults.
 */
export function parseResumeData(input: unknown): ResumeData {
  const result = resumeDataSchema.safeParse(input ?? {});
  if (result.success) return result.data;
  // Fall back to a clean document rather than throwing into the UI.
  return resumeDataSchema.parse({});
}
