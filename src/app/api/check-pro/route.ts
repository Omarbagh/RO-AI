import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response(null, { status: 401 });

  const client = await clerkClient();          
  const user = await client.users.getUser(userId);

  const isPro = user.publicMetadata?.role === 'pro';
  return new Response(JSON.stringify({ isPro }), { status: 200 });
}
