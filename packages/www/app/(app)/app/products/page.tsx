import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import routes from "@/lib/routes";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { columns } from "./columns";
import { getProducts, getStripeIntegration } from "./data";
import { DataTable } from "./data-table";

export default async function Products() {
  const { getToken } = await auth();
  const token = await getToken();
  const products = await unstable_cache(getProducts, ["products"], {
    tags: ["products"],
  })({ token });
  const stripeIntegration = await unstable_cache(getStripeIntegration, [
    "stripe-integration",
  ])({ token });

  return (
    <div>
      <AppHeader
        breadcrumbs={[
          { title: "Home", href: routes.app.dashboard.root },
          { title: "Products", href: routes.app.products.root },
        ]}
        actions={[
          stripeIntegration && stripeIntegration.length === 0 ? (
            <Button key="connect-stripe">Connect Stripe</Button>
          ) : null,
        ]}
      />
      <div className="p-4">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
