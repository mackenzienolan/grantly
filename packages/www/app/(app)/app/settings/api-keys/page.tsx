import { AppHeader } from "@/components/app-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getTableData } from "./data";
import { CreateKeyBtn } from "./create-key-btn";

export default async function ApiKeysPage() {
  const data = await getTableData();

  const apiKeyExists = data.data.keys.some((key) => key.type === "api_key");

  return (
    <div>
      <AppHeader
        breadcrumbs={[
          { title: "Settings", href: "/app/settings" },
          { title: "API Keys", href: "/app/settings/api-keys" },
        ]}
        actions={[
          <CreateKeyBtn key="create-key-btn" apiKeyExists={apiKeyExists} />,
        ]}
      />
      <div className="p-4">
        <DataTable columns={columns} data={data.data.keys} />
      </div>
    </div>
  );
}
