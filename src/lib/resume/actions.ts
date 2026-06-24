"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUserPlan } from "@/lib/billing/subscription";
import { isOverLimit } from "@/lib/billing/plans";
import {
  countResumes,
  createResume,
  deleteResume,
  duplicateResume,
  renameResume,
  saveResume,
} from "./queries";
import type { ResumeData } from "./schema";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function assertCanCreate(): Promise<string | null> {
  const [plan, count] = await Promise.all([
    getUserPlan(await currentUserIdOrThrow()),
    countResumes(),
  ]);
  if (isOverLimit(count, plan.limits.maxResumes)) {
    return `Je hebt het maximum van ${plan.limits.maxResumes} cv's bereikt op het ${plan.name}-plan. Upgrade naar Pro voor onbeperkt.`;
  }
  return null;
}

async function currentUserIdOrThrow(): Promise<string> {
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user.id;
}

/** Create a resume and go straight to the editor. */
export async function createResumeAction(templateId = "modern"): Promise<void> {
  if (!isSupabaseConfigured) redirect("/editor/new");
  const limit = await assertCanCreate();
  if (limit) {
    redirect(`/dashboard?error=${encodeURIComponent(limit)}`);
  }
  const id = await createResume("Untitled resume", templateId);
  revalidatePath("/dashboard");
  redirect(`/editor/${id}`);
}

export async function duplicateResumeAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) return { ok: false, error: "Niet geconfigureerd." };
  try {
    const limit = await assertCanCreate();
    if (limit) return { ok: false, error: limit };
    await duplicateResume(id);
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false, error: "Dupliceren mislukt." };
  }
}

export async function renameResumeAction(
  id: string,
  title: string,
): Promise<ActionResult> {
  if (!isSupabaseConfigured) return { ok: false, error: "Niet geconfigureerd." };
  try {
    await renameResume(id, title.trim() || "Untitled resume");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false, error: "Hernoemen mislukt." };
  }
}

export async function deleteResumeAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) return { ok: false, error: "Niet geconfigureerd." };
  try {
    await deleteResume(id);
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false, error: "Verwijderen mislukt." };
  }
}

/** Autosave the editor content. No-op (ok) in demo mode. */
export async function saveResumeAction(
  id: string,
  data: ResumeData,
  title: string,
): Promise<ActionResult> {
  if (!isSupabaseConfigured) return { ok: true };
  try {
    await saveResume(id, data, title);
    return { ok: true };
  } catch {
    return { ok: false, error: "Opslaan mislukt." };
  }
}
