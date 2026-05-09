import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { HeadingProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import Heading from "@/components/Headers/Heading/Heading";

const renderComponent = (props: HeadingProps): RenderResult => render(<Heading {...props} />);

describe("Heading", () => {
  it("should render an h1 element", () => {
    renderComponent({ element: "h1", children: "Title" });

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render an h2 element", () => {
    renderComponent({ element: "h2", children: "Subtitle" });

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render an h3 element", () => {
    renderComponent({ element: "h3", children: "Section" });

    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("should render an h4 element", () => {
    renderComponent({ element: "h4", children: "Sub" });

    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("should render an h5 element", () => {
    renderComponent({ element: "h5", children: "Small" });

    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
  });

  it("should render an h6 element for any unrecognized fallback", () => {
    renderComponent({ element: "h6", children: "Tiny" });

    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });

  it("should apply the className prop", () => {
    renderComponent({ element: "h2", children: "Styled", className: "font-bold" });

    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("font-bold");
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    renderComponent({ element: "h1", children: "Click me", onClick });

    await userEvent.click(screen.getByRole("heading", { level: 1 }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render children content", () => {
    renderComponent({ element: "h2", children: "My Content" });

    expect(screen.getByText("My Content")).toBeInTheDocument();
  });
});
