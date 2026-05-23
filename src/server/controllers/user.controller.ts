import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { RequestPayload } from "@/types/api";

import { Jwt } from "@/server/configs/jwt.config";
import { getEnvs } from "@/server/configs/env.config";

import { UserService } from "@/server/services/user.service";

import { getPayload } from "@/server/helpers/get_payload.helper";
import { validateQuery } from "@/server/helpers/validate.helper";
import { withErrorHandler } from "@/server/helpers/with_error_handler.helper";

import { changePlanQuerySchema } from "@/server/schemas/user.schema";

import { BadRequestError } from "@/server/errors/bad_request.error";
import { NotFoundError } from "@/server/errors/not_found.error";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_SUCCESS } from "@/server/constants/messages.constant";
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/server/constants/vars.constant";

export const UserController = {
  getUserInfo: withErrorHandler(
    "UserController.getUserInfo",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username } = getPayload(req) as RequestPayload;
      const user = await UserService.getUserInfo(username);

      if (!user) {
        throw new NotFoundError(CODES_ERROR.notFound, MESSAGES_ERROR.notFound);
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.getUserInfo, message: MESSAGES_SUCCESS.getUserInfo, data: user },
        { status: 200 }
      );
    }
  ),

  changePlan: withErrorHandler(
    "UserController.changePlan",
    async (req: NextRequest): Promise<NextResponse> => {
      const { plan } = validateQuery(req, changePlanQuerySchema);
      const { username } = getPayload(req) as RequestPayload;
      const user = await UserService.changePlan(username, plan);

      if (!user) {
        throw new NotFoundError(CODES_ERROR.notFound, MESSAGES_ERROR.notFound);
      }

      const token = await new Jwt({ payload: { ...user } }).signJWT();

      const response = NextResponse.json(
        { code: CODES_SUCCESS.changePlan, message: MESSAGES_SUCCESS.changePlan, data: user },
        { status: 200 }
      );
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: getEnvs().ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
      return response;
    }
  ),

  sendVerificationEmail: withErrorHandler(
    "UserController.sendVerificationEmail",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username } = getPayload(req) as RequestPayload;
      const result = await UserService.sendVerificationEmail(username);

      if ("error" in result) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        {
          code: CODES_SUCCESS.sendVerificationEmail,
          message: MESSAGES_SUCCESS.sendVerificationEmail,
        },
        { status: 200 }
      );
    }
  ),
};
