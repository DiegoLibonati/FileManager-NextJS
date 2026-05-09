import { render, screen } from "@testing-library/react";

import type { JSX } from "react";

import FoldersPage from "@/app/(filemanager)/folders/page";

jest.mock("@/containers/folders/SectionFolders/SectionFolders", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-folders" />,
}));

const renderPage = (): void => {
  render(<FoldersPage />);
};

describe("FoldersPage", () => {
  it("should render SectionFolders", () => {
    renderPage();

    expect(screen.getByTestId("section-folders")).toBeInTheDocument();
  });
});
