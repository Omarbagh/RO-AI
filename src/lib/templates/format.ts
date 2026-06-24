/**
 * Pure display helpers shared by every template (HTML + PDF). No styling here.
 */
import type { LanguageProficiency, ResumeData } from "@/lib/resume/schema";

/** "jan 2021 — heden" / "2018 — 2021" / "2020". */
export function formatRange(
  start: string,
  end: string,
  current?: boolean,
): string {
  const tail = current ? "heden" : end.trim();
  const head = start.trim();
  if (head && tail) return `${head} — ${tail}`;
  return head || tail || "";
}

/** Non-empty contact bits, in a stable order. */
export function contactLine(data: ResumeData): string[] {
  const p = data.personal;
  return [p.email, p.phone, p.location].filter((v) => v && v.trim().length > 0);
}

export function profileLinks(data: ResumeData): { label: string; value: string }[] {
  const p = data.personal;
  const out: { label: string; value: string }[] = [];
  if (p.website) out.push({ label: "Website", value: stripProtocol(p.website) });
  if (p.linkedin) out.push({ label: "LinkedIn", value: stripProtocol(p.linkedin) });
  if (p.github) out.push({ label: "GitHub", value: stripProtocol(p.github) });
  return out;
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PROFICIENCY_LABELS: Record<LanguageProficiency, string> = {
  elementary: "Basis",
  limited_working: "Redelijk",
  professional_working: "Goed",
  full_professional: "Vloeiend",
  native: "Moedertaal",
};

export function proficiencyLabel(p: LanguageProficiency): string {
  return PROFICIENCY_LABELS[p];
}

/** Group skills by their optional category; uncategorised under "". */
export function groupSkills(
  skills: ResumeData["skills"],
): { category: string; items: ResumeData["skills"] }[] {
  const map = new Map<string, ResumeData["skills"]>();
  for (const s of skills) {
    const key = s.category?.trim() ?? "";
    const arr = map.get(key) ?? [];
    arr.push(s);
    map.set(key, arr);
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
}
