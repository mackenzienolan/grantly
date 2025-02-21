import { createRouter } from "../../lib/create-app";

import * as handlers from "./entitled.handlers";
import * as routes from "./entitled.routes";

const router = createRouter().openapi(routes.getEntitled, handlers.getEntitled);

export default router;
