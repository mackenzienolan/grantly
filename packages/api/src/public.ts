import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import meteredEvents from "./routes/meter_events/meter_events.index";
import entitled from "./routes/entitled/entitled.index";

const app = createApp();
configureOpenAPI(app);

const routes = [meteredEvents, entitled] as const;

routes.forEach((r) => {
  app.route("/", r);
});

export type AppType = (typeof routes)[number];

export default app;
