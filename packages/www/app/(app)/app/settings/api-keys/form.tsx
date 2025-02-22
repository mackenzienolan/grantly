import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { schema, type Schema, keyTypes } from "./models";
import { createApiKey } from "./actions";
import { Typography } from "@/components/typography";
import { Copy } from "lucide-react";

export function ApiKeyForm({
  apiKeyExists,
  onClose,
}: {
  apiKeyExists: boolean;
  onClose: () => void;
}) {
  const [key, setKey] = useState<string | null>(null);
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "api_key",
      description: "",
    },
  });

  const onSubmit = async (data: Schema) => {
    const response = await createApiKey(data);

    if (!response.ok) {
      toast.error("Failed to create key");
      return;
    }

    setKey(response.data?.key ?? null);
  };

  if (key) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="default">
          <AlertTitle>Key created successfully</AlertTitle>
          <AlertDescription>
            Your new key is:{" "}
            <Button
              variant="ghost"
              className="!p-0"
              onClick={() => {
                navigator.clipboard.writeText(key);
                toast.success("Key copied to clipboard");
              }}
            >
              <Typography variant="code">{key}</Typography>{" "}
              <Copy className="size-4" />
            </Button>
          </AlertDescription>
        </Alert>
        <Button onClick={onClose}>I&apos;ve copied the key</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.watch("type") === "api_key" && apiKeyExists && (
          <Alert className="bg-destructive" variant="destructive">
            <AlertTitle>You already have a key of this type</AlertTitle>
            <AlertDescription>
              Please check if you need to create a new key. Make sure all
              previously created keys are stored securely before proceeding.
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {keyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input className="mt-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Key</Button>
      </form>
    </Form>
  );
}
