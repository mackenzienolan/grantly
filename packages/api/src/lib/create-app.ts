import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
// import { defaultHook } from "stoker/openapi";
import { pinoLogger } from "../middleware/pino-logger";

import { clerkMiddleware } from "@hono/clerk-auth";
import { Resource } from "sst";
import type { AppBindings, AppOpenAPI } from "./types.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        c.var.logger.error(result.error);
        return c.json(
          {
            ok: false,
            errors: result.error,
            source: "custom_error_handler",
          },
          422
        );
      }
    },
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(
    "*",
    clerkMiddleware({
      secretKey: Resource.CLERK_SECRET_KEY.value,
      publishableKey: Resource.CLERK_PUBLISHABLE_KEY.value,
    })
  );
  app.use(serveEmojiFavicon("📝"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
