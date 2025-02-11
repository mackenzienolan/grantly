import { Hono } from "hono";

const oauth = new Hono();

oauth.get("/", (c) => {
  return c.json({ message: "Hello, world!" });
});

export default oauth;
