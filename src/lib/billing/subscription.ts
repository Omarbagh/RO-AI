/**
 * Resolves a user's effective plan from their subscription row. A `pro`
 * subscription only counts while its status is active/trialing; anything else
 * (past_due, canceled, …) falls back to free limits.
 */
import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPlan, type PlanDefinition } from "./plans";
import type { PlanTier, SubscriptionStatus } from "@/lib/supabase/types";

const ENTITLING_STATUSES: ReadonlySet<SubscriptionStatus> = new Set([
  "active",
  "trialing",
]);

export async function getUserPlan(userId: string): Promise<PlanDefinition> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", userId)
    .maybeSingle();

  const tier: PlanTier =
    data?.plan === "pro" && ENTITLING_STATUSES.has(data.status) ? "pro" : "free";

  return getPlan(tier);
}
