import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import index from "./routes";
import features from "./routes/features/features.index";
import integrations from "./routes/integrations/integrations.index";
import products from "./routes/products/products.index";
import users from "./routes/users/users.index";
import webhooks from "./routes/webhooks/webhooks.index";
import keys from "./routes/keys/keys.index";

const app = createApp();
configureOpenAPI(app);

const routes = [
  index,
  webhooks,
  users,
  features,
  products,
  integrations,
  keys,
] as const;

routes.forEach((r) => {
  app.route("/", r);
});

export type AppType = (typeof routes)[number];

export default app;
