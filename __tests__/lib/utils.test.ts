import type { Category } from "@/types/app";

import {
  roundToOneDecimal,
  getTitleByParams,
  getCategoryByExtension,
  bytesToMB,
  validExtensions,
  getExtension,
  parseEscapeString,
  getErrorMessage,
  throwApiError,
} from "@/lib/utils";

import { mockCategories } from "@tests/__mocks__/category.mock";

describe("utils", () => {
  describe("roundToOneDecimal", () => {
    it("should floor a decimal number to one decimal place", () => {
      expect(roundToOneDecimal(1.25)).toBe(1.2);
    });

    it("should floor correctly with multiple decimals", () => {
      expect(roundToOneDecimal(3.99)).toBe(3.9);
    });

    it("should return integers as-is", () => {
      expect(roundToOneDecimal(5)).toBe(5);
      expect(roundToOneDecimal(0)).toBe(0);
    });
  });

  describe("getTitleByParams", () => {
    it("should return an empty string when no relevant params are given", () => {
      expect(getTitleByParams({})).toBe("");
    });

    it("should return the music title for categoryId music", () => {
      expect(getTitleByParams({ categoryId: "music" })).toBe("All music 🎵");
    });

    it("should return the videos title for categoryId videos", () => {
      expect(getTitleByParams({ categoryId: "videos" })).toBe("All videos 🎥");
    });

    it("should return the images title for categoryId images", () => {
      expect(getTitleByParams({ categoryId: "images" })).toBe("All images 🖼️");
    });

    it("should return the documents title for categoryId documents", () => {
      expect(getTitleByParams({ categoryId: "documents" })).toBe("All docs 📕");
    });

    it("should return the last segment in uppercase for folderPath array", () => {
      const result = getTitleByParams({ folderPath: ["documents", "work"] });
      expect(result).toBe("WORK 📁");
    });

    it("should handle folderPath as a plain string", () => {
      const result = getTitleByParams({ folderPath: "images" });
      expect(result).toBe("IMAGES 📁");
    });
  });

  describe("getCategoryByExtension", () => {
    it("should return the music category for mp3", () => {
      const result: Category = getCategoryByExtension("mp3", mockCategories);
      expect(result.id).toBe("music");
    });

    it("should return the videos category for mp4", () => {
      const result: Category = getCategoryByExtension("mp4", mockCategories);
      expect(result.id).toBe("videos");
    });

    it("should return the images category for png", () => {
      const result: Category = getCategoryByExtension("png", mockCategories);
      expect(result.id).toBe("images");
    });

    it("should fall back to documents for unknown extensions", () => {
      const result: Category = getCategoryByExtension("txt", mockCategories);
      expect(result.id).toBe("documents");
    });
  });

  describe("bytesToMB", () => {
    it("should convert 1 MB in bytes to 1", () => {
      expect(bytesToMB("1048576")).toBe("1");
    });

    it("should convert half a MB to 0.5", () => {
      expect(bytesToMB("524288")).toBe("0.5");
    });

    it("should return 0 for 0 bytes", () => {
      expect(bytesToMB("0")).toBe("0");
    });
  });

  describe("validExtensions", () => {
    it("should return all extensions from the map flattened into one array", () => {
      const catExt: Record<string, string[]> = { images: ["png", "jpg"], music: ["mp3"] };

      const result: string[] = validExtensions(catExt);

      expect(result).toContain("png");
      expect(result).toContain("jpg");
      expect(result).toContain("mp3");
      expect(result).toHaveLength(3);
    });
  });

  describe("getExtension", () => {
    it("should return the file extension without the dot", () => {
      expect(getExtension("file.txt")).toBe("txt");
      expect(getExtension("image.PNG")).toBe("PNG");
    });

    it("should return the last segment for filenames with multiple dots", () => {
      expect(getExtension("archive.tar.gz")).toBe("gz");
    });

    it("should return the whole name when there is no dot", () => {
      expect(getExtension("Makefile")).toBe("Makefile");
    });
  });

  describe("parseEscapeString", () => {
    it("should replace all %20 occurrences with spaces", () => {
      expect(parseEscapeString("hello%20world")).toBe("hello world");
      expect(parseEscapeString("my%20file%20name")).toBe("my file name");
    });

    it("should return the string unchanged when there is no %20", () => {
      expect(parseEscapeString("hello")).toBe("hello");
    });
  });

  describe("getErrorMessage", () => {
    it("should return the message property of an Error instance", () => {
      const error = new Error("Something broke");
      expect(getErrorMessage(error)).toBe("Something broke");
    });

    it("should return the generic message for a plain string", () => {
      expect(getErrorMessage("string error")).toBe("An unexpected error occurred.");
    });

    it("should return the generic message for null", () => {
      expect(getErrorMessage(null)).toBe("An unexpected error occurred.");
    });
  });

  describe("throwApiError", () => {
    it("should throw an Error using the message from the JSON body", async () => {
      const mockResponse = {
        json: () => Promise.resolve({ message: "Unauthorized" }),
        status: 401,
      } as Response;

      await expect(throwApiError(mockResponse)).rejects.toThrow("Unauthorized");
    });

    it("should throw with the HTTP status when json parsing fails", async () => {
      const mockResponse = {
        json: () => Promise.reject(new Error("parse error")),
        status: 500,
      } as Response;

      await expect(throwApiError(mockResponse)).rejects.toThrow("HTTP error! status: 500");
    });
  });
});
