"use server";

import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function disconnectIntegration(id: number) {
  const { getToken } = await auth();

  const token = await getToken();

  const response = await client.integrations[":id"].$delete({
    header: {
      Authorization: `Bearer ${token}`,
    },
    param: {
      id,
    },
  });

  if (response.ok) {
    revalidatePath(routes.app.settings.stripe);
  }

  return response.ok;
}
