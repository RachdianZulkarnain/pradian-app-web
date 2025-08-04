// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths restricted to admins only
const adminAllowedRoutes = ["/dashboard"];

// Public routes that should be hidden from authenticated users
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const isAdmin = session?.user?.role === "ADMIN";
  const isAuthenticated = !!session?.user;

  // ✅ Restrict admins from accessing anything outside /dashboard
  if (
    isAdmin &&
    !adminAllowedRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Restrict regular users from accessing /dashboard
  if (!isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Prevent logged-in users from accessing public pages (login/register)
  if (
    isAuthenticated &&
    publicRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(
      new URL(isAdmin ? "/dashboard" : "/", request.url),
    );
  }

  return NextResponse.next();
}

// ✅ Apply to all pages except static files, Next.js internals, and APIs
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
