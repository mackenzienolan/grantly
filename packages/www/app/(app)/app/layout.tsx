import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken, sessionClaims } = await auth();
  const getMemberships = unstable_cache(
    async (
      token: string | null,
      sessionClaims: Awaited<ReturnType<typeof auth>>["sessionClaims"]
    ) => {
      if (!token || !sessionClaims) {
        return [];
      }

      const userId = Number(sessionClaims?.["external_id"]);

      const response = await client.users[":id"].memberships.$get(
        {
          param: {
            id: userId.toString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const memberships = response.ok
        ? (await response.json()).data.memberships
        : [];

      return memberships;
    },
    ["memberships"],
    {
      revalidate: 3600,
      tags: ["memberships"],
    }
  );

  const memberships = await getMemberships(await getToken(), sessionClaims);

  return (
    <SidebarProvider>
      <AppSidebar
        teams={
          memberships?.length > 0
            ? memberships.map((membership) => ({
                name: membership.team?.name ?? "Team",
                logo:
                  membership.team?._clerkRaw.image_url ??
                  "https://placehold.co/15x15",
                plan: "test 123",
              }))
            : []
        }
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
