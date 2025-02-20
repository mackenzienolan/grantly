"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1 } from "@/components/ui/typography";
import { client } from "@/lib/client";
import routes from "@/lib/routes";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { formSchema } from "./schemas";

export function CreateFeatureForm() {
  const { getToken } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "boolean",
      resetPeriod: "billing_period",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await client.features.$post(
      {
        json: data,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    if (response.ok) {
      toast.success("Feature created successfully");
      if (!data.createAnother) {
        router.push(routes.app.features.root);
      }
    } else {
      toast.error("Failed to create feature");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        <div className="space-y-4">
          <TypographyH1>Create Feature</TypographyH1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <div>
            <FormField
              control={form.control}
              name="createAnother"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-2 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Create Another</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
