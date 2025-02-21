import { createRouter } from "../../lib/create-app";

import * as handlers from "./meter_events.handlers";
import * as routes from "./meter_events.routes";

const router = createRouter().openapi(
  routes.createMeterEvent,
  handlers.createMeterEvent
);

export default router;
