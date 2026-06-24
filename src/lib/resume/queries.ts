/**
 * Server-side resume data access (RLS-scoped via the request's Supabase client).
 * These return data / throw; the "use server" wrappers in actions.ts add
 * auth checks, plan gating, and cache revalidation.
 */
import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseResumeData, type ResumeData } from "./schema";
import { createEmptyResume } from "./factory";

export interface ResumeListItem {
  id: string;
  title: string;
  templateId: string;
  updatedAt: string;
  createdAt: string;
}

export interface ResumeWithContent {
  id: string;
  title: string;
  templateId: string;
  updatedAt: string;
  data: ResumeData;
}

async function getUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function listResumes(): Promise<ResumeListItem[]> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("resumes")
    .select("id, title, template_id, updated_at, created_at")
    .order("updated_at", { ascending: false });
  if (error) throw error;

  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    templateId: r.template_id,
    updatedAt: r.updated_at,
    createdAt: r.created_at,
  }));
}

export async function countResumes(): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const { count } = await supabase
    .from("resumes")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

export async function getResume(id: string): Promise<ResumeWithContent | null> {
  const supabase = await createSupabaseServerClient();
  const { data: resume, error } = await supabase
    .from("resumes")
    .select("id, title, template_id, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!resume) return null;

  const { data: content } = await supabase
    .from("resume_content")
    .select("data")
    .eq("resume_id", id)
    .maybeSingle();

  return {
    id: resume.id,
    title: resume.title,
    templateId: resume.template_id,
    updatedAt: resume.updated_at,
    data: parseResumeData(content?.data),
  };
}

export async function createResume(
  title = "Untitled resume",
  templateId = "modern",
): Promise<string> {
  const userId = await getUserId();
  if (!userId) throw new Error("UNAUTHENTICATED");
  const supabase = await createSupabaseServerClient();

  const { data: resume, error } = await supabase
    .from("resumes")
    .insert({ user_id: userId, title, template_id: templateId })
    .select("id")
    .single();
  if (error) throw error;

  const data = createEmptyResume();
  data.settings.templateId = templateId;
  const { error: contentError } = await supabase
    .from("resume_content")
    .insert({ resume_id: resume.id, data });
  if (contentError) throw contentError;

  return resume.id;
}

export async function duplicateResume(id: string): Promise<string> {
  const userId = await getUserId();
  if (!userId) throw new Error("UNAUTHENTICATED");
  const source = await getResume(id);
  if (!source) throw new Error("NOT_FOUND");

  const supabase = await createSupabaseServerClient();
  const { data: resume, error } = await supabase
    .from("resumes")
    .insert({
      user_id: userId,
      title: `${source.title} (kopie)`,
      template_id: source.templateId,
    })
    .select("id")
    .single();
  if (error) throw error;

  const { error: contentError } = await supabase
    .from("resume_content")
    .insert({ resume_id: resume.id, data: source.data });
  if (contentError) throw contentError;

  return resume.id;
}

export async function renameResume(id: string, title: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("resumes")
    .update({ title })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteResume(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("resumes").delete().eq("id", id);
  if (error) throw error;
}

/** Persist the full content + keep title/template_id columns in sync. */
export async function saveResume(
  id: string,
  data: ResumeData,
  title?: string,
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error: contentError } = await supabase
    .from("resume_content")
    .upsert({ resume_id: id, data }, { onConflict: "resume_id" });
  if (contentError) throw contentError;

  const patch: { template_id: string; title?: string } = {
    template_id: data.settings.templateId,
  };
  if (typeof title === "string") patch.title = title;

  const { error: resumeError } = await supabase
    .from("resumes")
    .update(patch)
    .eq("id", id);
  if (resumeError) throw resumeError;
}
