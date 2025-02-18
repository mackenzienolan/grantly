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
    },
    products: {
      root: "/app/products",
    },
    settings: {
      general: "/app/settings/general",
      team: "/app/settings/team",
      billing: "/app/settings/billing",
      limits: "/app/settings/limits",
    },
  },
} as const;

export default routes;
