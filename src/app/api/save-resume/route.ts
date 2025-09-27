// src/app/api/save-resume/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";

export async function POST(request: NextRequest) {
  try {
    const { templateId, formData } = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract user_id from the JWT token
    let userId: string;
    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.sub; // This should be the Clerk user ID
      
      if (!userId) {
        return NextResponse.json({ error: "Invalid token: no user ID found" }, { status: 403 });
      }
    } catch (decodeError) {
      console.error("Token decode error:", decodeError);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
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

    // Insert with the user_id to satisfy RLS policies
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        template_id: templateId,
        data: formData,
        user_id: userId, // Include the user_id from the token
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ resumeId: data.id });
  } catch (err) {
    console.error("Error saving resume:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}