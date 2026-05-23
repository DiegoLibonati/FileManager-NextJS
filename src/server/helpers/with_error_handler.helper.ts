import { NextResponse } from "next/server";

import { logger } from "@/server/configs/logger.config";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";

export const withErrorHandler = <Args extends unknown[]>(
  ctx: string,
  fn: (...args: Args) => Promise<NextResponse>
): ((...args: Args) => Promise<NextResponse>) => {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      return await fn(...args);
    } catch (e) {
      const { status, code, message } = getExceptionMessage(e);

      if (status >= 500) {
        logger.error({ err: e, ctx }, e instanceof Error ? e.message : "Unknown error");
      }

      return NextResponse.json({ code, message }, { status });
    }
  };
};
