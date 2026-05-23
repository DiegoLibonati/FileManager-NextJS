/**
 * @jest-environment node
 */

import { NotFoundError } from "@/server/errors/not_found.error";
import { AppError } from "@/server/errors/app.error";

describe("NotFoundError", () => {
  it("should create an error with status 404", () => {
    const error = new NotFoundError("ERROR_NOT_FOUND", "User not found");

    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(404);
    expect(error.code).toBe("ERROR_NOT_FOUND");
    expect(error.message).toBe("User not found");
  });

  it("should default to status 404 when using default arguments", () => {
    const error = new NotFoundError();

    expect(error.status).toBe(404);
  });

  it("should set the name to NotFoundError", () => {
    const error = new NotFoundError("ERROR_NOT_FOUND", "Not found");

    expect(error.name).toBe("NotFoundError");
  });
});
