import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { Jwt } from "@/server/configs/jwt.config";

import { AuthService } from "@/server/services/auth.service";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS, MESSAGES_VALIDATION } from "@/server/constants/messages.constant";
import { COOKIE_NAME } from "@/server/constants/vars.constant";

export const AuthController = {
  async login(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { username?: string; password?: string };
      const username = body.username?.trim();
      const password = body.password?.trim();

      if (!username || !password) {
        return NextResponse.json(
          {
            code: CODES_ERROR.validation,
            message: MESSAGES_VALIDATION.login,
          },
          { status: 400 }
        );
      }

      const result = await AuthService.validateLogin(username, password);
      if (result.error) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      const jwt = new Jwt({ cookieName: COOKIE_NAME, payload: result.data ?? null });
      await jwt.signJWT();

      return NextResponse.json(
        { code: CODES_SUCCESS.login, message: MESSAGES_SUCCESS.login, data: result.data },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async logout(): Promise<NextResponse> {
    try {
      await new Jwt({ cookieName: COOKIE_NAME }).deleteCookieJWT();
      return NextResponse.json(
        { code: CODES_SUCCESS.logout, message: MESSAGES_SUCCESS.logout },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async register(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { username?: string; email?: string; password?: string };
      const username = body.username?.trim();
      const email = body.email?.trim();
      const password = body.password?.trim();

      if (!username || !email || !password) {
        return NextResponse.json(
          {
            code: CODES_ERROR.validation,
            message: MESSAGES_VALIDATION.register,
          },
          { status: 400 }
        );
      }

      const result = await AuthService.register(username, email, password);
      if (result.error) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.register, message: MESSAGES_SUCCESS.register, data: result.data },
        { status: 201 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async verify(req: NextRequest): Promise<NextResponse> {
    try {
      const hashedId = req.nextUrl.searchParams.get("id");
      const username = req.nextUrl.searchParams.get("username");

      if (!hashedId || !username) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.verify },
          { status: 400 }
        );
      }

      const result = await AuthService.verifyEmail(username, hashedId);
      if (result.error) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.redirect(result.data!.redirectUrl, { status: 307 });
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async resetPassword(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { id?: string; password?: string; username?: string };
      const hashedId = body.id?.trim();
      const username = body.username?.trim();
      const password = body.password?.trim();

      if (!hashedId || !username || !password) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.resetPassword },
          { status: 400 }
        );
      }

      const result = await AuthService.resetPassword(username, hashedId, password);
      if (result.error) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.resetPassword, message: MESSAGES_SUCCESS.resetPassword },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async sendEmailReset(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { email?: string };
      const email = body.email?.trim();

      if (!email) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.sendEmailReset },
          { status: 400 }
        );
      }

      const result = await AuthService.sendEmailReset(email);
      if (result.error) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.sendEmailReset, message: MESSAGES_SUCCESS.sendEmailReset },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },
};
