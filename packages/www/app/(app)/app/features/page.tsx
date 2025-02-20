import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Features() {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await client.features.$get(
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const features = response.ok ? (await response.json()).data.features : [];

  return (
    <div>
      <AppHeader
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Features", href: "/features" },
        ]}
        actions={[
          <Button asChild key="create-feature">
            <Link href={routes.app.features.create}>Create Feature</Link>
          </Button>,
        ]}
      />
      <div className="p-4">
        <DataTable columns={columns} data={features} />
      </div>
    </div>
  );
}
