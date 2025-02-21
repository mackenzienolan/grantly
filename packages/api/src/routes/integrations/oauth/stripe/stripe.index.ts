import { createRouter } from "../../../../lib/create-app";

import * as oauthStripeHandlers from "./stripe.handlers";
import * as oauthStripeRoutes from "./stripe.routes";

const router = createRouter().openapi(
  oauthStripeRoutes.stripeOauthCreate,
  oauthStripeHandlers.stripeOauthCreate
);

export default router;
