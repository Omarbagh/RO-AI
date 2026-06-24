/**
 * AI usage metering + rate limiting, keyed off the per-plan limits in plans.ts.
 * Reads use the RLS-scoped server client; the write uses the service-role admin
 * client because `ai_usage` has no insert policy (server-only ledger).
 */
import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getUserPlan } from "./subscription";
import { isOverLimit, remaining } from "./plans";
import type { AiFeature } from "@/lib/supabase/types";

const WINDOW_DAYS = 30;
const WINDOW_MS = WINDOW_DAYS * 24 * 60 * 60 * 1000;

/** Count of AI calls in the rolling window. */
export async function getAiUsageCount(userId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count } = await supabase
    .from("ai_usage")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since);
  return count ?? 0;
}

export type AiLimitCheck =
  | { allowed: true; remaining: number | null }
  | { allowed: false; limit: number; used: number };

/** Check whether the user may make another AI call right now. */
export async function checkAiLimit(userId: string): Promise<AiLimitCheck> {
  const plan = await getUserPlan(userId);
  const limit = plan.limits.aiCallsPerMonth;
  if (limit === null) return { allowed: true, remaining: null };

  const used = await getAiUsageCount(userId);
  if (isOverLimit(used, limit)) return { allowed: false, limit, used };
  return { allowed: true, remaining: remaining(used, limit) };
}

/** Record a metered AI call. Call after a successful Claude response. */
export async function recordAiUsage(
  userId: string,
  feature: AiFeature,
  inputTokens = 0,
  outputTokens = 0,
): Promise<void> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("ai_usage").insert({
    user_id: userId,
    feature,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  });
  if (error) {
    // Don't fail the user's request because metering failed — log and move on.
    console.error("Failed to record ai_usage:", error.message);
  }
}
