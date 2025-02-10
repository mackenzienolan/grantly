import { Hono } from "hono";

const customers = new Hono();

customers.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});

export default customers;
