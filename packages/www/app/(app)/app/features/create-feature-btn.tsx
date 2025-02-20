"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateFeatureForm } from "./create-form";

export function CreateFeatureBtn() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Feature</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Feature</DialogTitle>
        <CreateFeatureForm
          onSuccess={({ createAnother }) => {
            if (!createAnother) {
              setOpen(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
