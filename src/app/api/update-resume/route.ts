// app/api/update-resume/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PUT(request: NextRequest) {
  try {
    const { id, templateId, formData } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 },
      );
    }

    // Create a client authenticated with the user's token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("resumes")
      .update({
        template_id: templateId,
        data: formData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update resume" },
        { status: 500 },
      );
    }
    
    // **Important: Check if any rows were actually updated**
    if (!data || data.length === 0) {
        return NextResponse.json({ error: "Resume not found or you don't have permission to edit it." }, { status: 404 });
    }

    return NextResponse.json({ success: true, resume: data });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}