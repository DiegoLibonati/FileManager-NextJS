/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { z } from "zod";

import { validateBody, validateParams, validateQuery } from "@/server/helpers/validate.helper";
import { BadRequestError } from "@/server/errors/bad_request.error";

const testSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().int().positive(),
});

const buildJsonRequest = (body: unknown): Request =>
  new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("validate", () => {
  describe("validateBody", () => {
    it("should return parsed data when the body matches the schema", async () => {
      const req = buildJsonRequest({ name: "Alice", age: 30 });

      const result = await validateBody(req, testSchema);

      expect(result).toEqual({ name: "Alice", age: 30 });
    });

    it("should throw BadRequestError when a required field is missing", async () => {
      const req = buildJsonRequest({ name: "Alice" });

      await expect(validateBody(req, testSchema)).rejects.toThrow(BadRequestError);
    });

    it("should throw BadRequestError when the body is not valid JSON", async () => {
      const req = new Request("http://localhost/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not json",
      });

      await expect(validateBody(req, testSchema)).rejects.toThrow(BadRequestError);
    });

    it("should include the field path in the error message", async () => {
      const req = buildJsonRequest({ name: "" });

      try {
        await validateBody(req, testSchema);
        fail("Expected BadRequestError");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
        expect((e as BadRequestError).message).toContain("name");
      }
    });
  });

  describe("validateParams", () => {
    it("should return parsed data when params match the schema", () => {
      const result = validateParams({ name: "Bob", age: "25" }, testSchema);

      expect(result).toEqual({ name: "Bob", age: 25 });
    });

    it("should throw BadRequestError when params are invalid", () => {
      expect(() => validateParams({ name: "" }, testSchema)).toThrow(BadRequestError);
    });
  });

  describe("validateQuery", () => {
    it("should return parsed data from search params", () => {
      const req = new NextRequest("http://localhost/api/test?name=Alice&age=30");

      const result = validateQuery(req, testSchema);

      expect(result).toEqual({ name: "Alice", age: 30 });
    });

    it("should throw BadRequestError when query params are invalid", () => {
      const req = new NextRequest("http://localhost/api/test?name=Alice");

      expect(() => validateQuery(req, testSchema)).toThrow(BadRequestError);
    });
  });
});
