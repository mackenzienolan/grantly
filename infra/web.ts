import { CLERK_SECRET_KEY, PUBLIC_CLERK_PUBLISHABLE_KEY } from "./secrets";

export const www = new sst.aws.Astro("www", {
  path: "packages/www",
  dev: {
    url: "http://localhost:4321",
  },
  environment: {
    CLERK_SECRET_KEY: CLERK_SECRET_KEY.value,
    PUBLIC_CLERK_PUBLISHABLE_KEY: PUBLIC_CLERK_PUBLISHABLE_KEY.value,
    PUBLIC_CLERK_SIGN_IN_URL: "/auth/sign-in",
    PUBLIC_CLERK_SIGN_UP_URL: "/auth/sign-up",
  },
  link: [CLERK_SECRET_KEY],
  // domain: $app.stage === "main" ? "grantlyapp.com" : null,
});

export const www2 = new sst.aws.SvelteKit("www2", {
  path: "packages/www2",
  dev: {
    url: "http://localhost:5173",
  },
  environment: {
    CLERK_SECRET_KEY: CLERK_SECRET_KEY.value,
    PUBLIC_CLERK_PUBLISHABLE_KEY: PUBLIC_CLERK_PUBLISHABLE_KEY.value,
    PUBLIC_CLERK_SIGN_IN_URL: "/auth/sign-in",
    PUBLIC_CLERK_SIGN_UP_URL: "/auth/sign-up",
  },
  link: [CLERK_SECRET_KEY],
});
