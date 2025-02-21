import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { bearerTokenSchema } from "../../schemas/auth";

const tags = ["Meter Events"];

export const createMeterEvent = createRoute({
  path: "/meter_events",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            customer_id: z.string(),
            feature_key: z.string(),
            event_type: z.enum(["increment", "decrement"]),
            amount: z.number(),
            event_id: z.string().optional(),
          }),
        },
      },
    },
    headers: z.object({
      Authorization: bearerTokenSchema,
    }),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(z.any(), "Meter event created"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "Bad request"
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

export type CreateMeterEventRoute = typeof createMeterEvent;
