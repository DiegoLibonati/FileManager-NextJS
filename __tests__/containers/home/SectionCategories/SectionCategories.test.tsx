import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import { FileManagerService } from "@/server/services/filemanager.service";

import SectionCategories from "@/containers/home/SectionCategories/SectionCategories";

import { mockCategories } from "@tests/__mocks__/category.mock";

jest.mock("@/server/services/filemanager.service", () => ({
  FileManagerService: {
    getCategories: jest.fn(),
  },
}));

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string } => ({ CLOUD_PATH: "/cloud" }),
}));

const renderContainer = (): RenderResult => render(<SectionCategories />);

describe("SectionCategories", () => {
  it("should render categories returned by the service", () => {
    (FileManagerService.getCategories as jest.Mock).mockReturnValue(mockCategories);

    renderContainer();

    expect(screen.getAllByText("Docs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Images").length).toBeGreaterThan(0);
  });

  it("should render category links with correct hrefs", () => {
    (FileManagerService.getCategories as jest.Mock).mockReturnValue(mockCategories);

    renderContainer();

    const links = screen.getAllByRole("link");
    expect(links.some((l) => l.getAttribute("href") === "/category/documents")).toBe(true);
  });

  it("should render the Category heading", () => {
    (FileManagerService.getCategories as jest.Mock).mockReturnValue([]);

    renderContainer();

    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
