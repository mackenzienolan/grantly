import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { Resource } from "sst";
import customers from "./routes/customers";
import features from "./routes/features";
import oauth from "./routes/oauth";
import stripe from "./routes/stripe";
import webhooks from "./routes/webhooks";

const app = new Hono().basePath("/api");

app.use(
  "*",
  clerkMiddleware({
    secretKey: Resource.CLERK_SECRET_KEY.value,
    publishableKey: Resource.CLERK_PUBLISHABLE_KEY.value,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test", (c) => {
  return c.text("Hello Hono!");
});

app.route("/webhooks", webhooks);
app.route("/oauth", oauth);
app.route("/stripe", stripe);
app.route("/customers", customers);
app.route("/features", features);

export default app;
