/**
 * Prompt construction for the AI features. Output language follows the CV
 * (Dutch by default for this product).
 */
import type { ResumeData } from "@/lib/resume/schema";
import { formatRange, proficiencyLabel } from "@/lib/templates/format";

/** Compact textual rendering of a resume for use as model context. */
export function resumeToText(data: ResumeData): string {
  const p = data.personal;
  const lines: string[] = [];
  lines.push(`Naam: ${p.fullName || "—"}`);
  if (p.headline) lines.push(`Functietitel: ${p.headline}`);
  if (data.summary) lines.push(`\nSamenvatting:\n${data.summary}`);

  if (data.experience.length) {
    lines.push("\nWerkervaring:");
    for (const e of data.experience) {
      lines.push(
        `- ${e.role} bij ${e.company} (${formatRange(e.startDate, e.endDate, e.current)})`,
      );
      if (e.summary) lines.push(`  ${e.summary}`);
      for (const h of e.highlights) lines.push(`  • ${h}`);
    }
  }
  if (data.education.length) {
    lines.push("\nOpleiding:");
    for (const e of data.education) {
      lines.push(`- ${e.degree} ${e.field ? `(${e.field}) ` : ""}- ${e.institution}`);
    }
  }
  if (data.skills.length) {
    lines.push(`\nVaardigheden: ${data.skills.map((s) => s.name).join(", ")}`);
  }
  if (data.projects.length) {
    lines.push("\nProjecten:");
    for (const pr of data.projects) lines.push(`- ${pr.name}: ${pr.description}`);
  }
  if (data.languages.length) {
    lines.push(
      `\nTalen: ${data.languages
        .map((l) => `${l.name} (${proficiencyLabel(l.proficiency)})`)
        .join(", ")}`,
    );
  }
  return lines.join("\n");
}

const BASE_STYLE =
  "Schrijf in het Nederlands, beknopt en professioneel. Vermijd clichés en holle frasen.";

export function rewritePrompt(input: {
  bullets: string[];
  role: string;
  company: string;
  jobContext?: string;
}): { system: string; prompt: string } {
  return {
    system: `Je bent een ervaren cv-coach. ${BASE_STYLE} Maak bullets resultaatgericht: begin met een sterk werkwoord, kwantificeer waar mogelijk (cijfers, %, impact), houd elke bullet op één regel.`,
    prompt: `Herschrijf de volgende bullets voor de functie "${input.role}"${
      input.company ? ` bij ${input.company}` : ""
    }.${input.jobContext ? `\n\nVacaturecontext:\n${input.jobContext}` : ""}\n\nHuidige bullets:\n${input.bullets
      .map((b) => `- ${b}`)
      .join("\n")}\n\nGeef hetzelfde aantal (of iets meer) verbeterde bullets terug.`,
  };
}

export function summaryPrompt(data: ResumeData): { system: string; prompt: string } {
  return {
    system: `Je bent een ervaren cv-coach. ${BASE_STYLE} Schrijf een professionele samenvatting van 2-4 zinnen in de eerste persoon zonder "ik", gericht op sterke punten en resultaten.`,
    prompt: `Schrijf een professionele samenvatting op basis van dit cv:\n\n${resumeToText(
      data,
    )}\n\nGeef alleen de samenvatting terug, zonder kop.`,
  };
}

export function atsPrompt(
  data: ResumeData,
  jobText?: string,
): { system: string; prompt: string } {
  return {
    system: `Je bent een ATS-expert (Applicant Tracking Systems). Beoordeel hoe goed dit cv door geautomatiseerde filters komt en geef concrete, toepasbare verbeterpunten. ${BASE_STYLE}`,
    prompt: `Analyseer dit cv op ATS-vriendelijkheid${
      jobText ? " ten opzichte van de gegeven vacature" : ""
    } en geef een score met deelscores en verbeterpunten.\n\nCV:\n${resumeToText(data)}${
      jobText ? `\n\nVacature:\n${jobText}` : ""
    }`,
  };
}

export function tailorPrompt(
  data: ResumeData,
  jobText: string,
): { system: string; prompt: string } {
  return {
    system: `Je bent een cv-strateeg. Stem het cv af op de vacature: vind ontbrekende trefwoorden en stel concrete herschrijvingen voor. ${BASE_STYLE}`,
    prompt: `Stem dit cv af op de volgende vacature. Geef een matchscore, gematchte en ontbrekende trefwoorden, een voorgestelde samenvatting en concrete bulletvoorstellen.\n\nCV:\n${resumeToText(
      data,
    )}\n\nVacature:\n${jobText}`,
  };
}

export function coverLetterPrompt(input: {
  data: ResumeData;
  company: string;
  role: string;
  jobText: string;
  tone: string;
}): { system: string; prompt: string } {
  return {
    system: `Je bent een professionele tekstschrijver. Schrijf een overtuigende, beknopte sollicitatiebrief in het Nederlands (max ~250 woorden) in een ${input.tone.toLowerCase()} toon. Gebruik concrete prestaties uit het cv. Begin met "Geachte heer/mevrouw," en eindig met "Met vriendelijke groet," en de naam. Geen placeholders.`,
    prompt: `Schrijf een sollicitatiebrief voor de functie "${input.role}"${
      input.company ? ` bij ${input.company}` : ""
    }.\n\nCV:\n${resumeToText(input.data)}${
      input.jobText ? `\n\nVacaturetekst:\n${input.jobText}` : ""
    }`,
  };
}
