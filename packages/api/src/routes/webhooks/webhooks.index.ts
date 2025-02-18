import { createRouter } from "@/lib/create-app";

import * as handlers from "./webhooks.handlers";
import * as routes from "./webhooks.routes";

const router = createRouter().openapi(routes.clerk, handlers.clerk);

export default router;
