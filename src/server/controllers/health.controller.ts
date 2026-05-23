import { NextResponse } from "next/server";

import { logger } from "@/server/configs/logger.config";

import { HealthService } from "@/server/services/health.service";

import { withErrorHandler } from "@/server/helpers/with_error_handler.helper";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_SUCCESS } from "@/server/constants/messages.constant";

export const HealthController = {
  live: (): NextResponse => {
    return NextResponse.json(
      {
        code: CODES_SUCCESS.healthLive,
        message: MESSAGES_SUCCESS.healthLive,
      },
      { status: 200 }
    );
  },

  ready: withErrorHandler("HealthController.ready", async (): Promise<NextResponse> => {
    const deps = await HealthService.checkReadiness();

    if (!deps.db) {
      logger.warn({ deps }, "Readiness probe failed");
      return NextResponse.json(
        {
          code: CODES_ERROR.generic,
          message: MESSAGES_ERROR.generic,
          data: deps,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        code: CODES_SUCCESS.healthReady,
        message: MESSAGES_SUCCESS.healthReady,
        data: deps,
      },
      { status: 200 }
    );
  }),
};
