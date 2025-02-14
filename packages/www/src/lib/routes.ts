export const routes = {
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  app: {
    dashboard: "/app/dashboard",
    orgSelection: "/app/org-selection",
    onboarding: "/app/onboarding",
    features: {
      home: "/app/features",
    },
    settings: {
      notifications: "/app/settings/notifications",
      integrations: "/app/settings/integrations",
      billing: "/app/settings/billing",
      team: "/app/settings/team",
    },
  },
} as const;
