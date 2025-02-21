import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code", { status: 400 });
  }

  const response = await client.integrations.oauth.stripe.$post({
    query: { code },
  });

  if (response.ok) {
    return redirect(routes.app.dashboard.root);
  }

  return response;
}
