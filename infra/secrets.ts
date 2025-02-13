export const GITHUB_CLIENT_ID = new sst.Secret(
  "GITHUB_CLIENT_ID",
  "Ov23li0IIlE37gy28y1u"
);
export const GITHUB_CLIENT_SECRET = new sst.Secret("GITHUB_CLIENT_SECRET");

export const CLERK_PUBLISHABLE_KEY = new sst.Secret(
  "CLERK_PUBLISHABLE_KEY",
  $app.stage === "main"
    ? "pk_test_aW50ZW5zZS1iYXQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"
    : "pk_test_aW50ZW5zZS1iYXQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"
);

export const CLERK_SECRET_KEY = new sst.Secret("CLERK_SECRET_KEY");
export const CLERK_WEBHOOK_SECRET = new sst.Secret("CLERK_WEBHOOK_SECRET");

export const API_SECRETS = [
  CLERK_SECRET_KEY,
  CLERK_WEBHOOK_SECRET,
  CLERK_PUBLISHABLE_KEY,
];
