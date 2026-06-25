import type { NextRequest } from "next/server";
import { parseResumeData } from "@/lib/resume/schema";
import { guardAi, meterAi } from "@/lib/ai/guard";
import { runStructured } from "@/lib/ai/run";
import { tailorPrompt } from "@/lib/ai/prompts";
import { tailorResultSchema } from "@/lib/ai/schemas";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const guard = await guardAi();
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json()) as { data?: unknown; jobText?: string };
  if (!body.jobText || body.jobText.trim().length < 20) {
    return Response.json({ error: "Plak eerst een vacaturetekst." }, { status: 400 });
  }

  try {
    const { system, prompt } = tailorPrompt(parseResumeData(body.data), body.jobText);
    const { data, usage } = await runStructured({
      system,
      prompt,
      schema: tailorResultSchema,
      toolName: "tailor_resume",
    });
    await meterAi("tailor_job", guard.userId, usage);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Afstemmen mislukt. Probeer opnieuw." }, { status: 500 });
  }
}
