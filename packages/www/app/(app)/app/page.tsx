import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar
        teams={[
          {
            name: "Team 1",
            logo: "https://placehold.co/32x32",
            plan: "Pro",
          },
          {
            name: "Team 2",
            logo: "https://placehold.co/32x32",
            plan: "Pro",
          },
        ]}
      />
      <SidebarInset>
        <AppHeader
          breadcrumbs={[
            { title: "Home", href: "/" },
            { title: "Dashboard", href: "/dashboard" },
          ]}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
