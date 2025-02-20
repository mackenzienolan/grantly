import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import index from "./routes";
import features from "./routes/features/features.index";
import users from "./routes/users/users.index";
import webhooks from "./routes/webhooks/webhooks.index";

const app = createApp();
configureOpenAPI(app);

const routes = [index, webhooks, users, features] as const;

routes.forEach((r) => {
  app.route("/", r);
});

export type AppType = (typeof routes)[number];

export default app;
