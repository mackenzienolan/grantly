import { client } from "@/lib/client";

export async function getProducts({ token }: { token: string | null }) {
  const response = await client.products.$get(
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.ok ? (await response.json()).data.products : [];
}

export type GetProductsResponse = Awaited<ReturnType<typeof getProducts>>;

export async function getStripeIntegration({
  token,
}: {
  token: string | null;
}) {
  const response = await client.integrations.$get(
    {
      query: {
        type: "stripe",
        status: "active",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.ok ? (await response.json()).data.integrations : null;
}
