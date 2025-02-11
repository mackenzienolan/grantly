export const auth = new sst.aws.Auth("auth", {
  issuer: {
    handler: "packages/functions/src/auth/index.handler",
    runtime: "nodejs22.x",
  },
});
