import { AppError } from "@/server/errors/app.error";

import { CODES_ERROR } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR } from "@/server/constants/messages.constant";

export class NotFoundError extends AppError {
  constructor(code: string = CODES_ERROR.notFound, message: string = MESSAGES_ERROR.notFound) {
    super(404, code, message);
  }
}
