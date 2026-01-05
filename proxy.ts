import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authSessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  const url = request.nextUrl;
  const protectedRoutes = ["/dashboard", "/dashboard/"];

  // If unauthenticated then redirects to "/" on visitng protected routes
  if (
    !authSessionToken &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", url));
  }

  // If authenticated then redirects to "/dashboard" on visting auth route
  if (authSessionToken && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard", "/dashboard/:id"],
};
