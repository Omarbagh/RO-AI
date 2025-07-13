// src/app/api/save-resume/route.ts
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response('Unauthorized', { status: 401 });

  const { templateId, formData } = await req.json();

  // Now we bypass RLS
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .insert({ user_id: userId, template_id: templateId, data: formData })
    .select('id')
    .single();

  if (error) {
    console.error('Supabase insert error full:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ resumeId: data.id }));
}
