import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ButtonCreateProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import ButtonCreate from "@/components/Buttons/ButtonCreate/ButtonCreate";

const renderComponent = (props: Partial<ButtonCreateProps> = {}): RenderResult => {
  const defaultProps: ButtonCreateProps = { onClick: jest.fn(), ...props };
  return render(<ButtonCreate {...defaultProps} />);
};

describe("ButtonCreate", () => {
  it("should render children", () => {
    renderComponent({ children: "Create" });

    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should have type='submit'", () => {
    renderComponent({ children: "Save" });

    expect(screen.getByRole("button", { name: "button create" })).toHaveAttribute("type", "submit");
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    renderComponent({ children: "Go", onClick });

    await userEvent.click(screen.getByRole("button", { name: "button create" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should apply the className prop", () => {
    renderComponent({ children: "Styled", className: "extra-class" });

    expect(screen.getByRole("button", { name: "button create" })).toHaveClass("extra-class");
  });
});
