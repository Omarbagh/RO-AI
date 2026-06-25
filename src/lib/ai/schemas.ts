/**
 * Structured-output schemas for AI features. These are both the validation
 * contract (Zod) and the source for the Anthropic tool input_schema, so the
 * model's JSON maps 1:1 onto the UI.
 */
import { z } from "zod";

export const rewriteResultSchema = z.object({
  bullets: z
    .array(z.string())
    .describe("Herschreven bullets: krachtig, resultaatgericht, met sterke werkwoorden."),
});
export type RewriteResult = z.infer<typeof rewriteResultSchema>;

export const atsCategorySchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(100),
  tip: z.string(),
});

export const atsResultSchema = z.object({
  score: z.number().min(0).max(100).describe("Totale ATS-score 0-100."),
  summary: z.string().describe("Eén zin samenvatting van de score."),
  categories: z.array(atsCategorySchema).describe("Deelscores per categorie."),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()).describe("Concrete verbeterpunten."),
  missingKeywords: z.array(z.string()),
});
export type AtsResult = z.infer<typeof atsResultSchema>;

export const tailorResultSchema = z.object({
  matchScore: z.number().min(0).max(100).describe("Hoe goed het cv matcht met de vacature."),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  summarySuggestion: z.string().describe("Voorgestelde herschreven samenvatting."),
  bulletSuggestions: z
    .array(z.object({ focus: z.string(), suggestion: z.string() }))
    .describe("Voorgestelde bullets afgestemd op de vacature."),
  notes: z.array(z.string()),
});
export type TailorResult = z.infer<typeof tailorResultSchema>;
