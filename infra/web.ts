import { apiRouter } from './api';
import { CLERK_SECRET_KEY, PUBLIC_CLERK_PUBLISHABLE_KEY, STRIPE_OAUTH_URL } from './secrets';

export const NEXT_PUBLIC_API_URL = new sst.Secret('NEXT_PUBLIC_API_URL', apiRouter.url);

export const www = new sst.aws.Nextjs('www', {
  path: 'packages/www',
  dev: {
    url: 'http://localhost:3000',
  },
  environment: {
    CLERK_SECRET_KEY: CLERK_SECRET_KEY.value,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: PUBLIC_CLERK_PUBLISHABLE_KEY.value,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_API_URL: NEXT_PUBLIC_API_URL.value,
    NEXT_PUBLIC_STRIPE_OAUTH_URL: STRIPE_OAUTH_URL.value,
  },
  link: [CLERK_SECRET_KEY, apiRouter, NEXT_PUBLIC_API_URL, STRIPE_OAUTH_URL],
});
