/**
 * Service-role Supabase client. BYPASSES Row Level Security — use only in
 * trusted server contexts (Mollie webhooks, writing ai_usage after a metered
 * call). Never import this into anything that reaches the client bundle.
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
