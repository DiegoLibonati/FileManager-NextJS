import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { DropdownActionsProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import DropdownActions from "@/components/Dropdown/DropdownActions/DropdownActions";

const renderComponent = (props: Partial<DropdownActionsProps> = {}): RenderResult => {
  const defaultProps: DropdownActionsProps = {
    offsetLeft: 200,
    onClickDelete: jest.fn(),
    ...props,
  };
  return render(<DropdownActions {...defaultProps} />);
};

describe("DropdownActions", () => {
  it("should render the Eliminar action", () => {
    renderComponent();

    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("should call onClickDelete when Eliminar is clicked", async () => {
    const onClickDelete = jest.fn();
    renderComponent({ onClickDelete });

    await userEvent.click(screen.getByText("Eliminar"));

    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });

  it("should position the dropdown based on offsetLeft", () => {
    const { container } = renderComponent({ offsetLeft: 300 });

    const dropdown = container.firstChild as HTMLElement;
    expect(dropdown.style.left).toBe(`${300 - 160}px`);
  });
});
