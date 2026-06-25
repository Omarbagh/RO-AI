import type { NextRequest } from "next/server";
import { guardAi, meterAi } from "@/lib/ai/guard";
import { runStructured } from "@/lib/ai/run";
import { rewritePrompt } from "@/lib/ai/prompts";
import { rewriteResultSchema } from "@/lib/ai/schemas";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const guard = await guardAi();
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json()) as {
    bullets?: string[];
    role?: string;
    company?: string;
    jobContext?: string;
  };

  try {
    const { system, prompt } = rewritePrompt({
      bullets: body.bullets ?? [],
      role: body.role ?? "",
      company: body.company ?? "",
      jobContext: body.jobContext,
    });
    const { data, usage } = await runStructured({
      system,
      prompt,
      schema: rewriteResultSchema,
      toolName: "rewrite_bullets",
    });
    await meterAi("rewrite_bullets", guard.userId, usage);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Herschrijven mislukt. Probeer opnieuw." }, { status: 500 });
  }
}
