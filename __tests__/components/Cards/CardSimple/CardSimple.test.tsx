import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CardSimpleProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import CardSimple from "@/components/Cards/CardSimple/CardSimple";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

const defaultProps: CardSimpleProps = {
  title: "My Folder",
  subTitle: "3 items",
  type: "folder",
  path: "docs",
  color: "#f6c136",
  bgColor: "#fdf0a1",
};

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
}));

const renderComponent = (props: Partial<CardSimpleProps> = {}): RenderResult =>
  render(<CardSimple {...defaultProps} {...props} />);

describe("CardSimple", () => {
  it("should render the title", () => {
    renderComponent();

    expect(screen.getByText("My Folder")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    renderComponent();

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("should navigate to folder path when folder type is clicked", async () => {
    renderComponent({ type: "folder", path: "docs" });

    await userEvent.click(screen.getByText("My Folder"));

    expect(mockPush).toHaveBeenCalledWith("/folder/docs");
  });

  it("should not navigate when type is not folder", async () => {
    renderComponent({ type: "file" });

    await userEvent.click(screen.getByText("My Folder"));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
