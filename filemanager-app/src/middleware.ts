import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Jwt } from "./libs/jwt";

const publicPaths = ["/login", "/register"];
const apiAuthPaths = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/logout",
];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const jwt = new Jwt();

  // NOTE: MIDDLEWARE API
  if (apiAuthPaths.includes(currentPath) && currentPath.includes("/api")) {
    return NextResponse.next();
  }

  if (!apiAuthPaths.includes(currentPath) && currentPath.includes("/api")) {
    const authorizationToken = request.headers.get("authorization");

    if (!authorizationToken) {
      return NextResponse.json(
        {
          error: "You need an authorization token, for that you must log in.",
        },
        { status: 400 }
      );
    }

    jwt.config = {
      token: authorizationToken,
    };

    const validToken = await jwt.verifyJWT();

    if (!validToken) {
      return NextResponse.json(
        {
          error: "The token is not valid",
        },
        { status: 400 }
      );
    }

    const newHeaders = new Headers(request.headers);
    newHeaders.set("payload", JSON.stringify(validToken.payload));

    return NextResponse.next({ headers: newHeaders });
  }

  // NOTE: MIDDLEWARE PROTECTED ROUTES
  const token = cookies().get("token");

  jwt.config = {
    token: token?.value,
  };

  const validToken = await jwt.verifyJWT();

  if (!validToken && !publicPaths.includes(currentPath)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (validToken && publicPaths.includes(currentPath)) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$|.*\\.ico).*)"],
};
