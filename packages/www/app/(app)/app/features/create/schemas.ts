import { z } from "zod";

export const resetPeriodSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
  "billing_period",
]);
export const variantSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().optional(),
    type: z.literal("boolean"),
    resetPeriod: resetPeriodSchema,
  })
  .or(
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      type: z.literal("metered"),
      quota: z.number().optional(),
      resetPeriod: resetPeriodSchema,
    })
  );

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  variants: z.array(variantSchema).min(1),
  createAnother: z.boolean().optional(),
});
