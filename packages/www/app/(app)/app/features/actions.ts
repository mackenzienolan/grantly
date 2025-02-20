"use server";

import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { formSchema } from "./schemas";

export async function createFeature(data: z.infer<typeof formSchema>) {
  const { getToken } = await auth();

  const response = await client.features.$post(
    { json: data },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  if (response.ok) {
    revalidatePath(routes.app.features.root);
  }

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
}
