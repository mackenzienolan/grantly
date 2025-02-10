export const auth = new sst.aws.Auth("auth", {
  issuer: "packages/functions/src/auth/index.handler",
});
