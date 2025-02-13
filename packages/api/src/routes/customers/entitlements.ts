import { Hono } from "hono";

const entitlements = new Hono();

entitlements.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  // const entitlements = await db.query.entitlementsTable.findMany({
  //   where: (enti, { eq }) => eq(),
  // });

  // if (!entitlements) {
  //   return c.json({ error: "Entitlements not found" }, 404);
  // }

  return c.json({ id });
  // return c.json(entitlements);
});

entitlements.get("/:id/features", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});

export default entitlements;
