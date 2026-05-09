/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { getPayload } from "@/server/helpers/get_payload.helper";

const buildRequest = (payloadHeader?: string): NextRequest =>
  new NextRequest("http://localhost/api/v1/test", {
    headers: payloadHeader !== undefined ? { payload: payloadHeader } : {},
  });

describe("get_payload", () => {
  describe("when the payload header contains a valid JSON object", () => {
    it("should parse and return the payload", () => {
      const payloadData = { username: "alice", email: "alice@example.com", plan: "0" };
      const req = buildRequest(JSON.stringify(payloadData));

      const result: unknown = getPayload(req);

      expect(result).toEqual(payloadData);
    });
  });

  describe("when the payload header is missing", () => {
    it("should return an empty object", () => {
      const req = buildRequest();

      const result: unknown = getPayload(req);

      expect(result).toEqual({});
    });
  });

  describe("when the payload header is an empty JSON object", () => {
    it("should return an empty object", () => {
      const req = buildRequest("{}");

      const result: unknown = getPayload(req);

      expect(result).toEqual({});
    });
  });
});
