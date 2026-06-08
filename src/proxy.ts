import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  const isHome = path === "/";

  const isPublicPath =
    isHome ||
    path.startsWith("/events") ||
    path.startsWith("/login") ||
    path.startsWith("/success") ||
    path.startsWith("/checkout");

  const isProtectedPath = path.startsWith("/dashboard");

  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && path.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Proteger /admin solo para staff
  if (path.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const payload = JSON.parse(atob(token!.split(".")[1]));
      if (!payload.is_staff && !payload.is_superuser) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};