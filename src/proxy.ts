import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

import { Jwt } from "@/server/configs/jwt.config";

const publicPaths = ["/login", "/register", "/reset", "/new"];
const apiAuthPaths = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/logout",
  "/api/v1/auth/verify",
  "/api/v1/auth/reset",
  "/api/v1/auth/send_email_reset",
];

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const currentPath = request.nextUrl.pathname;

  if (currentPath.includes("/api")) {
    if (apiAuthPaths.includes(currentPath)) {
      return NextResponse.next();
    }

    const authorizationToken =
      request.headers.get("authorization") ?? (await cookies()).get("token")?.value ?? "";

    if (!authorizationToken) {
      return NextResponse.json(
        { error: "You need an authorization token, for that you must log in." },
        { status: 401 }
      );
    }

    const jwt = new Jwt();
    jwt.config = { token: authorizationToken };
    const validToken = await jwt.verifyJWT();

    if (!validToken) {
      return NextResponse.json({ error: "The token is not valid" }, { status: 401 });
    }

    const newHeaders = new Headers(request.headers);
    newHeaders.set("payload", JSON.stringify(validToken.payload));
    return NextResponse.next({ headers: newHeaders });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const jwt = new Jwt();
  jwt.config = { token: token?.value ?? "" };
  const validToken = await jwt.verifyJWT();

  if (!validToken && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (validToken && publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.webmanifest$).*)"],
};
