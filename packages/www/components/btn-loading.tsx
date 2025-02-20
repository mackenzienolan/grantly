import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

export function ButtonLoading({
  loading,
  ...props
}: ButtonProps & {
  loading?: boolean;
}) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? <Loader2 className="animate-spin" /> : props.children}
    </Button>
  );
}
