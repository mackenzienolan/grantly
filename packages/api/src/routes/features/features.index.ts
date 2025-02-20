import { createRouter } from "../../lib/create-app";

import * as handlers from "./features.handlers";
import * as routes from "./features.routes";

const router = createRouter().openapi(
  routes.featuresList,
  handlers.featuresList
);

export default router;
