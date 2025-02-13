export const www = new sst.aws.Astro("www", {
  path: "packages/www",
  dev: {
    url: "http://localhost:4321",
  },
  // domain: $app.stage === "main" ? "grantlyapp.com" : null,
});
