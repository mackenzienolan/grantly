import { integrationsTable } from "@grantly/db";
import { Resource } from "sst";

import Stripe from "stripe";

export async function refreshStripeAccessToken(refreshToken: string, clientSecret: string) {
  const stripe = new Stripe(clientSecret);

  return stripe.oauth.token({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

export async function refreshStripeIntegration(integration: typeof integrationsTable.$inferSelect) {
  // if (
  //   DateTime.now().minus({ minutes: 1 }) > DateTime.fromJSDate(integration.accessTokenExpiresAt)
  // ) {
  //   return {
  //     access_token: integration.accessToken,
  //   } satisfies Stripe.OAuthToken;
  // }

  console.log("refreshing stripe integration", integration.refreshToken);
  const tokens = await refreshStripeAccessToken(
    integration.refreshToken,
    Resource.STRIPE_OAUTH_SECRET_KEY.value
  );

  return tokens;
}
