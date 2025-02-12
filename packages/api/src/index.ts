import { Hono } from "hono";
import customers from "./routes/customers";
import features from "./routes/features";
import oauth from "./routes/oauth";
import stripe from "./routes/stripe";
const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test", (c) => {
  return c.text("Hello Hono!");
});

app.route("/oauth", oauth);
app.route("/stripe", stripe);
app.route("/customers", customers);
app.route("/features", features);

export default app;
