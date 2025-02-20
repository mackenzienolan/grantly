import { AppHeader } from "@/components/app-header";
import routes from "@/lib/routes";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Products() {
  return (
    <div>
      <AppHeader
        breadcrumbs={[
          { title: "Home", href: routes.app.dashboard.root },
          { title: "Products", href: routes.app.products.root },
        ]}
      />
      <div className="p-4">
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
}
