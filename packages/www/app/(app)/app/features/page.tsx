import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import routes from "@/lib/routes";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Features() {
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
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
}
