import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { RequestPayload } from "@/types/payloads";

import { Jwt } from "@/server/configs/jwt.config";

import { UserService } from "@/server/services/user.service";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";
import { getPayload } from "@/server/helpers/get_payload.helper";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import {
  MESSAGES_ERROR,
  MESSAGES_SUCCESS,
  MESSAGES_VALIDATION,
} from "@/server/constants/messages.constant";
import { COOKIE_NAME } from "@/server/constants/vars.constant";

export const UserController = {
  async getUserInfo(req: NextRequest): Promise<NextResponse> {
    try {
      const { username } = getPayload(req) as RequestPayload;
      const user = await UserService.getUserInfo(username);

      if (!user) {
        return NextResponse.json(
          { code: CODES_ERROR.notFound, message: MESSAGES_ERROR.notFound },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.getUserInfo, message: MESSAGES_SUCCESS.getUserInfo, data: user },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async changePlan(req: NextRequest): Promise<NextResponse> {
    try {
      const plan = req.nextUrl.searchParams.get("plan");
      if (!plan) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.plan },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      const user = await UserService.changePlan(username, plan);

      if (!user) {
        return NextResponse.json(
          { code: CODES_ERROR.notFound, message: MESSAGES_ERROR.notFound },
          { status: 404 }
        );
      }

      const jwt = new Jwt({ cookieName: COOKIE_NAME, payload: user });
      await jwt.signJWT();

      return NextResponse.json(
        { code: CODES_SUCCESS.changePlan, message: MESSAGES_SUCCESS.changePlan, data: user },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async sendVerificationEmail(req: NextRequest): Promise<NextResponse> {
    try {
      const { username } = getPayload(req) as RequestPayload;
      const result = await UserService.sendVerificationEmail(username);

      if ("error" in result) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          code: CODES_SUCCESS.sendVerificationEmail,
          message: MESSAGES_SUCCESS.sendVerificationEmail,
        },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },
};
