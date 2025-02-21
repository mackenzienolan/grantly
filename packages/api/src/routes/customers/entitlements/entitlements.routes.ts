import { customersTable, entitlementsTable, featuresTable } from "@grantly/db";
import { createRoute, z } from "@hono/zod-openapi";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Features"];

export const listEntitlements = createRoute({
  path: "/customers/{id}/entitlements",
  method: "get",
  tags,
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          entitlements: z.array(createSelectSchema(entitlementsTable)),
        }),
      }),
      "Customers entitlements list"
    ),
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

export const getEntitlement = createRoute({
  path: "/customers/{id}/entitlements/{entitlementId}",
  method: "get",
  tags,
  request: {
    params: z.object({
      id: z.string(),
      entitlementId: z.coerce.number(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          entitlement: z.any(),
        }),
      }),
      "Customer entitlement"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Customer entitlement not found"
    ),
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

export type ListEntitlementsRoute = typeof listEntitlements;
export type GetEntitlementRoute = typeof getEntitlement;
