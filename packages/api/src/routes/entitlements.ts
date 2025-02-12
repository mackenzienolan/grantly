import { Hono } from "hono";

const entitlements = new Hono();

entitlements.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});
