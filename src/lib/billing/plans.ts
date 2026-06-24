/**
 * Plan definitions and quota limits. Single source of truth for what each tier
 * can do; consumed by the AI rate limiter, export gating, and the pricing UI.
 *
 * Limits are per rolling 30-day window unless noted. `null` means unlimited.
 * Tune these to match the approved pricing design.
 */
import type { PlanTier } from "@/lib/supabase/types";

export interface PlanLimits {
  /** Max number of resumes a user may own. null = unlimited. */
  maxResumes: number | null;
  /** AI generations per 30 days. null = unlimited. */
  aiCallsPerMonth: number | null;
  /** PDF exports per 30 days. null = unlimited. */
  exportsPerMonth: number | null;
  /** Whether premium templates are available. */
  premiumTemplates: boolean;
}

export interface PlanDefinition {
  tier: PlanTier;
  name: string;
  priceEurPerMonth: number;
  limits: PlanLimits;
}

export const PLANS: Record<PlanTier, PlanDefinition> = {
  free: {
    tier: "free",
    name: "Free",
    priceEurPerMonth: 0,
    limits: {
      maxResumes: 2,
      aiCallsPerMonth: 10,
      exportsPerMonth: 5,
      premiumTemplates: false,
    },
  },
  pro: {
    tier: "pro",
    name: "Pro",
    priceEurPerMonth: Number(process.env.MOLLIE_PRO_PRICE_EUR ?? 9.99),
    limits: {
      maxResumes: null,
      aiCallsPerMonth: null,
      exportsPerMonth: null,
      premiumTemplates: true,
    },
  },
};

export function getPlan(tier: PlanTier): PlanDefinition {
  return PLANS[tier];
}

/** True when a numeric quota has been reached (null limit = never). */
export function isOverLimit(used: number, limit: number | null): boolean {
  return limit !== null && used >= limit;
}

/** Remaining quota, or null when unlimited. */
export function remaining(used: number, limit: number | null): number | null {
  if (limit === null) return null;
  return Math.max(0, limit - used);
}
