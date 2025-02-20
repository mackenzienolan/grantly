import { z } from "zod";

export const resetPeriodSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
  "billing_period",
]);

export const formSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("boolean"),
    name: z.string().min(1),
    description: z.string().min(1),
    resetPeriod: resetPeriodSchema,
    createAnother: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("metered"),
    name: z.string().min(1),
    description: z.string().min(1),
    quota: z.coerce.number().min(0),
    resetPeriod: resetPeriodSchema,
    createAnother: z.boolean().optional(),
  }),
]);
