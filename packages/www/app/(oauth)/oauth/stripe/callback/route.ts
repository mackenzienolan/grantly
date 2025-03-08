import { client } from '@/lib/client';
import routes from '@/lib/routes';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const { getToken } = await auth();

  if (!code) {
    return new Response('No code', { status: 400 });
  }

  const token = await getToken();

  const response = await client.integrations.oauth.stripe.$post({
    query: { code },
    header: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  redirect(
    `${routes.app.settings.stripe}?message=${json.message}&type=${response.ok ? 'success' : 'error'}`
  );
}
