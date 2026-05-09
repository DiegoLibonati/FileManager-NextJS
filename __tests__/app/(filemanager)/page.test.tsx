import { render, screen } from "@testing-library/react";

import type { JSX } from "react";

import HomePage from "@/app/(filemanager)/page";

jest.mock("@/containers/home/SectionChart/SectionChart", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-chart" />,
}));

jest.mock("@/containers/home/SectionCategories/SectionCategories", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-categories" />,
}));

jest.mock("@/containers/home/SectionRecentUploaded/SectionRecentUploaded", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-recent" />,
}));

const renderPage = (): void => {
  render(<HomePage />);
};

describe("HomePage", () => {
  it("should render SectionChart", () => {
    renderPage();

    expect(screen.getByTestId("section-chart")).toBeInTheDocument();
  });

  it("should render SectionCategories", () => {
    renderPage();

    expect(screen.getByTestId("section-categories")).toBeInTheDocument();
  });

  it("should render SectionRecentUploaded", () => {
    renderPage();

    expect(screen.getByTestId("section-recent")).toBeInTheDocument();
  });
});
