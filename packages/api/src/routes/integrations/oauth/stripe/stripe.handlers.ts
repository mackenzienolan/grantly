import type { AppRouteHandler } from "../../../../lib/types";

import { db, integrationsTable } from "@grantly/db";
import { DateTime } from "luxon";
import { Resource } from "sst";
import * as HttpStatusCodes from "stoker/http-status-codes";
import Stripe from "stripe";
import type { StripeOauthCreateRoute } from "./stripe.routes";

const stripe = new Stripe(Resource.STRIPE_SECRET_KEY.value);

export const stripeOauthCreate: AppRouteHandler<
  StripeOauthCreateRoute
> = async (c) => {
  const { code } = c.req.valid("query");

  try {
    const token = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    if (!token.refresh_token) {
      c.var.logger.error({ token }, "No refresh token");
      return c.json(
        {
          message: "No refresh token",
        },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    const insert = {
      type: "stripe",
      accessToken: token.access_token,
      accessTokenExpiresAt: DateTime.now().plus({ hours: 1 }).toJSDate(),
      refreshToken: token.refresh_token,
      refreshTokenExpiresAt: DateTime.now().plus({ year: 1 }).toJSDate(),
      _raw: token,
      status: "active",
    } satisfies typeof integrationsTable.$inferInsert;
    await db.insert(integrationsTable).values(insert);

    return c.json(
      {
        message: "Stripe OAuth created",
      },
      HttpStatusCodes.OK
    );
  } catch (err) {
    if (err instanceof Error) {
      c.var.logger.error({ err: err.message }, "Error creating stripe oauth");
      return c.json(
        {
          message: err.message,
        },
        HttpStatusCodes.BAD_REQUEST
      );
    }
    c.var.logger.error(err);
    return c.json(
      {
        message: "Internal server error",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
