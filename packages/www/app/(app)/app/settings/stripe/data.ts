"use server";

import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";

export async function getStripeIntegration({ token }: { token: string | null }) {
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

  return response.ok ? (await response.json()).data.integrations : [];
}

export async function getPageData() {
  const { getToken } = await auth();
  const token = await getToken();
  const [stripeIntegration] = await unstable_cache(getStripeIntegration, ["stripe-integration"])({
    token,
  });

  return { stripeIntegration };
}
