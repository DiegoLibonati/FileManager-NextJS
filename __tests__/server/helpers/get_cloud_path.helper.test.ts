/**
 * @jest-environment node
 */

import path from "path";

import { getCloudPath } from "@/server/helpers/get_cloud_path.helper";

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string } => ({ CLOUD_PATH: "/cloud" }),
}));

describe("get_cloud_path", () => {
  describe("when called with only a username", () => {
    it("should return the cloud path for the given user", () => {
      const result: string = getCloudPath("alice");

      expect(result).toBe(path.join("/cloud", "alice"));
    });
  });

  describe("when called with username and additional segments", () => {
    it("should join all segments into the final path", () => {
      const result: string = getCloudPath("alice", "documents", "work");

      expect(result).toBe(path.join("/cloud", "alice", "documents", "work"));
    });

    it("should handle a single additional segment", () => {
      const result: string = getCloudPath("bob", "images");

      expect(result).toBe(path.join("/cloud", "bob", "images"));
    });
  });

  describe("when called with different usernames", () => {
    it("should scope the path to the specific user", () => {
      const alicePath: string = getCloudPath("alice");
      const bobPath: string = getCloudPath("bob");

      expect(alicePath).not.toBe(bobPath);
      expect(alicePath).toContain("alice");
      expect(bobPath).toContain("bob");
    });
  });
});
