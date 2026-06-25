import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listResumes } from "@/lib/resume/queries";
import { getTemplate } from "@/lib/templates/registry";
import {
  DashboardClient,
  type DashboardResume,
  type DashboardStats,
} from "@/components/dashboard/dashboard-client";

function relativeNl(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "zojuist";
  if (mins < 60) return `${mins} min geleden`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} uur geleden`;
  const days = Math.round(hours / 24);
  if (days === 1) return "gisteren";
  if (days < 7) return `${days} dagen geleden`;
  return `${Math.round(days / 7)} week geleden`;
}

const DEMO_RESUMES: DashboardResume[] = [
  { id: "demo", title: "Senior Product Marketeer", template: "Modern", editedAgo: "2 uur geleden", ats: 92 },
  { id: "demo", title: "Marketing Manager", template: "Classic", editedAgo: "gisteren", ats: 74 },
  { id: "demo", title: "Growth Lead", template: "Sidebar", editedAgo: "3 dagen geleden", ats: 89 },
  { id: "demo", title: "Naamloos cv", template: "Minimalist", editedAgo: "1 week geleden", ats: null },
];

export default async function DashboardPage() {
  const demo = !isSupabaseConfigured;

  if (demo) {
    const stats: DashboardStats = { active: "4", atsAvg: "88", downloads: "12" };
    return (
      <DashboardClient
        resumes={DEMO_RESUMES}
        userName="Sanne"
        stats={stats}
        canPersist={false}
      />
    );
  }

  const list = await listResumes();
  const resumes: DashboardResume[] = list.map((r) => ({
    id: r.id,
    title: r.title,
    template: getTemplate(r.templateId).meta.name,
    editedAgo: relativeNl(r.updatedAt),
    ats: null,
  }));

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? "";
  const userName = fullName.split(" ")[0] || "daar";

  const stats: DashboardStats = {
    active: String(resumes.length),
    atsAvg: "—",
    downloads: "—",
  };

  return (
    <DashboardClient
      resumes={resumes}
      userName={userName}
      stats={stats}
      canPersist
    />
  );
}
