import { AppError } from "@/server/errors/app.error";

export class BadRequestError extends AppError {
  constructor(code: string, message: string) {
    super(400, code, message);
  }
}
