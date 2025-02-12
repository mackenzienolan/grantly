/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "grantly",
      providers: {
        aws: {
          profile: input.stage === "main" ? "grantly-prod" : "grantly-dev",
        },
      },
      removal: input?.stage === "main" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const { www } = await import("./infra/web");
    await import("./infra/secrets");
    await import("./infra/db");
    await import("./infra/auth");
    const { apiRouter } = await import("./infra/api");

    return {
      www: www.url,
      api: apiRouter.url,
    };
  },
});
