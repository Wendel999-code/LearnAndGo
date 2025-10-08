import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  // Handle public routes (sign-in, sign-up, etc.)
  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If authenticated but onboarding not complete → force onboarding
  if (
    isAuthenticated &&
    !sessionClaims?.metadata?.onboardingComplete &&
    !isOnboardingRoute(req)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Role-based redirection
  if (isAuthenticated) {
    const role = sessionClaims?.metadata?.role;

    if (role === Role.ADMIN && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next(); // ✅ Allow admin dashboard
    }

    if (role === Role.STUDENT && req.nextUrl.pathname.startsWith("/student")) {
      return NextResponse.next(); // ✅ Allow student dashboard
    }

    if (
      role === Role.INSTRUCTOR &&
      req.nextUrl.pathname.startsWith("/instructor")
    ) {
      return NextResponse.next(); // ✅ Allow instructor dashboard
    }

    //  If user role doesn’t match the route → redirect them
    if (role === Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (role === Role.STUDENT) {
      return NextResponse.redirect(new URL("/student", req.url));
    }

    if (role === Role.INSTRUCTOR) {
      return NextResponse.redirect(new URL("/instructor", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
