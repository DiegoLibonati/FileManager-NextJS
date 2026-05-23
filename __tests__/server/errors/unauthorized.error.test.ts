/**
 * @jest-environment node
 */

import { UnauthorizedError } from "@/server/errors/unauthorized.error";
import { AppError } from "@/server/errors/app.error";

describe("UnauthorizedError", () => {
  it("should create an error with status 401", () => {
    const error = new UnauthorizedError("ERROR_UNAUTHORIZED", "Invalid token");

    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(401);
    expect(error.code).toBe("ERROR_UNAUTHORIZED");
    expect(error.message).toBe("Invalid token");
  });

  it("should set the name to UnauthorizedError", () => {
    const error = new UnauthorizedError("ERROR_UNAUTHORIZED", "Unauthorized");

    expect(error.name).toBe("UnauthorizedError");
  });
});
