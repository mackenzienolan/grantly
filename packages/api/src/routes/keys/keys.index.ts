import { createRouter } from "../../lib/create-app";
import * as handlers from "./keys.handlers";
import * as routes from "./keys.routes";

const router = createRouter()
  .openapi(routes.createKey, handlers.createKey)
  .openapi(routes.listKeys, handlers.listKeys)
  .openapi(routes.deleteKey, handlers.deleteKey)
  .openapi(routes.rotateKey, handlers.rotateKey);

export default router;
