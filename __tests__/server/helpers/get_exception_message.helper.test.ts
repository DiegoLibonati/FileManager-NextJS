/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { ExceptionInfo } from "@/types/api";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";
import { CODES_ERROR, CODES_NOT } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_NOT } from "@/server/constants/messages.constant";

describe("get_exception_message", () => {
  describe("when the error is a CastError", () => {
    it("should return status 400 with validId code and message", () => {
      const error = new mongoose.Error.CastError("ObjectId", "bad-id", "_id");

      const result: ExceptionInfo = getExceptionMessage(error);

      expect(result.status).toBe(400);
      expect(result.code).toBe(CODES_NOT.validId);
      expect(result.message).toBe(MESSAGES_NOT.validId);
    });
  });

  describe("when the error is a ValidationError", () => {
    it("should return status 400 with generic error code and the first field message", () => {
      const error = new mongoose.Error.ValidationError();
      error.errors.username = new mongoose.Error.ValidatorError({
        message: "Username is required",
        path: "username",
        value: undefined,
      });

      const result: ExceptionInfo = getExceptionMessage(error);

      expect(result.status).toBe(400);
      expect(result.code).toBe(CODES_ERROR.generic);
      expect(result.message).toBe("Username is required");
    });

    it("should return the generic message when there are no field errors", () => {
      const error = new mongoose.Error.ValidationError();

      const result: ExceptionInfo = getExceptionMessage(error);

      expect(result.status).toBe(400);
      expect(result.code).toBe(CODES_ERROR.generic);
      expect(result.message).toBe(MESSAGES_ERROR.generic);
    });
  });

  describe("when the error is a generic Error", () => {
    it("should return status 500 with generic code and message", () => {
      const error = new Error("Something unexpected happened");

      const result: ExceptionInfo = getExceptionMessage(error);

      expect(result.status).toBe(500);
      expect(result.code).toBe(CODES_ERROR.generic);
      expect(result.message).toBe(MESSAGES_ERROR.generic);
    });
  });

  describe("when the error is not an Error instance", () => {
    it("should return status 500 with generic code", () => {
      const result: ExceptionInfo = getExceptionMessage("plain string error");

      expect(result.status).toBe(500);
      expect(result.code).toBe(CODES_ERROR.generic);
    });

    it("should return status 500 for null", () => {
      const result: ExceptionInfo = getExceptionMessage(null);

      expect(result.status).toBe(500);
    });
  });
});
