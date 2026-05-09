import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";

const renderComponent = (children: React.ReactNode, className?: string): RenderResult =>
  render(<CardNotFound className={className!}>{children}</CardNotFound>);

describe("CardNotFound", () => {
  it("should render the children text", () => {
    renderComponent("No items found");

    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("should render children inside a heading element", () => {
    renderComponent("Empty state");

    expect(screen.getByRole("heading")).toHaveTextContent("Empty state");
  });

  it("should apply the className prop to the wrapper", () => {
    const { container } = renderComponent("Content", "extra-class");

    expect(container.firstChild).toHaveClass("extra-class");
  });
});
