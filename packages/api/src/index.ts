import { Hono } from "hono";
import customers from "./routes/customers";
import features from "./routes/features";
import oauth from "./routes/oauth";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/oauth", oauth);
app.route("/customers", customers);
app.route("/features", features);

export default app;
