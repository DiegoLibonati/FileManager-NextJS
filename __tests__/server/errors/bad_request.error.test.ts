/**
 * @jest-environment node
 */

import { BadRequestError } from "@/server/errors/bad_request.error";
import { AppError } from "@/server/errors/app.error";

describe("BadRequestError", () => {
  it("should create an error with status 400", () => {
    const error = new BadRequestError("ERROR_VALIDATION", "Field is required");

    expect(error).toBeInstanceOf(AppError);
    expect(error.status).toBe(400);
    expect(error.code).toBe("ERROR_VALIDATION");
    expect(error.message).toBe("Field is required");
  });

  it("should set the name to BadRequestError", () => {
    const error = new BadRequestError("ERROR_GENERIC", "Bad request");

    expect(error.name).toBe("BadRequestError");
  });
});
