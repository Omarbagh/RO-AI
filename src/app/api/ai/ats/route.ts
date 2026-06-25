import type { NextRequest } from "next/server";
import { parseResumeData } from "@/lib/resume/schema";
import { guardAi, meterAi } from "@/lib/ai/guard";
import { runStructured } from "@/lib/ai/run";
import { atsPrompt } from "@/lib/ai/prompts";
import { atsResultSchema } from "@/lib/ai/schemas";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const guard = await guardAi();
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json()) as { data?: unknown; jobText?: string };

  try {
    const { system, prompt } = atsPrompt(parseResumeData(body.data), body.jobText);
    const { data, usage } = await runStructured({
      system,
      prompt,
      schema: atsResultSchema,
      toolName: "ats_score",
    });
    await meterAi("ats_score", guard.userId, usage);
    return Response.json(data);
  } catch {
    return Response.json({ error: "ATS-analyse mislukt. Probeer opnieuw." }, { status: 500 });
  }
}
