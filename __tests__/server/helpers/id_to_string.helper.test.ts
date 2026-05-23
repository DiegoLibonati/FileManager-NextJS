/**
 * @jest-environment node
 */

import { Types } from "mongoose";

import { idToString } from "@/server/helpers/id_to_string.helper";

describe("id_to_string", () => {
  it("should convert an ObjectId to its hex string", () => {
    const objectId = new Types.ObjectId("507f1f77bcf86cd799439011");

    const result: string = idToString(objectId);

    expect(result).toBe("507f1f77bcf86cd799439011");
  });

  it("should convert a plain string to itself", () => {
    const result: string = idToString("plain-string-id");

    expect(result).toBe("plain-string-id");
  });

  it("should convert a number to its string representation", () => {
    const result: string = idToString(123);

    expect(result).toBe("123");
  });

  it("should handle null by converting to string", () => {
    const result: string = idToString(null);

    expect(result).toBe("null");
  });
});
