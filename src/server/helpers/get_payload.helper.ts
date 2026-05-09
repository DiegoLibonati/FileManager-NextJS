import type { NextRequest } from "next/server";

export const getPayload = (req: NextRequest): unknown =>
  JSON.parse(req.headers.get("payload") ?? "{}") as unknown;
