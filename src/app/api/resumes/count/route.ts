import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ count: 0 }, { status: 401 });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { count, error } = await supabase
    .from("resumes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ count: count ?? 0 });
}
