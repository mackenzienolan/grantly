import { Hono } from "hono";

const oauth = new Hono();

oauth.get("/callback", async (c) => {
  const { code } = c.req.query();
  return c.json({
    success: true,
  });
});

export default oauth;
