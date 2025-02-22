"use server";

import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";

export async function listApiKeys(token: string) {
  const response = await client.keys.$get(
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to list API keys");
  }

  return response.json();
}

export type ListApiKeysResponse = Awaited<
  ReturnType<typeof listApiKeys>
>["data"]["keys"];

export async function getTableData() {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  return unstable_cache(listApiKeys, ["api-keys"], {
    tags: ["api-keys"],
    revalidate: 100,
  })(token);
}
