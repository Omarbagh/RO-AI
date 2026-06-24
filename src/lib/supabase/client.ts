/**
 * Supabase client for the browser (Client Components). Uses the anon key and is
 * fully RLS-scoped to the signed-in user.
 */
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
