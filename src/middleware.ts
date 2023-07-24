import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { Role } from "@/types/user";
import { authRoutes, protectedRoutes } from "@/utils/routes";

export function middleware(request: NextRequest) {
  const currentUserToken = request.cookies.get("currentUserToken")?.value;
  const currentUserRole = request.cookies.get("currentUserRole")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUserToken) {
    request.cookies.delete("currentUserToken");
    const response = NextResponse.redirect(new URL("/log-in", request.url));
    response.cookies.delete("currentUserToken");

    return response;
  }

  if (request.nextUrl.pathname === "/" && currentUserRole === Role.admin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (request.nextUrl.pathname === "/admin" && currentUserRole === Role.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUserToken) {
    if (currentUserRole === Role.admin)
      return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }
}
