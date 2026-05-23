// Proxy runs in the Edge runtime — pino is Node-only and cannot be imported here.
// Security events (auth, CSRF, rate-limit) log via console.warn; Vercel and Docker stdout collectors ingest these lines.
/* eslint-disable no-console */
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { RateBucket } from "@/types/api";

import { Jwt } from "@/server/configs/jwt.config";

import { CODES_ERROR } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR } from "@/server/constants/messages.constant";
import { COOKIE_NAME } from "@/server/constants/vars.constant";

const publicPages = ["/login", "/register", "/reset", "/new"];
const publicApiPrefixes = ["/api/v1/auth/", "/api/v1/health/", "/api/v1/alive"];
const protectedApiPrefix = "/api/v1/";
const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);
const rateLimitedPaths = ["/api/v1/auth/login"];
const rateBuckets = new Map<string, RateBucket>();
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 0;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(key: string): { ok: boolean; retryAfter: number } {
  if (RATE_LIMIT_MAX <= 0) return { ok: true, retryAfter: 0 };

  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    if (rateBuckets.size > 10_000) {
      for (const [k, b] of rateBuckets) {
        if (b.resetAt <= now) rateBuckets.delete(k);
      }
    }
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;

  const expectedHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!expectedHost) return false;

  try {
    const originHost = new URL(origin).host;
    return originHost === expectedHost;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  if (!safeMethods.has(method) && pathname.startsWith("/api/") && !isSameOrigin(req)) {
    console.warn("proxy.csrf: rejected cross-origin request", { path: pathname, method });
    return NextResponse.json(
      { code: CODES_ERROR.forbidden, message: MESSAGES_ERROR.forbidden },
      { status: 403 }
    );
  }

  if (method === "POST" && rateLimitedPaths.includes(pathname)) {
    const ip = getClientIp(req);
    const { ok, retryAfter } = checkRateLimit(`${pathname}:${ip}`);
    if (!ok) {
      console.warn("proxy.ratelimit: rejected", { path: pathname, ip, retryAfter });
      return NextResponse.json(
        { code: CODES_ERROR.rateLimit, message: MESSAGES_ERROR.rateLimit },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }
  }

  if (pathname.startsWith("/api/")) {
    const isPublicApi = publicApiPrefixes.some((prefix) => pathname.startsWith(prefix));
    if (isPublicApi) return NextResponse.next();

    if (pathname.startsWith(protectedApiPrefix)) {
      const authHeader = req.headers.get("authorization");
      const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
      const cookieToken = req.cookies.get(COOKIE_NAME)?.value ?? null;
      const token = headerToken ?? cookieToken;

      if (!token) {
        return NextResponse.json(
          { code: CODES_ERROR.unauthorized, message: MESSAGES_ERROR.unauthorized },
          { status: 401 }
        );
      }

      const result = await new Jwt({ token }).verifyJWT();
      if (!result) {
        console.warn("proxy.auth: token rejected", { path: pathname });
        return NextResponse.json(
          { code: CODES_ERROR.unauthorized, message: MESSAGES_ERROR.unauthorized },
          { status: 401 }
        );
      }

      const newHeaders = new Headers(req.headers);
      newHeaders.set("payload", JSON.stringify(result.payload));
      return NextResponse.next({ headers: newHeaders });
    }

    return NextResponse.next();
  }

  const cookieToken = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const validToken = cookieToken ? await new Jwt({ token: cookieToken }).verifyJWT() : false;

  if (!validToken && !publicPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (validToken && publicPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
  ],
};
