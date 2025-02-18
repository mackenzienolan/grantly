import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

function createOrgSelectionUrl(req: NextRequest, redirectUrl: string) {
  const searchParams = new URLSearchParams({ redirectUrl });
  return new URL(`/org-selection?${searchParams.toString()}`, req.url);
}

function handleOrgSelection(
  userId: string | null,
  orgId: string | null | undefined,
  req: NextRequest
) {
  if (userId && !orgId && req.nextUrl.pathname !== "/org-selection") {
    return NextResponse.redirect(createOrgSelectionUrl(req, req.url));
  }
  return null;
}

// function handleOnboarding(
//   userId: string | null,
//   orgId: string | null | undefined,
//   sessionClaims:
//     | Awaited<ReturnType<ClerkMiddlewareAuth>>["sessionClaims"]
//     | null,
//   req: NextRequest
// ) {
//   if (
//     userId &&
//     orgId &&
//     req.nextUrl.pathname !== "/org-selection" &&
//     !sessionClaims?.org_metadata?.onboarding_complete &&
//     !isOnboardingRoute(req)
//   ) {
//     return NextResponse.redirect(createOnboardingUrl(req));
//   }
//   return null;
// }

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // Handle organization selection
  const orgSelectionResponse = handleOrgSelection(userId, orgId, req);
  if (orgSelectionResponse) return orgSelectionResponse;

  // Handle protected routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
