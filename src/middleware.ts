import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies.get("access_token")?.value || "";
  const userRole = request.cookies.get("user_role")?.value || "";

  // Redirect to login if accessing protected route without authentication
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to login if accessing dashboard without proper role
  if (
    path.startsWith("/dashboard") &&
    userRole !== "Dosen" &&
    userRole !== "Asisten Dosen" &&
    userRole !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
