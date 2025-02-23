"use client";

import { Typography } from "@/components/typography";
import { OrganizationList } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrganizationSelection() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") ?? "/";

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <section className="w-full max-w-lg space-y-4">
        <Typography variant="h1">Select your team.</Typography>
        <p>
          This part of the application requires the user to select an
          organization in order to proceed. If you are not part of an
          organization, you can accept an invitation or create your own
          organization.
        </p>
        <OrganizationList
          hidePersonal={true}
          afterCreateOrganizationUrl={redirectUrl}
          afterSelectOrganizationUrl={redirectUrl}
        />
      </section>
    </div>
  );
}

export default function OrganizationSelectionPage() {
  return (
    <Suspense>
      <OrganizationSelection />
    </Suspense>
  );
}
