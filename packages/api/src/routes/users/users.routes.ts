import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { TeamSchema } from "../../schemas/team";
import { TeamMembersSchema } from "../../schemas/teamMembers";

const tags = ["Users"];

const userMembershipSchema = TeamMembersSchema.extend({
  team: TeamSchema.nullish(),
});

export const userTeams = createRoute({
  path: "/users/{id}/memberships",
  method: "get",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          memberships: z.array(userMembershipSchema),
        }),
      }),
      "User memberships"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Forbidden"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unprocessable entity"
    ),
  },
});

export type UserTeamsRoute = typeof userTeams;
