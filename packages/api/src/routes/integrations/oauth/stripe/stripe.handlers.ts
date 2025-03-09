import { db, integrationsTable } from "@grantly/db";
import events from "@grantly/events/core";
import { getAuth } from "@hono/clerk-auth";
import { DateTime } from "luxon";
import { Resource } from "sst";
import { bus } from "sst/aws/bus";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import Stripe from "stripe";
import type { AppRouteHandler } from "../../../../lib/types";
import type { StripeOauthCreateRoute } from "./stripe.routes";

const stripe = new Stripe(Resource.STRIPE_OAUTH_SECRET_KEY.value);

export const stripeOauthCreate: AppRouteHandler<StripeOauthCreateRoute> = async (c) => {
  const { code } = c.req.valid("query");
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

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
      teamId: orgId,
    } satisfies typeof integrationsTable.$inferInsert;
    const [integrationRes] = await db.insert(integrationsTable).values(insert).returning();

    await bus.publish(Resource.bus, events["integration.created"], integrationRes);

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
