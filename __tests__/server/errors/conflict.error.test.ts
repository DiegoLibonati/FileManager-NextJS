/**
 * @jest-environment node
 */

import { ConflictError } from "@/server/errors/conflict.error";
import { AppError } from "@/server/errors/app.error";

describe("ConflictError", () => {
  it("should create an error with status 409", () => {
    const error = new ConflictError("ERROR_GENERIC", "Resource already exists");

    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(409);
    expect(error.code).toBe("ERROR_GENERIC");
    expect(error.message).toBe("Resource already exists");
  });

  it("should set the name to ConflictError", () => {
    const error = new ConflictError("ERROR_GENERIC", "Conflict");

    expect(error.name).toBe("ConflictError");
  });
});
