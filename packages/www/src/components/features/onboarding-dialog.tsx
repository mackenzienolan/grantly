import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function OnboardingDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogTrigger>
        <Button>Onboard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Onboarding</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
