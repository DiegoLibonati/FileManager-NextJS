import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import type { JSX } from "react";

import FolderPage from "@/app/(filemanager)/folder/[...folderPath]/page";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue("/folder/docs"),
}));

jest.mock("@/containers/folder/SectionFolder/SectionFolder", () => ({
  __esModule: true,
  default: ({ folderPath }: { folderPath: string }): JSX.Element => (
    <div data-testid="section-folder" data-path={folderPath} />
  ),
}));

const renderPage = async (params: Promise<{ folderPath: string[] }>): Promise<void> => {
  render(await FolderPage({ params }));
};

beforeEach((): void => {
  (usePathname as jest.Mock).mockReturnValue("/folder/docs");
});

describe("FolderPage", () => {
  it("should render SectionFolder with the root path when folderPath is root", async () => {
    await renderPage(Promise.resolve({ folderPath: ["root"] }));

    const section = screen.getByTestId("section-folder");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-path", "");
  });

  it("should render SectionFolder with the correct path for nested folders", async () => {
    await renderPage(Promise.resolve({ folderPath: ["docs", "work"] }));

    expect(screen.getByTestId("section-folder")).toHaveAttribute("data-path", "/docs/work");
  });

  it("should render the ButtonAdd component", async () => {
    await renderPage(Promise.resolve({ folderPath: ["root"] }));

    expect(screen.getByRole("button", { name: "button add" })).toBeInTheDocument();
  });
});
