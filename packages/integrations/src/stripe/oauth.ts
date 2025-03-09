import { integrationsTable } from "@grantly/db";
import { DateTime } from "luxon";
import { Resource } from "sst";

import Stripe from "stripe";

export async function refreshStripeAccessToken(refreshToken: string, clientSecret: string) {
  const stripe = new Stripe(clientSecret, {
    apiVersion: "2025-02-24.acacia",
  });

  return stripe.oauth.token({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

export async function refreshStripeIntegration(integration: typeof integrationsTable.$inferSelect) {
  if (
    DateTime.now().minus({ minutes: 1 }) > DateTime.fromJSDate(integration.accessTokenExpiresAt)
  ) {
    return {
      access_token: integration.accessToken,
    } satisfies Stripe.OAuthToken;
  }

  const tokens = await refreshStripeAccessToken(
    integration.refreshToken,
    Resource.STRIPE_SECRET_KEY.value
  );

  return tokens;
}
