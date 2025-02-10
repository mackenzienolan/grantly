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
    await import("./infra/secrets");
    await import("./infra/db");
    await import("./infra/auth");
    const { www } = await import("./infra/web");

    return {
      www: www.url,
    };
  },
});
