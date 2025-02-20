import { OrganizationMembershipJSONSchema } from "@macknolandev/clerk-zod";
import { z } from "zod";

export const TeamMembersSchema = z.object({
  id: z.string(),
  role: z.string(),
  _clerkRaw: OrganizationMembershipJSONSchema,
  teamId: z.string().nullish(),
  userId: z.number().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
