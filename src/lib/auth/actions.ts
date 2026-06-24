"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export type AuthState = { error: string } | null;

/** Map common Supabase auth errors to friendly Dutch copy. */
function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "Onjuist e-mailadres of wachtwoord.";
  if (m.includes("already registered")) return "Er bestaat al een account met dit e-mailadres.";
  if (m.includes("email not confirmed")) return "Bevestig eerst je e-mailadres via de link in je inbox.";
  if (m.includes("password")) return "Wachtwoord voldoet niet aan de eisen (min. 6 tekens).";
  return "Er ging iets mis. Probeer het opnieuw.";
}

const NOT_CONFIGURED: AuthState = {
  error: "Inloggen is nog niet geconfigureerd (Supabase ontbreekt).",
};

export async function signInWithPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: friendly(error.message) };
  redirect("/dashboard");
}

export async function signUpWithPassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${APP_URL}/auth/callback`,
    },
  });
  if (error) return { error: friendly(error.message) };
  redirect("/dashboard");
}

export async function signInWithGoogle(): Promise<AuthState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${APP_URL}/auth/callback?next=/dashboard` },
  });
  if (error) return { error: friendly(error.message) };
  if (data.url) redirect(data.url);
  return null;
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
