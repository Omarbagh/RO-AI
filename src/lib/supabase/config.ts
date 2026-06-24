/**
 * Supabase configuration detection. Lets the app run in "demo mode" (sample
 * data, no auth enforcement) until real Supabase credentials are provided,
 * then switches to full production behaviour automatically.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** True when public Supabase env is present (client + server reads). */
export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

/** True when the service-role key is present (webhooks, usage metering). */
export const hasServiceRole = SUPABASE_SERVICE_ROLE_KEY.length > 0;
