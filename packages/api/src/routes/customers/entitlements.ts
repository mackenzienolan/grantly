import { Hono } from "hono";

const entitlements = new Hono();

entitlements.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});

entitlements.get("/:id/features", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});

export default entitlements;
