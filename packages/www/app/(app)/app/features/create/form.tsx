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
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schemas";

export function CreateFeatureForm() {
  const [editingIndices, setEditingIndices] = useState<Set<number>>(new Set());
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
        },
      ],
    },
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const addVariant = () => {
    variants.append({
      name: "",
      description: "",
      type: "boolean",
      resetPeriod: "never",
    });
    setEditingIndices(new Set([...editingIndices, variants.fields.length]));
  };

  const startEditing = (index: number) => {
    setEditingIndices(new Set([...editingIndices, index]));
  };

  const saveEdit = (index: number) => {
    setEditingIndices(new Set([...editingIndices].filter((i) => i !== index)));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <TypographyH3>Variants</TypographyH3>
            {variants.fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                {editingIndices.has(index) ? (
                  <>
                    <FormField
                      control={form.control}
                      name={`variants.${index}.name`}
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
                      name={`variants.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
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
                    {form.watch(`variants.${index}.type`) === "metered" && (
                      <FormField
                        control={form.control}
                        name={`variants.${index}.quota`}
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
                    )}
                    <div>
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => saveEdit(index)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">{field.name}</span>
                    <span className="flex-grow">{field.description}</span>
                    <div>
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => startEditing(index)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
                <div>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => variants.remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addVariant} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Variant
            </Button>
          </div>
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
