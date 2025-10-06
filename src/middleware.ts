import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const adminAllowedRoutes = ["/dashboard"];

const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const isAdmin = session?.user?.role === "ADMIN";
  const isAuthenticated = !!session?.user;

  if (
    isAdmin &&
    !adminAllowedRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
