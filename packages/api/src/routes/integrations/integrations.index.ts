import { createRouter } from "../../lib/create-app";
import * as handlers from "./integrations.handlers";
import * as routes from "./integrations.routes";
import oauthRouter from "./oauth/oauth.index";

const router = createRouter()
  .openapi(routes.integrationsList, handlers.integrationsList)
  .openapi(routes.integrationsRetrieve, handlers.integrationRetrieve)
  // .openapi(
  //   oauthStripeRoutes.stripeOauthCreate,
  //   oauthStripeHandlers.stripeOauthCreate
  // )
  .route("/", oauthRouter);
// .route("/test", oauthStripeRouter);

export default router;
