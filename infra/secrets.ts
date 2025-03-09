export const CLERK_PUBLISHABLE_KEY = new sst.Secret(
  "CLERK_PUBLISHABLE_KEY",
  $app.stage === "main"
    ? "pk_live_Y2xlcmsuZ3JhbnRseWFwcC5jb20k"
    : "pk_test_aW50ZW5zZS1iYXQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"
);

export const CLERK_SECRET_KEY = new sst.Secret("CLERK_SECRET_KEY");
export const CLERK_WEBHOOK_SECRET = new sst.Secret("CLERK_WEBHOOK_SECRET");

export const PUBLIC_CLERK_PUBLISHABLE_KEY = new sst.Secret(
  "PUBLIC_CLERK_PUBLISHABLE_KEY",
  $app.stage === "main"
    ? "pk_test_aW50ZW5zZS1iYXQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"
    : "pk_test_aW50ZW5zZS1iYXQtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"
);

export const STRIPE_SECRET_KEY = new sst.Secret("STRIPE_SECRET_KEY");

export const STRIPE_OAUTH_URL = new sst.Secret(
  "STRIPE_OAUTH_URL",
  $app.stage === "prod"
    ? "https://marketplace.stripe.com/oauth/v2/chnlink_61S6sjt9oBd6Q1VPW41P1VGm0UOnO9Si/authorize?client_id=ca_RrDC8YCXqfzSl3DM3DAuX1WWIEoUmsr7&redirect_uri=https://grantlyapp.com/oauth/stripe/callback"
    : "https://marketplace.stripe.com/oauth/v2/chnlink_61S6sjt9oBd6Q1VPW41P1VGm0UOnO9Si/authorize?client_id=ca_RrDCqUnAo14bCInRaIPpsCpKbacCZf5K&redirect_uri=https://porpoise-striking-whippet.ngrok-free.app/oauth/stripe/callback"
);

export const API_SECRETS = [
  CLERK_SECRET_KEY,
  CLERK_WEBHOOK_SECRET,
  CLERK_PUBLISHABLE_KEY,
  PUBLIC_CLERK_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
];
