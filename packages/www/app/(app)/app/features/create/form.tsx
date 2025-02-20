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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TypographyP } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "radash";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const resetPeriodSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
  "billing_period",
]);
const variantSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().optional(),
    type: z.literal("boolean"),
    resetPeriod: resetPeriodSchema,
    isEditing: z.boolean(),
  })
  .or(
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      type: z.literal("metered"),
      quota: z.number().optional(),
      resetPeriod: resetPeriodSchema,
      isEditing: z.boolean(),
    })
  );

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  variants: z.array(variantSchema).min(1),
  createAnother: z.boolean().optional(),
});

export function CreateFeatureForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: [
        {
          name: "",
          description: "",
          type: "boolean",
          resetPeriod: "billing_period",
          isEditing: true,
        },
      ],
    },
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
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
          <section id="variants">
            <TypographyP className="font-bold">Variants</TypographyP>
            {variants.fields.map((field, index) => {
              if (!field.isEditing) {
                return (
                  <div
                    key={field.id}
                    className="flex flex-row justify-between gap-2"
                  >
                    <div className="flex flex-row gap-2 my-auto">
                      <TypographyP>{field.name}</TypographyP>
                      <TypographyP className="text-sm text-muted-foreground">
                        {field.description}
                      </TypographyP>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        field.isEditing = true;
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                );
              }
              return (
                <div
                  key={field.id}
                  className="p-4 space-y-2 mt-2 border rounded-md"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.name`}
                      render={() => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="metered">Metered</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch(`variants.${index}.type`) === "metered" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.quota`}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quota</FormLabel>
                            <FormControl>
                              <Input
                                className="mt-1"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.resetPeriod`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reset Period</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select a reset period" />
                                </SelectTrigger>
                                <SelectContent>
                                  {resetPeriodSchema.options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {title(option)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Remove Variant Button */}
                  {variants.fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => variants.remove(index)}
                      className="px-3 py-1 mt-2 text-white bg-red-500 rounded"
                    >
                      Remove Variant
                    </button>
                  )}
                </div>
              );
            })}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                type="button"
                className="mt-2"
                onClick={() => {
                  variants.append({
                    name: "",
                    description: "",
                    type: "boolean",
                    resetPeriod: "never",
                    isEditing: true,
                  });
                }}
              >
                Add Variant
              </Button>
            </div>
          </section>
          <Separator />
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
        <div>This is where we should show variants</div>
      </form>
    </Form>
  );
}
