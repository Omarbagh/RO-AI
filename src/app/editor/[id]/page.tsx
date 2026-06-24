import { notFound, redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createResume, getResume } from "@/lib/resume/queries";
import { getUserPlan } from "@/lib/billing/subscription";
import { getPlan } from "@/lib/billing/plans";
import { SAMPLE_RESUME } from "@/lib/resume/sample";
import { createEmptyResume } from "@/lib/resume/factory";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Demo mode (no Supabase): explore the editor with sample/empty data.
  if (!isSupabaseConfigured) {
    const data = id === "new" ? createEmptyResume() : SAMPLE_RESUME;
    return (
      <EditorWorkspace
        resumeId={id}
        initialData={data}
        initialTitle={id === "new" ? "Untitled resume" : "Sanne Bakker"}
        canPersist={false}
        isPro
      />
    );
  }

  if (id === "new") {
    const newId = await createResume();
    redirect(`/editor/${newId}`);
  }

  const resume = await getResume(id);
  if (!resume) notFound();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const plan = user ? await getUserPlan(user.id) : getPlan("free");

  return (
    <EditorWorkspace
      resumeId={resume.id}
      initialData={resume.data}
      initialTitle={resume.title}
      canPersist
      isPro={plan.tier === "pro"}
    />
  );
}
