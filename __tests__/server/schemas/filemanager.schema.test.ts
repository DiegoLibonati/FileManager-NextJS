/**
 * @jest-environment node
 */

import {
  pathQuerySchema,
  createFolderBodySchema,
  deleteItemQuerySchema,
  categoryFilesQuerySchema,
} from "@/server/schemas/filemanager.schema";

describe("filemanager.schema", () => {
  describe("pathQuerySchema", () => {
    it("should accept a valid path", () => {
      const result = pathQuerySchema.safeParse({ path: "/docs" });

      expect(result.success).toBe(true);
    });

    it("should reject when path is missing", () => {
      const result = pathQuerySchema.safeParse({});

      expect(result.success).toBe(false);
    });

    it("should reject when path is empty", () => {
      const result = pathQuerySchema.safeParse({ path: "" });

      expect(result.success).toBe(false);
    });
  });

  describe("createFolderBodySchema", () => {
    it("should accept a valid path", () => {
      const result = createFolderBodySchema.safeParse({ path: "/new-folder" });

      expect(result.success).toBe(true);
    });

    it("should trim the path", () => {
      const result = createFolderBodySchema.safeParse({ path: "  /new-folder  " });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.path).toBe("/new-folder");
      }
    });

    it("should reject when path is empty after trim", () => {
      const result = createFolderBodySchema.safeParse({ path: "   " });

      expect(result.success).toBe(false);
    });
  });

  describe("deleteItemQuerySchema", () => {
    it("should accept valid path and type", () => {
      const result = deleteItemQuerySchema.safeParse({ path: "/docs/file.txt", type: "file" });

      expect(result.success).toBe(true);
    });

    it("should reject when type is missing", () => {
      const result = deleteItemQuerySchema.safeParse({ path: "/docs/file.txt" });

      expect(result.success).toBe(false);
    });

    it("should reject when path is missing", () => {
      const result = deleteItemQuerySchema.safeParse({ type: "file" });

      expect(result.success).toBe(false);
    });
  });

  describe("categoryFilesQuerySchema", () => {
    it("should accept a valid category name", () => {
      const result = categoryFilesQuerySchema.safeParse({ category: "images" });

      expect(result.success).toBe(true);
    });

    it("should reject when category is missing", () => {
      const result = categoryFilesQuerySchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});
