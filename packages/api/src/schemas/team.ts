import { OrganizationJSONSchema } from "@macknolandev/clerk-zod";
import { z } from "zod";

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  ownerId: z.number().nullish(),
  onboardingComplete: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _clerkRaw: OrganizationJSONSchema,
  deletedAt: z.date().nullish(),
});
