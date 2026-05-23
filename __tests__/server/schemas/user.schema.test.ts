/**
 * @jest-environment node
 */

import { changePlanQuerySchema } from "@/server/schemas/user.schema";

describe("user.schema", () => {
  describe("changePlanQuerySchema", () => {
    it("should accept a valid plan string", () => {
      const result = changePlanQuerySchema.safeParse({ plan: "1" });

      expect(result.success).toBe(true);
    });

    it("should reject when plan is missing", () => {
      const result = changePlanQuerySchema.safeParse({});

      expect(result.success).toBe(false);
    });

    it("should reject when plan is an empty string", () => {
      const result = changePlanQuerySchema.safeParse({ plan: "" });

      expect(result.success).toBe(false);
    });
  });
});
