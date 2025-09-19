import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Basis Supabase client zonder auth
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Helper om Supabase client met Clerk JWT te maken
export function createSupabaseClientWithAuth(token: string): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        autoRefreshToken: false,
      },
    },
  );
}
