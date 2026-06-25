import type { NextRequest } from "next/server";
import { parseResumeData } from "@/lib/resume/schema";
import { guardAi, meterAi } from "@/lib/ai/guard";
import { runStream } from "@/lib/ai/run";
import { summaryPrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const guard = await guardAi();
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json()) as { data?: unknown };
  const { system, prompt } = summaryPrompt(parseResumeData(body.data));

  const stream = runStream({
    system,
    prompt,
    maxTokens: 400,
    onFinish: (u) => void meterAi("generate_summary", guard.userId, u),
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
