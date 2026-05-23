import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { Jwt } from "@/server/configs/jwt.config";
import { getEnvs } from "@/server/configs/env.config";

import { AuthService } from "@/server/services/auth.service";

import { validateBody, validateQuery } from "@/server/helpers/validate.helper";
import { withErrorHandler } from "@/server/helpers/with_error_handler.helper";

import {
  loginBodySchema,
  registerBodySchema,
  verifyQuerySchema,
  resetPasswordBodySchema,
  sendEmailResetBodySchema,
} from "@/server/schemas/auth.schema";

import { BadRequestError } from "@/server/errors/bad_request.error";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS } from "@/server/constants/messages.constant";
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/server/constants/vars.constant";

export const AuthController = {
  login: withErrorHandler(
    "AuthController.login",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username, password } = await validateBody(req, loginBodySchema);

      const result = await AuthService.validateLogin(username, password);
      if (result.error) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      const token = await new Jwt(result.data ? { payload: { ...result.data } } : {}).signJWT();

      const response = NextResponse.json(
        { code: CODES_SUCCESS.login, message: MESSAGES_SUCCESS.login, data: result.data },
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

  logout: (): NextResponse => {
    const response = NextResponse.json(
      { code: CODES_SUCCESS.logout, message: MESSAGES_SUCCESS.logout },
      { status: 200 }
    );
    response.cookies.delete(COOKIE_NAME);
    return response;
  },

  register: withErrorHandler(
    "AuthController.register",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username, email, password } = await validateBody(req, registerBodySchema);

      const result = await AuthService.register(username, email, password);
      if (result.error) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.register, message: MESSAGES_SUCCESS.register, data: result.data },
        { status: 201 }
      );
    }
  ),

  verify: withErrorHandler(
    "AuthController.verify",
    async (req: NextRequest): Promise<NextResponse> => {
      const { id: hashedId, username } = validateQuery(req, verifyQuerySchema);

      const result = await AuthService.verifyEmail(username, hashedId);
      if (result.error) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.redirect(result.data!.redirectUrl, { status: 307 });
    }
  ),

  resetPassword: withErrorHandler(
    "AuthController.resetPassword",
    async (req: NextRequest): Promise<NextResponse> => {
      const { id: hashedId, username, password } = await validateBody(req, resetPasswordBodySchema);

      const result = await AuthService.resetPassword(username, hashedId, password);
      if (result.error) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.resetPassword, message: MESSAGES_SUCCESS.resetPassword },
        { status: 200 }
      );
    }
  ),

  sendEmailReset: withErrorHandler(
    "AuthController.sendEmailReset",
    async (req: NextRequest): Promise<NextResponse> => {
      const { email } = await validateBody(req, sendEmailResetBodySchema);

      const result = await AuthService.sendEmailReset(email);
      if (result.error) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.sendEmailReset, message: MESSAGES_SUCCESS.sendEmailReset },
        { status: 200 }
      );
    }
  ),
};
