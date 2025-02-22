"use server";

import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Schema } from "./models";

export async function deleteApiKeys(ids: number[]) {
  const { getToken } = await auth();

  const response = await client.keys.$delete(
    { json: { ids } },
    { headers: { Authorization: `Bearer ${await getToken()}` } }
  );

  revalidateTag("api-keys");
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
}

export async function createApiKey(data: Schema) {
  const { getToken } = await auth();

  const response = await client.keys.$post(
    { json: data },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      statusText: response.statusText,
    };
  }

  const json = await response.json();
  revalidatePath(routes.app.settings.apiKeys);
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: json.data,
  };
}
