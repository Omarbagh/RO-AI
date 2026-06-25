/**
 * Supabase client for Server Components, Route Handlers and Server Actions.
 * Reads/writes the auth session from the request cookies (RLS-scoped — uses the
 * anon key, so every query runs as the logged-in user).
 */
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // `setAll` throws when called from a Server Component (read-only
          // cookies). That's fine — the middleware refreshes the session.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* no-op: session refresh happens in middleware */
          }
        },
      },
    },
  );
}
