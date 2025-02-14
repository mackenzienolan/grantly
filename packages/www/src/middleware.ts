import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

export const onRequest = clerkMiddleware((auth, ctx) => {
  const { redirectToSignIn, userId, orgId } = auth();
  if (isProtectedRoute(ctx.request) && !userId) {
    return redirectToSignIn();
  }

  if (
    isProtectedRoute(ctx.request) &&
    !orgId &&
    ctx.url.pathname !== "/app/org-selection"
  ) {
    return ctx.redirect("/app/org-selection");
  }
});
