import type { Category } from "@/types/app";

import { categories, categoriesExtension, categoryTitles } from "@/lib/categories";

describe("categories", () => {
  describe("categories array", () => {
    it("should contain exactly 4 categories", () => {
      expect(categories).toHaveLength(4);
    });

    it("should contain documents, images, videos and music", () => {
      const ids: string[] = categories.map((c: Category) => c.id);
      expect(ids).toContain("documents");
      expect(ids).toContain("images");
      expect(ids).toContain("videos");
      expect(ids).toContain("music");
    });

    it("should have all required fields on each category", () => {
      categories.forEach((category: Category) => {
        expect(category.id).toBeTruthy();
        expect(category.name).toBeTruthy();
        expect(category.icon_color).toBeTruthy();
        expect(category.background_color).toBeTruthy();
      });
    });
  });

  describe("categoriesExtension", () => {
    it("should define extensions for documents", () => {
      expect(Array.isArray(categoriesExtension.documents)).toBe(true);
      expect(categoriesExtension.documents!.length).toBeGreaterThan(0);
    });

    it("should define extensions for images", () => {
      expect(Array.isArray(categoriesExtension.images)).toBe(true);
      expect(categoriesExtension.images!.length).toBeGreaterThan(0);
    });

    it("should define extensions for videos", () => {
      expect(Array.isArray(categoriesExtension.videos)).toBe(true);
      expect(categoriesExtension.videos!.length).toBeGreaterThan(0);
    });

    it("should define extensions for music", () => {
      expect(Array.isArray(categoriesExtension.music)).toBe(true);
      expect(categoriesExtension.music!.length).toBeGreaterThan(0);
    });
  });

  describe("categoryTitles", () => {
    it("should map each category id to a human-readable title", () => {
      expect(categoryTitles.music).toBeTruthy();
      expect(categoryTitles.videos).toBeTruthy();
      expect(categoryTitles.images).toBeTruthy();
      expect(categoryTitles.documents).toBeTruthy();
    });
  });
});
