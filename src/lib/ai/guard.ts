import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { checkAiLimit, recordAiUsage } from "@/lib/billing/usage";
import type { AiFeature } from "@/lib/supabase/types";
import type { Usage } from "./run";

export interface AiGuard {
  ok: boolean;
  userId: string | null;
  status: number;
  error: string | null;
}

/** Config check + (when Supabase is configured) auth + plan rate limit. */
export async function guardAi(): Promise<AiGuard> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      ok: false,
      userId: null,
      status: 503,
      error: "AI is nog niet geconfigureerd (ANTHROPIC_API_KEY ontbreekt).",
    };
  }

  // Demo mode: no auth / no metering — allow when the key is present.
  if (!isSupabaseConfigured) {
    return { ok: true, userId: null, status: 200, error: null };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, userId: null, status: 401, error: "Log in om AI te gebruiken." };
  }

  const limit = await checkAiLimit(user.id);
  if (!limit.allowed) {
    return {
      ok: false,
      userId: user.id,
      status: 429,
      error: `AI-limiet bereikt (${limit.used ?? 0}/${limit.limit ?? 0}). Upgrade naar Pro voor onbeperkt gebruik.`,
    };
  }
  return { ok: true, userId: user.id, status: 200, error: null };
}

export async function meterAi(
  feature: AiFeature,
  userId: string | null,
  usage: Usage,
): Promise<void> {
  if (userId) {
    await recordAiUsage(userId, feature, usage.inputTokens, usage.outputTokens);
  }
}
