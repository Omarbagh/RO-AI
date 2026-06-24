/**
 * Supabase client for the browser (Client Components). Uses the anon key and is
 * fully RLS-scoped to the signed-in user.
 */
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
