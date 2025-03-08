import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

const tags = ['Integrations'];

const integrationSelectSchema = z.object({
  id: z.number(),
});

export const integrationsRetrieve = createRoute({
  path: '/integrations/{id}',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        // data: z.object({
        //   integration: integrationSelectSchema,
        // }),
      }),
      'Integration retrieved'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Integration not found'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Bad request'
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Unauthorized'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Internal server error'
    ),
  },
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
});

export type IntegrationsRetrieveRoute = typeof integrationsRetrieve;

export const integrationsList = createRoute({
  path: '/integrations',
  method: 'get',
  tags,
  request: {
    query: z.object({
      type: z.enum(['stripe']).optional(),
      status: z.enum(['active', 'inactive']).optional(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
        data: z.object({
          integrations: z.array(integrationSelectSchema),
        }),
      }),
      'Integrations list'
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Bad request'
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Unauthorized'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Internal server error'
    ),
  },
});

export type IntegrationsListRoute = typeof integrationsList;
