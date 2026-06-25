import type { NextRequest } from "next/server";
import { parseResumeData } from "@/lib/resume/schema";
import { guardAi, meterAi } from "@/lib/ai/guard";
import { runStream } from "@/lib/ai/run";
import { coverLetterPrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const guard = await guardAi();
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json()) as {
    data?: unknown;
    company?: string;
    role?: string;
    jobText?: string;
    tone?: string;
  };

  const { system, prompt } = coverLetterPrompt({
    data: parseResumeData(body.data),
    company: body.company ?? "",
    role: body.role ?? "",
    jobText: body.jobText ?? "",
    tone: body.tone ?? "Professioneel",
  });

  const stream = runStream({
    system,
    prompt,
    maxTokens: 1100,
    onFinish: (u) => void meterAi("cover_letter", guard.userId, u),
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
