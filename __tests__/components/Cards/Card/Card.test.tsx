import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CardProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import Card from "@/components/Cards/Card/Card";

const renderComponent = (props: CardProps = {}): RenderResult => render(<Card {...props} />);

describe("Card", () => {
  it("should render children", () => {
    renderComponent({ children: <span>Content</span> });

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should apply className prop", () => {
    const { container } = renderComponent({ className: "my-card" });

    expect(container.firstChild).toHaveClass("my-card");
  });

  it("should apply style prop", () => {
    const { container } = renderComponent({ style: { backgroundColor: "rgb(255, 0, 0)" } });

    expect(container.firstChild).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    renderComponent({ children: <span>Click</span>, onClick });

    await userEvent.click(screen.getByText("Click"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
