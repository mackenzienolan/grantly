/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "grantly",
      providers: {
        aws: {
          profile: input.stage === "prod" ? "grantly-prod" : "grantly-dev",
          region: "us-east-2",
        },
        "@upstash/pulumi": "0.3.14",
      },
      removal: input.stage === "prod" ? "retain" : "remove",
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
