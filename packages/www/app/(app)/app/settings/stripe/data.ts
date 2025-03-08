import { client } from '@/lib/client';

export async function getStripeIntegration({ token }: { token: string | null }) {
  const response = await client.integrations.$get(
    {
      query: {
        type: 'stripe',
        status: 'active',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.ok ? (await response.json()).data.integrations : [];
}
