import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Keys"];

export const createKey = createRoute({
  path: "/keys",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          key: z.string(),
        }),
      }),
      "Key created"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Internal server error"
    ),
  },
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            type: z.enum(["api_key", "publishable_key"]),
            description: z.string(),
          }),
        },
      },
    },
  },
});

export const listKeys = createRoute({
  path: "/keys",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          keys: z.array(
            z.object({
              id: z.number(),
              type: z.enum(["api_key", "publishable_key"]),
              description: z.string(),
              key: z.string().optional(),
              createdAt: z.string().datetime(),
            })
          ),
        }),
      }),
      "Keys listed"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Internal server error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
  },
});

export const deleteKeys = createRoute({
  path: "/keys",
  method: "delete",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            ids: z.array(z.number()),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Keys deleted"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Internal server error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
  },
});

export const deleteKey = createRoute({
  path: "/keys/{id}",
  method: "delete",
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
      }),
      "Key deleted"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Internal server error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
  },
});

export const rotateKey = createRoute({
  path: "/keys/{id}/rotate",
  method: "post",
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
          key: z.string(),
        }),
      }),
      "Key rotated"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Key not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Unauthorized"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Internal server error"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Bad request"
    ),
  },
});

export type RotateKeyRoute = typeof rotateKey;
export type DeleteKeyRoute = typeof deleteKey;
export type ListKeysRoute = typeof listKeys;
export type CreateKeyRoute = typeof createKey;
export type DeleteKeysRoute = typeof deleteKeys;
