export type LangCode = "en" | "nl" | "de" | "fr" | "es" | "it";

export function toLangCode(input?: string): LangCode {
  const v = (input || "English").toLowerCase();
  if (v.startsWith("dut") || v.startsWith("ned")) return "nl";
  if (v.startsWith("deu") || v === "deutsch" || v === "german") return "de";
  if (v.startsWith("fr")) return "fr";
  if (v.startsWith("es") || v.includes("span")) return "es";
  if (v.startsWith("it")) return "it";
  return "en";
}

const dict: Record<LangCode, Record<string, string>> = {
  en: {
    IMPACT: "IMPACT",
    EXPERIENCE: "EXPERIENCE",
    SKILLS: "SKILLS",
    EDUCATION: "EDUCATION",
  },
  nl: {
    IMPACT: "IMPACT",
    EXPERIENCE: "ERVARING",
    SKILLS: "VAARDIGHEDEN",
    EDUCATION: "OPLEIDING",
  },
  de: {
    IMPACT: "WIRKUNG",
    EXPERIENCE: "BERUFSERFAHRUNG",
    SKILLS: "FÄHIGKEITEN",
    EDUCATION: "AUSBILDUNG",
  },
  fr: {
    IMPACT: "IMPACT",
    EXPERIENCE: "EXPÉRIENCE",
    SKILLS: "COMPÉTENCES",
    EDUCATION: "FORMATION",
  },
  es: {
    IMPACT: "IMPACTO",
    EXPERIENCE: "EXPERIENCIA",
    SKILLS: "HABILIDADES",
    EDUCATION: "EDUCACIÓN",
  },
  it: {
    IMPACT: "IMPATTO",
    EXPERIENCE: "ESPERIENZA",
    SKILLS: "COMPETENZE",
    EDUCATION: "ISTRUZIONE",
  },
};

export function t(key: keyof typeof dict["en"], lang?: string) {
  const code = toLangCode(lang);
  return dict[code][key] || dict.en[key];
}
