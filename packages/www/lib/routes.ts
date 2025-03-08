const routes = {
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  www: {
    root: "/",
    features: "/features",
    pricing: "/pricing",
    contact: "/contact",
    testimonials: "/testimonials",
    about: "/about",
    terms: "/terms",
    privacy: "/privacy",
  },
  app: {
    dashboard: {
      root: "/app",
    },
    features: {
      root: "/app/features",
      create: "/app/features/create",
      view: (id: string) => `/app/features/${id}`,
    },
    products: {
      root: "/app/products",
    },
    settings: {
      general: "/app/settings/general",
      team: "/app/settings/team",
      billing: "/app/settings/billing",
      limits: "/app/settings/limits",
      apiKeys: "/app/settings/api-keys",
      stripe: "/app/settings/stripe",
    },
  },
} as const;

export default routes;
