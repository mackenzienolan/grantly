import { z } from "zod";

export const resetPeriodSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
  "billing_period",
]);

export const featureTypeSchema = z.enum(["boolean", "metered"]);

const keyRegex = /^[a-zA-Z0-9_]+$/;
const keySchema = z
  .string({
    errorMap: () => {
      return {
        required_error: "Key is required",
        invalid_type_error:
          "Key must only include letters, numbers or underscores",
        message: "Key must only include letters, numbers or underscores",
      };
    },
  })
  .regex(keyRegex)
  .nonempty();

export const formSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("boolean"),
    name: z.string().min(1),
    key: keySchema,
    description: z.string().optional(),
    resetPeriod: resetPeriodSchema,
    createAnother: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("metered"),
    name: z.string().min(1),
    key: keySchema,
    description: z.string().optional(),
    quota: z.coerce.number().min(0),
    resetPeriod: resetPeriodSchema,
    createAnother: z.boolean().optional(),
  }),
]);
