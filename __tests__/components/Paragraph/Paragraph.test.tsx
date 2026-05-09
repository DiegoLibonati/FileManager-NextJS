import { render, screen } from "@testing-library/react";

import type { ParagraphProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import Paragraph from "@/components/Paragraph/Paragraph";

const renderComponent = (props: ParagraphProps = {}): RenderResult =>
  render(<Paragraph {...props} />);

describe("Paragraph", () => {
  it("should render children text", () => {
    renderComponent({ children: "Hello world" });

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("should apply the className prop", () => {
    renderComponent({ children: "Styled", className: "text-red-500" });

    expect(screen.getByText("Styled")).toHaveClass("text-red-500");
  });

  it("should apply the style prop", () => {
    renderComponent({ children: "Inline", style: { color: "rgb(0, 0, 255)" } });

    expect(screen.getByText("Inline")).toHaveStyle({ color: "rgb(0, 0, 255)" });
  });

  it("should render a <p> element", () => {
    renderComponent({ children: "Content" });

    expect(screen.getByText("Content").tagName).toBe("P");
  });
});
