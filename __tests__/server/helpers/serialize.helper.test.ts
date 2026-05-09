/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { IUser } from "@/types/models";
import type { IUserDoc } from "@/types/api";

import { serializeUser } from "@/server/helpers/serialize.helper";

const buildMockUserDoc = (overrides: Partial<IUserDoc> = {}): IUserDoc => {
  const objectId = new mongoose.Types.ObjectId();
  return {
    _id: objectId,
    username: "alice",
    email: "alice@example.com",
    plan: "0",
    emailVerified: false,
    password: "hashed-password",
    ...overrides,
  } as IUserDoc;
};

describe("serialize_user", () => {
  describe("when given a valid user document", () => {
    it("should convert the _id ObjectId to a string", () => {
      const doc = buildMockUserDoc();

      const result: IUser = serializeUser(doc);

      expect(typeof result._id).toBe("string");
      expect(result._id).toBe(String(doc._id));
    });

    it("should map all user fields correctly", () => {
      const doc = buildMockUserDoc();

      const result: IUser = serializeUser(doc);

      expect(result.username).toBe("alice");
      expect(result.email).toBe("alice@example.com");
      expect(result.plan).toBe("0");
      expect(result.emailVerified).toBe(false);
    });

    it("should not include the password field", () => {
      const doc = buildMockUserDoc();

      const result: IUser = serializeUser(doc);

      expect((result as unknown as Record<string, unknown>).password).toBeUndefined();
    });
  });

  describe("when the user has emailVerified true and plan 1", () => {
    it("should serialize those values correctly", () => {
      const doc = buildMockUserDoc({ emailVerified: true, plan: "1" });

      const result: IUser = serializeUser(doc);

      expect(result.emailVerified).toBe(true);
      expect(result.plan).toBe("1");
    });
  });
});
