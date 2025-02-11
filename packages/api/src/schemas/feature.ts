import { featuresTable } from "@grantly/db";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const FeatureCreate = createInsertSchema(featuresTable);
export const FeatureUpdate = createSelectSchema(featuresTable)
  .partial()
  .extend({
    id: z.undefined(),
    createdAt: z.undefined(),
    updatedAt: z.undefined(),
  });
export const Feature = createSelectSchema(featuresTable);
