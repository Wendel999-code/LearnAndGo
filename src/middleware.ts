import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher([
  "/student(.*)",
  "/admin(.*)",
  "/instructor(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  // Require auth only on private routes
  if (!isAuthenticated && isPrivateRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Force onboarding if incomplete
  if (
    isAuthenticated &&
    !sessionClaims?.metadata?.onboardingComplete &&
    !isOnboardingRoute(req)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Handle role-based access control
  if (isAuthenticated) {
    const role = sessionClaims?.metadata?.role;
    const path = req.nextUrl.pathname;

    // Allow access if role matches route
    if (
      (role === "ADMIN" && path.startsWith("/admin")) ||
      (role === "STUDENT" && path.startsWith("/student")) ||
      (role === "INSTRUCTOR" && path.startsWith("/instructor"))
    ) {
      return NextResponse.next();
    }

    // Redirect to their dashboard if they visit a mismatched route
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role === "STUDENT") {
      return NextResponse.redirect(new URL("/student", req.url));
    }
    if (role === "INSTRUCTOR") {
      return NextResponse.redirect(new URL("/instructor", req.url));
    }
  }

  // Public routes pass through
  return NextResponse.next();
});

// Apply middleware to everything except static assets
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
