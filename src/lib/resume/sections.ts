/**
 * Section ordering / visibility resolution shared by the editor and every
 * template. Turns settings.sectionOrder + hiddenSections + customSections into
 * a single ordered render list.
 */
import {
  SECTION_KEYS,
  type ResumeData,
  type SectionKey,
} from "./schema";

/** Dutch display labels for the built-in sections. */
export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: "Profiel",
  experience: "Werkervaring",
  education: "Opleiding",
  skills: "Vaardigheden",
  projects: "Projecten",
  certifications: "Certificeringen",
  languages: "Talen",
};

export const CUSTOM_PREFIX = "custom:";

export type ResolvedSection =
  | { token: SectionKey; kind: SectionKey; title: string; customId?: undefined }
  | { token: string; kind: "custom"; title: string; customId: string };

function isSectionKey(token: string): token is SectionKey {
  return (SECTION_KEYS as readonly string[]).includes(token);
}

/** True when a built-in section has nothing worth rendering. */
export function isSectionEmpty(data: ResumeData, key: SectionKey): boolean {
  switch (key) {
    case "summary":
      return data.summary.trim().length === 0;
    case "experience":
      return data.experience.length === 0;
    case "education":
      return data.education.length === 0;
    case "skills":
      return data.skills.length === 0;
    case "projects":
      return data.projects.length === 0;
    case "certifications":
      return data.certifications.length === 0;
    case "languages":
      return data.languages.length === 0;
  }
}

/**
 * Ordered, visible sections to render. Built-ins follow settings.sectionOrder
 * (missing keys appended in default order); custom sections referenced by
 * `custom:<id>` are interleaved, and any not in the order are appended.
 */
export function getOrderedSections(
  data: ResumeData,
  opts: { includeEmpty?: boolean } = {},
): ResolvedSection[] {
  const { includeEmpty = false } = opts;
  const hidden = new Set(data.settings.hiddenSections);
  const order = data.settings.sectionOrder;
  const seen = new Set<string>();
  const out: ResolvedSection[] = [];

  const pushKey = (key: SectionKey) => {
    if (seen.has(key) || hidden.has(key)) return;
    seen.add(key);
    if (!includeEmpty && isSectionEmpty(data, key)) return;
    out.push({ token: key, kind: key, title: SECTION_LABELS[key] });
  };

  const pushCustom = (id: string) => {
    const token = `${CUSTOM_PREFIX}${id}`;
    if (seen.has(token) || hidden.has(token)) return;
    const custom = data.customSections.find((c) => c.id === id);
    if (!custom) return;
    seen.add(token);
    if (!includeEmpty && custom.entries.length === 0) return;
    out.push({ token, kind: "custom", title: custom.title, customId: id });
  };

  for (const token of order) {
    if (isSectionKey(token)) pushKey(token);
    else if (token.startsWith(CUSTOM_PREFIX)) pushCustom(token.slice(CUSTOM_PREFIX.length));
  }

  // Defensive: append anything not referenced by the order array.
  for (const key of SECTION_KEYS) pushKey(key);
  for (const custom of data.customSections) pushCustom(custom.id);

  return out;
}
