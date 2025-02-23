/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "grantly",
      providers: {
        aws: {
          profile: "grantly-prod", // input.stage === "prod" ? "grantly-prod" : "grantly-dev",
        },
        "@upstash/pulumi": "0.3.14",
      },
      removal: input?.stage === "main" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/secrets");
    await import("./infra/bus");
    const { www } = await import("./infra/web");
    await import("./infra/db");
    const { apiRouter } = await import("./infra/api");
    await import("./infra/redis");
    return {
      www: www.url,
      api: apiRouter.url,
    };
  },
});
