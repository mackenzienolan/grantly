import { AppHeader } from "@/components/app-header";
import { client } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { CreateFeatureBtn } from "./create-feature-btn";
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
        actions={[<CreateFeatureBtn key="create-feature" />]}
      />
      <div className="p-4">
        <DataTable columns={columns} data={features} />
      </div>
    </div>
  );
}
