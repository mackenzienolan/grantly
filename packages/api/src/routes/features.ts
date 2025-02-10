import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const features = new Hono();

features.get("/", (c) => {
  return c.text("Hello Hono!");
});

features.post("/", zValidator("form", z.object({})), (c) => {
  return c.text("Hello Hono!");
});

export default features;
