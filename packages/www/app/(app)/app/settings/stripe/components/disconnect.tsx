"use client";

import { disconnectIntegration } from "@/app/(app)/app/settings/stripe/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function Disconnect({ id }: { id: number }) {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const ok = await disconnectIntegration(id);
        if (ok) {
          toast.success("Stripe disconnected");
        } else {
          toast.error("Failed to disconnect");
        }
      }}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      Disconnect
    </Button>
  );
}
