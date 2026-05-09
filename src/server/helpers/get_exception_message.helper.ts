import mongoose from "mongoose";

import type { ExceptionInfo } from "@/types/api";

import { CODES_ERROR, CODES_NOT } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_NOT } from "@/server/constants/messages.constant";

export const getExceptionMessage = (e: unknown): ExceptionInfo => {
  if (e instanceof mongoose.Error.CastError) {
    return { status: 400, code: CODES_NOT.validId, message: MESSAGES_NOT.validId };
  }

  if (e instanceof mongoose.Error.ValidationError) {
    const message = Object.values(e.errors)[0]?.message ?? MESSAGES_ERROR.generic;
    return { status: 400, code: CODES_ERROR.generic, message };
  }

  return { status: 500, code: CODES_ERROR.generic, message: MESSAGES_ERROR.generic };
};
