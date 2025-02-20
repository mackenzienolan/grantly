import { client } from "@/lib/client";

export async function getFeatures({ token }: { token: string | null }) {
  const response = await client.features.$get(
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.ok ? (await response.json()).data.features : [];
}

export type GetFeaturesResponse = Awaited<ReturnType<typeof getFeatures>>;
