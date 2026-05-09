import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import type { RenderResult } from "@testing-library/react";

import ButtonActions from "@/components/Buttons/ButtonActions/ButtonActions";

const renderComponent = (onClick = jest.fn()): RenderResult =>
  render(<ButtonActions onClick={onClick} innerRef={createRef()} />);

describe("ButtonActions", () => {
  it("should render the button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button actions" })).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", async () => {
    const onClick = jest.fn();
    renderComponent(onClick);

    await userEvent.click(screen.getByRole("button", { name: "button actions" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should have type='button'", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button actions" })).toHaveAttribute(
      "type",
      "button"
    );
  });
});
