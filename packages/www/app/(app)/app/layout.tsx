import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken, sessionClaims } = await auth();

  const userId = Number(sessionClaims?.["external_id"]);

  const response = await client.users[":id"].memberships.$get(
    {
      param: {
        id: userId.toString(),
      },
    },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  const memberships = response.ok
    ? (await response.json()).data.memberships
    : [];

  console.log(memberships);

  //   const memberships = await response.json();

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
