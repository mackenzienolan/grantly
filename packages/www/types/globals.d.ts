export {};

declare global {
  interface CustomJwtSessionClaims {
    org_metadata: {
      onboarding_complete?: boolean;
    };
  }
}
