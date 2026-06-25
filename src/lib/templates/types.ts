/**
 * Template contract. A "template" is pure presentation over ResumeData — the
 * data model never changes when you switch templates.
 *
 * Each template ships TWO renderers that must stay visually in sync:
 *  - Html: a React/HTML renderer used for the live editor preview (and a
 *    print-friendly DOM).
 *  - Pdf: a @react-pdf/renderer renderer used for ATS-safe export with real,
 *    selectable text.
 */
import type { ComponentType } from "react";
import type { ResumeData } from "@/lib/resume/schema";

export type TemplateCategory =
  | "modern"
  | "classic"
  | "creative"
  | "tech"
  | "executive"
  | "minimal";

export interface TemplateMeta {
  id: string;
  name: string;
  category: TemplateCategory;
  /** Premium templates are gated to the Pro plan. */
  isPro: boolean;
  description: string;
  /** Default accent if the resume hasn't set one. */
  defaultAccent: string;
}

export interface TemplateRenderProps {
  data: ResumeData;
  /** Resolved accent (resume settings override the template default). */
  accent: string;
}

/** HTML renderer for live preview. */
export type HtmlTemplateComponent = ComponentType<TemplateRenderProps>;

/** @react-pdf/renderer renderer — returns a <Document>. */
export type PdfTemplateComponent = ComponentType<TemplateRenderProps>;

export interface TemplateEntry {
  meta: TemplateMeta;
  Html: HtmlTemplateComponent;
  /** PDF renderer is registered separately (see lib/templates/pdf). */
  Pdf?: PdfTemplateComponent;
}
