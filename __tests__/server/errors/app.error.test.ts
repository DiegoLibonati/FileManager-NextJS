/**
 * @jest-environment node
 */

import { AppError } from "@/server/errors/app.error";

describe("AppError", () => {
  it("should create an error with status, code and message", () => {
    const error = new AppError(400, "ERROR_VALIDATION", "Invalid input");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(400);
    expect(error.code).toBe("ERROR_VALIDATION");
    expect(error.message).toBe("Invalid input");
  });

  it("should set the name to AppError", () => {
    const error = new AppError(500, "ERROR_GENERIC", "Something failed");

    expect(error.name).toBe("AppError");
  });
});
