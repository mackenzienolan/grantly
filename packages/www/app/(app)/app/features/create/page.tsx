import { AppHeader } from "@/components/app-header";
import routes from "@/lib/routes";
import { CreateFeatureForm } from "./form";

export default function CreateFeaturePage() {
  return (
    <div>
      <AppHeader
        breadcrumbs={[
          {
            title: "Features",
            href: routes.app.features.root,
          },
        ]}
      />
      <div className="p-4">
        <CreateFeatureForm />
      </div>
    </div>
  );
}
