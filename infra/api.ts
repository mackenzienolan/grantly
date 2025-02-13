import { bus } from "./bus";
import { postgres } from "./db";
import { API_SECRETS } from "./secrets";

export const apiFn = new sst.aws.Function("api", {
  url: true,
  handler: "packages/functions/src/api/index.handler",
  runtime: "nodejs22.x",
  link: [postgres, bus, ...API_SECRETS],
});

export const apiRouter = new sst.aws.Router("apiRouter", {
  routes: {
    "/*": apiFn.url,
  },
  // domain: $app.stage === "main" ? "api.grantlyapp.com" : null,
});
