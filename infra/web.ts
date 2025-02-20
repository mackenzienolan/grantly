import { apiRouter } from "./api";
import { CLERK_SECRET_KEY, PUBLIC_CLERK_PUBLISHABLE_KEY } from "./secrets";

export const www = new sst.aws.Nextjs("www", {
  path: "packages/www",
  dev: {
    url: "http://localhost:3000",
  },
  environment: {
    CLERK_SECRET_KEY: CLERK_SECRET_KEY.value,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: PUBLIC_CLERK_PUBLISHABLE_KEY.value,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up",
  },
  link: [CLERK_SECRET_KEY, apiRouter],
});
