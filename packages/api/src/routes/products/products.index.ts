import { createRouter } from "../../lib/create-app";

import * as handlers from "./products.handlers";
import * as routes from "./products.routes";

const router = createRouter().openapi(
  routes.productsList,
  handlers.productsList
);

export default router;
