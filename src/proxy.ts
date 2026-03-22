import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

async function resolveAdminToken(request: NextRequest, secret?: string) {
  if (!secret) {
    return null;
  }

  const cookieNames = [
    undefined,
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
    "__Host-next-auth.session-token",
  ];

  for (const secureCookie of [true, false]) {
    for (const cookieName of cookieNames) {
      const token = await getToken({
        req: request,
        secret,
        secureCookie,
        ...(cookieName ? { cookieName } : {}),
      });

      if (token) {
        return token;
      }
    }
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = await resolveAdminToken(request, secret);

    if (!token || token.role !== "ADMIN") {
      const signInUrl = new URL("/admin/login", request.url);
      signInUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
