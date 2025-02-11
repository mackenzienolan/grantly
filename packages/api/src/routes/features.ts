import { db, featuresTable } from "@grantly/db";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { FeatureCreate, FeatureUpdate } from "../schemas/feature";

const features = new Hono();

features.get("/", (c) => {
  return c.text("Hello Hono!");
});

features.post(
  "/",
  zValidator(
    "json",
    z.object({
      body: FeatureCreate,
    })
  ),
  async (c) => {
    const { body } = c.req.valid("json");
    const feature = await db.insert(featuresTable).values(body).returning();
    return c.json(feature, 201);
  }
);

features.get("/:id", async (c) => {
  const { id } = c.req.param();
  const feature = await db.query.featuresTable.findFirst({
    where: (ft, { eq }) => eq(ft.id, Number(id)),
  });
  if (!feature) {
    return c.json({ error: "Feature not found" }, 404);
  }
  return c.json(feature);
});

features.patch(
  "/:id",
  zValidator(
    "json",
    z.object({
      body: FeatureUpdate,
    })
  ),
  async (c) => {
    const { id } = c.req.param();
    const { body } = c.req.valid("json");
    const feature = await db
      .update(featuresTable)
      .set(body)
      .where(eq(featuresTable.id, Number(id)))
      .returning();
    return c.json(feature);
  }
);

export default features;
