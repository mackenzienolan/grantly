import { featuresTable } from "@grantly/db";
import { createRoute, z } from "@hono/zod-openapi";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { bearerTokenSchema } from "../../schemas/auth";

const tags = ["Entitled"];

export const getEntitled = createRoute({
  path: "/entitled",
  method: "get",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            customer_id: z.string(),
            feature_key: z.string(),
          }),
        },
      },
    },
    headers: z.object({
      Authorization: bearerTokenSchema,
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        entitled: z.boolean(),
        data: z.discriminatedUnion("type", [
          z.object({
            type: z.literal("metered"),
            customer_id: z.string(),
            feature_key: z.string(),
            quota: z.number(),
            quota_used: z.number(),
            quota_remaining: z.number(),
            resets_at: z.date(),
          }),
          z.object({
            type: z.literal("boolean"),
            customer_id: z.string(),
            feature_key: z.string(),
          }),
        ]),
      }),
      "Feature entitled check"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "Bad request"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Entitlement not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({ message: z.string() }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Internal server error"
    ),
  },
});

export type GetEntitledRoute = typeof getEntitled;
