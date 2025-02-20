"use client";

import { ButtonLoading } from "@/components/btn-loading";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import routes from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createFeature } from "./actions";
import { featureTypeSchema, formSchema, resetPeriodSchema } from "./schemas";

export function CreateFeatureForm({
  onSuccess,
}: {
  onSuccess?: ({ createAnother }: { createAnother?: boolean }) => void;
}) {
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
    const response = await createFeature(data);
    if (response.ok) {
      onSuccess?.({
        createAnother: data.createAnother,
      });
      toast.success("Feature created successfully");
      if (!data.createAnother) {
        router.push(routes.app.features.root);
      }
      form.reset({
        createAnother: true,
      });
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
          <Typography variant="h2" component="h1">
            Create Feature
          </Typography>
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {featureTypeSchema.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("type") === "metered" ? (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quota"
                defaultValue={0}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quota</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resetPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Period</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reset period" />
                        </SelectTrigger>
                        <SelectContent>
                          {resetPeriodSchema.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ) : null}
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
            <ButtonLoading loading={form.formState.isSubmitting} type="submit">
              Create
            </ButtonLoading>
          </div>
        </div>
      </form>
    </Form>
  );
}
