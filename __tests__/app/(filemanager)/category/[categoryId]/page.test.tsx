import { render, screen } from "@testing-library/react";

import type { JSX } from "react";

import CategoryPage from "@/app/(filemanager)/category/[categoryId]/page";

jest.mock("@/containers/category/SectionFiles/SectionFiles", () => ({
  __esModule: true,
  default: ({ idCategory }: { idCategory: string }): JSX.Element => (
    <div data-testid="section-files" data-category={idCategory} />
  ),
}));

const renderPage = async (params: Promise<{ categoryId: string }>): Promise<void> => {
  render(await CategoryPage({ params }));
};

describe("CategoryPage", () => {
  it("should render SectionFiles with the resolved categoryId", async () => {
    await renderPage(Promise.resolve({ categoryId: "documents" }));

    const section = screen.getByTestId("section-files");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-category", "documents");
  });

  it("should pass images categoryId correctly", async () => {
    await renderPage(Promise.resolve({ categoryId: "images" }));

    expect(screen.getByTestId("section-files")).toHaveAttribute("data-category", "images");
  });
});
