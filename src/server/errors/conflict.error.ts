import { AppError } from "@/server/errors/app.error";

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(409, code, message);
  }
}
