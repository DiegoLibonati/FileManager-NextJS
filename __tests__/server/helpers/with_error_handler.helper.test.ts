/**
 * @jest-environment node
 */

import { NextResponse } from "next/server";

import { withErrorHandler } from "@/server/helpers/with_error_handler.helper";
import { BadRequestError } from "@/server/errors/bad_request.error";
import { NotFoundError } from "@/server/errors/not_found.error";
import { CODES_ERROR } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR } from "@/server/constants/messages.constant";

jest.mock("@/server/configs/logger.config", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

describe("with_error_handler", () => {
  it("should return the response from the wrapped function on success", async () => {
    const handler = withErrorHandler(
      "test",
      (): Promise<NextResponse> =>
        Promise.resolve(NextResponse.json({ data: "ok" }, { status: 200 }))
    );

    const response = await handler();

    expect(response.status).toBe(200);
    const body = (await response.json()) as { data: string };
    expect(body.data).toBe("ok");
  });

  it("should catch AppError and return its status, code and message", async () => {
    const handler = withErrorHandler(
      "test",
      (): Promise<NextResponse> =>
        Promise.reject(new BadRequestError("ERROR_VALIDATION", "Name is required"))
    );

    const response = await handler();

    expect(response.status).toBe(400);
    const body = (await response.json()) as { code: string; message: string };
    expect(body.code).toBe("ERROR_VALIDATION");
    expect(body.message).toBe("Name is required");
  });

  it("should catch NotFoundError and return 404", async () => {
    const handler = withErrorHandler(
      "test",
      (): Promise<NextResponse> => Promise.reject(new NotFoundError())
    );

    const response = await handler();

    expect(response.status).toBe(404);
  });

  it("should return 500 for unexpected errors", async () => {
    const handler = withErrorHandler(
      "test",
      (): Promise<NextResponse> => Promise.reject(new Error("Unexpected failure"))
    );

    const response = await handler();

    expect(response.status).toBe(500);
    const body = (await response.json()) as { code: string; message: string };
    expect(body.code).toBe(CODES_ERROR.generic);
    expect(body.message).toBe(MESSAGES_ERROR.generic);
  });

  it("should log errors with status >= 500", async () => {
    const { logger } = jest.requireMock<{ logger: { error: jest.Mock } }>(
      "@/server/configs/logger.config"
    );

    const handler = withErrorHandler(
      "test.ctx",
      (): Promise<NextResponse> => Promise.reject(new Error("Internal error"))
    );

    await handler();

    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({ ctx: "test.ctx" }),
      "Internal error"
    );
  });

  it("should not log errors with status < 500", async () => {
    const { logger } = jest.requireMock<{ logger: { error: jest.Mock } }>(
      "@/server/configs/logger.config"
    );

    const handler = withErrorHandler(
      "test.ctx",
      (): Promise<NextResponse> =>
        Promise.reject(new BadRequestError("ERROR_VALIDATION", "Invalid"))
    );

    await handler();

    expect(logger.error).not.toHaveBeenCalled();
  });

  it("should pass arguments through to the wrapped function", async () => {
    const mockFn = jest.fn().mockResolvedValue(NextResponse.json({ ok: true }));
    const handler = withErrorHandler("test", mockFn);

    await handler("arg1", 42);

    expect(mockFn).toHaveBeenCalledWith("arg1", 42);
  });
});
