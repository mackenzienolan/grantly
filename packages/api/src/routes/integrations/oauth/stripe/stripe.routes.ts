import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { bearerTokenSchema } from '../../../../schemas/auth';

const tags = ['Integrations', 'OAuth', 'Stripe'];

export const stripeOauthCreate = createRoute({
  path: '/integrations/oauth/stripe',
  method: 'post',
  tags,
  request: {
    query: z.object({
      code: z.string(),
    }),
    headers: z.object({
      Authorization: bearerTokenSchema,
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string(),
      }),
      'Stripe OAuth created'
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

export type StripeOauthCreateRoute = typeof stripeOauthCreate;
